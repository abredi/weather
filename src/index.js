import './css/tailwind.css';
import './css/main.css';
import DATA from "./resource";



// window.document.getElementsByTagName('button')[0].addEventListener('click', fetchCities);

// function fetchCities(inp) {
//   console.log('successfully configured', inp);
//   fetch('../city.list.json').then(resp => {
//     console.log(resp);
//     console.log(inp);
//   });
// }  

(function () {
  window.filtered = [];
  const searchResult = document.querySelector('.search-result');
  
  fetch('city.json').then((resp) => {
    console.log('resp', resp);
  }, _ => {
    console.log('error', _);
  });

  const displayWeather = () => {
    console.log('li clicked');
  };

  window.globalSearch = (inp) => {
    // if (!inp || inp == '') {
    //   return;
    // }
    console.log('name', inp)
    /**
     * remove all children
     */
    for (const element of searchResult.children) {
      searchResult.removeChild(element);
    };

    window.filtered = DATA.forEach(item => {
      if (item.name.startsWith(inp.toUpperCase())) {
        const li = document.createElement('li');
        li.setAttribute('id', item.id);
        li.addEventListener('click', displayWeather);
        const liText = document.createTextNode(item.name);
        li.appendChild(liText);
        searchResult.appendChild(li);
      }
    });
  }
})();
