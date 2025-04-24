import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-hide-modal',
  standalone: true,
  templateUrl: './confirm-hide-modal.component.html',
  styleUrls: ['./confirm-hide-modal.component.scss']
})
export class ConfirmHideModalComponent {
  @Input() movie: any;  // Película a ocultar, recibida del componente padre
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
