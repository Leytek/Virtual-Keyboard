import Keys from './Keys';

export default class Keyboard {
  #keyboard;
  #textarea;
  #capsLock;
  #mode;
  #lang;

  constructor() {
    this.#keyboard = document.querySelector('.keyboard');
    this.#textarea = document.querySelector('textarea');

    this.#mode = 'caseDown';
    this.#lang = localStorage.getItem('lang') ?? 'en';

    this.#generate();

    this.#keyboard.addEventListener('mousedown', (e) => this.#handleClick(e));
    this.#keyboard.addEventListener('mouseup', () => this.#textarea.focus());
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
    if(e.target.nodeName === 'BUTTON') {
      if(e.target.classList.contains('CapsLock') || e.target.className.includes('Shift')) {
        this.#capsLock = !this.#capsLock;
        e.target.classList.toggle('active');
        this.#renderKeys(e);
      } else this.#renderTextarea(e.target.classList[1]);
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
    if(document.activeElement === this.#textarea && e.code === 'Tab') {
      e.preventDefault();
      this.#renderTextarea(e.code);
    }
    this.#renderKeys(e);
    localStorage.setItem('lang', this.#lang);
  }

  #handleKeyUp(e) {
    this.#keyboard.childNodes.forEach((node) => node.classList.contains(e.code) && !(node.classList.contains('CapsLock') && this.#capsLock) && node.classList.remove('active'));
    this.#renderKeys(e);
  }

  #renderTextarea(code) {
    let char = '';
    let cursor = this.#textarea.selectionStart;
    let cursorEnd = this.#textarea.selectionEnd;
    if((code !== 'Backspace' && code !== 'Delete') || cursor !== cursorEnd) {
      if(code === 'Tab') {
        char = '\t';
      } else if(code === 'Enter') {
        char = '\n';
      } else if(code === 'Space') {
        char = ' ';
      } else if(code === 'ArrowLeft') {
        [cursor, cursorEnd] = [cursor - 1, cursor - 1];
      } else if(code === 'ArrowRight') {
        [cursor, cursorEnd] = [cursor + 1, cursor + 1];
      } else if(code === 'ArrowUp') {
        [cursor, cursorEnd] = [Math.max(cursor - 73, 0), Math.max(cursor - 73, 0)];
      } else if(code === 'ArrowDown') {
        [cursor, cursorEnd] = [cursor + 73, cursor + 73];
      } else if(code.match(/Control|Alt|Meta/g)) {
        return;
      } else {
        char = Keys.getKey(code, this.#mode, this.#lang);
      }
      this.#textarea.setRangeText(char, cursor, cursorEnd, 'end');
    } else if(code === 'Backspace' && cursor > 0) {
      this.#textarea.setRangeText('', cursor - 1, cursor, 'start');
    } else if(code === 'Delete') {
      this.#textarea.setRangeText('', cursor, cursor + 1);
    }
  }
}
