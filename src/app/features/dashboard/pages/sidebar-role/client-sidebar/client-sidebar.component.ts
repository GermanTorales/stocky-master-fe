import { Component } from '@angular/core'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matBusiness } from '@ng-icons/material-icons/baseline'

@Component({
  standalone: true,
  selector: 'app-client-sidebar',
  templateUrl: './client-sidebar.component.html',
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ matBusiness })],
})
export class ClientSidebarComponent {}
