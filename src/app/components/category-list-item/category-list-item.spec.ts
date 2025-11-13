import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListItem } from './category-list-item';

describe('CategoryListItem', () => {
  let component: CategoryListItem;
  let fixture: ComponentFixture<CategoryListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
