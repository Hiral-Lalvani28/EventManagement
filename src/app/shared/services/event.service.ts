// event.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { Event } from '../model/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private events: Event[] = [];
  private eventsSubject = new BehaviorSubject<Event[]>(this.events);

  constructor() {}

  getEvents(): BehaviorSubject<Event[]> {
    return this.eventsSubject;
  }

  getEvent(eventId: any): Observable<Event[]> {
    const filteredEvents = this.events.filter((event) => event.id === eventId);
    this.eventsSubject.next(filteredEvents);
    return this.eventsSubject.asObservable();
  }

  addEvent(event: Event): void {
    this.events.push(event);
    this.eventsSubject.next(this.events);
  }

  updateEvent(updatedEvent: Event): void {
    const index = this.events.findIndex((e) => e.id === updatedEvent.id);
    if (index !== -1) {
      this.events[index] = updatedEvent;
      this.eventsSubject.next(this.events);
    }
  }

  deleteEvent(eventId: string): void {
    this.events = this.events.filter((e) => e.id !== eventId);
    this.eventsSubject.next(this.events);
  }
}
