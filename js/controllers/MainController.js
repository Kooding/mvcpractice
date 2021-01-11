import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import KeywordView from '../views/KeywordView.js'
import HistoryView from '../views/HistoryView.js'

import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'
import HistoryModel from '../models/HistoryModel.js'
const tag = '[MainController]'

export default {
  init() {
    FormView.setup(document.querySelector('form'))
      .on('@submit', (e) => this.onSubmit(e.detail.input))
      .on('@reset', (e) => this.onResetForm())

    ResultView.setup(document.querySelector('#search-result'))

    TabView.setup(document.querySelector('.tabs')).on('@click', (e) =>
      this.onChangeTab(e.detail.tabName)
    )
    KeywordView.setup(document.querySelector('#search-keyword')).on('@click', (e) =>
      this.onClickKeyword(e.detail.keyword)
    )
    // 계속 setup으로 돔을 선택했는데 선택할 DOM요소가 없다..
    // 만약 기존에 같은 방식이라면 index.html에서 마크업을 짜야할것 같다.
    HistoryView.setup(document.querySelector('#search-history'))
      .on('@click', (e) => this.onClickHistory(e.detail.keyword))
      .on('@remove', (e) => this.onRemoveHistory(e.detail.keyword))

    this.selectedTab = '추천 검색어'
    this.renderView()
  },

  renderView() {
    TabView.setActiveTab(this.selectedTab)

    if (this.selectedTab === '추천 검색어') {
      this.fecthSearchKeyword()
      HistoryView.hide()
    } else {
      // 무조건 추천 검색어를 보여준다고 하면 이 영역은 필요가 없는거 아닐까?
      this.fecthSearchHistory()
      KeywordView.hide()
    }
    ResultView.hide()
  },

  fecthSearchHistory() {
    // 중복되는것같은데 함수를 재사용 할순 없을까?
    HistoryModel.list().then((data) => {
      HistoryView.render(data).bindRemovebtn()
    })
  },

  fecthSearchKeyword() {
    KeywordModel.list().then((data) => KeywordView.render(data))
  },

  search(query) {
    console.log(tag, 'search()', query)
    FormView.setValue(query)
    HistoryModel.add(query)
    // search API
    SearchModel.list(query).then((data) => this.onSearchResult(data))
  },
  onClickKeyword(keyword) {
    this.search(keyword)
  },

  onClickHistory(keyword) {
    this.search(keyword)
  },
  onSubmit(inputValue) {
    this.search(inputValue)
  },
  onResetForm() {
    ResultView.hide()
    this.renderView()
  },
  onRemoveHistory(keyword) {
    console.log(tag, 'onRemoveHistory()', keyword)
    HistoryModel.remove(keyword)
    this.renderView()
  },
  onSearchResult(data) {
    TabView.hide()
    KeywordView.hide()
    HistoryView.hide()
    ResultView.render(data)
  },
  onChangeTab(tabName) {
    //여기에서 탭네임에 따라 실행되는 로직이 뭐가 있을까?
    // 클릭이 벤트를 여기서 받아오는데
    // 필요한 action은 데이터를 패치하고 렌더하는거
    // if (tabName === '추천 검색어') {
    //   this.fecthSearchKeyword()
    // } else if (tabName === '최근 검색어') {
    //   this.fecthSearchHistory()
    // }
    console.log(tag, 'onChangeTab()', tabName)
    this.selectedTab = tabName
    this.renderView()
  },
}
