import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeEditaPerfilComponent } from './ae-edita-perfil.component';

describe('AeEditaPerfilComponent', () => {
  let component: AeEditaPerfilComponent;
  let fixture: ComponentFixture<AeEditaPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeEditaPerfilComponent]
    });
    fixture = TestBed.createComponent(AeEditaPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
