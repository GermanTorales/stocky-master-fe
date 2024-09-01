import { Router, RouterLink } from '@angular/router'
import { Component, DestroyRef, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { IUserLoginDto } from '@auth/dtos'
import { AuthService } from '@auth/services/auth.service'
import { IRegisterFormDto } from '@auth/dtos/form.interfaces'
import { AlertBadgeComponent, SpinnerComponent } from '@shared/index'
import { AlertBadgeService } from '@shared/alert-badge/alert-badge.service'
import { PrimaryButtonComponent } from '@shared/button'

@Component({
  standalone: true,
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  imports: [ReactiveFormsModule, RouterLink, SpinnerComponent, AlertBadgeComponent, PrimaryButtonComponent],
})
export default class SignUpComponent {
  isSubmitting = false
  showError: boolean = false
  showPassword: boolean = false

  authForm: FormGroup<IRegisterFormDto>
  destroyRef = inject(DestroyRef)
  errorMessage: string = ''

  constructor(private readonly authService: AuthService, private readonly router: Router, private readonly alertBadgeService: AlertBadgeService) {
    this.authForm = new FormGroup<IRegisterFormDto>({
      email: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    })
  }

  submitForm(): void {
    this.isSubmitting = true

    let observable = this.authService.signUp(this.authForm.value as IUserLoginDto)

    observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.authService
          .verificationEmail(this.authForm.value.email as string)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              localStorage.setItem('email', this.authForm.value.email as string)

              this.isSubmitting = false
              this.router.navigate(['/auth/verify-email'])
            },
            error: (err) => {
              this.isSubmitting = false
              this.alertBadgeService.showAlert('Error al registrarse', 'No se pudo enviar el correo de verificación.')
            },
          })
      },
      error: (err) => {
        this.isSubmitting = false

        if (err.status === 400) {
          this.alertBadgeService.showAlert('Error al registrarse', 'El email o la contraseña no son validos.')
        } else if (err.status === 409) {
          this.alertBadgeService.showAlert('Error al registrarse', 'El email ya esta registrado.')
        }
      },
    })
  }
}
