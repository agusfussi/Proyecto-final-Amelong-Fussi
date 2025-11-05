import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedHeader } from './logged-header';

describe('LoggedHeader', () => {
  let component: LoggedHeader;
  let fixture: ComponentFixture<LoggedHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
