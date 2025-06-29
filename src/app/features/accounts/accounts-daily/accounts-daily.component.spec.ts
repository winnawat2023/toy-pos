import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsDailyComponent } from './accounts-daily.component';

describe('AccountsDailyComponent', () => {
  let component: AccountsDailyComponent;
  let fixture: ComponentFixture<AccountsDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsDailyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
