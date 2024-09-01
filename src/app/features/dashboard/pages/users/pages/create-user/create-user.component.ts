import { Router, RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { EUserStatus } from '../../models'
import { UserService } from '../../services'
import { IRoleEntity } from '@core/models'
import { RoleService } from '@core/services'
import { PrimaryButtonComponent } from '@shared/button'
import { AlertBadgeComponent, SpinnerComponent } from '@shared/index'
import { AlertBadgeService } from '@shared/alert-badge/alert-badge.service'
import { CreateUserDto, ICreateUserForm } from '../../dtos'

@Component({
  standalone: true,
  selector: 'app-create-user-modal',
  templateUrl: './create-user.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SpinnerComponent, AlertBadgeComponent, PrimaryButtonComponent],
})
export default class CreateUserComponent {
  @Output() save = new EventEmitter<any>()
  @Output() close = new EventEmitter<void>()

  isSubmitting: boolean = false
  userForm: FormGroup<ICreateUserForm>
  statusList: string[] = Object.values(EUserStatus)
  roles: Pick<IRoleEntity, 'id' | 'name'>[] = []

  constructor(
    private userService: UserService,
    private readonly router: Router,
    private readonly alertService: AlertBadgeService,
    private readonly roleService: RoleService
  ) {
    this.userForm = new FormGroup<ICreateUserForm>({
      first_name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      last_name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      email: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      role_id: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      address: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      city: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      state: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      zip: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      country: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    })
  }

  ngOnInit() {
    this.roleService.getRoles().subscribe((res) => {
      this.roles = res.data.list
    })
  }

  onSave(): void {
    this.userService.createUser(this.userForm.value as CreateUserDto).subscribe({
      next: () => {
        this.isSubmitting = false
        this.close.emit()
        this.router.navigate(['/dashboard/users'])
      },
      error: (err: any) => {
        this.isSubmitting = false

        if (err.status === 400) {
          this.alertService.showAlert('Error al crear usuario', 'Algun dato modificado es invalido.')
        } else if (err.status === 409) {
          this.alertService.showAlert('Error al crear usuario', 'El email ya esta registrado.')
        }
      },
    })
  }

  onClose(): void {
    this.close.emit()
  }
}
