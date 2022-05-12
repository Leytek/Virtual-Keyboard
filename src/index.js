import PageGenerator from './PageGenerator';
import Keyboard from './Keyboard';

import 'normalize.scss/normalize.scss';
import './style/style.sass';

class App {
  #gen;
  #key;

  constructor() {
    this.#gen = new PageGenerator();
  }

  run() {
    this.#gen.generate();
    this.#key = new Keyboard(this.#gen.render.bind(this.#gen));
  }
}

const app = new App();
app.run();
