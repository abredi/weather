import format from 'date-fns/format';
import { clearContent, createElem } from "./util.dom";
import localModule from "./storage/local";
import apiModule from "./api";

const weatherUIModule = () => {
  const api = apiModule();
  const ls = localModule();

  const getWithSup = (kelvin) => {
    const span = createElem('span', [], { region: 'temp', data: kelvin });
    const sup = createElem('sup');
    sup.innerText = 'o';
    const status = ls.getStatus();
    const deg = status ? ((kelvin - 273.15) * 9 / 5 + 32) : (kelvin - 273.15);
    span.innerHTML = `${Math.floor(deg)}<sup>o</sup>${status ? 'F' : 'C'}`;
    return span;
  };

  const getTemp = (temp) => {
    const span = createElem('span', ['font-bold', 'text-lg', 'text-gray-600']);
    const sup = createElem('sup');
    /**
     * @todo
     * get selected unit from the local storage
     */
    // ls.getStatus();
    span.innerText = temp;
    span.appendChild(sup);
    return span;
  };

  const unitToggler = (event) => {
    ls.setStatus(event.target.checked || false);
    const elem = document.querySelectorAll('[region="temp"');
    elem.forEach(e => {
      const p = e.parentElement;
      while (p.firstChild) {
        p.removeChild(p.firstChild);
      }
      p.appendChild(getWithSup(e.getAttribute('data')))
    });
  };

  const createCardTop = (content = { id: 0, icon: 'icon.svg', city: 'Amesterdam', temp: 0, temp_min: 0, date: Date.now(), temp_max: 0, main: 'Clear Sky', visibility: 0, windDeg: 0, windSpeed: 0, humidity: 0 }, cls = []) => {
    const card = createElem('div', [...cls, 'col-span-12', 'bg-white', 'pb-2', 'sm:col-span-6', 'md:col-span-4', 'lg:col-span-3'], { data: content.id });
    const cardTopContainer = createElem('div', ['flex', 'items-center', 'justify-center']);
    const cardTop = createElem('div', ['flex', 'flex-col', 'bg-white', 'rounded', 'p-4', 'w-full', 'max-w-xs']);
    const cardTopTitle = createElem('div', ['font-bold', 'text-xl']);
    cardTopTitle.innerText = content.city;
    const cardTopSubTitle = createElem('div', ['text-sm', 'text-gray-500']);
    cardTopSubTitle.innerText = format(new Date(content.date * 1000), 'cccc dd MMMM yyyy');
    const cardTopImgWrapper = createElem('div', ['mt-6', 'text-6xl', 'self-center', 'inline-flex', 'items-center',
      'justify-center', 'rounded-lg', 'text-indigo-400', 'h-24', 'w-24']);
    const cardTopImg = createElem('i', ['w-32', 'h-32', `img-${content.icon}`]);
    const cardTopBody = createElem('div', ['flex', 'flex-row', 'items-center', 'justify-center', 'mt-6']);
    const cardTopBodyHeading = createElem('div', ['font-medium', 'text-6xl']);
    cardTopBodyHeading.appendChild(getWithSup(content.temp));
    const cardTopBodyContent = createElem('div', ['flex', 'flex-col', 'items-center', 'ml-6']);
    const cardTopBodyContentTitle = createElem('div', ['capitalize']);
    cardTopBodyContentTitle.innerText = content.main;
    const cardTopBodyContentTempUp = createElem('div', ['mt-1']);
    const cardTopBodyContentTempUpIcon = createElem('div', ['up-arrow', 'w-3', 'ml-1', 'h-full']);
    const cardTopBodyContentTempUpText = createElem('span', ['text-sm', 'font-light', 'text-gray-500']);
    cardTopBodyContentTempUpText.appendChild(getWithSup(content.temp_max));;
    cardTopBodyContentTempUp.appendChild(cardTopBodyContentTempUpIcon);
    cardTopBodyContentTempUp.appendChild(cardTopBodyContentTempUpText);
    const cardTopBodyContentTempDown = createElem('div', ['flex']);
    const cardTopBodyContentTempDownIconWrapper = createElem('div', ['text-sm']);
    const cardTopBodyContentTempDownText = createElem('span', ['text-sm', 'font-light', 'text-gray-500']);
    cardTopBodyContentTempDownText.appendChild(getWithSup(content.temp_min));
    cardTopBodyContentTempDown.appendChild(cardTopBodyContentTempDownIconWrapper);
    cardTopBodyContentTempDown.appendChild(cardTopBodyContentTempDownText);


    const cardTopFooter = createElem('div', ['flex', 'flex-row', 'justify-between', 'mt-6']);
    [
      { name: 'Humidity', val: `${content.humidity}%` },
      { name: 'Visibility', val: `${Math.floor(content.visibility / 1000)}km` },
      { name: 'Wind', val: `${content.windDeg} / ${(content.windSpeed).toFixed(2)}mph` }
    ].forEach(item => {
      const cardTopFooterContent = createElem('div', ['flex', 'flex-col', 'items-center']);
      const cardTopFooterContentTitle = createElem('div', ['font-medium', 'text-sm']);
      const cardTopFooterContentValue = createElem('div', ['flex', 'text-sm', 'text-gray-500']);
      cardTopFooterContentTitle.innerText = item.name;
      cardTopFooterContentValue.innerText = item.val;
      cardTopFooterContent.appendChild(cardTopFooterContentTitle);
      cardTopFooterContent.appendChild(cardTopFooterContentValue);
      cardTopFooter.appendChild(cardTopFooterContent);
    });

    cardTopImgWrapper.appendChild(cardTopImg);
    cardTop.appendChild(cardTopTitle);
    cardTop.appendChild(cardTopSubTitle);
    cardTop.appendChild(cardTopImgWrapper);
    cardTopBodyContent.appendChild(cardTopBodyContentTitle);
    cardTopBodyContent.appendChild(cardTopBodyContentTempUp);
    cardTopBodyContent.appendChild(cardTopBodyContentTempDown);
    cardTopBody.appendChild(cardTopBodyHeading);
    cardTopBody.appendChild(cardTopBodyContent);
    cardTop.appendChild(cardTopBody);
    cardTop.appendChild(cardTopFooter);
    cardTopContainer.appendChild(cardTop);
    card.appendChild(cardTopContainer);

    return card;
  };

  const createList = (content = { icon: 'icon.svg', city: 'Amesterdam', temp: 23, temp_min: 0, temp_max: 0, desc: 'Clear Sky' }) => {
    const list = createElem('div', ['col-span-12', 'bg-white', 'pb-2', 'sm:col-span-6', 'md:col-span-4', 'lg:col-span-3']);
    const cityImg = createElem('div', ['col-span-12', 'block', 'w-full', 'h-32', 'bg-img-lighter']);
    const cardHeader = createElem('div', ['flex', 'flex-row', 'shadow-sm', 'rounded', 'p-4']);
    const cardIconWrapper = createElem('div', ['flex', 'items-center', 'justify-center', 'flex-shrink-0', 'h-12', 'w-12', 'rounded-xl', 'bg-blue-100', 'text-blue-500']);
    const cardIcon = createElem('i', ['w-6', 'h-6', 'block', 'h-auto', 'w-full', `i-${content.icon}`]);
    const cardTitle = createElem('div', ['flex', 'flex-col', 'flex-grow', 'ml-4']);
    const city = createElem('div', ['text-sm', 'text-gray-500']);
    city.innerText = content.city;
    const temp = createElem('div');
    temp.appendChild(getTemp(content.temp));
    const headerSideDesc = createElem('div', ['text-sm', 'flex', 'items-center', 'text-blue-400']);
    headerSideDesc.innerText = content.desc;

    list.appendChild(cityImg);
    cardIconWrapper.appendChild(cardIcon)
    cardTitle.appendChild(city);
    cardTitle.appendChild(temp);
    cardHeader.appendChild(cardIconWrapper);
    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(headerSideDesc);
    list.appendChild(cityImg);
    list.appendChild(cardHeader);
    /**
     * @todo card footer
     */
    return list;
  };

  const displayCard = (data, cls = []) => {
    const content = document.getElementById('content');

    content.appendChild(createCardTop({
      id: data.id,
      city: data.name,
      date: data.dt,
      visibility: data.visibility,
      windDeg: data.wind.deg,
      windSpeed: data.wind.speed,
      temp: data.main.temp,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      main: data.weather[0].main,
      icon: data.weather[0].icon
    }, cls));
  };

  const displayMultipleCity = async () => {
    const weatherData = await api.get('group?id=344979,3606250,292224,292672,1705545');

    weatherData.list.forEach(data => {
      displayCard(data);
    });
  };

  const searchByCity = async (event) => {
    event.preventDefault();

    const query = document.getElementById('q');
    if (query && query.value !== '') {
      const weatherData = await api.get(`weather?q=${query.value}`);
      clearContent();
      displayCard(weatherData, ['sm:col-start-4', 'md:col-start-4', 'lg:col-start-5', 'lg:col-span-4', 'md:col-span-6']);
    }
  };

  return { createList, displayMultipleCity, searchByCity, unitToggler }
}

export { weatherUIModule as default };

