import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioInfoReservaComponent } from './usuario-info-reserva.component';

describe('UsuarioInfoReservaComponent', () => {
  let component: UsuarioInfoReservaComponent;
  let fixture: ComponentFixture<UsuarioInfoReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioInfoReservaComponent]
    });
    fixture = TestBed.createComponent(UsuarioInfoReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
