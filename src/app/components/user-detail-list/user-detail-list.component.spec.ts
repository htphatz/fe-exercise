import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailListComponent } from './user-detail.component';

describe('UserDetailComponent', () => {
  let component: UserDetailListComponent;
  let fixture: ComponentFixture<UserDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
