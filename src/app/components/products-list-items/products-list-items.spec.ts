import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListItems } from './products-list-items';

describe('ProductsListItems', () => {
  let component: ProductsListItems;
  let fixture: ComponentFixture<ProductsListItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsListItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsListItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
