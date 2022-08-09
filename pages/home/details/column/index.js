
let util = require('../../../utils/util')
const { PROD_TYPE } = require('../../../utils/constData')
let { getPageHtml } = require('../../../utils/util')
let innerAudioContext = tt.createInnerAudioContext() // 音频
Page({
  data: {
    prodId: '',
    info: {},
    list: [],
    isFree: true,
    fixedNav: false,
    tabList: [],
    active: 0,
    obj: {},
    prodType: '',
    PROD_TYPE: {},
    catalogueList: [], // 目录
    introduce: [], // 介绍
    pageNo: 1,
    pageSize: 5,
    comment: [],
    recommendList: [],
    postCouponPrice: '',
    endDate: '', // 最后的时间戳
    timer: null,
    day:[],
    hour:[],
    minute:[],
    seconds:[],
    playIndex: 0,
    play: false,
    // freeView: false,
    // currentPlayTime: '00:00', // 音频当前播放时间格式化
    // currentTimeNum: 0, // 视频音频当前播放时间
    duration: '00:00',
    // progress: 0,
    // movePageX: 0,
    // progressWidth: 0, // 进度条总长度
    // timeWidth: 0, 
    // width: 0,
    // touchesPageX: 0,
    // touchesEndPageX: 0,
  },
  // 切换tab栏
  changeActive(e) {
    this.setData({
      "active": e.detail
    })
    let id = this.data.tabList[this.data.active].id
    tt.pageScrollTo({
      scrollTop: this.data.obj[id] - 130,
      duration: 0
    })
  },
  // 切换音频视频索引
  // changePlay(e) {
  //   let index = e.currentTarget.dataset.index
  //   if (this.data.catalogueList[index].isFreeView) {
  //     this.setData({
  //       "freeView": true,
  //       "playIndex": index
  //     })
  //     if (this.data.PROD_TYPE[this.data.prodType]==='音频') {
  //       this.setData({
  //         "currentTimeNum": 0
  //       })
  //       this.playOff()
  //       this.playOn()
  //     }
  //     tt.pageScrollTo({
  //       scrollTop: 0,
  //       duration: 0
  //     })
  //   } else {
  //     tt.showToast({
  //       title: '暂无权限收听',
  //       icon: 'none'
  //     })
  //   }
  // },
  // 视频
  // timeupdate(e){
  //   this.setData({
  //     "currentTimeNum": e.detail.currentTime
  //   })
  // },
  // 音频播放
  // playOn() {
  //   if (this.data.freeView) {
  //     innerAudioContext.src = this.data.catalogueList[this.data.playIndex].resLink,
  //     innerAudioContext.autoplay = true
  //     innerAudioContext.loop = true
  //     innerAudioContext.obeyMuteSwitch = false //系统静音时也能播放声音
  //     innerAudioContext.startTime = this.data.currentTimeNum
  //     innerAudioContext.play(()=> {
  //       console.log('播放')
  //     })
  //     let timerPlay = setInterval(()=> {
  //         let duration = this.filter(innerAudioContext.duration,true)
  //         let percent = this.data.currentTimeNum / innerAudioContext.duration * 100
  //         let currentTime = this.filter(this.data.currentTimeNum, true)
  //         this.setData({
  //           "duration": duration,
  //           "progress": percent,
  //           "currentTimeNum": innerAudioContext.currentTime,
  //           "currentPlayTime": currentTime
  //         })
  //     },1000)
  //     this.setData({
  //       "play": true,
  //       "timerPlay": timerPlay
  //     })
  //   } else {
  //     tt.showToast({
  //       title: '暂无权限收听',
  //       icon: 'none'
  //     })
  //   }
    
  // },
  // 音频暂停
  // playOff() {
  //   innerAudioContext.pause(()=> {
  //     console.log('停止播放')
  //   })
  //   if (this.data.timerPlay) {
  //     clearInterval(this.data.timerPlay)
  //     this.setData({
  //       "play": false,
  //       "timerPlay": null
  //     })
  //   }
  //   // console.log('进度', this.data.currentPlayTime)
  // },
  // 音频后退
  // backward() {
  //   if (innerAudioContext.currentTime > 15) {
  //     let time = innerAudioContext.currentTime - 15
  //     let currentTime = this.filter(time,true)
  //     let percent = time / innerAudioContext.duration * 100
  //     this.setData({
  //       "currentPlayTime": currentTime,
  //       "currentTimeNum": time,
  //       "progress": percent
  //     })
  //     innerAudioContext.seek(time)
  //   } else {
  //     let currentTime = this.filter(0,true)
  //     this.setData({
  //       "currentPlayTime": currentTime,
  //       "currentTimeNum": 0
  //     })
  //     innerAudioContext.seek(0)
  //   }
  // },
  // 音频前进
  // forward() {
  //   if (innerAudioContext.currentTime < innerAudioContext.duration - 15) {
  //     let time = innerAudioContext.currentTime + 15
  //     let currentTime = this.filter(time,true)
  //     let percent = time / innerAudioContext.duration * 100
  //     this.setData({
  //       "currentPlayTime": currentTime,
  //       "currentTimeNum": time,
  //       "progress": percent
  //     })
  //     innerAudioContext.seek(time)
  //   } else if(innerAudioContext.currentTime === innerAudioContext.duration) {
  //     let currentTime = this.filter(0,true)
  //     this.setData({
  //       "currentTimeNum": 0,
  //       "currentPlayTime": currentTime,
  //     })
  //     innerAudioContext.seek(0)
  //     if (!this.data.play) {
  //       this.playOn()
  //     }
  //   } else {
  //     let currentTime = this.filter(innerAudioContext.duration,true)
  //     this.setData({
  //       "currentPlayTime": currentTime,
  //       "currentTimeNum": innerAudioContext.duration,
  //       "progress": 100
  //     })
  //     innerAudioContext.seek(innerAudioContext.duration)
  //   }
  // },
  // 上一个
  // getPrevious() {
  //   if (this.data.playIndex > 0) {
  //     let index = this.data.playIndex - 1
  //     this.setData({
  //       "playIndex": index,
  //       "currentTimeNum": 0
  //     })
  //     this.playOff()
  //     innerAudioContext.seek(0)
  //     this.playOn()
  //   }
  // },
  // 下一个
  // getNext() {
  //   let index = this.data.playIndex + 1
  //   if (this.data.playIndex < this.data.catalogueList.length - 1 && this.data.catalogueList[index].isFreeView) {
  //     this.setData({
  //       "playIndex": index,
  //       "currentTimeNum": 0
  //     })
  //     this.playOff()
  //     innerAudioContext.seek(0)
  //     this.playOn()
  //   }
  // },
  // touchmove(e) {
  //   if(this.data.timerPlay) {  
  //     clearInterval(this.data.timerPlay);  
  //     this.setData({
  //       "timerPlay": null
  //     })
  //   }
  //   this.setData({
  //     "movePageX": e.touches[0].pageX
  //   })
  //   let addProgress = (e.touches[0].pageX - this.data.touchesPageX)/this.data.width*2
  //   let progress = this.data.progress + addProgress
  //   progress = !(progress > 100) ? progress : 100
  //   let currentTimeNum = progress / 100 * innerAudioContext.duration
  //   let currentTime = this.filter(currentTimeNum, true)
  //   this.setData({
  //     "progress": progress,
  //     "currentTimeNum": currentTimeNum,
  //     "currentPlayTime": currentTime
  //   })
  // },
  // touchstart(e) {
  //   const query = tt.createSelectorQuery()
  //   query.select("#progress").boundingClientRect((res) => {
  //     this.setData({
  //       "progressWidth": res.width,
  //     })
  //   }).exec()
  //   query.select("#time").boundingClientRect((res) => {
  //     this.setData({
  //       "timeWidth": res.width,
  //     })
  //   }).exec()
  //   this.setData({
  //     "touchesPageX": e.touches[0].pageX
  //   })
  // },
  // touchend(e) {
  //   this.setData({
  //     "touchesEndPageX": e.changedTouches[0].pageX
  //   })
  //   innerAudioContext.seek(this.data.currentTimeNum)
  //   let timerPlay = setInterval(()=> {
  //     let duration = this.filter(innerAudioContext.duration,true)
  //       let percent = innerAudioContext.currentTime / innerAudioContext.duration * 100
  //       let currentTime = this.filter(innerAudioContext.currentTime, true)
  //       this.setData({
  //         "duration": duration,
  //         "progress": percent,
  //         "currentTimeNum": innerAudioContext.currentTime,
  //         "currentPlayTime": currentTime
  //       })
  //   },1000)
  //   this.setData({
  //     "play": true,
  //     "timerPlay": timerPlay
  //   })
  // },
  // 获取商品详情信息
  async getInfo() {
    try {
      let info = await util.ttRequestGet(`dyprod/prodDetail/${this.data.prodId}`)
      let price = info.price.toFixed(2)
      let priceFirst = price.toString().split('.')[0]
      let priceEnd = '.' + price.toString().split('.')[1]
      let newInfo = {...info,priceFirst,priceEnd,price}
      this.setData({
        "info": newInfo,
        "prodType": info.prodType,
        "recommendList": info.prodInfoRelatesList
      })
      if(info.couponDefaultProdVo) {
        let price = info.flashSalesForProd ? info.flashSalesForProd.flashSalesPrice : info.price
        let num = (price - info.couponDefaultProdVo.couponProdVo.amount).toFixed(2)
        num = num > 0? num: 0.01
        this.setData({
          "postCouponPrice": num
        })
      }
      if (info.flashSalesForProd) {
        let endDate = new Date(info.flashSalesForProd.endTime).getTime()
        this.setData({
          "endDate": endDate,
        },()=> {
          let timer = setInterval(()=> {
            this.countDown(this.data.endDate)
          },1000)
          this.setData({
            "timer": timer
          })
        })
      }
      if(info.catalogueSize) {
        this.getCatalogue()
      }
      this.getIntroduce()
      this.getComment()
    } catch(e) {
      console.log(e)
    }
    console.log('info',this.data.info)
  },
  countDown(endDate) {
    let time = (endDate - new Date().getTime())/1000
    if (time !== 0) {
      let day = parseInt(time / 60 / 60 / 24)
      day = day.toString().split('')
      let hour = parseInt(time / 60 / 60 % 24)
      hour = hour < 10 ? '0' + hour : hour+''
      hour = hour.split('')
      let minute = parseInt(time / 60 % 60)
      minute = minute < 10 ? '0' + minute : minute+''
      minute = minute.split('')
      let seconds = parseInt(time % 60)
      seconds = seconds < 10 ? '0' + seconds : seconds+''
      seconds = seconds.split('')
      this.setData({
        "day": day,
        "hour": hour,
        "minute": minute,
        "seconds": seconds
      })
    } else {
      clearInterval(this.data.timer)
      this.setData({
        "timer": null
      })
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
  // 获取分类信息
  async getCatalogue() {
    // if (PROD_TYPE[this.data.prodType]==='视频' || PROD_TYPE[this.data.prodType]==='音频') {
    //   try {
    //     let data = await util.ttRequestPost('dyprod/getProdDetailList',{
    //       id: this.data.prodId,
    //       prodType: this.data.prodType
    //     })
    //     let arr = data.records
    //     for(let i = 0; i < arr.length; i++) {
    //       let time = this.filter(arr[i].resDuration)
    //       arr[i].resDuration = time
    //     }
    //     this.setData({
    //       "catalogueList": arr
    //     })
    //     console.log('catalogueList',this.data.catalogueList)
    //     if (this.data.catalogueList[this.data.playIndex].isFreeView) {
    //       this.setData({
    //         "freeView": true
    //       })
    //     }
    //     if (this.data.catalogueList.length && this.data.info.hasPurview) {
    //       this.data.catalogueList.forEach((item,index)=>{
    //         if (item.id === this.data.info.lastProdVideoId) {
    //           this.setData({
    //             "playIndex": index,
    //             "currentTimeNum": item.lastPlayDuration
    //           })
    //         }
    //       })
    //       // if (PROD_TYPE[this.data.prodType]==='音频') {
    //       //   innerAudioContext.seek(this.data.currentTimeNum)
    //       // }
    //     }
    //     if (this.data.catalogueList.length &&  PROD_TYPE[this.data.prodType]==='音频' && (this.data.info.hasPurview || this.data.freeView)) {
    //       this.playOn()
    //     }
    //   } catch(e) {
    //     console.log(e)
    //   }
    // }else {
    //   try {
    //     let data = await util.ttRequestPost('dyprod/getSubProdList',{
    //       id: this.data.prodId,
    //       prodType: this.data.prodType
    //     })
    //     this.setData({
    //       "catalogueList": data.records
    //     })
    //   } catch(e) {
    //     console.log(e)
    //   }
    // }
    try {
      let data = await util.ttRequestPost('dyprod/getSubProdList',{
        id: this.data.prodId,
        prodType: this.data.prodType
      })
      this.setData({
        "catalogueList": data.records
      })
    } catch(e) {
      console.log(e)
    }
  },
  // 获取课程介绍内容
  async getIntroduce() {
    let data = await util.ttRequestGet(`dyprod/getDetailInfo/${this.data.prodId}`)
    let htmlList = []
    for(let i = 0; i < data.length; i++) {
      let obj = {}
      if (data[i].type == 1 && data[i].content && data[i].content.includes('http') && data[i].content.substring(0,4) == 'http' && data[i].content.length > 5) {
        let res = await getPageHtml(data[i].content)
        obj['content'] = res
      } else {
        obj['content'] = data[i].content
      }
      htmlList.push(obj)
    }
    this.setData({
      "introduce": htmlList
    },()=> {
      // if (this.data.catalogueList.length && PROD_TYPE[this.data.prodType]==='音频') {
      //   const query = tt.createSelectorQuery()
      //   query.select("#progress").boundingClientRect((res) => {
      //     this.setData({
      //       "progressWidth": res.width,
      //     })
      //   }).exec()
      //   query.select("#time").boundingClientRect((res) => {
      //     this.setData({
      //       "timeWidth": res.width,
      //     },()=>{
      //       this.setData({
      //         "width": this.data.progressWidth
      //       })
      //       // console.log('width',this.data.width)
      //     })
      //   }).exec()
      // }
      // if (PROD_TYPE[this.data.prodType]==='视频') {
      //   let innerVideoContext = tt.createVideoContext('myVideo') // 视频
      //   // console.log('seek',this.data.currentTimeNum)
      //   innerVideoContext.seek(this.data.currentTimeNum)
      // }
    })
    let tabList = [
      {name: '评价',id:'evaluation'},
      {name:'目录',id:'catalogue'},
      {name:'详情',id: 'details'}, 
      {name:'相关推荐', id: 'recommend'}
    ]
    let newTabList = []
    tabList.forEach(item=> {
      if(item.id === 'evaluation' && this.data.comment.length) {
        newTabList.push(item)
      }
      if(item.id === 'catalogue' && this.data.catalogueList.length) {
        item.name = `目录(${this.data.catalogueList.length})`
        newTabList.push(item)
      }
      if(item.id === 'details' && this.data.introduce.length) {

        newTabList.push(item)
      }
      if(item.id === 'recommend' && this.data.recommendList.length) {

        newTabList.push(item)
      }
    })
    this.setData({
      "tabList": newTabList
    },()=> {
      if (this.data.tabList.length) {
        for(let i = 0; i < this.data.tabList.length; i++) {
          let query = tt.createSelectorQuery()
          query.select(`#${this.data.tabList[i].id}`).boundingClientRect((rect) => {
            let top = rect.top
            let obj = {...this.data.obj}
              obj[this.data.tabList[i].id] = top
              this.setData({
                "obj": obj
               })
           
           }).exec()
        }
      }
    })
  },
  // 获取评论列表
  async getComment() {
    let data = await util.ttRequestGet('comment/page', {
      pid: this.data.prodId,
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize
    })
    this.setData({
      'comment': data.records
    })
    console.log('comment', this.data.comment)
  },
  // 保存学习记录
  // keepLearningRecords() {
  //   let data = {
  //     prodVideoId: this.data.catalogueList[this.data.playIndex].id,
  //     duration: this.data.currentTimeNum,
  //     prodId: this.data.info.parentId || this.data.prodId,
  //     prodType: this.data.prodType,
  //     subProdId: this.data.info.parentId ? this.data.prodId : '',
  //     subProdType: ''
  //   }
  //   util.ttRequestPost('dymine/learningLogs',data)
  // },
  onPageScroll(e) {
    if (this.data.tabList.length) {
      let query = tt.createSelectorQuery()
      query.select(`#${this.data.tabList[0].id}`).boundingClientRect((rect) => {
       let top = rect.top
       if (top <= 160) { //临界值
        this.setData({
         'fixedNav': true
        })
       } else{
         this.setData({
           'fixedNav': false,
           'active': 0
         })
       }
      }).exec()
      for(let i = 0; i < this.data.tabList.length; i++) {
       let query = tt.createSelectorQuery()
       query.select(`#${this.data.tabList[i].id}`).boundingClientRect((rect) => {
        let top = rect.top
        if (top <= 160) { //临界值
          this.setData({
            'active': i
           })
        }
       }).exec()
      }
    }
   },
  onUnload: function () {
    // if (this.data.info.hasPurview && this.data.catalogueList[this.data.playIndex].resLink) {
    //   this.keepLearningRecords()
    // }
    if(this.data.timer) {  
      clearInterval(this.data.timer)  
      this.setData({
        "timer": null
      })
    }
    if(this.data.timerPlay) {  
      clearInterval(this.data.timerPlay);  
      this.setData({
        "timerPlay": null
      })
      innerAudioContext.stop()
    }
  },
  onLoad: function (options) {
    this.setData({
      "prodId": options.id,
      "PROD_TYPE": PROD_TYPE
    })
    this.getInfo()
    tt.setNavigationBarTitle({
      title: options.type + '详情'
    })
  }
})