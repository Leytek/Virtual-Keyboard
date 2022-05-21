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
  }
}
