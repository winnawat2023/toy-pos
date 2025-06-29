import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotsAddComponent } from './lots-add.component';

describe('LotsAddComponent', () => {
  let component: LotsAddComponent;
  let fixture: ComponentFixture<LotsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
