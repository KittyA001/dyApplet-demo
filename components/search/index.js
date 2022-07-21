// d:\items\抖音测试\components\text\text.js
Component({
  data: {
    search: ''
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
  },
  observers: {
    'value'(value) {
      this.setData({
        'search': value
      })
    }
  }
})