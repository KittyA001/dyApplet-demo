// d:\items\抖音测试\components\text\text.js
Component({
  data: {
    talentsInfo: {}
  },
  properties: {
    talents: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    goDetails(e) {
      let id = e.currentTarget.dataset.id
      tt.navigateTo({url: `/pages/home/talentDetails/index?id=${id}`})
    }
  },
  observers: {
    "talents"(talents) {
      this.setData({
        "talentsInfo": talents
      })
    }
  }
})