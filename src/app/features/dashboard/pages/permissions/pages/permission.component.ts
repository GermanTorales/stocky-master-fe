import { forkJoin } from 'rxjs'
import { CommonModule } from '@angular/common'
import { matCancel } from '@ng-icons/material-icons/baseline'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { IPermissionEntity } from '@core/models'
import { PermissionService } from '@core/services'
import { PrimaryButtonComponent } from '@shared/button'
import { AlertBadgeComponent, SpinnerComponent } from '@shared/index'
import { AlertBadgeService } from '@shared/alert-badge/alert-badge.service'

@Component({
  standalone: true,
  selector: 'app-permission-modal',
  templateUrl: './permission.component.html',
  imports: [CommonModule, ReactiveFormsModule, NgIconComponent, SpinnerComponent, AlertBadgeComponent, PrimaryButtonComponent],
  viewProviders: [provideIcons({ matCancel })],
})
export default class PermissionComponent {
  @Input() permission: IPermissionEntity | null = null
  @Output() save = new EventEmitter<any>()
  @Output() close = new EventEmitter<void>()

  permissionForm: FormGroup<any>
  isSubmitting: boolean = false
  destroyRef = inject(DestroyRef)
  modalTile: string = 'Crear nuevo permiso'
  submitBtnText: string = 'Crear role'

  constructor(private readonly permissionService: PermissionService, private readonly alertService: AlertBadgeService) {
    this.permissionForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    })
  }

  ngOnInit() {
    if (this.permission) {
      this.permissionForm.patchValue({
        name: this.permission?.name,
        description: this.permission?.description,
      })

      this.modalTile = 'Editar permiso'
      this.submitBtnText = 'Guardar cambios'
    }
  }

  onClose() {
    this.close.emit()
  }

  onSave() {
    this.isSubmitting = true

    if (!this.permission) this.onCreate()
    else this.onUpdate()
  }

  onCreate() {
    const newPermission = {
      name: this.permissionForm.value.name,
      description: this.permissionForm.value.description,
    }

    let observable = this.permissionService.createPermission(newPermission)

    observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.isSubmitting = false
        this.close.emit()
      },
      error: (error) => {
        this.isSubmitting = false

        if (error.status === 400) {
          this.alertService.showAlert('Error al crear permiso', 'Algun dato modificado es invalido.')
        }
      },
    })
  }

  onUpdate() {
    if (!this.permission) return

    const data = {
      name: this.permissionForm.value.name,
      description: this.permissionForm.value.description,
    }

    let observable = this.permissionService.updatePermission(this.permission.id, data)

    observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.isSubmitting = false
        this.onClose()
      },
      error: (error) => {
        this.isSubmitting = false

        if (error.status === 400) {
          this.alertService.showAlert('Error al actualizar role', 'Algun dato modificado es invalido.')
        }
      },
    })
  }
}
