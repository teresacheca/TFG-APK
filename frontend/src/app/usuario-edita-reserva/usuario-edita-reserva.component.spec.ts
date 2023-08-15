import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEditaReservaComponent } from './usuario-edita-reserva.component';

describe('UsuarioEditaReservaComponent', () => {
  let component: UsuarioEditaReservaComponent;
  let fixture: ComponentFixture<UsuarioEditaReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioEditaReservaComponent]
    });
    fixture = TestBed.createComponent(UsuarioEditaReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
