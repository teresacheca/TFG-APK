import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRealizaReservaComponent } from './usuario-realiza-reserva.component';

describe('UsuarioRealizaReservaComponent', () => {
  let component: UsuarioRealizaReservaComponent;
  let fixture: ComponentFixture<UsuarioRealizaReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioRealizaReservaComponent]
    });
    fixture = TestBed.createComponent(UsuarioRealizaReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
