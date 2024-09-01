import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { Component, DestroyRef, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { PrimaryButtonComponent } from '@shared/button'
import { AuthService } from '@auth/services/auth.service'
import { AlertBadgeComponent, SpinnerComponent } from '@shared/index'
import { AlertBadgeService } from '@shared/alert-badge/alert-badge.service'

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  imports: [FormsModule, AlertBadgeComponent, SpinnerComponent, PrimaryButtonComponent],
  standalone: true,
})
export default class VerifyEmailComponent {
  isSubmitting: boolean = false
  showError: boolean = false
  errorMessage: string = ''
  digits: string[] = []
  destroyRef = inject(DestroyRef)
  email: string = ''
  digitsLength = 6

  constructor(private readonly authService: AuthService, private readonly router: Router, private readonly alertService: AlertBadgeService) {
    this.email = localStorage.getItem('email') as string
  }

  onKeyup(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement
    const value = input.value

    if (value.match(/[0-9]/)) {
      if (index < this.digitsLength) {
        const nextInput = input.parentElement?.nextElementSibling?.querySelector('input')

        if (nextInput) nextInput.focus()
      }
    } else if (event.key === 'Backspace' || event.key === 'Delete') {
      if (index) {
        const previousInput = input.parentElement?.previousElementSibling?.querySelector('input')

        if (previousInput) previousInput.focus()
      }

      this.digits[index] = ''
    } else {
      this.digits[index] = ''
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault()

    const text = event.clipboardData?.getData('text')

    if (text && text.length === this.digitsLength) {
      for (let i = 0; i < this.digitsLength; i++) {
        this.digits[i] = text[i]
      }

      const lastInput = document.querySelector('input[id="digit' + --this.digitsLength + '"]') as HTMLInputElement

      if (lastInput) lastInput.focus()
    }
  }

  submitForm() {
    this.isSubmitting = true

    let observable = this.authService.verifyEmail(parseInt(this.digits.join('')), this.email)

    observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        localStorage.removeItem('email')

        this.isSubmitting = false
        this.router.navigate(['/auth/on-boarding'])
      },
      error: (err) => {
        this.isSubmitting = false
        this.showError = true

        if (err.status === 404) {
          this.errorMessage = 'El token ingresado es inválido'
        }
      },
    })
  }

  reSendToken() {
    let observable = this.authService.verificationEmail(this.email as string)

    observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.isSubmitting = false
        this.router.navigate(['/auth/verify-email'])
      },
      error: (err) => {
        this.isSubmitting = false
        this.alertService.showAlert('Error al re-enviar codigo.', 'No se pudo enviar el correo de verificación.')
      },
    })
  }
}
