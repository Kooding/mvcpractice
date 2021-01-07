import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
import TabView from '../views/TabView.js';
import SearchModel from '../models/SearchModel.js';
const tag = '[MainController]';

export default {
  init() {
    FormView.setup(document.querySelector('form'))
      .on('@submit', (e) => this.onSubmit(e.detail.input))
      .on('@reset', (e) => this.onResetForm());

    ResultView.setup(document.querySelector('#search-result'));

    TabView.setup(document.querySelector('.tabs')).on('@click', (e) =>
      this.onChangeTab(e.detail.tabName)
    );

    this.renderView();
  },

  renderView() {
    TabView.setActiveTab('추천 검색어');
    ResultView.hide();
  },

  search(query) {
    console.log(tag, 'search()', query);
    // search API
    SearchModel.list(query).then(this.onSearchResult);
  },

  onSubmit(inputValue) {
    this.search(inputValue);
  },

  onResetForm() {
    ResultView.hide();
  },

  onSearchResult(data) {
    ResultView.render(data);
  },
  onChangeTab(tabName) {
    debugger;
  },
};
