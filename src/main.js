import {tasks, filters} from './components/data';
import {createSiteMenuTemplate} from './components/site-menu';
import {createSearchTemplate} from './components/search';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createTaskTemplate} from './components/task';
import {createTaskEditTemplate} from './components/task-edit';
import {createLoadMoreButtonTemplate} from './components/load-more';

const FIRST_TASKS_COUNT_TO_LOAD = 7;
const DEFAULT_TASKS_COUNT_TO_LOAD = 8;

let shownTasks = 0;
let totalTasks = tasks.length;

const render = (container, block) => {
  container.insertAdjacentHTML(`beforeend`, block);
};

const loadMoreTasks = () => {
  let restTasks = totalTasks - shownTasks;
  let taskToShow = 0;

  if (restTasks <= DEFAULT_TASKS_COUNT_TO_LOAD) {
    hideTasksLoader();
    taskToShow = restTasks;
  } else {
    taskToShow = DEFAULT_TASKS_COUNT_TO_LOAD;
  }

  renderTasks(taskToShow);
};

const renderTasks = (taskToShow) => {
  for (let i = 0; i < taskToShow; i++) {
    render(document.querySelector(`.board__tasks`), createTaskTemplate(tasks[shownTasks]));
    shownTasks++;
  }
};

const hideTasksLoader = () => {
  document.querySelector(`.load-more`).classList.add(`visually-hidden`);
};

const showFirstCards = () => {
  if (tasks.length > FIRST_TASKS_COUNT_TO_LOAD) {
    for (let i = 0; i < FIRST_TASKS_COUNT_TO_LOAD; i++) {
      render(document.querySelector(`.board__tasks`), createTaskTemplate(tasks[shownTasks]));
      shownTasks++;
    }
  } else {
    for (let i = 0; i < tasks.length; i++) {
      render(document.querySelector(`.board__tasks`), createTaskTemplate(tasks[shownTasks]));
      shownTasks++;
    }
  }
};

render(document.querySelector(`.main__control`), createSiteMenuTemplate());
render(document.querySelector(`.main`), createSearchTemplate());
render(document.querySelector(`.main`), createFilterTemplate(filters));
render(document.querySelector(`.main`), createBoardTemplate());
render(document.querySelector(`.board__tasks`), createTaskEditTemplate());

showFirstCards();

render(document.querySelector(`.main`), createLoadMoreButtonTemplate());

document.querySelector(`.load-more`).addEventListener(`click`, () => {
  loadMoreTasks();
});
