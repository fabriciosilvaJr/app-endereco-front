import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UfFormComponent } from './uf-form.component';

describe('UfFormComponent', () => {
  let component: UfFormComponent;
  let fixture: ComponentFixture<UfFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UfFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UfFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
