import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeEditaReservaComponent } from './ae-edita-reserva.component';

describe('AeEditaReservaComponent', () => {
  let component: AeEditaReservaComponent;
  let fixture: ComponentFixture<AeEditaReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeEditaReservaComponent]
    });
    fixture = TestBed.createComponent(AeEditaReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
