
Component({
  data: {
    acvtive: 0,
    list: []
  },
  properties: {
    category: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    animationFinish(e) {
      this.setData({
        'acvtive':  e.detail.current
      })
    },
    goDetails(e) {
      let id = e.currentTarget.dataset.id
      let name = e.currentTarget.dataset.name
      console.log("id",e.currentTarget.dataset.id)
      console.log("name",e.currentTarget.dataset.name)
      tt.navigateTo({url: `/pages/classification/index?id=${id}&name=${name}`})
    }
  },
  observers: {
    'category'(category) {
      let arrList = []
      // let len = Math.ceil(categoryList.length/5)
      for(let i = 0; i < 2; i++) {
        arrList.push(category.slice(5*i,5*(i+1)))
      }
      this.setData({
        "list": arrList
      })
    }
  }
})