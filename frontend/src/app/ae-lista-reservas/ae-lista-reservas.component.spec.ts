import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeListaReservasComponent } from './ae-lista-reservas.component';

describe('AeListaReservasComponent', () => {
  let component: AeListaReservasComponent;
  let fixture: ComponentFixture<AeListaReservasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeListaReservasComponent]
    });
    fixture = TestBed.createComponent(AeListaReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
