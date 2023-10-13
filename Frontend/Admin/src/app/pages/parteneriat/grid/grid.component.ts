import { Component, OnInit } from '@angular/core';
import { Project } from '../../projects/project.model';
import { projectData } from '../../projects/projectdata';
import { PartnershipService } from 'src/app/services/partnership.service';
import { Parteneriat } from 'src/app/modules/models/parteneriat';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  partnershiptData: Parteneriat[];
  partnership : Parteneriat;
  cols: any[] = [];

  constructor(private ps: PartnershipService) { }

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

}
