import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parteneriat',
  templateUrl: './parteneriat.component.html',
  styleUrls: ['./parteneriat.component.scss']
})

export class ParteneriatComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;


  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Partnerships' }, { label: 'Partnerships Overview', active: true }];


  }
}
