import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './component/event-list/event-list.component';
import { EventDetailsComponent } from './component/event-details/event-details.component';
import { NgModule } from '@angular/core';
import { EventFormComponent } from './component/event-form/event-form.component';

export const routes: Routes = [
    { path: 'events', component: EventListComponent, pathMatch: 'full' },
    { path: 'events/:id', component: EventDetailsComponent, pathMatch: 'full' },
    { path: 'eventsform', component: EventFormComponent, pathMatch: 'full' },
    { path: 'eventsform/:id', component: EventFormComponent, pathMatch: 'full' },
    { path: 'eventsdetail/:id', component: EventDetailsComponent, pathMatch: 'full' },
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    { path: '**', redirectTo: '/events' } 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
