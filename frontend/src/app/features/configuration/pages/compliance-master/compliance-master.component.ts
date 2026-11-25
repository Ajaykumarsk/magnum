import { Component, OnInit, inject, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ComplianceService } from '../../services/compliance.service';
import { MasterDataService } from '../../services/master-data.service';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { PopoverModule } from 'primeng/popover';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-compliance-master',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        DialogModule,
        SelectModule,
        DatePickerModule,
        TextareaModule,
        TagModule,
        ToastModule,
        ConfirmDialogModule,
        FileUploadModule,
        PopoverModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './compliance-master.component.html'
})
export class ComplianceMasterComponent implements OnInit {
    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    public router = inject(Router);
    private complianceService = inject(ComplianceService);
    private masterService = inject(MasterDataService);
    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);
    private cd = inject(ChangeDetectorRef);

    checklists: any[] = [];
    selectedChecklists: any[] = [];
    companies: any[] = [];
    locations: any[] = [];
    documentTypes: any[] = [];
    statusChoices: any[] = [];
    stats: any = { total: 0, active: 0, expiring_soon: 0, expired: 0, pending_renewal: 0, draft: 0 };

    loading = false;
    dialogVisible = false;
    renewDialogVisible = false;
    isEditing = false;
    selectedFile: File | null = null;

    formData: any = {};
    renewData: any = {};

    ngOnInit(): void {
        this.loadStats();
        this.loadMetadata();
        this.loadData();
    }

    loadStats(): void {
        this.complianceService.getStats().subscribe({
            next: (res) => {
                this.stats = res;
                this.cd.detectChanges();
            }
        });
    }

    loadMetadata(): void {
        this.complianceService.getDocumentTypes().subscribe(res => { this.documentTypes = res; this.cd.detectChanges(); });
        this.complianceService.getStatusChoices().subscribe(res => { this.statusChoices = res; this.cd.detectChanges(); });
        this.masterService.getItems('masters/machine-config/company').subscribe(res => { this.companies = Array.isArray(res) ? res : res.results || []; this.cd.detectChanges(); });
        this.masterService.getItems('masters/machine-config/location').subscribe(res => { this.locations = Array.isArray(res) ? res : res.results || []; this.cd.detectChanges(); });
    }

    loadData(): void {
        this.loading = true;
        this.complianceService.getChecklists().subscribe({
            next: (res: any) => {
                this.checklists = Array.isArray(res) ? res : res.results || [];
                this.loading = false;
                this.cd.detectChanges();
            },
            error: () => {
                this.loading = false;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load compliance records' });
                this.cd.detectChanges();
            }
        });
    }

    openNew(): void {
        this.isEditing = false;
        this.selectedFile = null;
        this.formData = { status: 'draft' };
        this.dialogVisible = true;
    }

    openEdit(item: any): void {
        this.isEditing = true;
        this.selectedFile = null;
        this.formData = { ...item };
        this.dialogVisible = true;
    }

    openRenew(item: any): void {
        this.renewData = { id: item.id, checklist_id: item.checklist_id, new_expiry_date: null };
        this.selectedFile = null;
        this.renewDialogVisible = true;
    }

    onFileSelect(event: any): void {
        if (event.files && event.files.length) {
            this.selectedFile = event.files[0];
        }
    }

    saveChecklist(): void {
        const payload = new FormData();
        Object.keys(this.formData).forEach(key => {
            if (this.formData[key] !== null && this.formData[key] !== undefined) {
                payload.append(key, this.formData[key]);
            }
        });

        if (this.selectedFile) {
            payload.append('document_file', this.selectedFile);
        }

        if (this.isEditing && this.formData.id) {
            this.complianceService.updateChecklist(this.formData.id, payload).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Checklist updated' });
                    this.dialogVisible = false;
                    this.loadData();
                    this.loadStats();
                }
            });
        } else {
            this.complianceService.createChecklist(payload).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Checklist created' });
                    this.dialogVisible = false;
                    this.loadData();
                    this.loadStats();
                }
            });
        }
    }

    processRenewal(): void {
        if (!this.renewData.new_expiry_date) return;
        const payload = new FormData();
        payload.append('new_expiry_date', this.renewData.new_expiry_date);
        if (this.selectedFile) {
            payload.append('document_file', this.selectedFile);
        }

        this.complianceService.renewChecklist(this.renewData.id, payload).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'License renewed successfully' });
                this.renewDialogVisible = false;
                this.loadData();
                this.loadStats();
            }
        });
    }

    deleteChecklist(item: any): void {
        this.confirmationService.confirm({
            message: `Delete compliance checklist ${item.checklist_id}?`,
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.complianceService.deleteChecklist(item.id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record deleted' });
                        this.loadData();
                        this.loadStats();
                    }
                });
            }
        });
    }

    deleteSelected(): void {
        if (!this.selectedChecklists.length) return;

        this.confirmationService.confirm({
            message: `Delete ${this.selectedChecklists.length} selected records?`,
            header: 'Bulk Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                // Iterative deletion for compliance endpoint
                let deletedCount = 0;
                this.selectedChecklists.forEach(item => {
                    this.complianceService.deleteChecklist(item.id).subscribe({
                        next: () => {
                            deletedCount++;
                            if (deletedCount === this.selectedChecklists.length) {
                                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Selected records deleted' });
                                this.selectedChecklists = [];
                                this.loadData();
                                this.loadStats();
                            }
                        }
                    });
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
        const headers = 'company,location,document_type,document_name,license_number,issuing_authority,issue_date,expiry_date';
        const sampleRow = '1,1,factory_license,Sample License,LIC-1234,Govt,2024-01-01,2025-01-01';
        const csvContent = `${headers}\n${sampleRow}\n`;

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `compliance_template.csv`;
        a.click();
        window.URL.revokeObjectURL(url);

        this.messageService.add({ severity: 'success', summary: 'Template Downloaded', detail: 'Compliance template downloaded' });
    }

    exportCsv(): void {
        this.complianceService.exportCsv().subscribe(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `compliance_checklist_export.csv`;
            a.click();
            window.URL.revokeObjectURL(url);
        });
    }

    getStatusSeverity(status: string): "success" | "warn" | "danger" | "secondary" | "info" {
        switch (status) {
            case 'active': return 'success';
            case 'expiring_soon': return 'warn';
            case 'pending_renewal': return 'info';
            case 'expired': return 'danger';
            default: return 'secondary';
        }
    }
}