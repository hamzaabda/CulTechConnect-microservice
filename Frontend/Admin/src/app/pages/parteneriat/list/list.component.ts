import { Component, OnInit } from '@angular/core';
import { Parteneriat } from 'src/app/modules/models/parteneriat';
import { Router, RouterModule } from '@angular/router';
import { PartnershipService } from 'src/app/services/partnership.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  partnershiptData: Parteneriat[];
  cols: any[] = [];

  constructor(private ps: PartnershipService,private router: Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Partnerships' }, { label: 'Partnerships List', active: true }];

   this.cols = [
    { field: 'partnership', header: 'partnership' },
    { field: 'nomParteneriat', header: 'nomParteneriat' },
    { field: 'description', header: 'description' }

];
  this.ps.getPartnerships().subscribe(partnershiptData => {
    this.partnershiptData = partnershiptData;
  });
  }

  refreshPage() {
    location.reload();
  }

  navigateToCreatePartnership() {
    this.router.navigate(['/partnerships/create']);
  }
  navigateToOverviewPartnership(idPartnership: number) {
    this.router.navigate(['/partnerships/overview', idPartnership]);

  }

  navigateToEdit(idPartnership: number) {
    this.router.navigate(['/partnerships/edit', idPartnership]);

  }


  deletePartnerships(idPartnership: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then((result) => {
        if (result.value) {
       
          this.ps.deleteParteneriat(idPartnership).subscribe(
            () => {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'The partnership has been deleted.',
                'success'
              );
              this.refreshPage();
            },
            (error) => {
            
              console.error('Error deleting partnership:', error);
              swalWithBootstrapButtons.fire(
                'Error',
                'An error occurred while deleting the partnership.',
                'error'
              );
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
         
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          );
        }
      });
  }


  verifyPartnership(idPartnership: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'Do you want to verify this partnership?',
        icon: 'question',
        confirmButtonText: 'Yes, verify it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then((result) => {
        if (result.value) {
          this.ps.verifyParteneriat(idPartnership).subscribe(
            (parteneriat) => {
              if (parteneriat) {
                swalWithBootstrapButtons.fire(
                  'Verified!',
                  'The partnership has been verified.',
                  'success'
                );
                this.refreshPage();
              } else {
                swalWithBootstrapButtons.fire(
                  'Error',
                  'An error occurred while verifying the partnership.',
                  'error'
                );
              }
            },
            (error) => {
              console.error('Error verifying partnership:', error);
              swalWithBootstrapButtons.fire(
                'Error',
                'An error occurred while verifying the partnership.',
                'error'
              );
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) { 
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'The partnership has not been verified.',
            'error'
          );
        }
      });
  }
  
  cancelPartnership(idPartnership: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'Do you want to cancel this partnership?',
        icon: 'question',
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, keep it!',
        showCancelButton: true
      })
      .then((result) => {
        if (result.value) {
          this.ps.cancelPartnership(idPartnership).subscribe(
            (parteneriat) => {
              if (parteneriat) {
                swalWithBootstrapButtons.fire(
                  'Canceled!',
                  'The partnership has been canceled.',
                  'success'
                );
                this.refreshPage();
              } else {
                swalWithBootstrapButtons.fire(
                  'Error',
                  'An error occurred while canceling the partnership.',
                  'error'
                );
              }
            },
            (error) => {
              console.error('Error canceling partnership:', error);
              swalWithBootstrapButtons.fire(
                'Error',
                'An error occurred while canceling the partnership.',
                'error'
              );
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'The partnership has not been canceled.',
            'error'
          );
        }
      });
  }
  
  

}
