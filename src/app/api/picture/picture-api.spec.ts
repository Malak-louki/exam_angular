import { TestBed } from '@angular/core/testing';

import { PictureApi } from './picture-api';

describe('PictureApi', () => {
  let service: PictureApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PictureApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
