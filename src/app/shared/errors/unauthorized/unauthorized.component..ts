import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  standalone: true,
  selector: 'app-error-unauthorized',
  templateUrl: './unauthorized.component.html',
  imports: [RouterLink],
})
export default class UnauthorizedComponent {}
