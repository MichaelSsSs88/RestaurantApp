import { TestBed } from '@angular/core/testing';

import { ShoppingService } from './shopping.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShoppingService', () => {
  let service: ShoppingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShoppingService]
    });
    service = TestBed.inject(ShoppingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
