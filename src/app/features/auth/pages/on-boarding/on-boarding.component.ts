import { Router } from '@angular/router'
import { Component, DestroyRef, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { PrimaryButtonComponent } from '@shared/button'
import { UserService } from '@dashboard/pages/users/services'
import { IOnBoardingDto } from '@dashboard/pages/users/dtos'
import { IOnBoardingFormDto } from '@auth/dtos/form.interfaces'
import { AlertBadgeComponent, SpinnerComponent } from '@shared/index'
import { AlertBadgeService } from '@shared/alert-badge/alert-badge.service'

@Component({
  standalone: true,
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.component.html',
  imports: [ReactiveFormsModule, PrimaryButtonComponent, SpinnerComponent, AlertBadgeComponent],
})
export default class OnBoardingComponent {
  isSubmitting = false
  destroyRef = inject(DestroyRef)

  userForm: FormGroup<IOnBoardingFormDto>

  constructor(private userService: UserService, private readonly router: Router, private readonly alertBadgeService: AlertBadgeService) {
    this.userForm = new FormGroup<IOnBoardingFormDto>({
      first_name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      last_name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      phone_number: new FormControl(''),
      address: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      zip: new FormControl(''),
    })
  }

  submitForm() {
    this.isSubmitting = true

    let observable = this.userService.onBoarding(this.userForm.value as IOnBoardingDto)

    observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.isSubmitting = false
        this.router.navigate(['/dashboard'])
      },
      error: () => {
        this.isSubmitting = false

        this.alertBadgeService.showAlert('Error al guardar la informacion', 'error')
      },
    })
  }
}
