import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PigstyListComponent } from './pigsty-list.component';

describe('ListPigstyComponent', () => {
  let component: PigstyListComponent;
  let fixture: ComponentFixture<PigstyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PigstyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PigstyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
