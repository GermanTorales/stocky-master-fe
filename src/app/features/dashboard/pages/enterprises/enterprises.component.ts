import { Component } from '@angular/core'

import { IEnterpriseEntity } from './models'
import { EnterpriseService } from './services'
import { EnterpriseComponent } from './pages/enterprise/enterprise.component'

@Component({
  standalone: true,
  selector: 'app-enterprises',
  templateUrl: './enterprises.component.html',
  imports: [EnterpriseComponent],
})
export default class EnterprisesComponent {
  enterprises: IEnterpriseEntity[] = []
  enterpriseSelected: IEnterpriseEntity | null = null
  createEnterprise: boolean = false
  isSubmitting: boolean = false

  constructor(private readonly enterpriseService: EnterpriseService) {}

  ngOnInit() {
    this.enterpriseService.getEnterprises().subscribe({
      next: (response) => {
        this.enterprises = response.data.list
      },
      error: (error) => {
        console.error(error)
      },
    })
  }

  onCreate(): void {
    this.createEnterprise = true
  }

  onEdit(enterprise: IEnterpriseEntity): void {
    this.enterpriseSelected = enterprise
  }

  onDelete(id: string): void {}

  onClose() {
    this.createEnterprise = false
    this.enterpriseSelected = null
    this.ngOnInit()
  }
}
