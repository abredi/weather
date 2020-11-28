import './css/vendor/tailwind.vendor.css';
import './css/style.css';
import greetingModule from "./dom";

const init = () => {
  const gm = greetingModule();
  const mainContent = document.getElementById('content');
  mainContent.classList.add(...['flex', 'justify-center'])
  mainContent.appendChild(gm.createGreeting('Hello World'));
};

init();
