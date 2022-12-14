import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageListComponent } from './storage-list.component';

describe('StorageListComponent', () => {
  let component: StorageListComponent;
  let fixture: ComponentFixture<StorageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should employee-create', () => {
    expect(component).toBeTruthy();
  });
});
