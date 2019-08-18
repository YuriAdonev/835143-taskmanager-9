const MAX_TAGS = 3;
const COUNT_TASKS = 17;

export const tasks = [];
export const filters = [];

const tags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
];

const filtersTitle = [
  `All`,
  `Overdue`,
  `Today`,
  `Favorites`,
  `Repeating`,
  `Tags`,
  `Archive`,
];

const getTags = () => {
  const newTags = new Set([]);

  for (let i = 0; i < Math.floor(Math.random() * (MAX_TAGS + 1)); i++) {
    newTags.add(tags[Math.floor(Math.random() * tags.length)]);
  }

  return newTags;
};

const getFilterCount = (title) => {
  let filteredTasks = [];
  switch (title) {
    case `All`:
      filteredTasks = tasks.slice();
      break;
    case `Overdue`:
      filteredTasks = tasks.filter((task) => task.dueDate < Date.now());
      break;
    case `Today`:
      filteredTasks = tasks.filter((task) => new Date(task.dueDate).toLocaleDateString() === new Date().toLocaleDateString());
      break;
    case `Favorites`:
      filteredTasks = tasks.filter((task) => task.isFavorite);
      break;
    case `Repeating`:
      filteredTasks = tasks.filter((task) => Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day]));
      break;
    case `Tags`:
      filteredTasks = tasks.filter((task) => task.tags.size > 0);
      break;
    case `Archive`:
      filteredTasks = tasks.filter((task) => task.isArchive);
      break;
  }
  return filteredTasks.length;
};

const makeFilters = () => {
  filtersTitle.forEach((item) => {
    filters.push({
      title: item,
      count: getFilterCount(item),
    });
  });
};

const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + (Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000) - (Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000),
  repeatingDays: {
    'mo': Boolean(Math.round(Math.random())),
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  tags: getTags(),
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});

const makeTasks = () => {
  for (let i = 0; i < COUNT_TASKS; i++) {
    tasks.push(getTask());
  }
};

makeTasks();
makeFilters();
