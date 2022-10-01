import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PigstyCreateComponent } from './pigsty-create.component';

describe('PigstyCreateComponent', () => {
  let component: PigstyCreateComponent;
  let fixture: ComponentFixture<PigstyCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PigstyCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PigstyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
