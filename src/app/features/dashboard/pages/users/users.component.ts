import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matCancel, matCheckCircle, matDeleteForever, matModeEdit, matRemoveRedEye } from '@ng-icons/material-icons/baseline'

import { UserService } from './services'
import { IUserEntity } from './models'
import UserComponent from './pages/user/user.component'
import CreateUserComponent from './pages/create-user/create-user.component'

@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './users.component.html',
  imports: [CommonModule, NgIconComponent, RouterLink, UserComponent, CreateUserComponent],
  viewProviders: [provideIcons({ matRemoveRedEye, matModeEdit, matDeleteForever, matCheckCircle, matCancel })],
})
export default class UsersComponent {
  users: IUserEntity[] = []
  selectedUser: IUserEntity | null = null
  createUser: boolean = false
  isSubmitting: boolean = false

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((res) => {
      this.users = res.data.list
    })
  }

  onEdit(user: any): void {
    this.selectedUser = user
  }

  onSave(updatedUser: any): void {}

  onClose(): void {
    this.selectedUser = null
    this.createUser = false
    this.ngOnInit()
  }

  onCreate(): void {
    this.createUser = true
  }

  onDelete(id: string): void {
    this.isSubmitting = true

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.isSubmitting = false
        this.ngOnInit()
      },
    })
  }
}
