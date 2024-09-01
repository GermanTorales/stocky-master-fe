import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matAddModerator, matBusiness, matLockPerson, matPerson } from '@ng-icons/material-icons/baseline'

@Component({
  standalone: true,
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  imports: [NgIconComponent, RouterLink],
  viewProviders: [provideIcons({ matBusiness, matLockPerson, matPerson, matAddModerator })],
})
export class AdminSidebarComponent {}
