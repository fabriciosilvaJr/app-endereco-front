import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UfListComponent } from './uf-list.component';

describe('UfListComponent', () => {
  let component: UfListComponent;
  let fixture: ComponentFixture<UfListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UfListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UfListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
