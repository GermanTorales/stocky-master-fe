import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

import { IPermissionEntity } from '@core/models'
import { PermissionService } from '@core/services'
import { AlertBadgeService } from '@shared/alert-badge/alert-badge.service'
import { AlertBadgeComponent, SpinnerComponent } from '@shared/index'
import PermissionComponent from './pages/permission.component'

@Component({
  standalone: true,
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  imports: [CommonModule, RouterLink, AlertBadgeComponent, SpinnerComponent, PermissionComponent],
})
export default class PermissionsComponent {
  permissions: IPermissionEntity[] = []
  isCreating: boolean = false
  isSubmitting: boolean = false
  permissionSelected: IPermissionEntity | null = null

  constructor(private readonly permissionService: PermissionService, private readonly alertService: AlertBadgeService) {}

  ngOnInit(): void {
    this.permissionService.getPermissions().subscribe((permissions) => {
      this.permissions = permissions.data.list
    })
  }

  onCreate(): void {
    this.isCreating = true
  }

  onEdit(permission: IPermissionEntity): void {
    this.permissionSelected = permission
  }

  onClose(): void {
    this.isCreating = false
    this.permissionSelected = null
    this.ngOnInit()
  }

  onDelete(id: string): void {
    this.isSubmitting = true

    this.permissionService.deletePermission(id).subscribe({
      next: () => {
        this.ngOnInit()
        this.isSubmitting = false
      },
      error: () => {
        this.isSubmitting = false
        this.alertService.showAlert('Error eliminando permiso', 'An error occurred while deleting the role. Please try again.')
      },
    })
  }
}
