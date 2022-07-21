// d:\items\抖音测试\pages\my\index.js
let info = {
  name: '玉裕',
  moble: '13345678541',
  profit: '120.00',
  todayIncome: '4000.00',
  Withdrawable: '3000.00'
}
Page({
  data: {
    token: true,
    info: {}
  },
  getInfo() {
    this.setData({
      'taken': true,
      'info': info
    })
  },
  onLoad: function (options) {
    this.getInfo()
  }
})