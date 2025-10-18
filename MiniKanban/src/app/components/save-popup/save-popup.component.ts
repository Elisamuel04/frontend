import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-save-popup',
  standalone: true,
  imports: [NgIf],
  templateUrl: './save-popup.component.html',
  styleUrls: ['./save-popup.component.scss'],
})
export class SavePopupComponent {
  visible = false;

  @Output() confirm = new EventEmitter<boolean>();

  open() {
    this.visible = true;
  }

  close(save: boolean) {
    this.visible = false;
    this.confirm.emit(save);
  }
}
