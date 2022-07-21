const { PROD_TYPE } = require('../../../../utils/constData')

Component({
  data: {
    selectedAcvtive: 0,
    selectedInfo: {}
  },
  properties: {
    selected: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    change: function(e) {
      this.setData({
        'selectedAcvtive':  e.detail.current
      })
      // console.log('e',e.detail)
    },
    goDetails(e) {
      let id = e.currentTarget.dataset.id
      let type = PROD_TYPE[e.currentTarget.dataset.type]
      tt.navigateTo({url: `/pages/home/details/index?id=${id}&type=${type}`})
    }
  },
  observers: {
    "selected"(selected) {
      this.setData({
        "selectedInfo": selected
      })
    }
  }
})