import View from './View.js'

const tag = '[KeywordView]'

const KeywordView = Object.create(View)

KeywordView.messages = {
  NO_KEYWORDS: '추천 검색어가 없습니다',
}

KeywordView.setup = function (el) {
  this.init(el)
  return this
}

KeywordView.render = function (data = []) {
  this.el.innerHTML = data.length ? this.getKeywordHtml(data) : this.messages.NO_KEYWORDS
  this.bindClickEvent()
  this.show()
  return this
}

KeywordView.getKeywordHtml = function (data) {
  console.log(tag, 'getKeywordHtml', data)
  return (
    data.reduce((html, item, index) => {
      html += this.getKeywordItem(item, index)
      return html
    }, "<ul class='list'>") + '</ul>'
  )
}

KeywordView.getKeywordItem = function (item, index) {
  return `
  <li data-keyword="${item.keyword}">
    <span class="number">${index + 1}</span>
    ${item.keyword}
  </li>`
}

KeywordView.bindClickEvent = function () {
  console.log(tag, 'bindClickEvent()')
  this.el.querySelectorAll('li').forEach((li) => {
    li.addEventListener('click', (e) => this.onClickKeyword(e))
  })
}

KeywordView.onClickKeyword = function (e) {
  console.log(tag, 'onClickKeyword()', e.currentTarget.dataset.keyword)
  const { keyword } = e.currentTarget.dataset
  this.emit('@click', { keyword })
}

export default KeywordView
