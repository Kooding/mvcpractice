export default {
  data: [
    { keyword: '검색기록2', date: '12.03' },
    { keyword: '검색기록1', date: '12.02' },
    { keyword: '검색기록0', date: '12.01' },
  ],

  // 보통 data를 받아올땐 서버에서 비동이로 처리하기때문에
  // Promise 사용.
  list() {
    return Promise.resolve(this.data)
  },

  add(keyword = '') {
    keyword = keyword.trim()
    if (!keyword) return
    if (this.data.some((item) => item.keyword === keyword)) {
      this.remove(keyword)
    }

    const date = '12.31'
    this.data = [...this.data, { keyword, date }]
  },

  remove(keyword) {
    this.data = this.data.filter((item) => item.keyword !== keyword)
  },
}
