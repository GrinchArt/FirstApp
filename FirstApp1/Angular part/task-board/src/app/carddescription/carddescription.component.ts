import { Component,Input, OnInit } from '@angular/core';
import{ Card } from '../card';
import{ ActivityLog, ActivitylogService } from '../activitylog.service';
import { CardComponent } from '../card/card.component';
@Component({
  selector: 'app-carddescription',
  templateUrl: './carddescription.component.html',
  styleUrls: ['./carddescription.component.css']
})
export class CarddescriptionComponent {
  @Input() card!: Card;
  @Input() activityLogs!: ActivityLog[];
  visible = false;

  openModal(): void {
    this.visible = true;
    const modal = document.querySelector('.card-description-modal');
    if (modal) {
        modal.classList.add('visible');
    }
}

closeModal(): void {
    this.visible = false;
    const modal = document.querySelector('.card-description-modal');
    if (modal) {
        modal.classList.remove('visible');
    }
}
}
