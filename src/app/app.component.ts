import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventListComponent } from './component/event-list/event-list.component';
import { EventFormComponent } from './component/event-form/event-form.component';
import { EventDetailsComponent } from './component/event-details/event-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EventListComponent,EventFormComponent,EventDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'event-management-app';
}
