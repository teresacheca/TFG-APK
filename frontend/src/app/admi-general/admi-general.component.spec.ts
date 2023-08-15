import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiGeneralComponent } from './admi-general.component';

describe('AdmiGeneralComponent', () => {
  let component: AdmiGeneralComponent;
  let fixture: ComponentFixture<AdmiGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmiGeneralComponent]
    });
    fixture = TestBed.createComponent(AdmiGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
