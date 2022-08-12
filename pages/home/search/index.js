import utils from '../../../utils/util'
const { PROD_TYPE } = require('../../../utils/constData')

Page({
  data: {
    search: '',
    tabList: [
      {
        key: '1',
        value: '全部',
      }, {
        key: '2',
        value: '达人',
      }, {
        key: '3',
        value: '内容',
      }
    ],
    searchList: [],
    curSelectTab: '1',
    active: 0,
    pageNo: 1,
    size: 10,
    total: 0,
    loading: false,
    finish: false
  },
  handleInputChange(e) {
    this.setData({
      "pageNo": 1,
      "size": 10,
      "total": 0,
      "searchList": [],
      "loading": false,
      "finish": false
    })
    // 取出定义的变量名
    console.log(e)
  //  let targetData = e.currentTarget.dataset.modal; 
  
   // 取出定义的变量值
   let currentValue = e.detail.value; 
    // value = currentValue
   // 将 input 值赋值给 定义的变量名，this.name 可以直接取到在 data 中定义的 name 值，其效果跟 this[变量名] 是对等的，这是 js 基础
   this.setData({
     'search': currentValue
   })
  },
  tapclear() {
    this.setData({
      "search": '',
      "pageNo": 1,
      "size": 10,
      "total": 0,
      "searchList": [],
      "loading": false,
      "finish": false
    })
    console.log('pk')
  },
  tapsearch() {
    this.setData({
      // "searchList": [],
      "loading": true
    })
    var url = "dyhomepage/searchProd";
    var data = {
      pageNo: this.data.pageNo,
      pageSize: this.data.size,
      content: this.data.search,
      globalSearchType: '3'
      // globalSearchType: this.data.curSelectTab
    }
    utils.ttRequestPost(url, data).then(res=>{
      console.log('res', res)
      let arr = this.data.searchList
      arr.push(...res.records)
      this.setData({
        "searchList": arr,
        "total": res.total,
        "loading": false
      })
      // this.triggerEvent('grtSearchList',this.data.searchList)
      console.log('searchList',this.data.searchList)
    })
  },
  changeActive(e) {
    console.log('changeActive',e.currentTarget)
    this.setData({
      "active": e.currentTarget.dataset.index
    })
  },
  goDetails(e) {
    let id = e.currentTarget.dataset.id
    let type = PROD_TYPE[e.currentTarget.dataset.type]
    tt.navigateTo({url: `/pages/home/details/index?id=${id}&type=${type}`})
  },
  onReachBottom() {
    this.setData({
      "loading": true
    })
    if (!this.data.finish) {
      let num = this.data.total/this.data.size
      // console.log('num', num)
      if (num > this.data.pageNo) {
      let pageNo = this.data.pageNo + 1
        this.setData({
          "pageNo": pageNo
        })
        // console.log('pageNo', this.data.pageNo)
        this.tapsearch()
      } else {
        this.setData({
          "loading": false,
          "finish": true
        })
      }
    } else {
      this.setData({
        "loading": false
      })
    }
  
  },
  onLoad: function (options) {

  }
})