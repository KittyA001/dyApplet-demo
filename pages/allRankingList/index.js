// d:\items\dyshop-demo\抖音测试\抖音测试\pages\allRankingList\allRankingList.js
let info = {
  sectionName: "新课上线",
  sectionId: "1505827395256266753",
  dyProdListVoList: [
    {
      buyNum: "3601",
      couponProdListVo: null,
      cover: "https://knowledge-payment.oss-cn-beijing.aliyuncs.com/13/resource/admin-fe_lj7l_CsrpRATJH2sjbTAB4pSb.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_600/quality,q_100",
      flashSalesForProd: null,
      headimgurl: "https://ckjr-lib-1256159786.cos.ap-shanghai.myqcloud.com//TIKTOK/1442690456172453889/202202/A65X2i2pKxcbYFcx_1645760534513.jpg",
      id: "1527165249394475009",
      isSoldSeparately: 1,
      name: "CZ单节部分试听多节8.27-2",
      payType: 2,
      price: 0.01,
      prodType: 111,
      recordType: null,
      talentDesc: null,
      talentName: "创客匠人平台2达人",
      talentType: null,
      talentTypeName: null
    },
    {
      buyNum: "3601",
      couponProdListVo: null,
      cover: "https://knowledge-payment.oss-cn-beijing.aliyuncs.com/13/resource/admin-fe_lj7l_CsrpRATJH2sjbTAB4pSb.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_600/quality,q_100",
      flashSalesForProd: {
        discount: 6.66,
        enableOvertimePay: 0,
        enableUnderStockPay: 0,
        endTime: "2023-06-30 15:45",
        flashSalesId: "1542776446025760770",
        flashSalesPrice: 1.99,
        flashSalesProdId: "1542776446277419010",
        lastCount: -1,
        name: "我的世界：如何抓捕章",
        now: "2022-07-06 17:17:44",
        price: 2.99,
        realStatus: 1,
        salesLimit: 0,
        startTime: "2022-07-01 15:45"
      },
      headimgurl: "https://ckjr-lib-1256159786.cos.ap-shanghai.myqcloud.com//TIKTOK/1442690456172453889/202202/A65X2i2pKxcbYFcx_1645760534513.jpg",
      id: "1527165249394475009",
      isSoldSeparately: 1,
      name: "CZ单节部分试听多节8.27-2",
      payType: 2,
      price: 0.01,
      prodType: 111,
      recordType: null,
      talentDesc: null,
      talentName: "创客匠人平台2达人",
      talentType: null,
      talentTypeName: null
    },
    {
      buyNum: "3601",
      couponProdListVo: null,
      cover: "https://knowledge-payment.oss-cn-beijing.aliyuncs.com/13/resource/admin-fe_lj7l_CsrpRATJH2sjbTAB4pSb.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_600/quality,q_100",
      flashSalesForProd: {
        discount: 6.66,
        enableOvertimePay: 0,
        enableUnderStockPay: 0,
        endTime: "2023-06-30 15:45",
        flashSalesId: "1542776446025760770",
        flashSalesPrice: 1.99,
        flashSalesProdId: "1542776446277419010",
        lastCount: -1,
        name: "我的世界：如何抓捕章",
        now: "2022-07-06 17:17:44",
        price: 2.99,
        realStatus: 1,
        salesLimit: 0,
        startTime: "2022-07-01 15:45"
      },
      headimgurl: "https://ckjr-lib-1256159786.cos.ap-shanghai.myqcloud.com//TIKTOK/1442690456172453889/202202/A65X2i2pKxcbYFcx_1645760534513.jpg",
      id: "1527165249394475009",
      isSoldSeparately: 1,
      name: "CZ单节部分试听多节8.27-2",
      payType: 2,
      price: 0.01,
      prodType: 111,
      recordType: null,
      talentDesc: null,
      talentName: "创客匠人平台2达人",
      talentType: null,
      talentTypeName: null
    },
    {
      buyNum: "3601",
      couponProdListVo: null,
      cover: "https://knowledge-payment.oss-cn-beijing.aliyuncs.com/13/resource/admin-fe_lj7l_CsrpRATJH2sjbTAB4pSb.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_600/quality,q_100",
      flashSalesForProd: {
        discount: 6.66,
        enableOvertimePay: 0,
        enableUnderStockPay: 0,
        endTime: "2023-06-30 15:45",
        flashSalesId: "1542776446025760770",
        flashSalesPrice: 1.99,
        flashSalesProdId: "1542776446277419010",
        lastCount: -1,
        name: "我的世界：如何抓捕章",
        now: "2022-07-06 17:17:44",
        price: 2.99,
        realStatus: 1,
        salesLimit: 0,
        startTime: "2022-07-01 15:45"
      },
      headimgurl: "https://ckjr-lib-1256159786.cos.ap-shanghai.myqcloud.com//TIKTOK/1442690456172453889/202202/A65X2i2pKxcbYFcx_1645760534513.jpg",
      id: "1527165249394475009",
      isSoldSeparately: 1,
      name: "CZ单节部分试听多节8.27-2",
      payType: 2,
      price: 0.01,
      prodType: 111,
      recordType: null,
      talentDesc: null,
      talentName: "创客匠人平台2达人",
      talentType: null,
      talentTypeName: null
    }
  ]
}
let { ttRequestPost } = require("../../utils/util")
const { PROD_TYPE } = require('../../utils/constData')

Page({
  data: {
    list: [],
    sectionType: '',
    pageNo: 1,
    size: 10,
    total: 10,
    loading: false,
    finish: false,
    scrollTop: ''
    // scrollHeight: '',
    // isusescroll: ''
  },
  async getList() {
    this.setData({
      "loading": true
    })
    try {
      // https://kpapi-cs.ckjr001.com/api/ttapi/dyhomepage/sectionContentList
      let info = await ttRequestPost('dyhomepage/sectionContentList',{
        categoryId: "",
        content: "",
        level: "1",
        pageNo: this.data.pageNo,
        pageSize: this.data.size,
        prodType: "",
        sectionType: this.data.sectionType
      })
      let arr = this.data.list
      arr.push(...info.records)
      // arr.push(...infoData.dyProdListVoList)
      this.setData({
        "list": arr,
        "total": info.total,
        "loading": false
      })
      // this.setData({
      //   "list": arr,
      //   "total": infoData.total,
      //   "loading": false
      // })
      
    } catch (e) {
      console.log(e)
    }
  },
  goDetails(e) {
    let id = e.currentTarget.dataset.id
    let type = PROD_TYPE[e.currentTarget.dataset.type]
    tt.navigateTo({url: `/pages/home/details/index?id=${id}&type=${type}`})
  },
  scrollFloatwindow(e,that) {
    if (e.scrollTop <= 0) {
      console.log(e)
      e.scrollTop = 0;     //最顶部
    } else if (e.scrollTop > that.data.scrollHeight) {
      e.scrollTop = that.data.scrollHeight;    //最底部
    }else if(e.scrollTop > that.data.scrollTop || e.scrollTop >= that.data.scrollHeight){
       that.setData({
       istrue_scroll:true
     })
    }else{
       that.setData({
      istrue_scroll:false
     })
    }
    that.setData({
    scrollTop:e.scrollTop
    })
    //that.data.scrollTop:e.scrollTop
  },
  // onPageScroll(e) {
  //   if(this.data.isusescroll=="no_normal"){
  //     let that = this
  //     tt.createSelectorQuery().select('#box').boundingClientRect((rect) => {
  //       this.setData({
  //         'scrollHeight': rect.height
  //       })
  //     }).exec()
  //     this.scrollFloatwindow(e,that);
  //   }else{
  //     return;
  //   }
  //   console.log('e',e)
  // },
  onPageScroll (e) {
    let scrollTop = e.scrollTop
    this.setData({
      "scrollTop": scrollTop
    })
    // 128
    console.log('this.data.scrollTop', this.data.scrollTop)
  },
onReachBottom() {
  this.setData({
    "loading": true
  })
  if (!this.data.finish) {
    let num = this.data.total/this.data.size
    // console.log('num', num)
    if (num > this.data.pageNo) {
    let pageNo = this.data.pageNo + 1
      this.setData({
        "pageNo": pageNo
      })
      // console.log('pageNo', this.data.pageNo)
      this.getList()
    } else {
      this.setData({
        "loading": false,
        "finish": true
      })
    }
  } else {
    this.setData({
      "loading": false
    })
  }

},
  onLoad: function (options) {
    // this.setData({
    //   "list": info.dyProdListVoList
    // })
    this.setData({
      "sectionType": options.id
    })
    console.log('sectionType', this.data.sectionType)
    this.getList()
  }
})