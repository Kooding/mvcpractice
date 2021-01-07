import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
import SearchModel from '../models/SearchModel.js';
const tag = '[MainController]';

export default {
  init() {
    console.log(tag, 'init()');
    FormView.setup(document.querySelector('form'))
      .on('@submit', (e) => this.onSubmit(e.detail.input))
      .on('@reset', (e) => this.onResetForm());

    ResultView.setup(document.querySelector('#search-result'));
  },

  search(query) {
    console.log(tag, 'search()', query);
    // search API
    SearchModel.list(query).then(this.onSearchResult);
  },

  onSubmit(inputValue) {
    console.log(inputValue);
    this.search(inputValue);
  },

  onResetForm() {
    console.log(tag, 'onResetForm');
  },

  onSearchResult(data) {
    ResultView.render(data);
  },
};
