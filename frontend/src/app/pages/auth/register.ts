import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { AuthService } from '@/app/core/auth/services/auth.service';


@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        RippleModule
    ],
    template: `
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Create Account</div>
                            <span class="text-muted-color font-medium">Sign up to get started</span>
                        </div>

                        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                            <div class="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label class="block text-surface-900 dark:text-surface-0 font-medium mb-2">First Name *</label>
                                    <input pInputText formControlName="first_name" placeholder="First name" class="w-full" />
                                </div>
                                <div>
                                    <label class="block text-surface-900 dark:text-surface-0 font-medium mb-2">Last Name *</label>
                                    <input pInputText formControlName="last_name" placeholder="Last name" class="w-full" />
                                </div>
                            </div>

                            <label class="block text-surface-900 dark:text-surface-0 font-medium mb-2">Email *</label>
                            <input pInputText formControlName="email" placeholder="Email address" class="w-full md:w-[30rem] mb-4" />

                            <label class="block text-surface-900 dark:text-surface-0 font-medium mb-2">Phone</label>
                            <input pInputText formControlName="phone" placeholder="Phone number (optional)" class="w-full mb-4" />

                            <label class="block text-surface-900 dark:text-surface-0 font-medium mb-2">Password *</label>
                            <p-password
                                formControlName="password"
                                placeholder="Password (min 8 chars)"
                                [toggleMask]="true"
                                styleClass="mb-4"
                                [fluid]="true"
                            ></p-password>

                            <label class="block text-surface-900 dark:text-surface-0 font-medium mb-2">Confirm Password *</label>
                            <p-password
                                formControlName="password_confirm"
                                placeholder="Confirm password"
                                [toggleMask]="true"
                                [feedback]="false"
                                styleClass="mb-6"
                                [fluid]="true"
                            ></p-password>

                            <p-button
                                label="Create Account"
                                styleClass="w-full"
                                [loading]="loading"
                                type="submit"
                                [disabled]="registerForm.invalid"
                            ></p-button>

                            <div class="text-center mt-4">
                                <span class="text-muted-color">Already have an account?</span>
                                <a routerLink="/auth/login" class="font-medium no-underline ml-2 cursor-pointer text-primary">Sign in</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Register {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private messageService = inject(MessageService);
    private router = inject(Router);

    registerForm: FormGroup;
    loading: boolean = false;

    constructor() {
        this.registerForm = this.fb.group({
            first_name: ['', [Validators.required]],
            last_name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phone: [''],
            password: ['', [Validators.required, Validators.minLength(8)]],
            password_confirm: ['', [Validators.required]]
        });
    }

    onSubmit(): void {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }

        const { password, password_confirm } = this.registerForm.value;
        if (password !== password_confirm) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Passwords do not match'
            });
            return;
        }

        this.loading = true;

        this.authService.register(this.registerForm.value).subscribe({
            next: () => {
                this.loading = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Welcome!',
                    detail: 'Account created successfully',
                    life: 3000
                });
                this.router.navigate(['/']);
            },
            error: (error) => {
                this.loading = false;
                const errors = error.error?.errors;
                let errorMessage = 'Registration failed';
                if (errors) {
                    const messages = Object.values(errors).flat();
                    errorMessage = (messages as string[]).join(' ');
                }
                this.messageService.add({
                    severity: 'error',
                    summary: 'Registration Failed',
                    detail: errorMessage,
                    life: 5000
                });
            }
        });
    }
}