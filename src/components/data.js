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

const descriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const colors = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

const getRandomNumber = (maxValue) => {
  return Math.floor(Math.random() * maxValue);
};

const getRandomBoolean = () => {
  return Boolean(Math.round(Math.random()));
};

const getTags = () => {
  const newTags = new Set();

  for (let i = 0; i < getRandomNumber(MAX_TAGS + 1); i++) {
    newTags.add(tags[getRandomNumber(tags.length)]);
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
  description: descriptions[getRandomNumber(3)],
  dueDate: Date.now() + 1 + (getRandomNumber(14) * 24 * 60 * 60 * 1000) - (getRandomNumber(7) * 24 * 60 * 60 * 1000),
  repeatingDays: {
    'mo': getRandomBoolean(),
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  tags: getTags(),
  color: colors[getRandomNumber(5)],
  isFavorite: getRandomBoolean(),
  isArchive: getRandomBoolean(),
});

const makeTasks = () => {
  for (let i = 0; i < COUNT_TASKS; i++) {
    tasks.push(getTask());
  }
};

makeTasks();
makeFilters();
