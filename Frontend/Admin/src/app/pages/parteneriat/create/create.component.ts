import { Component, OnInit, Input, EventEmitter, ViewChild, Output } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

/**
 * Projects-create component
 */
export class CreateComponent implements OnInit {

  constructor(private calendar: NgbCalendar) { }
  // bread crumb items
  breadCrumbItems: Array<{}>;

  selected: any;
  hidden: boolean;


  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Partenership' }, { label: 'Create New', active: true }];

    this.selected = '';
    this.hidden = true;
  }


}
