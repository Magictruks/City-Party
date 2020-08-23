import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPromoterComponent } from './dialog-promoter.component';

describe('DialogPromoterComponent', () => {
  let component: DialogPromoterComponent;
  let fixture: ComponentFixture<DialogPromoterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPromoterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
