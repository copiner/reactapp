/*
corejs demo
use it without global namespace pollution
*/
import from from 'core-js-pure/features/array/from';
import flat from 'core-js-pure/features/array/flat';
import Set from 'core-js-pure/features/set';
import Promise from 'core-js-pure/features/promise';

console.log( from(new Set([1, 2, 3, 2, 1])) );
             // => [1, 2, 3]
console.log( flat([1, [2, 3], [4, [5]]], 2) );                // => [1, 2, 3, 4, 5]
Promise.resolve(32).then(x => console.log(x)); // => 32
