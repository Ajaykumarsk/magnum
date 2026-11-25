import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MasterDataService } from '../../services/master-data.service';
import { MASTER_METADATA, MasterConfig } from '../../data/master-metadata';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PopoverModule } from 'primeng/popover';
import { MessageService, ConfirmationService } from 'primeng/api';
import { WebSocketService } from '@/app/core/auth/services/websocket.service';

@Component({
    selector: 'app-master-table',
    standalone: true,
    imports: [CommonModule, FormsModule, TableModule, ButtonModule, InputTextModule, DialogModule, SelectModule, DatePickerModule, TextareaModule, CheckboxModule, TagModule, ToastModule, ConfirmDialogModule, PopoverModule],
    providers: [MessageService, ConfirmationService],
    templateUrl: './master-table.component.html'
})
export class MasterTableComponent implements OnInit, OnDestroy {
    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    private route = inject(ActivatedRoute);
    public router = inject(Router);
    private masterService = inject(MasterDataService);
    private wsService = inject(WebSocketService); // <-- Inject existing WebSocketService
    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);
    private cd = inject(ChangeDetectorRef);

    private wsSubscription?: Subscription;

    categoryKey = '';
    masterKey = '';
    config: MasterConfig | null = null;

    items: any[] = [];
    selectedItems: any[] = [];
    loading = false;

    dialogVisible = false;
    isEditing = false;
    currentId: number | string | null = null;
    formData: any = {};

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.categoryKey = params['category'] || '';
            this.masterKey = params['master'] || '';

            const fullKey = `${this.categoryKey}/${this.masterKey}`;
            this.config = MASTER_METADATA[fullKey] || MASTER_METADATA[this.masterKey] || null;

            if (this.config) {
                this.loadData();
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Configuration not found for: ${fullKey}`
                });
            }
        });

        // 1. Ensure WebSocket connection is active
        this.wsService.connect();

        // 2. Listen to real-time events from Django
        this.wsSubscription = this.wsService.messages$.subscribe((msg: any) => {
            if (!this.config || !msg) return;

            // Check if the event belongs to this master (e.g. 'department')
            const isMatchingMaster = msg.model && (this.masterKey.toLowerCase().includes(msg.model.toLowerCase()) || this.config.apiEndpoint.toLowerCase().includes(msg.model.toLowerCase()));

            if (msg.type === 'master_update' && isMatchingMaster) {
                console.log('⚡ Applying real-time update to table:', msg);
                this.handleRealtimeEvent(msg);
            }
        });
    }

    /**
     * Updates the table data instantly without an extra HTTP GET call
     */
    private handleRealtimeEvent(msg: any): void {
        const { action, id, data } = msg;
        const targetId = id || data?.id;

        if (action === 'updated') {
            const index = this.items.findIndex((item) => item.id == targetId);

            if (index !== -1 && data) {
                // Update item in place
                this.items[index] = { ...this.items[index], ...data };
                // Reassign array reference so PrimeNG detects the change
                this.items = [...this.items];
                this.cd.detectChanges();
            } else {
                // Fallback to full fetch if item is not found in the current view
                this.loadData();
            }

            this.messageService.add({
                severity: 'info',
                summary: 'Real-time Update',
                detail: `Record #${targetId} was updated by another user.`
            });
        } else if (action === 'created') {
            if (data && !this.items.some((item) => item.id == data.id)) {
                // Prepend new item to the top of the table
                this.items = [data, ...this.items];
                this.cd.detectChanges();
            } else {
                this.loadData();
            }

            this.messageService.add({
                severity: 'info',
                summary: 'Real-time Update',
                detail: 'A new record was added.'
            });
        } else if (action === 'deleted') {
            // Remove item immediately from the table
            this.items = this.items.filter((item) => item.id != targetId);
            this.items = [...this.items];
            this.cd.detectChanges();

            this.messageService.add({
                severity: 'warn',
                summary: 'Real-time Update',
                detail: `Record #${targetId} was deleted.`
            });
        }
    }

    ngOnDestroy(): void {
        // Unsubscribe to avoid memory leaks when navigating away
        if (this.wsSubscription) {
            this.wsSubscription.unsubscribe();
        }
    }

    /**
     * Checks if the WebSocket payload matches the currently viewed master table
     */
    private isEventForCurrentMaster(msg: any): boolean {
        if (!this.config || !msg) return false;

        const currentMaster = this.masterKey.toLowerCase();
        const currentEndpoint = this.config.apiEndpoint.toLowerCase();

        // Convert the entire message to string to match any format (e.g. { model: 'department' }, or raw text)
        const rawMsg = JSON.stringify(msg).toLowerCase();

        return rawMsg.includes(currentMaster) || rawMsg.includes(currentEndpoint);
    }

    loadData(): void {
        if (!this.config) return;
        this.loading = true;
        this.masterService.getItems(this.config.apiEndpoint).subscribe({
            next: (res: any) => {
                const data = Array.isArray(res) ? res : res.results || res.data || [];
                // Assign new array reference for PrimeNG Table Change Detection
                this.items = [...data];
                this.loading = false;
                this.cd.detectChanges();
            },
            error: () => {
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load records from server'
                });
                this.cd.detectChanges();
            }
        });
    }

    openNew(): void {
        this.isEditing = false;
        this.currentId = null;
        this.formData = {};
        if (this.config) {
            this.config.formFields.forEach((field) => {
                this.formData[field.field] = field.defaultValue !== undefined ? field.defaultValue : null;
            });
        }
        this.dialogVisible = true;
    }

    openEdit(item: any): void {
        this.isEditing = true;
        this.currentId = item.id;
        this.formData = { ...item };
        this.dialogVisible = true;
    }

    saveItem(): void {
        if (!this.config) return;

        if (this.isEditing && this.currentId) {
            this.masterService.updateItem(this.config.apiEndpoint, this.currentId, this.formData).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record updated' });
                    this.dialogVisible = false;
                    this.loadData();
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update record' });
                }
            });
        } else {
            this.masterService.createItem(this.config.apiEndpoint, this.formData).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record created' });
                    this.dialogVisible = false;
                    this.loadData();
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create record' });
                }
            });
        }
    }

    deleteItem(item: any): void {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete this record?`,
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (!this.config) return;
                this.masterService.deleteItem(this.config.apiEndpoint, item.id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record deleted' });
                        this.loadData();
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete record' });
                    }
                });
            }
        });
    }

    deleteSelected(): void {
        if (!this.selectedItems.length || !this.config) return;

        this.confirmationService.confirm({
            message: `Delete ${this.selectedItems.length} selected records?`,
            header: 'Bulk Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const ids = this.selectedItems.map((item) => item.id);
                this.masterService.bulkDelete(this.config!.apiEndpoint, ids).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Selected records deleted' });
                        this.selectedItems = [];
                        this.loadData();
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bulk delete failed' });
                    }
                });
            }
        });
    }

    triggerImport(): void {
        if (this.fileInput) {
            this.fileInput.nativeElement.click();
        }
    }

    onFileImport(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.messageService.add({
                severity: 'info',
                summary: 'Import Started',
                detail: `Processing file: ${file.name}`
            });
            input.value = '';
        }
    }

    downloadTemplate(): void {
        if (!this.config) return;
        const headers = this.config.formFields.map((f) => f.field).join(',');
        const sampleRow = this.config.formFields.map((f) => f.placeholder || '').join(',');
        const csvContent = `${headers}\n${sampleRow}\n`;

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.config.id}_template.csv`;
        a.click();
        window.URL.revokeObjectURL(url);

        this.messageService.add({
            severity: 'success',
            summary: 'Template Downloaded',
            detail: `${this.config.title} template downloaded`
        });
    }

    exportCsv(): void {
        if (!this.config) return;
        this.masterService.exportCsv(this.config.apiEndpoint).subscribe({
            next: (blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${this.config!.id}_export.csv`;
                a.click();
                window.URL.revokeObjectURL(url);
            }
        });
    }

    getPluralTitle(title: string): string {
        if (!title) return '';
        let clean = title.replace(/\s*Master$/i, '').trim();
        if (clean.endsWith('y') && !clean.endsWith('ey')) {
            return clean.slice(0, -1) + 'ies';
        }
        if (clean.endsWith('s') || clean.endsWith('x') || clean.endsWith('ch') || clean.endsWith('sh')) {
            return clean + 'es';
        }
        return clean + 's';
    }

    goBack(): void {
        this.router.navigate(['/configuration', this.categoryKey]);
    }
}
