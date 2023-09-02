import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturezaAddComponent } from './natureza-add.component';

describe('NaturezaAddComponent', () => {
  let component: NaturezaAddComponent;
  let fixture: ComponentFixture<NaturezaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaturezaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaturezaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
