import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule or ReactiveFormsModule

import { AppComponent } from './app.component';
import { EventFormComponent } from './component/event-form/event-form.component'; // Adjust the path as per your actual structure
import { EventListComponent } from './component/event-list/event-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EventFormComponent,
    EventListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }