import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeVeReservaComponent } from './ae-ve-reserva.component';

describe('AeVeReservaComponent', () => {
  let component: AeVeReservaComponent;
  let fixture: ComponentFixture<AeVeReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeVeReservaComponent]
    });
    fixture = TestBed.createComponent(AeVeReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
