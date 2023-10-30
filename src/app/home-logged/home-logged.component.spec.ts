import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLoggedComponent } from './home-logged.component';

describe('HomeLoggedComponent', () => {
  let component: HomeLoggedComponent;
  let fixture: ComponentFixture<HomeLoggedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeLoggedComponent]
    });
    fixture = TestBed.createComponent(HomeLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
