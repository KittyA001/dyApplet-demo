const { PROD_TYPE } = require('../../../../utils/constData')

Component({
  data: {
    item: {},
    prodType: {}
  },
  properties: {
    itemInfo: {
      type: Object,
      default: ()=>({})
    },
    // width: {
    //   type: String,
    //   default: 'c-ww270'
    // },
    // height: {
    //   type: String,
    //   default: 'c-hh170'
    // }

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