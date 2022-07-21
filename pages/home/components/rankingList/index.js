const { PROD_TYPE } = require('../../../../utils/constData')

Component({
  data: {
    rankingListInfo: {}
  },
  properties: {
    rankingList: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    goAll(e) {
      let id = e.currentTarget.dataset.id
      // console.log("id",e.currentTarget.dataset.id)
      tt.navigateTo({url: `/pages/allRankingList/index?id=${id}`})
    },
    goDetails(e) {
      let id = e.currentTarget.dataset.id
      let type = PROD_TYPE[e.currentTarget.dataset.type]
      tt.navigateTo({url: `/pages/home/details/index?id=${id}&type=${type}`})
    }
  },
  observers: {
    'rankingList'(rankingList) {
      this.setData({
        'rankingListInfo': rankingList
      })
      console.log('rankingListInfo', this.data.rankingListInfo)
    }
  }
})