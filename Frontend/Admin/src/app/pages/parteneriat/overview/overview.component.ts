import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
 
 
  selectedUser:any;

  constructor(private ps: PartnershipService, private route: ActivatedRoute,private modalService:NgbModal,private formBuilder: FormBuilder,private es: EventService) {

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

  assignEvent() {
 
  }
  
  
  open() {
    this.modalService.open(this.content, { windowClass: 'modal-holder' });
  }

  onSubmit() {
    const selectedEventName = this.form.value.eventName;
    console.log('Selected Event Name:', selectedEventName);
  }

}
