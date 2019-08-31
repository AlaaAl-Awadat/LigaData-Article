import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationsGuard } from './authentications.guard';

describe('AuthenticationsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthenticationsGuard]
    });
  });

  it('should ...', inject([AuthenticationsGuard], (guard: AuthenticationsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
