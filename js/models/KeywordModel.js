export default {
  data: [
    { keyword: '이탈리아' },
    { keyword: '세프의요리' },
    { keyword: '제철' },
    { keyword: '홈파티' },
  ],

  list() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data)
      }, 200)
    })
  },
}
