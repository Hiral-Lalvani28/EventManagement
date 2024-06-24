import { Component, OnInit } from '@angular/core';
import { EventService } from '../../shared/services/event.service';
import { Event } from '../../shared/model/event.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    RouterModule,
    MatPaginatorModule,
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'date',
    'location',
    'description',
    'actions',
  ];
  events: Event[] = [];
  displayedEvents: Event[] = [];
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
      this.updateDisplayedEvents();
    });
  }

  updateDisplayedEvents(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedEvents = this.events.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedEvents();
  }

  goToNextPage(): void {
    if (this.pageIndex < this.getNumberOfPages() - 1) {
      this.pageIndex++;
      this.updateDisplayedEvents();
    }
  }

  goToPreviousPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.updateDisplayedEvents();
    }
  }

  goToPage(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.updateDisplayedEvents();
  }

  getNumberOfPages(): number {
    return Math.ceil(this.events.length / this.pageSize);
  }

  deleteEvent(eventId: any): void {
    this.eventService.deleteEvent(eventId);
    this.eventService.getEvents().subscribe(
      (event: Event[]) => {
        this.events = event;
      },
      (error: any) => {
        console.error('Error fetching event:', error);
      }
    );
  }
}
