import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListManager } from './category-list-manager';

describe('CategoryListManager', () => {
  let component: CategoryListManager;
  let fixture: ComponentFixture<CategoryListManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryListManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryListManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
