import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeListaRecursosComponent } from './ae-lista-recursos.component';

describe('AeListaRecursosComponent', () => {
  let component: AeListaRecursosComponent;
  let fixture: ComponentFixture<AeListaRecursosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeListaRecursosComponent]
    });
    fixture = TestBed.createComponent(AeListaRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
