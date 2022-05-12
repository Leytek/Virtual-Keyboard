import keys from './keys';

function createButton(i) {
  return `<button class="key ${keys[i].code}"></button>`;
}

export default class PageGenerator {
  #page;

  constructor() {
    this.#page = document.body;
  }

  generate() {
    this.#page.innerHTML = `<main>
<h1>Virtual Keyboard</h1>
<textarea rows="8" cols="30"></textarea>
<div class="keyboard"></div>
<p>Клавиатура создана в операционной системе Windows</p>
<p>Для переключения языка комбинация: ctrl + alt</p>
</main>`;
    const keyboard = this.#page.querySelector('.keyboard');
    keys.forEach((key, i) => {
      keyboard.insertAdjacentHTML('beforeend', createButton(i));
    });
  }
}
