// d:\items\抖音测试\pages\learn\index.js
const { PROD_TYPE } = require('../../utils/constData')
let learnInfo = [
  {
    year: '2021',
    month: '08',
    day: '24',
    learnList: [
      {
        name: '今天最好的表现是明天最低的今天最好的表现是明天最低的',
        cover: 'https://knowledge-payment.oss-cn-beijing.aliyuncs.com/13/resource/admin-fe_lj7l_GhtQk6nNkpwcGWSPHWEE.jpg',
        prodType: 111,
        isRecent: true,
        progress: 20
      },
      {
        name: '看不出问题就是最大的问题',
        cover: 'https://knowledge-payment.oss-cn-beijing.aliyuncs.com/13/resource/admin-fe_lj7l_GhtQk6nNkpwcGWSPHWEE.jpg',
        prodType: 110,
        isRecent: false,
        progress: 100
      }
    ]
  },
  {
    year: '2021',
    month: '08',
    day: '23',
    learnList: [
      {
        name: '今天最好的表现是明天最低的今天最好的表现是明天最低的',
        cover: 'https://knowledge-payment.oss-cn-beijing.aliyuncs.com/13/resource/admin-fe_lj7l_GhtQk6nNkpwcGWSPHWEE.jpg',
        prodType: 111,
        isRecent: false,
        progress: 0
      }
    ]
  }
  
]
Page({
  data: {
    token: false,
    prodType: {},
    learnInfo: []
  },
  onReachBottom() {
    console.log('ok')
  },
  onLoad: function (options) {
    this.setData({
      "prodType": PROD_TYPE,
      "learnInfo": learnInfo
    }) 
  }
})