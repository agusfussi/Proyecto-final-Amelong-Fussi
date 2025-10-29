import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarManager } from './bar-manager';

describe('BarManager', () => {
  let component: BarManager;
  let fixture: ComponentFixture<BarManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
