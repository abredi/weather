import { createElem, createCard } from "./util.dom";
const weatherUIModule = () => {
  const getTemp = (temp) => {
    const span = createElem('span', ['font-bold', 'text-lg', 'text-gray-600']);
    const sup = createElem('sup', ['']);
    /**
     * @todo
     * get selected unit from the local storage
     */
    span.innerText = temp;
    span.appendChild(sup);
    return span;
  };

  const createCard = (content = {icon: 'icon.svg', city: 'Amesterdam', temp: 23, desc: 'Clear Sky'}) => {
    const card = createElem('div', ['col-span-12', 'bg-white', 'pb-2', 'sm:col-span-6', 'md:col-span-4', 'lg:col-span-3']);
    const cityImg = createElem('div', ['col-span-12', 'block', ' w-full', 'h-32', 'bg-img-lighter']);
    const cardHeader = createElem('div', ['flex', 'flex-row', ' shadow-sm', 'rounded', 'p-4']);
    const cardIconWrapper = createElem('div', ['flex', 'items-center', 'justify-center', 'flex-shrink-0', 'h-12', 'w-12', 'rounded-xl', 'bg-blue-100', 'text-blue-500']);
    const cardIcon = createElem('img', ['w-6', 'h-6','block', 'h-auto', 'w-full'], {src: content.icon});
    const cardTitle = createElem('div', ['flex', 'flex-col', 'flex-grow', 'ml-4']);
    const city = createElem('div', ['text-sm text-gray-500']);
    city.innerText = content.city;
    const temp = createElem('div');
    temp.appendChild(getTemp(content.temp));
    const headerSideDesc = createElem('div', ['text-sm', 'flex', 'items-center', 'text-blue-400']);
    headerSideDesc.innerText = content.desc;

    card.appendChild(cityImg);
    cardIconWrapper.appendChild(cardIcon)
    cardTitle.appendChild(city);
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

  return { createCard }
}

export { weatherUIModule as default };
