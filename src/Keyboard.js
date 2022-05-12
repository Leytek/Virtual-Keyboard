export default class Keyboard {
  #keyboard;

  constructor() {
    this.#keyboard = document.querySelectorAll('.keyboard');

    this.#keyboard.addEventListener('click', (e) => this.#handleClick(e));
  }

  #handleClick(e) {
    if(e) {
      this.#keyboard.classList.toggle('caseUp');
    }
  }
}
