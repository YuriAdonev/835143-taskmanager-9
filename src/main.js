import {createSiteMenuTemplate} from './components/site-menu';
import {createSearchTemplate} from './components/search';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createTaskTemplate} from './components/task';
import {createTaskEditTemplate} from './components/task-edit';
import {createLoadMoreButtonTemplate} from './components/load-more';

const render = (container, block) => {
  container.insertAdjacentHTML(`beforeend`, block);
};

render(document.querySelector(`.main__control`), createSiteMenuTemplate());
render(document.querySelector(`.main`), createSearchTemplate());
render(document.querySelector(`.main`), createFilterTemplate());
render(document.querySelector(`.main`), createBoardTemplate());
render(document.querySelector(`.board__tasks`), createTaskEditTemplate());

for (let i = 0; i < 3; i++) {
  render(document.querySelector(`.board__tasks`), createTaskTemplate());
}

render(document.querySelector(`.main`), createLoadMoreButtonTemplate());

