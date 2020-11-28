const KEY = '';
export default KEY;

// import './css/tailwind.css';
// import './css/main.css';
// import DATA from "./resource";

// import KEY from "../key";

// (function () {
//   window.filtered = [];
//   const searchResult = document.querySelector('.search-result');

//   fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily,minutely&appid=${KEY}`)
// ;

//   fetch('city.json').then((resp) => {
//     console.log('resp', resp);
//   }, _ => {
//     console.log('error', _);
//   });

//   const displayWeather = () => {
//     console.log('li clicked');
//   };

//   const globalSearch = (inp) => {
//     if (inp && inp !== '') {
//       return;
//     }

//     /**
//      * remove all children
//      */
//     for (const element of searchResult.children) {
//       searchResult.removeChild(element);
//     };

//     window.filtered = DATA.forEach(item => {
//       if (item.name.startsWith(inp.toUpperCase())) {
//         const li = document.createElement('li');
//         li.setAttribute('id', item.id);
//         li.addEventListener('click', displayWeather);
//         const liText = document.createTextNode(item.name);
//         li.appendChild(liText);
//         searchResult.appendChild(li);
//       }
//     });
//   }
// })();


// window.document.getElementsByTagName('button')[0].addEventListener('click', fetchCities);

// function fetchCities(inp) {
//   console.log('successfully configured', inp);
//   fetch('../city.list.json').then(resp => {
//     console.log(resp);
//     console.log(inp);    
//   });
// }

