// d:\items\抖音测试\components\text\text.js
Component({
  data: {
    imagesList: []
  },
  properties: {
    images: {
      type: Array,
      default: () => []
    }
  },
  methods: {

  },
  observers: {
    'images'(images) {
      this.setData({
        "imagesList": images
      })
    }
  }

})