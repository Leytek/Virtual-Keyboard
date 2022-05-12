export default class Keyboard {
  #keyboard;
  #textarea;
  #render;

  constructor(render) {
    this.#keyboard = document.querySelector('.keyboard');
    this.#textarea = document.querySelector('textarea');
    this.#render = render;

    this.#keyboard.addEventListener('mousedown', (e) => this.#handleClick(e));
    document.addEventListener('keydown', (e) => this.#handleKeyDown(e));
    document.addEventListener('keyup', (e) => this.#handleKeyUp(e));
  }

  #renderKeys(e) {
    if((e.getModifierState('CapsLock') && !e.getModifierState('Shift')) || (!e.getModifierState('CapsLock') && e.getModifierState('Shift'))) {
      this.#render('caseUp');
    } else {
      this.#render('caseDown');
    }
  }

  #handleClick(e) {
    if(e.target.nodeName === 'BUTTON') {
      this.#renderTextarea(e.target.innerText);
    }
  }

  #handleKeyDown(e) {
    e.preventDefault();
    this.#keyboard.childNodes.forEach((node) => node.classList.contains(e.code) && node.classList.add('active'));
    this.#renderKeys(e);
    this.#renderTextarea(e.key);
    console.log(e.key, e.code);
  }

  #handleKeyUp(e) {
    e.preventDefault();
    this.#keyboard.childNodes.forEach((node) => node.classList.contains(e.code) && node.classList.remove('active'));
    this.#renderKeys(e);
  }

  #renderTextarea(key) {
    if(key.length === 1 && key !== '←') {
      this.#textarea.textContent += key;
    }
  }
}
