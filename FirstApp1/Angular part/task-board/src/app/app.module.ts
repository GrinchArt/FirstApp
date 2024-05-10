import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { ListComponent } from './list/list.component';
import { AddListComponent } from './add-list/add-list.component';
import { AddCardComponent } from './add-card/add-card.component';
import { EditListComponent } from './edit-list/edit-list.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivitylogComponent } from './activitylog/activitylog.component';
import { CarddescriptionComponent } from './carddescription/carddescription.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CardComponent,
    ListComponent,
    AddListComponent,
    AddCardComponent,
    EditListComponent,
    EditCardComponent,
    ActivityLogComponent,
    ActivitylogComponent,
    CarddescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
