import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureDetail } from './picture-detail';

describe('PictureDetail', () => {
  let component: PictureDetail;
  let fixture: ComponentFixture<PictureDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictureDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
