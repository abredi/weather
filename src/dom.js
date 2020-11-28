const greetingModule = () => {
  const createGreeting = (greet) => {
    const h1 = document.createElement('h1');
    h1.innerText = greet;
    return h1;
  };
  return {createGreeting}
}
export { greetingModule as default };
