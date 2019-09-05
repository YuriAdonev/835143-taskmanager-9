import AbstractComponent from "./abstract";

export default class Board extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<section class="board container"></section>`;
  }
}
