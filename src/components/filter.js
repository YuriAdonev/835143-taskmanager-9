import {createElement} from "./utils";

export default class Filter {
  constructor(filters) {
    this._filters = filters;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<section class="main__filter filter container">
      ${Array.from(this._filters).map(({title, count}) => `
        <input
          type="radio"
          id="filter__${title.toLowerCase()}"
          class="filter__input visually-hidden"
          name="filter"
          ${title.toLowerCase() === `all` ? `checked` : ``}
          ${count === 0 ? `disabled` : ``}
        />
        <label for="filter__${title.toLowerCase()}" class="filter__label">
          ${title}<span class="filter__${title.toLowerCase()}-count">${count}</span></label
        >`).join(``)}
      </section>
    `;
  }
}
