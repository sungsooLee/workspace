import { fetchCodes } from '../entities/system';

export default (async function square(x) {
  await fetchCodes();

  return {
    test: 'a',
    gift: 'b',
  };
})(2);

//test;
/*
export default (function square(x) {
  return {
    test: 'a',
    gift: 'b',
  };
})(2);
*/
