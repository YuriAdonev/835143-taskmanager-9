import AbstractComponent from "./abstract";

export default class Search extends AbstractComponent {
  constructor() {
    super();
    this._element = null;
  }

  getTemplate() {
    return `<section class="main__search search container">
        <input
          type="text"
          id="search__input"
          class="search__input"
          placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE"
        />
        <label class="visually-hidden" for="search__input">Search</label>
      </section>
    `;
  }
}
