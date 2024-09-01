import { Component } from '@angular/core'

@Component({
  standalone: true,
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
  show: boolean = true

  constructor() {
    this.automaticHide()
  }

  automaticHide() {
    setTimeout(() => {
      this.show = false
    }, 2000)
  }
}
