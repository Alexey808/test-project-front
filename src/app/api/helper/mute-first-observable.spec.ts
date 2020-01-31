// // https://gist.github.com/oops-wrong/db1b3b481b471cd2117b052d7e171eb5
//
// import {muteFirst} from './mute-first-observable';
//
// describe('muteFirst', () => {
//   const first = 'first';
//   const second = 'second';
//   const third = 'third';
//
//   it('should return the second observable', () => {
//     const first$ = cold('-a', first);
//     const second$ = cold('-b', second);
//
//     expect(muteFirst(first$, second$)).toBeObservable(second$);
//   });
//
//   it('should subscribe the both observables', () => {
//     const first$ = cold('-a', first);
//     const second$ = cold('-b', second);
//
//     muteFirst(first$, second$).subscribe();
//
//     expect(first$.getSubscriptions().length).toBe(1);
//     expect(second$.getSubscriptions().length).toBe(1);
//   });
//
//   it('should not return the second value until the second changed', () => {
//     const first$ = cold('-a', first);
//     const second$ = cold('-b-c-d', { b: second, c: second, d: third });
//     const expected$ = cold('-b---d', { b: second, d: third });
//
//     muteFirst(first$, second$).subscribe();
//
//     expect(muteFirst(first$, second$)).toBeObservable(expected$);
//   });
// });
