import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantListCards } from './restaurant-list-cards';

describe('RestaurantListCards', () => {
  let component: RestaurantListCards;
  let fixture: ComponentFixture<RestaurantListCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantListCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantListCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
