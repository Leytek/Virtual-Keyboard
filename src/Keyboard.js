import keys, { rusKeys } from './keys';

export default class Keyboard {
  #keyboard;
  #textarea;
  #capsLock;
  #mode;
  #lang;

  constructor() {
    this.#keyboard = document.querySelector('.keyboard');
    this.#textarea = document.querySelector('textarea');

    this.#lang = localStorage.getItem('lang') ?? 'en';

    this.#render('caseDown');

    this.#keyboard.addEventListener('mousedown', (e) => this.#handleClick(e));
    this.#keyboard.addEventListener('mouseup', () => this.#textarea.focus());
    document.addEventListener('keydown', (e) => this.#handleKeyDown(e));
    document.addEventListener('keyup', (e) => this.#handleKeyUp(e));
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
      if(e.target.classList.contains('CapsLock') || e.target.className.includes('Shift')) {
        this.#capsLock = !this.#capsLock;
        e.target.classList.toggle('active');
        this.#renderKeys(e);
      } else this.#renderTextarea(e.target.innerText);
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
      this.#renderTextarea(e.key);
    }
    this.#renderKeys(e);
    localStorage.setItem('lang', this.#lang);
  }

  #handleKeyUp(e) {
    this.#keyboard.childNodes.forEach((node) => node.classList.contains(e.code) && !(node.classList.contains('CapsLock') && this.#capsLock) && node.classList.remove('active'));
    this.#renderKeys(e);
  }

  #renderTextarea(key) {
    let val = this.#textarea.value;
    let cursor = this.#textarea.selectionStart;
    const cursorEnd = this.#textarea.selectionEnd;
    if(key.length === 1 && key !== '←') {
      val = `${val.slice(0, cursor)}${key}${val.slice(cursorEnd)}`;
      cursor += 1;
    } else if((key === '←' || key === 'Backspace') && cursor > 0) {
      val = val.slice(0, cursor - 1) + val.slice(cursorEnd);
      cursor -= 1;
    } else if(key === 'Delete') {
      val = val.slice(0, cursor) + val.slice(cursorEnd + 1);
    } else if(key === 'Tab') {
      val = `${val.slice(0, cursor)}\t${val.slice(cursorEnd)}`;
      cursor += 1;
    } else if(key === 'Enter') {
      val = `${val.slice(0, cursor)}\n${val.slice(cursorEnd)}`;
      cursor += 1;
    } else if(key === 'Space') {
      val = `${val.slice(0, cursor)} ${val.slice(cursorEnd)}`;
      cursor += 1;
    } else if(key === 'ArrowLeft') {
      cursor += 1;
    }
    this.#textarea.value = val;
    this.#textarea.setSelectionRange(cursor, cursor);
  }
}
