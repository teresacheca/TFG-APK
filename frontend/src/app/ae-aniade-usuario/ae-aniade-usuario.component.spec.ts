import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeAniadeUsuarioComponent } from './ae-aniade-usuario.component';

describe('AeAniadeUsuarioComponent', () => {
  let component: AeAniadeUsuarioComponent;
  let fixture: ComponentFixture<AeAniadeUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeAniadeUsuarioComponent]
    });
    fixture = TestBed.createComponent(AeAniadeUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
