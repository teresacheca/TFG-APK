import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRealizaReservaRecursoComponent } from './usuario-realiza-reserva-recurso.component';

describe('UsuarioRealizaReservaRecursoComponent', () => {
  let component: UsuarioRealizaReservaRecursoComponent;
  let fixture: ComponentFixture<UsuarioRealizaReservaRecursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioRealizaReservaRecursoComponent]
    });
    fixture = TestBed.createComponent(UsuarioRealizaReservaRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
