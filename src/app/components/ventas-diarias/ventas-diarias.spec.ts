import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasDiarias } from './ventas-diarias';

describe('VentasDiarias', () => {
  let component: VentasDiarias;
  let fixture: ComponentFixture<VentasDiarias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasDiarias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasDiarias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
