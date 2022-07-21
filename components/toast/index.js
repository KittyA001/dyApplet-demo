
Component({
  data: {
    timer: null,
    isShow: false
  },
  properties: {
    content: {
      type: String,
      default: '提示的内容'
    },
    isShowToast: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getTimer() {
      let timer = setTimeout(() => {
        this.setData({
          "isShow": false,
          "isShowToast": false
        })
      },2000)
      console.log('isShow',this.data.isShow)
      this.setData({
        "timer": timer
      })
    }
  },
  observers: {
    "isShowToast"(isShowToast) {
      this.getTimer()
      this.setData({
        "isShow": isShowToast
      })
    }
  },
  lifetimes: {
    attached() {
      this.getTimer()
    },
    detached() {
      clearTimeout(this.data.timer)
      this.setData({
        "timer": null
      })
    }
  }

})