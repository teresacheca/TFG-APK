import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeEditaUsuarioComponent } from './ae-edita-usuario.component';

describe('AeEditaUsuarioComponent', () => {
  let component: AeEditaUsuarioComponent;
  let fixture: ComponentFixture<AeEditaUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeEditaUsuarioComponent]
    });
    fixture = TestBed.createComponent(AeEditaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
