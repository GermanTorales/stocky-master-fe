import { Component, DestroyRef, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { IUserLoginDto } from '@auth/dtos'
import { PrimaryButtonComponent } from '@shared/button'
import { AuthService } from '@auth/services/auth.service'
import { ICreatePasswordFormDto } from '@auth/dtos/form.interfaces'
import { AlertBadgeComponent, SpinnerComponent } from '@shared/index'
import { AlertBadgeService } from '@shared/alert-badge/alert-badge.service'

@Component({
  standalone: true,
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  imports: [ReactiveFormsModule, RouterLink, AlertBadgeComponent, SpinnerComponent, PrimaryButtonComponent],
})
export default class CreatePasswordComponent {
  isSubmitting: boolean = false
  email: string = ''

  authForm: FormGroup<ICreatePasswordFormDto>
  destroyRef = inject(DestroyRef)

  constructor(
    private readonly authService: AuthService,
    private route: ActivatedRoute,
    private readonly router: Router,
    private readonly alertService: AlertBadgeService
  ) {
    this.authForm = new FormGroup<ICreatePasswordFormDto>({
      password: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      confirm_password: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    })
  }

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email') as string

    const urlWithoutParams = this.router.url.split('?')[0]

    this.router.navigateByUrl(urlWithoutParams, { replaceUrl: true })
  }

  submitForm(): void {
    this.isSubmitting = true

    if (this.authForm.value.password !== this.authForm.value.confirm_password) {
      this.isSubmitting = false

      this.alertService.showAlert('Error al crear contraseña', 'Las contraseñas no coinciden')
      return
    }

    const data = {
      email: this.email,
      password: this.authForm.value.password,
    }

    let observable = this.authService.createPassword(data as IUserLoginDto)

    observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.isSubmitting = false

        this.router.navigate(['/auth/sign-in'])
      },
      error: (err: any) => {
        this.isSubmitting = false

        if (err.status === 400) {
          this.alertService.showAlert('Error al crear contraseña', err.error.message)
        } else {
          this.alertService.showAlert('Error al crear contraseña', err.message)
        }
      },
    })
  }
}
