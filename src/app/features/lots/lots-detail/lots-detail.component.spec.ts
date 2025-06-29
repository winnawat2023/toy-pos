import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotsDetailComponent } from './lots-detail.component';

describe('LotsDetailComponent', () => {
  let component: LotsDetailComponent;
  let fixture: ComponentFixture<LotsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
