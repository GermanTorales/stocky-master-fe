import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export interface IAlertSubject {
  visible: boolean
  message: string
  description: string
}

@Injectable({ providedIn: 'root' })
export class AlertBadgeService {
  private alertSubject = new BehaviorSubject<IAlertSubject>({ visible: false, message: '', description: '' })
  alertState = this.alertSubject.asObservable()

  showAlert(message: string, description: string) {
    this.alertSubject.next({ visible: true, message, description })
  }

  hideAlert() {
    this.alertSubject.next({ visible: false, message: '', description: '' })
  }
}
