const { PROD_TYPE } = require('../../../../utils/constData')

Component({
  data: {
    newCourseInfo: {},
    list: []
  },
  properties: {
    newCourse: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    goMore(e) {
      let id = e.currentTarget.dataset.id
      // console.log("id",e.currentTarget.dataset.id)
      tt.navigateTo({url: `/pages/moreDetails/index?id=${id}`})
    },
    goDetails(e) {
      let id = e.currentTarget.dataset.id
      let type = PROD_TYPE[e.currentTarget.dataset.type]
      tt.navigateTo({url: `/pages/home/details/index?id=${id}&type=${type}`})
    }
  },
  observers: {
    "newCourse"(newCourse) {
      this.setData({
        "newCourseInfo": newCourse,
        "list": newCourse.dyProdListVoList
      })
    }
  },
  attached() {
    this.setData({
      "prodType": PROD_TYPE
    }) 
  }
})