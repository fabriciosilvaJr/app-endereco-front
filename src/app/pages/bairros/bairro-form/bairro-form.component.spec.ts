import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BairroFormComponent } from './bairro-form.component';

describe('BairroFormComponent', () => {
  let component: BairroFormComponent;
  let fixture: ComponentFixture<BairroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BairroFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BairroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
