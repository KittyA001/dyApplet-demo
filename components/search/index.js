import utils from '../../utils/util'
Component({
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
    active: 0
  },
  properties: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleInputChange(e) {
      // 取出定义的变量名
      console.log(e)
    //  let targetData = e.currentTarget.dataset.modal; 
    
     // 取出定义的变量值
     let currentValue = e.detail.value; 
      // value = currentValue
     // 将 input 值赋值给 定义的变量名，this.name 可以直接取到在 data 中定义的 name 值，其效果跟 this[变量名] 是对等的，这是 js 基础
     this.setData({
       'value': currentValue
     })
    },
    tapclear() {
      this.setData({
        'search': ''
      })
      console.log('pk')
    },
    tapsearch() {
      this.setData({
        "searchList": [],
        "loading": true
      })
      var url = "dyhomepage/searchProd";
      var data = {
        pageNo: 1,
        pageSize: 10,
        content: this.data.search,
        globalSearchType: '3'
        // globalSearchType: this.data.curSelectTab
      }
      utils.ttRequestPost(url, data).then(res=>{
        let arr = [...this.data.searchList,...res.records]
        this.setData({
          "searchList": arr
        })
        this.triggerEvent('grtSearchList',this.data.searchList)
        console.log('searchList',this.data.searchList)
      })
    },
    changeActive(e) {
      console.log('changeActive',e.currentTarget)
      this.setData({
        "active": e.currentTarget.dataset.index
      })
    }
  },
  observers: {
    'value'(value) {
      this.setData({
        'search': value
      })
    }
  }
})