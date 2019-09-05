import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import {Position, render, unrender} from "../utils";
import LoadMore from "../components/load-more";
import Board from "../components/board";
import TaskList from "../components/task-list";
import Sort from "../components/sort";

export default class BoardController {
  constructor(container, tasks) {
    this._DEFAULT_TASKS_COUNT_TO_LOAD = 8;
    this._container = container;
    this._tasks = tasks;
    this._sortedTasks = this._tasks.slice();
    this._shownTasks = 0;
    this._board = new Board();
    this._sort = new Sort();
    this._taskList = new TaskList();
    this._loadMore = new LoadMore();
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._sort.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

    this._renderCards();

    this._loadMore.getElement().addEventListener(`click`, () => {
      this._loadMoreTasks();
    });
  }

  _renderCards() {
    this._showFirstCards();

    if (this._sortedTasks.length > this._DEFAULT_TASKS_COUNT_TO_LOAD) {
      render(document.querySelector(`.main`), this._loadMore.getElement(), Position.BEFOREEND);
    }
  }

  _showFirstCards() {
    if (this._sortedTasks.length > this._DEFAULT_TASKS_COUNT_TO_LOAD) {
      for (let i = 0; i < this._DEFAULT_TASKS_COUNT_TO_LOAD; i++) {
        render(this._taskList.getElement(), this._renderTask(this._sortedTasks[this._shownTasks]));
        this._shownTasks++;
      }
    } else {
      for (let i = 0; i < this._sortedTasks.length; i++) {
        render(this._taskList.getElement(), this._renderTask(this._sortedTasks[this._shownTasks]));
        this._shownTasks++;
      }
    }
  }

  _loadMoreTasks() {
    let restTasks = this._sortedTasks.length - this._shownTasks;
    let taskToShow = 0;

    if (restTasks <= this._DEFAULT_TASKS_COUNT_TO_LOAD) {
      this._hideTasksLoader();
      taskToShow = restTasks;
    } else {
      taskToShow = this._DEFAULT_TASKS_COUNT_TO_LOAD;
    }

    for (let i = 0; i < taskToShow; i++) {
      render(this._taskList.getElement(), this._renderTask(this._sortedTasks[this._shownTasks]));
      this._shownTasks++;
    }
  }

  _hideTasksLoader() {
    unrender(this._loadMore.getElement());
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();
    if (evt.target.getAttribute(`data-sort-type`) !== null) {
      switch (evt.target.getAttribute(`data-sort-type`)) {
        case `date-up`:
          this._sortedTasks = this._tasks.slice().sort((a, b) => {
            return a.dueDate - b.dueDate;
          });
          break;
        case `date-down`:
          this._sortedTasks = this._tasks.slice().sort((a, b) => {
            return b.dueDate - a.dueDate;
          });
          break;
        default:
          this._sortedTasks = this._tasks.slice();
      }
      unrender(this._taskList.getElement());
      this._taskList.removeElement();
      this._hideTasksLoader();

      this._taskList = new TaskList();

      render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

      this._shownTasks = 0;
      this._renderCards();
    }
  }

  _renderTask(taskMock) {
    const task = new Task(taskMock);
    const taskEdit = new TaskEdit(taskMock);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._board.getElement().replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    task.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        this._taskList.getElement().replaceChild(taskEdit.getElement(), task.getElement());
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
        this._taskList.getElement().replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._taskList.getElement(), task.getElement(), Position.BEFOREEND);
  }
}
