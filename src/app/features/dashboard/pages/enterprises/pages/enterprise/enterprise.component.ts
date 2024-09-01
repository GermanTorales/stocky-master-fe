import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { PrimaryButtonComponent } from '@shared/button'
import { AlertBadgeComponent, SpinnerComponent } from '@shared/index'
import { IEnterpriseEntity } from '../../models'
import { EUserStatus, IUserEntity } from '@dashboard/pages/users/models'
import { UserService } from '@dashboard/pages/users/services'

@Component({
  standalone: true,
  selector: 'app-enterprise-modal',
  templateUrl: './enterprise.component.html',
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent, AlertBadgeComponent, PrimaryButtonComponent],
})
export class EnterpriseComponent {
  @Input() enterprise: IEnterpriseEntity | null = null
  @Output() save = new EventEmitter<any>()
  @Output() close = new EventEmitter<void>()

  isSubmitting: boolean = false
  modalTitle: string = 'Crear empresa'
  submitBtnText: string = 'Guardar'
  statusList: string[] = Object.values(EUserStatus)
  users: IUserEntity[] = []

  enterpriseForm: FormGroup<any>

  constructor(private readonly userService: UserService) {
    this.enterpriseForm = new FormGroup({
      name: new FormControl('', Validators.required),
      cuit: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact_number: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    })
  }

  ngOnInit() {
    this.userService.getUsersWithoutEnterprise().subscribe((res) => {
      this.users = res.data.list
    })

    if (this.enterprise) {
      console.log(this.enterprise)
      this.enterpriseForm.patchValue(this.enterprise)
      this.modalTitle = 'Editar empresa'
      this.submitBtnText = 'Actualizar'
    }
  }

  onSave() {}

  onClose() {
    this.close.emit()
  }
}
