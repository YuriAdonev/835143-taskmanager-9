import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import {Position, render, unrender} from "../utils";
import LoadMore from "../components/load-more";

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
  }

  init() {
    const DEFAULT_TASKS_COUNT_TO_LOAD = 8;

    let shownTasks = 0;
    let totalTasks = this._tasks.length;

    const loadMore = new LoadMore();

    const renderTask = (taskMock) => {
      const task = new Task(taskMock);
      const taskEdit = new TaskEdit(taskMock);

      const onEscKeyDown = (evt) => {
        if (evt.key === `Escape` || evt.key === `Esc`) {
          this._container.replaceChild(task.getElement(), taskEdit.getElement());
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };

      task.getElement()
        .querySelector(`.card__btn--edit`)
        .addEventListener(`click`, () => {
          this._container.replaceChild(taskEdit.getElement(), task.getElement());
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
          this._container.replaceChild(task.getElement(), taskEdit.getElement());
          document.removeEventListener(`keydown`, onEscKeyDown);
        });

      render(this._container, task.getElement(), Position.BEFOREEND);
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
        render(this._container, renderTask(this._tasks[shownTasks]));
        shownTasks++;
      }
    };

    const hideTasksLoader = () => {
      unrender(loadMore.getElement());
    };

    const showFirstCards = () => {
      if (this._tasks.length > DEFAULT_TASKS_COUNT_TO_LOAD) {
        for (let i = 0; i < DEFAULT_TASKS_COUNT_TO_LOAD; i++) {
          render(this._container, renderTask(this._tasks[shownTasks]));
          shownTasks++;
        }
      } else {
        for (let i = 0; i < this._tasks.length; i++) {
          render(this._container, renderTask(this._tasks[shownTasks]));
          shownTasks++;
        }
      }
    };

    showFirstCards();

    render(document.querySelector(`.main`), loadMore.getElement(), Position.BEFOREEND);

    loadMore.getElement().addEventListener(`click`, () => {
      loadMoreTasks();
    });
  }
}
