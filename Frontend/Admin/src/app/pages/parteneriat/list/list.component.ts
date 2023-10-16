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
          // User confirmed the deletion
          this.ps.deleteParteneriat(idPartnership).subscribe(
            () => {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'The partnership has been deleted.',
                'success'
              );
              // You can also perform any additional actions here after successful deletion.
            },
            (error) => {
              // Handle the deletion error, if necessary
              console.error('Error deleting partnership:', error);
              swalWithBootstrapButtons.fire(
                'Error',
                'An error occurred while deleting the partnership.',
                'error'
              );
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // User canceled the deletion
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          );
        }
      });
  }
  

}
