import { forkJoin } from 'rxjs'
import { CommonModule } from '@angular/common'
import { matCancel } from '@ng-icons/material-icons/baseline'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { PrimaryButtonComponent } from '@shared/button'
import { IPermissionEntity, IRoleEntity } from '@core/models'
import { PermissionService, RoleService } from '@core/services'
import { IRoleCreatedDto } from '@core/dtos/role/create-role.dto'
import { AlertBadgeComponent, SpinnerComponent } from '@shared/index'
import { AlertBadgeService } from '@shared/alert-badge/alert-badge.service'

@Component({
  standalone: true,
  selector: 'app-role-modal',
  templateUrl: './role.component.html',
  imports: [CommonModule, ReactiveFormsModule, NgIconComponent, SpinnerComponent, AlertBadgeComponent, PrimaryButtonComponent],
  viewProviders: [provideIcons({ matCancel })],
})
export default class RoleComponent {
  @Input() role: IRoleEntity | null = null
  @Output() save = new EventEmitter<any>()
  @Output() close = new EventEmitter<void>()

  roleForm: FormGroup<any>
  isSubmitting: boolean = false
  rolePermissions: IPermissionEntity[] = []
  permissions: IPermissionEntity[] = []
  destroyRef = inject(DestroyRef)
  modalTile: string = 'Crear nuevo role'
  submitBtnText: string = 'Crear role'

  constructor(
    private readonly permissionService: PermissionService,
    private readonly roleService: RoleService,
    private readonly alertService: AlertBadgeService
  ) {
    this.roleForm = new FormGroup({
      name: new FormControl('', Validators.required),
      permissions: new FormControl('', Validators.required),
    })
  }

  ngOnInit() {
    this.permissionService.getPermissions().subscribe((permissions) => {
      this.permissions = permissions.data.list

      this.roleForm.patchValue({
        name: this.role?.name,
      })

      this.rolePermissions = this.role?.permissions || []
      this.permissions = this.permissions.filter((permission) => !this.rolePermissions.some((rolePermission) => rolePermission.id === permission.id))

      if (this.role) {
        this.modalTile = 'Editar role'
        this.submitBtnText = 'Guardar cambios'
      }
    })
  }

  onClose() {
    this.close.emit()
  }

  onSave() {
    this.isSubmitting = true

    if (!this.role) this.onCreate()
    else this.onUpdate()
  }

  onCreate() {
    const newRole = {
      name: this.roleForm.value.name,
    }

    let observable = this.roleService.createRole(newRole)

    observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (roleCreated: IRoleCreatedDto) => {
        const role = roleCreated.data.id

        const requests = this.rolePermissions.map(({ id }) => this.permissionService.assignPermissionToRole(id as string, role as string))

        forkJoin(requests).subscribe({
          next: () => {
            this.isSubmitting = false
            this.close.emit()
          },
        })
      },
      error: (error) => {
        this.isSubmitting = false

        if (error.status === 400) {
          this.alertService.showAlert('Error al crear role', 'Algun dato modificado es invalido.')
        }
      },
    })
  }

  onUpdate() {
    if (!this.role) return

    const data = {
      name: this.roleForm.value.name,
      permissions: this.rolePermissions.map(({ id }) => id),
    }

    let observable = this.roleService.updateRole(this.role.id, data)

    observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.isSubmitting = false
        this.onClose()
      },
      error: (error) => {
        this.isSubmitting = false

        if (error.status === 400) {
          this.alertService.showAlert('Error al actualizar role', 'Algun dato modificado es invalido.')
        }
      },
    })
  }

  addPermission() {
    const permissionSelected = this.permissions.find((permission) => permission.id === this.roleForm.value.permissions)

    if (!permissionSelected) return

    this.rolePermissions.push(permissionSelected)

    this.permissions = this.permissions.filter((permission) => permission.id !== permissionSelected.id)
  }

  removePermission(permission: IPermissionEntity) {
    this.permissions.push(permission)

    this.rolePermissions = this.rolePermissions.filter((rolePermission) => rolePermission.id !== permission.id)
  }
}
