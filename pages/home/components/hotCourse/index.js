const { PROD_TYPE } = require('../../../../utils/constData')

Component({
  data: {
    hotCourseList: {},
    hotCourseLeft: [],
    hotCourseRight: []
  },
  properties: {
    hotCourse: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    goAll(e) {
      let id = e.currentTarget.dataset.id
      console.log("id",e.currentTarget.dataset.id)
      tt.navigateTo({url: `/pages/moreDetails/index?id=${id}`})
    },
    goDetails(e) {
      let id = e.currentTarget.dataset.id
      let type = PROD_TYPE[e.currentTarget.dataset.type]
      tt.navigateTo({url: `/pages/home/details/index?id=${id}&type=${type}`})
    }
  },
  observers: {
    "hotCourse"(hotCourse) {
      let num = hotCourse.dyProdListVoList.length/2
      let hotCourseLeft = hotCourse.dyProdListVoList.slice(0,num)
      let hotCourseRight = hotCourse.dyProdListVoList.slice(num, hotCourse.dyProdListVoList.length)
      this.setData({
        'hotCourseList': hotCourse,
        'hotCourseLeft': hotCourseLeft,
        'hotCourseRight': hotCourseRight
      })
      // console.log('hotCourseLeft',hotCourseLeft)
      // console.log('hotCourseRight',hotCourseRight)
    },
  }
})