import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgAniadeAdmiEmpresaComponent } from './ag-aniade-admi-empresa.component';

describe('AgAniadeAdmiEmpresaComponent', () => {
  let component: AgAniadeAdmiEmpresaComponent;
  let fixture: ComponentFixture<AgAniadeAdmiEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgAniadeAdmiEmpresaComponent]
    });
    fixture = TestBed.createComponent(AgAniadeAdmiEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
