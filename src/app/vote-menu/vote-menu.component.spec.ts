import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteMenuComponent } from './vote-menu.component';

describe('VoteMenuComponent', () => {
  let component: VoteMenuComponent;
  let fixture: ComponentFixture<VoteMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoteMenuComponent]
    });
    fixture = TestBed.createComponent(VoteMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
