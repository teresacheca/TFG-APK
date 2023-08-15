import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeDatosRecursoComponent } from './ae-datos-recurso.component';

describe('AeDatosRecursoComponent', () => {
  let component: AeDatosRecursoComponent;
  let fixture: ComponentFixture<AeDatosRecursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeDatosRecursoComponent]
    });
    fixture = TestBed.createComponent(AeDatosRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
