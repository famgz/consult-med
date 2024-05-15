import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  setLoading(isLoading: boolean) {
    this.isLoading$.next(isLoading);
  }
}
