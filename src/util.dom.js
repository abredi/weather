const clearContent = () => {
  const content = document.getElementById('content');
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

export { clearContent, createElem }

