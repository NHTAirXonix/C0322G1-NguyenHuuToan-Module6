import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PigstyEditComponent } from './pigsty-edit.component';

describe('PigstyEditComponent', () => {
  let component: PigstyEditComponent;
  let fixture: ComponentFixture<PigstyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PigstyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PigstyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
