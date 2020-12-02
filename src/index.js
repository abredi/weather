import './css/vendor/tailwind.vendor.css';
import './css/style.scss';
import domModule from "./dom";

const init = () => {
  const dm = domModule();
  dm.displayMultipleCity();

  document.getElementById('unitToggle')
    .addEventListener('click', dm.unitToggler);
  
    document.getElementById('searchForm')
    .addEventListener('submit', dm.searchByCity);
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});

