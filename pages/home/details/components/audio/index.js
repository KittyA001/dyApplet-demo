let innerAudioContext = tt.createInnerAudioContext() // 音频
Component({
  data: {
    timeWidth: 0, 
    currentPlayTime: '00:00', // 音频当前播放时间格式化
    duration: '00:00',
    play: false,
  },
  properties: {
    info: {
      type: Object,
      default: ()=>({}),
      observer: () => {
        let that = this
          const query = tt.createSelectorQuery()
          query.select("#progress").boundingClientRect((res) => {
            that.progressWidth = res.width
          }).exec()
          query.select("#time").boundingClientRect((res) => {
            that.timeWidth = res.width
            that.width = that.progressWidth
            // this.setData({
            //   "timeWidth": res.width,
            // },()=>{
            //   this.setData({
            //     "width": this.data.progressWidth
            //   })
            //   // console.log('width',this.data.width)
            // })
          }).exec()

      }
    },
    cover: {
      type: String,
      default: ''
    },
    progress: {
      type: Number,
      default: 0
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    playIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    initPageData() {
      this.freeView = this.data.info.isFreeView
      this.currentTimeNum = 0
      this.timerPlay = null
      this.movePageX = 0
      this.touchesPageX = 0
      this.width = 0
      this.progress = this.data.progress,
      this.progressWidth = 0,
      this.timeWidth = 0,
      this.touchesEndPageX = 0
      // this.playIndex = 0
    },
      // 音频播放
    playOn() {
      console.log('this.data.info.isFreeView',this.data.info.isFreeView)
      console.log('this.data.info.isFreeView',this.data.info.isFreeView)

      if (this.freeView) {
        innerAudioContext.src = this.data.info.resLink,
        innerAudioContext.autoplay = true
        innerAudioContext.loop = true
        innerAudioContext.obeyMuteSwitch = false //系统静音时也能播放声音
        innerAudioContext.startTime = this.data.currentTimeNum
        innerAudioContext.play(()=> {
          console.log('播放')
        })
        let timerPlay = setInterval(()=> {
            let duration = this.filter(innerAudioContext.duration,true)
            let percent = this.currentTimeNum / innerAudioContext.duration * 100
            let currentTime = this.filter(this.currentTimeNum, true)
            this.currentTimeNum = innerAudioContext.currentTime
            this.setData({
              "duration": duration,
              "progress": percent,
              // "currentTimeNum": innerAudioContext.currentTime,
              "currentPlayTime": currentTime
            })
        },1000)
        this.timerPlay = timerPlay
        this.setData({
          "play": true,
          // "timerPlay": timerPlay
        })
      } else {
        tt.showToast({
          title: '暂无权限收听',
          icon: 'none'
        })
      }
      
    },
    // 音频暂停
    playOff() {
      innerAudioContext.pause(()=> {
        console.log('停止播放')
      })
      if (this.timerPlay) {
        clearInterval(this.timerPlay)
        this.timerPlay = null
        this.setData({
          "play": false,
          // "timerPlay": null
        })
      }
      // console.log('进度', this.data.currentPlayTime)
    },
    touchmove(e) {
      if(this.timerPlay) {  
        clearInterval(this.timerPlay);  
        this.timerPlay = null
      }
      this.movePageX = e.touches[0].pageX
      let addProgress = (e.touches[0].pageX - this.touchesPageX)/this.width*2
      let progress = this.progress + addProgress
      progress = !(progress > 100) ? progress : 100
      let currentTimeNum = progress / 100 * innerAudioContext.duration
      let currentTime = this.filter(currentTimeNum, true)
      this.currentTimeNum = currentTimeNum
      this.setData({
        "progress": progress,
        // "currentTimeNum": currentTimeNum,
        "currentPlayTime": currentTime
      })
    },
    touchstart(e) {
      const query = tt.createSelectorQuery()
      query.select("#progress").boundingClientRect((res) => {
        this.progressWidth = res.width
        // this.setData({
        //   "progressWidth": res.width,
        // })
      }).exec()
      query.select("#time").boundingClientRect((res) => {
        this.timeWidth = res.width
        // this.setData({
        //   "timeWidth": res.width,
        // })
      }).exec()
      this.touchesPageX = e.touches[0].pageX
    },
    touchend(e) {
      this.touchesEndPageX = e.changedTouches[0].pageX
      innerAudioContext.seek(this.currentTimeNum)
      let timerPlay = setInterval(()=> {
        let duration = this.filter(innerAudioContext.duration,true)
          let percent = innerAudioContext.currentTime / innerAudioContext.duration * 100
          let currentTime = this.filter(innerAudioContext.currentTime, true)
          this.currentTimeNum = innerAudioContext.currentTime
          this.setData({
            "duration": duration,
            "progress": percent,
            // "currentTimeNum": innerAudioContext.currentTime,
            "currentPlayTime": currentTime
          })
      },1000)
      this.timerPlay = timerPlay
      this.setData({
        "play": true,
        // "timerPlay": timerPlay
      })
    },
      // 音频后退
    backward() {
      if (innerAudioContext.currentTime > 15) {
        let time = innerAudioContext.currentTime - 15
        let currentTime = this.filter(time,true)
        let percent = time / innerAudioContext.duration * 100
        this.currentTimeNum = time
        this.setData({
          "currentPlayTime": currentTime,
          // "currentTimeNum": time,
          "progress": percent
        })
        innerAudioContext.seek(time)
      } else {
        let currentTime = this.filter(0,true)
        this.currentTimeNum = 0
        this.setData({
          "currentPlayTime": currentTime,
          // "currentTimeNum": 0
        })
        innerAudioContext.seek(0)
      }
    },
    // 音频前进
    forward() {
      if (innerAudioContext.currentTime < innerAudioContext.duration - 15) {
        let time = innerAudioContext.currentTime + 15
        let currentTime = this.filter(time,true)
        let percent = time / innerAudioContext.duration * 100
        this.currentTimeNum = time
        this.setData({
          "currentPlayTime": currentTime,
          // "currentTimeNum": time,
          "progress": percent
        })
        innerAudioContext.seek(time)
      } else if(innerAudioContext.currentTime === innerAudioContext.duration) {
        let currentTime = this.filter(0,true)
        this.currentTimeNum = 0
        this.setData({
          // "currentTimeNum": 0,
          "currentPlayTime": currentTime,
        })
        innerAudioContext.seek(0)
        if (!this.play) {
          this.playOn()
        }
      } else {
        let currentTime = this.filter(innerAudioContext.duration,true)
        this.currentTimeNum = innerAudioContext.duration
        this.setData({
          "currentPlayTime": currentTime,
          // "currentTimeNum": innerAudioContext.duration,
          "progress": 100
        })
        innerAudioContext.seek(innerAudioContext.duration)
      }
    },
    // 上一个
    getPrevious() {
      if (this.playIndex > 0) {
        let index = this.playIndex - 1
        this.triggerEvent("next", index)
        // this.playIndex = index
        this.currentTimeNum = 0
        this.playOff()
        innerAudioContext.seek(0)
        this.playOn()
      }
    },
    // 下一个
    getNext() {
      let index = this.data.playIndex + 1
      this.triggerEvent("next", index)
      if (this.data.playIndex < this.data.listLength - 1 && info.isFreeView) {
        this.currentTimeNum = 0
        this.setData({
          // "playIndex": index,
          "currentTimeNum": 0
        })
        this.playOff()
        innerAudioContext.seek(0)
        this.playOn()
      }
    },
      // 时间格式化
    filter(date,isTwo) {
      let hour = parseInt(date / 60 / 60 % 24)
      let hourTime = hour < 10 ? '0' + hour : hour+''
      let minute = parseInt(date / 60 % 60)
      minute = minute < 10 ? '0' + minute : minute+''
      let seconds = parseInt(date % 60)
      seconds = seconds < 10 ? '0' + seconds : seconds+''
      return isTwo && hour === 0 ? `${minute}:${seconds}` : `${hourTime}:${minute}:${seconds}`
    },
  },
  attached() {
    this.initPageData()
    console.log('ok')
    if(this.data.autoplay) {
      this.playOn()
    }
  }
})