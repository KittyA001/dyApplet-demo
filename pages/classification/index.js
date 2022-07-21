let { ttRequestPost, ttRequestGet } = require("../../utils/util")
const { PROD_TYPE } = require('../../utils/constData')

Page({
  data: {
    search: '',
    id: '',
    active: 0,
    categoryId: '',
    classifyList: [],
    prodList: [],
    pageNo: 1,
    size: 10,
    total: '',
    finish: false,
    loading: false,
    noCourse: false,
    prodTypeList: []
  },
  changeActive(e) {
    this.setData({
      "active": e.currentTarget.dataset.index,
      "categoryId": e.currentTarget.dataset.id,
      "prodList": [],
      "pageNo": 1,
      "size": 10,
      "total": '',
      "finish": false,
      "loading": false,
      "noCourse": false
    })
    this.getProdList()
  },
  lower(e) {
    this.setData({
      "loading": true
    })
    if (!this.data.finish) {
      let num = this.data.total/this.data.size
      if (num > this.data.pageNo) {
      let pageNo = this.data.pageNo + 1
        this.setData({
          "pageNo": pageNo
        })
        this.getProdList()
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
  async getCategoryList() {
    try {
      let categoryList = await ttRequestGet(`dyhomepage/getTwoCategory/${this.data.id}`)
      let categoryId = categoryList[0].id
      this.setData({
        "classifyList": categoryList,
        "categoryId": categoryId
      })
      this.getProdList()
    } catch (e) {
      console.log(e)
    }
  },
  async getProdList() {
    this.setData({
      "loading": true
    })
    try {
      let prodInfo = await ttRequestPost('dyhomepage/prodList',{
        categoryId: this.data.categoryId,
        level: 2,
        pageNo: this.data.pageNo,
        pageSize: this.data.size,
        prodType: ""
      })
      let arr = this.data.prodList
      arr.push(...prodInfo.records)
      this.setData({
        "prodList": arr,
        "total": prodInfo.total,
        "loading": false
      })
      if (!this.data.prodList.length) {
        this.setData({
          "noCourse": true
        })
      }
    } catch (e) {
      console.log(e)
    }
  },
  goDetails(e) {
    let id = e.currentTarget.dataset.id
    let type = PROD_TYPE[e.currentTarget.dataset.type]
    tt.navigateTo({url: `/pages/home/details/index?id=${id}&type=${type}`})
  },
  onLoad: function (options) {
    let arr = ['全部类型']
    for (let i in PROD_TYPE) {
      arr.push(PROD_TYPE[i])
    }
    console.log('arr',arr)
    this.setData({
      "id": options.id,
      "prodTypeList": arr
    })
    tt.setNavigationBarTitle({
      title: options.name
    })
    this.getCategoryList()
  }
})