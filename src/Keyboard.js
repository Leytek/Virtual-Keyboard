import keys, { rusKeys } from './keys';

export default class Keyboard {
  #keyboard;
  #textarea;
  #mode;
  #lang;

  constructor() {
    this.#keyboard = document.querySelector('.keyboard');
    this.#textarea = document.querySelector('textarea');

    this.#lang = localStorage.getItem('lang') ?? 'en';

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
    if(this.#keyboard && (mode !== this.#mode || localStorage.getItem('lang') !== this.#lang)) {
      this.#mode = mode;
      this.#keyboard.childNodes.forEach((node, i) => {
        const theNode = node;
        if(this.#lang === 'en') {
          theNode.textContent = keys[i][mode] ?? keys[i].caseDown;
        } else {
          theNode.textContent = rusKeys[i][mode] ?? keys[i][mode] ?? keys[i].caseDown;
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
    if(e.getModifierState('Control') && e.getModifierState('Alt')) {
      if(this.#lang === 'en') {
        this.#lang = 'ru';
      } else {
        this.#lang = 'en';
      }
    }
    this.#keyboard.childNodes.forEach((node) => node.classList.contains(e.code) && node.classList.add('active'));
    this.#renderKeys(e);
    this.#renderTextarea(e.key);
    localStorage.setItem('lang', this.#lang);
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
