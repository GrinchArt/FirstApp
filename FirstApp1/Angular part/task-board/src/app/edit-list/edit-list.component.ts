import { Component, Input, Output, EventEmitter } from '@angular/core';
import { List } from '../list';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent {
  @Input() list!: List;
  @Output() update = new EventEmitter<List>();
  show: boolean = false;

  constructor() {}

  openModal() {
    this.show = true;
  }

  closeModal() {
    this.show = false;
  }

  updateList() {
    if (this.list.name.trim()) {
      this.update.emit(this.list);
      this.closeModal();
    }
  }
}