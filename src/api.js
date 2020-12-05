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
    const resp = await fetch(`${BASE_URL + uri}&appid=${KEY}`, {
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
    }).catch(handleError);

    if (resp) {
      return resp.json();
    }
    return false;
  };

  const get = async (uri) => {
    const resp = await fetch(`${BASE_URL + uri}&appid=${KEY}`)
      .catch(handleError);

    if (resp) {
      return resp.json();
    }
    return false;
  };

  return { post, get };
};

export default apiModule;