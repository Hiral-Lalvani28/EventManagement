import { Component, OnInit } from '@angular/core';
import { Event } from '../../shared/model/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../shared/services/event.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
})
export class EventDetailsComponent implements OnInit {
  event: Event[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadEventDetails();
  }

  private loadEventDetails(): void {
    const eventId = this.route.snapshot.paramMap.get('id');

    if (eventId) {
      this.eventService.getEvent(eventId).subscribe(
        (event: Event[]) => {
          this.event = event;
        },
        (error: any) => {
          console.error('Error fetching event:', error);
        }
      );
    } else {
      console.error('No event id found in route parameters');
    }
  }

  goBackToList(): void {
    this.router.navigate(['/events']);
  }
}
