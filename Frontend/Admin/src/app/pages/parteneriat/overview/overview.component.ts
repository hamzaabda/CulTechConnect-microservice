import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Parteneriat } from 'src/app/modules/models/parteneriat';
import { PartnershipService } from 'src/app/services/partnership.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  partnership: Parteneriat;

  partnerships: Parteneriat[] = [];

  constructor(private ps: PartnershipService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.loadPartnership(id);
    });
  }

  loadPartnership(id: number) {
    this.ps.getParteneriatById(id).subscribe((data) => {
      this.partnership = data;
    });
  }
}
