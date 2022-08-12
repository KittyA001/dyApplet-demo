const { PROD_TYPE } = require('../../../../utils/constData')

Component({
  data: {
    item: {},
    prodType: {}
  },
  properties: {
    itemInfo: {
      type: Object,
      value: ()=>({})
    }

  },
  methods: {

  },
  observers: {
    "itemInfo"(itemInfo) {
      // console.log('itemInfo',itemInfo)
      this.setData({
        "item": itemInfo
      })
    }
  },
  attached() {
    this.setData({
      "prodType": PROD_TYPE
    })
  }
})