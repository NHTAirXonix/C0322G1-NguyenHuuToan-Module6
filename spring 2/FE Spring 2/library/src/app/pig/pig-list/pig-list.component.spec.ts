import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PigListComponent } from './pig-list.component';

describe('PigListComponent', () => {
  let component: PigListComponent;
  let fixture: ComponentFixture<PigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PigListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
