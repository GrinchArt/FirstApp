import { Component, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent {
  listName: string = '';
  display: boolean = false;

  @Output() create = new EventEmitter<string>();

  openModal() {
    this.display = true;
  }

  onClose() {
    this.display = false;
  }

  createList() {
    if (this.listName.trim()) {
      this.create.emit(this.listName);
      this.listName = '';
      this.display = false;
    }
  }
}
