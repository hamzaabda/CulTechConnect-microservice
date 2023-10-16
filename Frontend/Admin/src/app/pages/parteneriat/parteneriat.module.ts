import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { parteneriatRoutingModule } from './parteneriat-routing.module';
import { UIModule } from '../../shared/ui/ui.module';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTooltipModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';

import { GridComponent } from './grid/grid.component';
import { ListComponent } from './list/list.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component'; 

@NgModule({
  declarations: [GridComponent, ListComponent, OverviewComponent, CreateComponent, EditComponent],
  imports: [
    CommonModule,
    UIModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgApexchartsModule,
    DropzoneModule,
    FormsModule,
    NgbDatepickerModule,
    ReactiveFormsModule
  ]
})

export class ParteneriatModule { }
