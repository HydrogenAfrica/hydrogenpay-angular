import { TestBed } from '@angular/core/testing';

import { HydrogenService} from './hydrogen-service';

describe('HydrogenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HydrogenService = TestBed.get(HydrogenService);
    expect(service).toBeTruthy();
  });
});
