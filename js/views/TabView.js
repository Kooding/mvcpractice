import View from './View.js';

const tag = '[TabView]';

const TabView = Object.create(View);

TabView.setup = function (el) {
  this.init(el);
  this.bindEvents();
  return this;
};

TabView.bindEvents = function () {
  this.el.addEventListener('click', (e) => this.onClickTab(e));
};

TabView.onClickTab = function (e) {
  if (e.target.nodeName === 'LI') this.setActiveTab(e.target.innerHTML);
  this.emit('@click', { tabName: e.target.innerHTML });
};

TabView.setActiveTab = function (tabName) {
  this.el.querySelectorAll('li').forEach((li) => {
    li.className = li.innerHTML === tabName ? 'active' : '';
  });
};

export default TabView;
