import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTopicsComponent } from './my-topics.component';

describe('ListComponent', () => {
  let component: MyTopicsComponent;
  let fixture: ComponentFixture<MyTopicsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyTopicsComponent]
    });
    fixture = TestBed.createComponent(MyTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
