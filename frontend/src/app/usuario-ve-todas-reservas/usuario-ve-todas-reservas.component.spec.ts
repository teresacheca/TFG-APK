import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioVeTodasReservasComponent } from './usuario-ve-todas-reservas.component';

describe('UsuarioVeTodasReservasComponent', () => {
  let component: UsuarioVeTodasReservasComponent;
  let fixture: ComponentFixture<UsuarioVeTodasReservasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioVeTodasReservasComponent]
    });
    fixture = TestBed.createComponent(UsuarioVeTodasReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
