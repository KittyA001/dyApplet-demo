// d:\items\抖音测试\components\text\text.js
Component({
  data: {
    // tabType: 0
  },
  properties: {
    list: {
      type: Array,
      default: () => []
    },
    tabType: {
      type: [String, Number],
      default: 0
    },
    layout: {
      type: String,
      default: 'style: display:flex;justify-content:space-between;'
    },
    layoutItem: {
      type: String,
      default: ''
    },
    fontStyle: {
      type: String,
      default: ''
    },
    linebg: {
      type: String,
      default: '#2979FF'
    },
    isShowLine: {
      type: Boolean,
      default: false
    },
    justifyType: {
      type: String,
      default: 'c-justify-sb'
    }
  },
  methods: {
    // change(e) {
    //   console.log('e',e.currentTarget.dataset)
    //   // this.triggerEvent('change',e.currentTarget.dataset.index)
    //   // this.setData({
    //   //   'tabType': e.currentTarget.dataset.index
    //   // })
    // }
    change(e) {
      console.log('index',e.currentTarget.dataset.index)
        this.triggerEvent('change',{index:e.currentTarget.dataset.index})
        this.setData({
          'tabType': e.currentTarget.dataset.index
        })
    }
  }
})