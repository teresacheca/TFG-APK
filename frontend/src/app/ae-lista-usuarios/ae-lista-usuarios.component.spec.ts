import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeListaUsuariosComponent } from './ae-lista-usuarios.component';

describe('AeListaUsuariosComponent', () => {
  let component: AeListaUsuariosComponent;
  let fixture: ComponentFixture<AeListaUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeListaUsuariosComponent]
    });
    fixture = TestBed.createComponent(AeListaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
