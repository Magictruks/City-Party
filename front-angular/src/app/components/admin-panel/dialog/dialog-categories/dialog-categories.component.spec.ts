import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCategoriesComponent } from './dialog-categories.component';

describe('DialogCategoriesComponent', () => {
  let component: DialogCategoriesComponent;
  let fixture: ComponentFixture<DialogCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
