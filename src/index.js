import './css/vendor/tailwind.vendor.css';
import './css/style.scss';
import domModule from "./dom";

const init = () => {
  const dm = domModule();
  dm.displayMultipleCity();
  // const mainContent = document.getElementById('content');
  // mainContent.classList.add(...['flex', 'justify-center'])
  // mainContent.appendChild(gm.createGreeting('Hello World'));
};

init();
