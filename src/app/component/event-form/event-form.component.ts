import { Component, OnInit } from '@angular/core';
import { EventService } from '../../shared/services/event.service';
import { Event } from '../../shared/model/event.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss',
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  eventIds: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.eventIds = this.route.snapshot.paramMap.get('id');
    if (this.eventIds) {
      this.eventService.getEvent(this.eventIds).subscribe((event) => {
        if (event) {
          this.eventForm.patchValue(event[0]);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formData: Event = this.eventForm.value;

      const eventId = this.route.snapshot.paramMap.get('id');
      if (eventId) {
        this.eventService.updateEvent(formData);
      } else {
        formData.id = this.generateEventId();
        this.eventService.addEvent(formData);
      }
      this.eventForm.reset();
      this.router.navigate(['/events']);
    }
  }

  private generateEventId(): string {
    return 'event-id-' + Math.random().toString(36).substr(2, 9);
  }
}
