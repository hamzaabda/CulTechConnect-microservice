import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { NgbNavModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { UIModule } from '../../shared/ui/ui.module';

import { BlogRoutingModule } from './blog-routing.module';

import { BloglistComponent } from '../blog/bloglist/bloglist.component';
import { BloggridComponent } from '../blog/bloggrid/bloggrid.component';
import { DetailComponent } from '../blog/detail/detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [BloglistComponent, BloggridComponent, DetailComponent],
    imports: [
        CommonModule,
        BlogRoutingModule,
        NgbNavModule,
        NgbTooltipModule,
        UIModule,
        FormsModule,
    ],
    providers:[DatePipe]
})

export class BlogModule { }
