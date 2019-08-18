export const createFilterTemplate = (filters) => {
  return `
    <section class="main__filter filter container">
      ${Array.from(filters).map((filter) => `
        <input
          type="radio"
          id="filter__${filter.title.toLowerCase()}"
          class="filter__input visually-hidden"
          name="filter"
          ${filter.title.toLowerCase() === `all` ? `checked` : ``}
          ${filter.count === 0 ? `disabled` : ``}
        />
        <label for="filter__${filter.title.toLowerCase()}" class="filter__label">
          ${filter.title}<span class="filter__${filter.title.toLowerCase()}-count">${filter.count}</span></label
        >`).join(``)}
    </section>
  `;
};
