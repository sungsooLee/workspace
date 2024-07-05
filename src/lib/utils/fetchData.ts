import axios from 'axios';
import wrapPromise from './wrapPromise';

function fetchData(url: string) {
  const promise = new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => resolve(res.data))
      .catch(reject);
  });

  return wrapPromise(promise);
}

export default fetchData;
