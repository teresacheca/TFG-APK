import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeAniadeRecursoComponent } from './ae-aniade-recurso.component';

describe('AeAniadeRecursoComponent', () => {
  let component: AeAniadeRecursoComponent;
  let fixture: ComponentFixture<AeAniadeRecursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeAniadeRecursoComponent]
    });
    fixture = TestBed.createComponent(AeAniadeRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
