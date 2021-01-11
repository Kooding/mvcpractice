import KeywordView from './KeywordView.js'

const tag = '[HistoryView]'

const HistoryView = Object.create(KeywordView)

HistoryView.setup = function (el) {
  this.init(el)
  return this
}
HistoryView.messages.NO_KEYWORD = '검색 이력이 없습니다.'

HistoryView.getKeywordHtml = function (data) {
  return (
    data.reduce((html, item, index) => {
      html += this.getKeywordItem(item, index)
      return html
    }, "<ul class='list'>") + '</ul>'
  )
}

HistoryView.getKeywordItem = function (item, index) {
  return `
  <li data-keyword="${item.keyword}">
    ${item.keyword} <span class="date">${item.date}</span> <button class="btn-remove"></button>
  </li>`
}

HistoryView.bindRemovebtn = function () {
  this.el.querySelectorAll('.btn-remove').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      this.onCilckRemove(btn.parentElement.dataset.keyword)
    })
  })
}

HistoryView.onCilckRemove = function (keyword) {
  this.emit('@remove', { keyword })
}

export default HistoryView
