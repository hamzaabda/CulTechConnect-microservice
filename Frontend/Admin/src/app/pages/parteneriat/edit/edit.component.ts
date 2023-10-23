import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Parteneriat } from 'src/app/modules/models/parteneriat';
import { PartnershipService } from 'src/app/services/partnership.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private ps: PartnershipService, private route: ActivatedRoute) { }
  breadCrumbItems: Array<{}>;

  partnership: Parteneriat;

  
  selected: any;
  hidden: boolean;
  p: Parteneriat = {
    idParteneriat: 0,
    nomParteneriat: '',
    numeroTelephone: 0,
    email: '',
    description: '',
    budget: 0,
    verified: false
  };


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.loadPartnership(id);
    });
    this.breadCrumbItems = [{ label: 'Partenership' }, { label: 'Create New', active: true }];
    this.selected = '';
    this.hidden = true;
  }

  

  loadPartnership(id: number) {
    this.ps.getParteneriatById(id).subscribe((data) => {
      this.p = data; 
    });
  }
  
  
  savePartnership() {
    if (this.isFormValid()) {
      this.ps.updateParteneriat(this.p.idParteneriat,this.p).subscribe(
        (res) => {
          Swal.fire({
            icon: 'success',
            title: 'The partnership has been saved',
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(res);
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
