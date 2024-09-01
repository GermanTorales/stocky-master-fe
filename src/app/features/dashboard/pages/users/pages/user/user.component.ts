import { Router, RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { EUserStatus } from '../../models'
import { UserService } from '../../services'
import { IRoleEntity } from '@core/models'
import { RoleService } from '@core/services'
import { PrimaryButtonComponent } from '@shared/button'
import { AlertBadgeComponent, SpinnerComponent } from '@shared/index'
import { AlertBadgeService } from '@shared/alert-badge/alert-badge.service'

@Component({
  standalone: true,
  selector: 'app-user-modal',
  templateUrl: './user.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SpinnerComponent, AlertBadgeComponent, PrimaryButtonComponent],
})
export default class UserComponent {
  @Input() user: any
  @Output() save = new EventEmitter<any>()
  @Output() close = new EventEmitter<void>()

  isSubmitting: boolean = false
  userForm: FormGroup<any>
  statusList: string[] = Object.values(EUserStatus)
  roles: Pick<IRoleEntity, 'id' | 'name'>[] = []

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private readonly router: Router,
    private readonly alertService: AlertBadgeService,
    private readonly roleService: RoleService
  ) {
    this.userForm = this.fb.group({
      first_name: [{ value: '', disabled: true }],
      last_name: [{ value: '', disabled: true }],
      email: ['', [Validators.required, Validators.email]],
      status: ['', Validators.required],
      role_id: ['', Validators.required],
      email_verified: [{ value: true, disabled: true }],
      phone_number: [{ value: '', disabled: true }],
      phone_number_verified: [{ value: false, disabled: true }],
      address: [{ value: '', disabled: true }],
      city: [{ value: '', disabled: true }],
      state: [{ value: '', disabled: true }],
      zip: [{ value: '', disabled: true }],
      country: [{ value: '', disabled: true }],
    })
  }

  ngOnInit() {
    this.roleService.getRoles().subscribe((res) => {
      this.roles = res.data.list
    })
  }

  ngOnChanges(): void {
    if (this.user) {
      this.userForm.patchValue(this.user)
    }
  }

  onSave(): void {
    this.userService.updateUser(this.user.id, this.userForm.value).subscribe({
      next: (data) => {
        this.isSubmitting = false
        this.close.emit()

        this.router.navigate(['/dashboard/users'])
      },
      error: (err: any) => {
        this.isSubmitting = false

        if (err.status === 400) {
          this.alertService.showAlert('Error al actualizar usuario', 'Algun dato modificado es invalido.')
        } else if (err.status === 409) {
          this.alertService.showAlert('Error al actualizar usuario', 'El email ya esta registrado.')
        }
      },
    })
  }

  onClose(): void {
    this.close.emit()
  }
}
