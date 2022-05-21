import Keys from './Keys';

export default class Keyboard {
  #keyboard;
  #capsLock;
  #mode;
  #lang;

  constructor() {
    this.#keyboard = document.querySelector('.keyboard');
    this.#mode = 'caseDown';
    this.#lang = localStorage.getItem('lang') ?? 'en';

    this.#generate();

    this.#keyboard.addEventListener('mousedown', (e) => this.#handleClick(e));
    document.addEventListener('keydown', (e) => this.#handleKeyDown(e));
    document.addEventListener('keyup', (e) => this.#handleKeyUp(e));
  }

  #generate() {
    Keys.en.forEach((key) => {
      this.#keyboard.insertAdjacentHTML('beforeend', `<button class="key ${key.code}">${Keys.getKey(key.code, this.#mode, this.#lang)}</button>`);
    });
  }

  #renderKeys(e) {
    if((this.#capsLock && !e.getModifierState('Shift')) || (!this.#capsLock && e.getModifierState('Shift'))) {
      this.#render('caseUp');
    } else {
      this.#render('caseDown');
    }
  }

  #render(mode) {
    if(this.#keyboard && (mode !== this.#mode || localStorage.getItem('lang') !== this.#lang)) {
      this.#mode = mode;
      this.#keyboard.childNodes.forEach((node) => {
        node.textContent = Keys.getKey(node.classList[1], mode, this.#lang);
      });
    }
  }

  #handleClick(e) {
    e.preventDefault();
    if(e.target.nodeName === 'BUTTON') {
      if(e.target.classList.contains('CapsLock') || e.target.className.includes('Shift')) {
        this.#capsLock = !this.#capsLock;
        e.target.classList.toggle('active');
        this.#renderKeys(e);
      } else this.#renderText(e.target.classList[1]);
    }
  }

  #handleKeyDown(e) {
    if(e.getModifierState('Control') && e.getModifierState('Alt')) {
      if(this.#lang === 'en') {
        this.#lang = 'ru';
      } else {
        this.#lang = 'en';
      }
    }
    if(e.code === 'CapsLock') {
      this.#capsLock = e.getModifierState('CapsLock');
    }
    this.#keyboard.childNodes.forEach((node) => node.classList.contains(e.code) && node.classList.add('active'));
    if(document.activeElement.setRangeText && e.code === 'Tab') {
      e.preventDefault();
      this.#renderText(e.code);
    }
    this.#renderKeys(e);
    localStorage.setItem('lang', this.#lang);
  }

  #handleKeyUp(e) {
    this.#keyboard.childNodes.forEach((node) => node.classList.contains(e.code) && !(node.classList.contains('CapsLock') && this.#capsLock) && node.classList.remove('active'));
    this.#renderKeys(e);
  }

  #renderText(code) {
    if(!document.activeElement.setRangeText) return;
    let char = '';
    let cursor = document.activeElement.selectionStart;
    let cursorEnd = document.activeElement.selectionEnd;
    if(code === 'Tab') char = '\t';
    else if(code === 'Enter') char = '\n';
    else if(code === 'Space') char = ' ';
    else if(code === 'Backspace' && cursor === cursorEnd) cursor = Math.max(cursor - 1, 0);
    else if(code === 'Delete' && cursor === cursorEnd) cursorEnd = cursor + 1;
    else if(code === 'Backspace' || code === 'Delete');
    else if(code === 'ArrowLeft') [cursor, cursorEnd] = [cursor - 1, cursor - 1];
    else if(code === 'ArrowRight') [cursor, cursorEnd] = [cursor + 1, cursor + 1];
    else if(code === 'ArrowUp') [cursor, cursorEnd] = [Math.max(cursor - 73, 0), Math.max(cursor - 73, 0)];
    else if(code === 'ArrowDown') [cursor, cursorEnd] = [cursor + 73, cursor + 73];
    else if(code.match(/Control|Alt|Meta/g)) return;
    else char = Keys.getKey(code, this.#mode, this.#lang);
    document.activeElement.setRangeText(char, cursor, cursorEnd, 'end');
  }
}
