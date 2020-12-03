const clearContent = (selector = '', parent = false) => {
  let content = selector === '' ?
    document.getElementById('content') :
    document.querySelector(selector);
    if (parent) {
      content = content.parentElement;
    }

    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }
};

const createElem = (elemName, classes = [], attrs = '', eventListner = null) => {
  const elem = document.createElement(elemName);
  if (classes.length > 0) {
    elem.classList.add(...classes);
  }

  if (attrs !== '') {
    if (typeof attrs === 'string') {
      attrs = { id: attrs };
    }

    Object.entries(attrs).forEach(a => {
      elem.setAttribute(a[0], a[1]);
    });
  }
  if (eventListner) {
    elem.addEventListener('click', eventListner);
  }
  return elem;
};

const notification = (msg, status = false) => {
  const area = createElem('div', [])
  const notify = createElem('div', ['flex', 'justify-center', 'absolute', 'bottom-0', 'right-0', 'mb-4'], {id: 'notify'});
  const body = createElem('div', ['w-full', 'px-6', 'py-3', 'shadow-2xl', 'flex', 'flex-col', 'items-center',
    'border-t', 'sm:w-auto', 'sm:m-4', 'sm:rounded-lg', 'sm:flex-row',
    'sm:border', 'text-white', `bg-${status ? 'blue-600' : 'red-600'}`, `border-${status ? 'blue-600' : 'red-600'}`]);
  const actions = createElem('div', ['flex', 'mt-2', 'sm:mt-0', 'sm:ml-4']);
  const refresh = createElem('button', ['px-3', 'py-2', `hover:bg-${status ? 'blue-700' : 'red-700'}`, 'transition', 'ease-in-out', 'duration-300'], { type: 'button' });
  const cancel = createElem('button', ['px-3', 'py-2', `hover:bg-${status ? 'blue-700' : 'red-700'}`, 'transition', 'ease-in-out', 'duration-300'], { type: 'button' });
  refresh.innerText = 'Refresh';
  refresh.innerText = 'Dismiss';
  const text = createElem('p');
  text.innerText = msg;
  actions.appendChild(refresh);
  actions.appendChild(cancel);
  body.appendChild(text);
  body.appendChild(actions);
  notify.appendChild(body);
  area.appendChild(notify);
  return area;
}

export { clearContent, createElem, notification }

