import {Position, render} from './utils';
import {tasks, filters} from './data';
import SiteMenu from './components/site-menu';
import Search from './components/search';
import Filter from './components/filter';
import BoardController from "./controllers/board";

const siteMenu = new SiteMenu();
const search = new Search();
const filter = new Filter(filters);

render(document.querySelector(`.main__control`), siteMenu.getElement(), Position.BEFOREEND);
render(document.querySelector(`.main`), search.getElement(), Position.BEFOREEND);
render(document.querySelector(`.main`), filter.getElement(), Position.BEFOREEND);

const boardController = new BoardController(document.querySelector(`.main`), tasks);

boardController.init();
