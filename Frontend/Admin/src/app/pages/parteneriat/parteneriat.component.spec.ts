import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteneriatComponent } from './parteneriat.component';

describe('ParteneriatComponent', () => {
  let component: ParteneriatComponent;
  let fixture: ComponentFixture<ParteneriatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParteneriatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParteneriatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
