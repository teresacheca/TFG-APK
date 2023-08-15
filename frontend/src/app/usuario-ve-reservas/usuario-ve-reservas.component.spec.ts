import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioVeReservasComponent } from './usuario-ve-reservas.component';

describe('UsuarioVeReservasComponent', () => {
  let component: UsuarioVeReservasComponent;
  let fixture: ComponentFixture<UsuarioVeReservasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioVeReservasComponent]
    });
    fixture = TestBed.createComponent(UsuarioVeReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
