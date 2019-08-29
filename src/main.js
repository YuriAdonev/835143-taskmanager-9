import {Position, render, unrender} from './components/utils';
import {tasks, filters} from './components/data';
import SiteMenu from './components/site-menu';
import Search from './components/search';
import Filter from './components/filter';
import Board from './components/board';
import Task from './components/task';
import TaskEdit from './components/task-edit';
import LoadMore from './components/load-more';

const DEFAULT_TASKS_COUNT_TO_LOAD = 8;

let shownTasks = 0;
let totalTasks = tasks.length;

const siteMenu = new SiteMenu();
const search = new Search();
const filter = new Filter(filters);
const board = new Board();
const loadMore = new LoadMore();

const renderTask = (taskMock) => {
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      tasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, () => {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  render(tasksContainer, task.getElement(), Position.BEFOREEND);
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

  for (let i = 0; i < taskToShow; i++) {
    render(tasksContainer, renderTask(tasks[shownTasks]));
    shownTasks++;
  }
};

const hideTasksLoader = () => {
  unrender(loadMore.getElement());
};

const showFirstCards = () => {
  if (tasks.length > DEFAULT_TASKS_COUNT_TO_LOAD) {
    for (let i = 0; i < DEFAULT_TASKS_COUNT_TO_LOAD; i++) {
      render(tasksContainer, renderTask(tasks[shownTasks]));
      shownTasks++;
    }
  } else {
    for (let i = 0; i < tasks.length; i++) {
      render(tasksContainer, renderTask(tasks[shownTasks]));
      shownTasks++;
    }
  }
};

render(document.querySelector(`.main__control`), siteMenu.getElement(), Position.BEFOREEND);
render(document.querySelector(`.main`), search.getElement(), Position.BEFOREEND);
render(document.querySelector(`.main`), filter.getElement(), Position.BEFOREEND);
render(document.querySelector(`.main`), board.getElement(), Position.BEFOREEND);

const tasksContainer = document.querySelector(`.board__tasks`);

showFirstCards();

render(document.querySelector(`.main`), loadMore.getElement(), Position.BEFOREEND);

loadMore.getElement().addEventListener(`click`, () => {
  loadMoreTasks();
});
