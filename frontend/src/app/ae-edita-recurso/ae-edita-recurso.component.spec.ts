import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeEditaRecursoComponent } from './ae-edita-recurso.component';

describe('AeEditaRecursoComponent', () => {
  let component: AeEditaRecursoComponent;
  let fixture: ComponentFixture<AeEditaRecursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeEditaRecursoComponent]
    });
    fixture = TestBed.createComponent(AeEditaRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
