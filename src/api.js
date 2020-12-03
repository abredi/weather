import BASE_URL from './constants';
import { clearContent, notification } from './util.dom';
import KEY from '../key';

const apiModule = () => {
  const handleError = (err) => {
    document.querySelector('body').appendChild(notification(`Error: ${err.statusText}`));
    setTimeout(() => {
      clearContent('[id="notify"', true);
    }, 2300);
  };

  const post = async (uri = '', data = {}) => {
    const response = await fetch(`${BASE_URL + uri}&appid=${KEY}`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    }).catch(handleError);

    if (response) {
      return response;
    }
    return false;
  };

  const get = async (uri) => {
    const req = await fetch(`${BASE_URL + uri}&appid=${KEY}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      }).catch(handleError);

    if (req) {
      return req;
    }
    return false;
  };

  return { post, get };
};

export default apiModule;