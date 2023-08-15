import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiEmpresaComponent } from './admi-empresa.component';

describe('AdmiEmpresaComponent', () => {
  let component: AdmiEmpresaComponent;
  let fixture: ComponentFixture<AdmiEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmiEmpresaComponent]
    });
    fixture = TestBed.createComponent(AdmiEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
