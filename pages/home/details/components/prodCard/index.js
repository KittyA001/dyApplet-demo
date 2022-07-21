const { PROD_TYPE } = require('../../../../../utils/constData')

Component({
  data: {
    item: {},
    prodType: {}
  },
  properties: {
    itemInfo: {
      type: Object,
      default: ()=>({})
    }

  },
  methods: {

  },
  observers: {
    "itemInfo"(itemInfo) {
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