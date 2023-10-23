import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Parteneriat } from 'src/app/modules/models/parteneriat';
import { UsersService } from 'src/app/modules/users/users.service';
import { PartnershipService } from 'src/app/services/partnership.service';
import { EventService } from '../../tasks/list/event.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  partnership: Parteneriat;
  partnerships: Parteneriat[] = [];
  breadCrumbItems: Array<{}>;
  events: any[] = [];
  form: FormGroup;
  @ViewChild('content') content: any;
  selectedUser: any;
  selectedEventId: any;

  constructor(private ps: PartnershipService, private route: ActivatedRoute, private modalService: NgbModal, private formBuilder: FormBuilder, private es: EventService,private router: Router) {
    this.form = this.formBuilder.group({
      eventName: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.loadPartnership(id);
      this.loadEvents();
    });
  }

  loadEvents() {
    this.es.getAllEvents().subscribe((events) => {
      this.events = events;
    });
  }

  loadPartnership(id: number) {
    this.ps.getParteneriatById(id).subscribe((data) => {
      this.partnership = data;
    });
  }

  open() {
    this.modalService.open(this.content, { windowClass: 'modal-holder' });
  }

  onSubmit() {
    // Get the selected event ID from the form control
    const selectedEventId = this.form.value.eventName;
    console.log('Selected Event ID:', selectedEventId);

    if (selectedEventId) {
      this.onAssignToEvent(this.partnership.idParteneriat, selectedEventId);
    } else {
      console.error('No event selected. Please select an event before assigning.');
    }
  }

  onAssignToEvent(partnershipId: any, eventId: any) {
    if (eventId) {
      this.ps.assignEventToParteneriat(partnershipId,eventId)
        .subscribe(
          response => {
            console.log('Event assigned successfully:', response);
            this.router.navigate(['/partnerships/list']);
            this.modalService.dismissAll();
          },
          error => {
            console.error('Error assigning event:', error);
            this.router.navigate(['/partnerships/list']);
            this.modalService.dismissAll();
          }
        );
    } else {
      console.error('No event selected. Please select an event before assigning.');
    }
  }
}
