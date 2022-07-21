// d:\items\抖音测试\components\text\text.js
Component({
  data: {

  },
  properties: {

  },
  methods: {
    goDiscount() {
      tt.navigateTo({url: '/pages/discountDetails/index'})
    },
    goCourse() {
      tt.switchTab({url: '/pages/learn/index'})
    }
  }
})