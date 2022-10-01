import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PigUpdateComponent } from './pig-update.component';

describe('PigUpdateComponent', () => {
  let component: PigUpdateComponent;
  let fixture: ComponentFixture<PigUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PigUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PigUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
