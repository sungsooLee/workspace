import axios from 'axios';
import wrapPromise from './wrapPromise';

function fetchData(url: string) {
  const promise = new Promise((resolve, reject) => {
    // setTimeout(() => {
      axios.get(url).then((res) => resolve(res.data));
    // }, 1000);
  });

  return wrapPromise(promise);
}

export default fetchData;
