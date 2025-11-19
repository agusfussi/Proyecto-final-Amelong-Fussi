import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListManager } from './products-list-manager';

describe('ProductsListManager', () => {
  let component: ProductsListManager;
  let fixture: ComponentFixture<ProductsListManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsListManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsListManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
