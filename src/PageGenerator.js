import keys from './keys';

function createButton(i) {
  return `<button class="key ${keys[i].code}">${keys[i].caseDown}</button>`;
}

export default class PageGenerator {
  #page;
  #mode;

  constructor() {
    this.#page = document.body;
    this.#mode = 'caseDown';
  }

  generate() {
    this.#page.innerHTML = `<main>
<h1>Virtual Keyboard</h1>
<textarea ></textarea>
<div class="keyboard"></div>
<p>Клавиатура создана в операционной системе Windows</p>
</main>`;
    const keyboard = this.#page.querySelector('.keyboard');
    keys.forEach((key, i) => {
      keyboard.insertAdjacentHTML('beforeend', createButton(i));
    });
  }

  render(mode) {
    const keyboard = this.#page.querySelector('.keyboard');
    if(keyboard && mode !== this.#mode) {
      this.#mode = mode;
      keyboard.childNodes.forEach((node, i) => {
        const theNode = node;
        theNode.textContent = keys[i][mode] ?? ;
      });
    }
  }
}
