import { TestBed } from '@angular/core/testing';

import { AutomovelService } from './automovel.service';

describe('AutomovelService', () => {
  let service: AutomovelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutomovelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
