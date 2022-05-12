import keys, { rusKeys } from './keys';

export default class Keyboard {
  #keyboard;
  #textarea;
  #mode;

  constructor() {
    this.#keyboard = document.querySelector('.keyboard');
    this.#textarea = document.querySelector('textarea');

    this.#render('caseDown');

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

  #render(mode) {
    if(this.#keyboard && mode !== this.#mode) {
      this.#mode = mode;
      this.#keyboard.childNodes.forEach((node, i) => {
        const theNode = node;
        if(localStorage.getItem('lang') === 'ru') {
          theNode.textContent = rusKeys[i][mode] ?? keys[i].caseDown;
        } else {
          theNode.textContent = keys[i][mode] ?? keys[i].caseDown;
        }
      });
    }
  }

  #handleClick(e) {
    if(e.target.nodeName === 'BUTTON') {
      this.#renderTextarea(e.target.innerText);
    }
  }

  #handleKeyDown(e) {
    e.preventDefault();
    if(e.getModifierState('Shift') && e.getModifierState('Alt')) {
      if((localStorage.getItem('lang') ?? 'en') === 'en') {
        localStorage.setItem('lang', 'ru');
      } else {
        localStorage.setItem('lang', 'en');
      }
    }
    this.#keyboard.childNodes.forEach((node) => node.classList.contains(e.code) && node.classList.add('active'));
    this.#renderKeys(e);
    this.#renderTextarea(e.key);
  }

  #handleKeyUp(e) {
    e.preventDefault();
    this.#keyboard.childNodes.forEach((node) => node.classList.contains(e.code) && node.classList.remove('active'));
    this.#renderKeys(e);
  }

  #renderTextarea(key) {
    if(key.length === 1 && key !== '←' && key !== '▲' && key !== '◄' && key !== '▼' && key !== '►') {
      this.#textarea.textContent += key;
    }
  }
}
