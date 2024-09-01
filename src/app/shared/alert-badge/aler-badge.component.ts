import { Component, Input, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { AlertBadgeService } from './alert-badge.service'

@Component({
  standalone: true,
  selector: 'app-alert-badge',
  templateUrl: './alert-badge.component.html',
})
export class AlertBadgeComponent implements OnDestroy {
  visible: boolean = false
  message: string = ''
  description: string = ''
  private subscription: Subscription

  constructor(private alertService: AlertBadgeService) {
    this.subscription = this.alertService.alertState.subscribe((alertState) => {
      this.visible = alertState.visible
      this.message = alertState.message
      this.description = alertState.description
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  closeAlert() {
    this.alertService.hideAlert()
  }
}
