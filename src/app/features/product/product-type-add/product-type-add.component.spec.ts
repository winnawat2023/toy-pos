import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeAddComponent } from './product-type-add.component';

describe('ProductTypeAddComponent', () => {
  let component: ProductTypeAddComponent;
  let fixture: ComponentFixture<ProductTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTypeAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
