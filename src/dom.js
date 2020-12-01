import format from 'date-fns/format';
import { createElem } from "./util.dom";
import apiModule from "./api";
const weatherUIModule = () => {
  const api = apiModule();
  const getWithSup = (temp) => {
    const span = createElem('span');
    const sup = createElem('sup');
    sup.innerText = 'o';
    /**
     * @todo
     * get selected unit from the local storage
     */
    const celcius = temp - 273.15;
    span.innerHTML = `${Math.floor(celcius)}<sup>o</sup>C`;
    return span;
  };

  const getTemp = (temp) => {
    const span = createElem('span', ['font-bold', 'text-lg', 'text-gray-600']);
    const sup = createElem('sup', []);
    /**
     * @todo
     * get selected unit from the local storage
     */
    span.innerText = temp;
    span.appendChild(sup);
    return span;
  };

  const createCardTop = (content = { icon: 'icon.svg', city: 'Amesterdam', temp: 0, temp_min: 0, date: Date.now(), temp_max: 0, main: 'Clear Sky', visibility: 0, windDeg: 0, windSpeed: 0, humidity: 0 }) => {
    const card = createElem('div', ['col-span-12', 'bg-white', 'pb-2', 'sm:col-span-6', 'md:col-span-4', 'lg:col-span-3']);
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
      { name: 'Visibility', val: content.visibility },
      { name: 'Humidity', val: content.humidity },
      { name: 'Wind', val: `${content.windDeg} / ${content.windSpeed}` }
    ].forEach(item => {
      const cardTopFooterContent = createElem('div', ['flex', 'flex-col', 'items-center']);
      const cardTopFooterContentTitle = createElem('div', ['font-medium', 'text-sm']);
      const cardTopFooterContentValue = createElem('div', ['flex', 'text-sm', 'text-gray-500']);
      cardTopFooterContentTitle.innerText = item.name;
      cardTopFooterContentTitle.innerText = item.val;
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
    cardTopContainer.appendChild(cardTop);
    card.appendChild(cardTopContainer);
    return card;
  };

  const createCard = (content = { icon: 'icon.svg', city: 'Amesterdam', temp: 23, temp_min: 0, temp_max: 0, desc: 'Clear Sky' }) => {
    const card = createElem('div', ['col-span-12', 'bg-white', 'pb-2', 'sm:col-span-6', 'md:col-span-4', 'lg:col-span-3']);
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

    card.appendChild(cityImg);
    cardIconWrapper.appendChild(cardIcon)
    cardTitle.appendChild(city);
    cardTitle.appendChild(temp);
    cardHeader.appendChild(cardIconWrapper);
    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(headerSideDesc);
    card.appendChild(cityImg);
    card.appendChild(cardHeader);
    /**
     * @todo card footer
     */
    return card;
  };

  const displayMultipleCity = () => {
    const content = document.getElementById('content')
    const weatherData = api.getJson();

    weatherData.list.forEach(data => {
      content.appendChild(createCardTop({
        city: data.name,
        date: data.dt,
        visibility: data.visibility,
        windDeg: data.wind.deg,
        windSpeed: data.wind.deg,
        temp: data.main.temp,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        main: data.weather[0].main,
        icon: data.weather[0].icon
      }));
    });

  };

  return { createCard, displayMultipleCity }
}

export { weatherUIModule as default };
