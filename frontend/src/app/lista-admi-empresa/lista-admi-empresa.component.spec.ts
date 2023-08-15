import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAdmiEmpresaComponent } from './lista-admi-empresa.component';

describe('ListaAdmiEmpresaComponent', () => {
  let component: ListaAdmiEmpresaComponent;
  let fixture: ComponentFixture<ListaAdmiEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaAdmiEmpresaComponent]
    });
    fixture = TestBed.createComponent(ListaAdmiEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
