// https://gist.github.com/oops-wrong/a9ba9a0382b8c271a52f08b4c5af155b
// https://habr.com/ru/post/448858/

import {combineLatest, Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';

export const muteFirst = <T, R>(first$: Observable<T>, second$: Observable<R>): Observable<R> => {
  return combineLatest(first$, second$).pipe(
    map(([a, b]: [T, R]): R => b),
    distinctUntilChanged(),
  );
};



