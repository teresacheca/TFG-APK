import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEditaPerfilComponent } from './usuario-edita-perfil.component';

describe('UsuarioEditaPerfilComponent', () => {
  let component: UsuarioEditaPerfilComponent;
  let fixture: ComponentFixture<UsuarioEditaPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioEditaPerfilComponent]
    });
    fixture = TestBed.createComponent(UsuarioEditaPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
