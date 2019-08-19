export const createFilterTemplate = (filters) => {
  return `
    <section class="main__filter filter container">
      ${Array.from(filters).map(({title, count}) => `
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
};
