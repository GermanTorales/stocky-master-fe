import { jwtDecode } from 'jwt-decode'
import { Router, RouterLink } from '@angular/router'
import { Component, DestroyRef, OnInit, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { IUserLoginDto } from '@auth/dtos'
import { AuthService } from '@auth/services/auth.service'
import { ILoginFormDto } from '@auth/dtos/form.interfaces'
import { AlertBadgeComponent, SpinnerComponent } from '@shared/index'
import { AlertBadgeService } from '@shared/alert-badge/alert-badge.service'
import { IToken, ITokenPayload } from '@auth/models'
import { PrimaryButtonComponent } from '@shared/button'

@Component({
  standalone: true,
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  imports: [ReactiveFormsModule, RouterLink, AlertBadgeComponent, SpinnerComponent, PrimaryButtonComponent],
})
export default class SignInComponent {
  isSubmitting: boolean = false

  authForm: FormGroup<ILoginFormDto>
  destroyRef = inject(DestroyRef)

  constructor(private readonly authService: AuthService, private readonly router: Router, private readonly alertService: AlertBadgeService) {
    this.authForm = new FormGroup<ILoginFormDto>({
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

    let observable = this.authService.signIn(this.authForm.value as IUserLoginDto)

    observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data: { data: IToken }) => {
        const decode: ITokenPayload = jwtDecode(data.data.access_token)

        this.isSubmitting = false

        if (decode.status === 'pending_on_boarding') this.router.navigate(['/auth/on-boarding'])
        else if (decode.status !== 'active') this.router.navigate(['/auth/verify-email'])
        else this.router.navigate(['/dashboard'])
      },
      error: (err: any) => {
        this.isSubmitting = false

        if (err.status === 401) {
          this.alertService.showAlert('Error en el inicio de sesión', 'El email o la contraseña no son validos.')
        }
      },
    })
  }
}
