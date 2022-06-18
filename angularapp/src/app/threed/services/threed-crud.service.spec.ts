import { TestBed } from '@angular/core/testing';

import { ThreedCrudService } from './threed-crud.service';

describe('ThreedCrudService', () => {
  let service: ThreedCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreedCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
