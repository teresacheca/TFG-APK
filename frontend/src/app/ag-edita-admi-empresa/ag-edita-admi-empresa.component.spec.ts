import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgEditaAdmiEmpresaComponent } from './ag-edita-admi-empresa.component';

describe('AgEditaAdmiEmpresaComponent', () => {
  let component: AgEditaAdmiEmpresaComponent;
  let fixture: ComponentFixture<AgEditaAdmiEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgEditaAdmiEmpresaComponent]
    });
    fixture = TestBed.createComponent(AgEditaAdmiEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
