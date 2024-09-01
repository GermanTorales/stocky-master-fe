import { Component } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { NgIconComponent, provideIcons } from '@ng-icons/core'

import { UserService } from './pages/users/services'
import { IUserEntity } from './pages/users/models'
import { AdminSidebarComponent, ClientSidebarComponent } from './pages/sidebar-role'
import { AuthService } from '@auth/services/auth.service'

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [NgIconComponent, RouterOutlet, RouterLink, AdminSidebarComponent, ClientSidebarComponent],
  viewProviders: [provideIcons({})],
})
export default class DashboardComponent {
  user?: IUserEntity
  role: string = ''

  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  ngOnInit() {
    this.userService.getMe().subscribe(({ data }) => {
      this.userService.setUser(data)
      this.user = data
      this.role = data.role as unknown as string
    })
  }

  logout() {
    this.authService.purgeAuth()
  }
}
