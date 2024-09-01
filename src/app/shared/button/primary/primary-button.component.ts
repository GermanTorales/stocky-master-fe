import { Component, Input } from '@angular/core'

@Component({
  standalone: true,
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
})
export class PrimaryButtonComponent {
  @Input({ required: true }) text!: string
}
