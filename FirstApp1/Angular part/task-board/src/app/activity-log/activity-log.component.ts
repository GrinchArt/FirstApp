import { Component,OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { ActivityLog, ActivitylogService } from '../activitylog.service';
import{ SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit,OnChanges {
  activities: ActivityLog[] = [];
  offset = 0;
  limit = 20;
  moreAvailable = true; 
  @Input() show: boolean = false; 
  
  @Output() close = new EventEmitter<void>();
  constructor(private activityLogService: ActivitylogService) { 
    this.activityLogService.activityLogged.subscribe((log: ActivityLog) => {
      this.activities.unshift(log); 
      if (this.activities.length > this.limit) {
        this.activities.pop();  
      }
    });

  }

  ngOnInit(): void {
    this.loadActivities();
  }
  closeLog(): void {
    this.show = false;  
    this.close.emit();
  }
  refreshActivities(): void {
    this.offset = 0; 
    this.activities = []; 
    this.loadActivities(); 
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show'] && changes['show'].currentValue) {
      this.loadActivities();
    }
  }
  loadActivities(): void {
    this.activityLogService.getAllActivities(this.limit, this.offset).subscribe({
      next: (logs) => {
        this.activities = this.activities.concat(logs);
        if (logs.length < this.limit) {
          this.moreAvailable = false;
        } else {
          this.offset += this.limit; 
        }
      },
      error: (error) => console.error('Error loading activity logs:', error)
    });
  }

  loadMore(): void {
    if (this.moreAvailable) {
      this.loadActivities();
    }
  }
}
