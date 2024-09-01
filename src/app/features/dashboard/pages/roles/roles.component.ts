import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matAdd, matDeleteForever, matRemoveRedEye } from '@ng-icons/material-icons/baseline'

import { IRoleEntity } from '@core/models'
import { RoleService } from '@core/services'
import RoleComponent from './pages/role/role.component'
import { AlertBadgeComponent, SpinnerComponent } from '@shared/index'
import { AlertBadgeService } from '@shared/alert-badge/alert-badge.service'

@Component({
  standalone: true,
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  imports: [CommonModule, NgIconComponent, RouterLink, RoleComponent, AlertBadgeComponent, SpinnerComponent],
  viewProviders: [provideIcons({ matRemoveRedEye, matDeleteForever, matAdd })],
})
export default class RolesComponent {
  roles: IRoleEntity[] = []
  isCreating: boolean = false
  isSubmitting: boolean = false
  roleSelected: IRoleEntity | null = null

  constructor(private readonly roleService: RoleService, private readonly alertService: AlertBadgeService) {}

  ngOnInit(): void {
    this.roleService.getRoles().subscribe((roles) => {
      this.roles = roles.data.list
    })
  }

  onCreate(): void {
    this.isCreating = true
  }

  onEdit(role: IRoleEntity): void {
    this.roleSelected = role
  }

  onClose(): void {
    this.isCreating = false
    this.roleSelected = null
    this.ngOnInit()
  }

  onDelete(id: string): void {
    this.isSubmitting = true

    this.roleService.deleteRole(id).subscribe({
      next: () => {
        this.ngOnInit()
        this.isSubmitting = false
      },
      error: (error) => {
        this.isSubmitting = false
        this.alertService.showAlert('Error deleting role', 'An error occurred while deleting the role. Please try again.')
      },
    })
  }
}
