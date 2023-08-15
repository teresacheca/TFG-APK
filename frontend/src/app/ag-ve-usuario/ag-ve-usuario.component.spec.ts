import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgVeUsuarioComponent } from './ag-ve-usuario.component';

describe('AgVeUsuarioComponent', () => {
  let component: AgVeUsuarioComponent;
  let fixture: ComponentFixture<AgVeUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgVeUsuarioComponent]
    });
    fixture = TestBed.createComponent(AgVeUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
