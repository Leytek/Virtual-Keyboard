function createButton(s) {
  return `<button class="key">${s}</button>`;
}

export default class PageGenerator {
  #page;

  constructor() {
    this.#page = document.body;
  }

  generate() {
    this.#page.innerHTML = `<main>
<h1></h1>
<textarea></textarea>
<div class="keyboard"></div>
</main>`;
    const keys = document.querySelector('.keyboard');
    keys.innerHTML = createButton('d');
  }
}
