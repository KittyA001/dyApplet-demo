
let { ttRequestGet } = require("../../utils/util")
Page({
  data: {
    search: '',
    images: [],
    list: [],
    newCourse: {},
    selected: {},
    talents: {},
    hotCourse: {},
    rankingList: {},
    selectedAcvtive: 0,
    acvtive: 0,
    prodType: {}
  },
  handleInputChange(e) {
    // 取出定义的变量名
    console.log(e)
   let targetData = e.currentTarget.dataset.modal; 
  
   // 取出定义的变量值
   let currentValue = e.detail.value; 
    
   // 将 input 值赋值给 定义的变量名，this.name 可以直接取到在 data 中定义的 name 值，其效果跟 this[变量名] 是对等的，这是 js 基础
   this.setData({
     [targetData]: currentValue
   })
  },
  animationFinish(e) {
    this.setData({
      'acvtive':  e.detail.current
    })
  },
  change(e) {
    this.setData({
      'selectedAcvtive':  e.detail.current
    })
    // console.log('e',e.detail)
  },
  // 获取轮播图数据 dyhomepage/getCarouselImgListForDy
  async getCarouselImgList() {
    try {
      let carouselImgList = await ttRequestGet('dyhomepage/getCarouselImgListForDy')
      this.setData({
        "images": carouselImgList
      })
    } catch (e) {
      console.log(e)
    }
  },
  // 分类 dyhomepage/getCategoryListForDy
  async getCategoryList() {
    let categoryList = await ttRequestGet('dyhomepage/getCategoryListForDy')
    this.setData({
      "list": categoryList
    })
  },
  // 获取首页数据
  async getHomeInfoList() {
    try {
      let homeInfoList = await ttRequestGet('dyhomepage/homeInfoList')
      let newCourse = homeInfoList.find(item => item.sectionType === 1)
      let talents = homeInfoList.find(item => item.sectionType === 5)
      let selected = homeInfoList.find(item => item.sectionType === 3)
      let hotCourse = homeInfoList.find(item => item.sectionType === 2)
      let rankingList = homeInfoList.find(item => item.sectionType === 4)
      this.setData({
        "newCourse": newCourse,
        "talents": talents,
        "selected": selected,
        "hotCourse": hotCourse,
        "rankingList": rankingList,
      })
    } catch (e) {
      console.log(e)
    }
  },
  onLoad: function (options) {
    this.getCarouselImgList()
    this.getCategoryList()
    this.getHomeInfoList()

  }
})