import { Component, OnInit, Input, EventEmitter, ViewChild, Output } from '@angular/core';
import { Router } from '@angular/router';
import {  NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Parteneriat } from 'src/app/modules/models/parteneriat';
import { PartnershipService } from 'src/app/services/partnership.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})


export class CreateComponent implements OnInit {

  constructor(private calendar: NgbCalendar,private ps: PartnershipService,private router: Router) { }
  breadCrumbItems: Array<{}>;

  selected: any;
  hidden: boolean;
  p: Parteneriat = {
    idParteneriat: 0,
    nomParteneriat: '',
    numeroTelephone: 0,
    email: '',
    description: '',
    budget: 0,
    verified: false,
    eventId: 0
  };


  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Partenership' }, { label: 'Create New', active: true }];
    this.selected = '';
    this.hidden = true;
  }
  
  savePartnership() {
    if (this.isFormValid()) {
      this.ps.addParteneriat(this.p).subscribe(
        (res) => {
          Swal.fire({
            icon: 'success',
            title: 'The partnership has been saved',
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(res);
          this.router.navigate(['/partnerships/list']); 
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred while saving the partnership!',
          });
          console.error(error);
        }
      );
    }
  }
  
  isFormValid(): boolean {
    if (!this.p.nomParteneriat || !this.p.description || !this.p.budget || !this.p.numeroTelephone || !this.p.email) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form Data',
        text: 'Please fill in all required fields.',
      });
      return false; 
    }
    return true;
  }
  


}
