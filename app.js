let utilJs = require("/utils/util.js");
let constData = require("/utils/constData.js");
// import { initReport } from "/utils/reportAnalytics.js";
App({
  utilJs: utilJs,
  constData: constData,
  onLaunch(options) {
    let refereeId = options && options.query && options.query.refereeId || '';
    if (refereeId) {
      this.globalData.refereeId = refereeId
    }
    tt.setStorageSync('dyUserId', '1542402625372450817');
    tt.setStorageSync('userMobile', '18359115221');
    tt.setStorageSync('dyToken', 'eyJjcmVhdG9yIjoiVElLVE9LLVNIT1AiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aWt0b2stc2hvcCIsInJmdCI6MTY2MTU4ODk3OCwidWlkIjoiMTU0MjQwMjYyNTM3MjQ1MDgxNyIsIm5iZiI6MTY1OTA4MzM3OCwiY3YiOjEwMCwiaXNzIjoiY2tqciIsInV0eSI6MSwiZXhwIjoxNjYxNjc1Mzc4LCJpYXQiOjE2NTkwODMzNzgsImFpZCI6IjE1NDI0MDI2MjUzNzI0NTA4MTciLCJjaWQiOiIxMTczOTQ1MDc3MDg4ODg4ODg4In0.RpKqgO3AGNnDh-Z3qcHPejEKU7EPyFuAE8GjDTpL-Oo');
    this.globalData.userId = '1542402625372450817';
    this.globalData.userMobile = '18359115221';
    utilJs.getShareTip();
    this.globalData.isIosApp = utilJs.isIos();
    let data = {
      method: 'appOnLaunch',
      query: options && options.query || '',
      enterPath: options.path,
      scene: options.scene,
      showFrom: options.showFrom
    }
    utilJs.reportSysLog(data);
    // initReport();
    this.checkUpdate();
  },
  checkUpdate(){
    const updateManager = tt.getUpdateManager();
    updateManager.onUpdateReady((res) => {
      tt.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启小程序？",
        success: (res) => {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        },
      });
    });
  },
  globalData: {
    isIosApp: false,
    // 公司logo
    logoPic: "/assets/img/logo.png",
    // 默认头像图片
    demoPic: "/assets/img/defult_head.png",
    // 默认商品图片
    goodsPic: "https://kposshz-qncdn.ckjr001.com/admin/material/25_material_admin/image/img/default_cover.png",
    // 代理商默认商品图片
    agentPic: "/assets/img/Vpic.png",
    // 默认大V
    Vpic: "/assets/img/Vpic.png",
    // 类型对应的名称
    typeName: {
      9: '专栏',
      110: '视频',
      111: '音频',
      112: '图文'
    },
    // tab参数
    tabList: [{
      key: 110,
      value: '视频'
    },
    {
      key: 111,
      value: '音频'
    }, {
      key: 112,
      value: '图文'
    },
    {
      key: 9,
      value: '专栏'
    }],
    // apiUrl: "https://tkapi.ckjr001.com/ttapi/",
    // apiUrl: "https://tiktokshop.myckjr.com/ttapi/",
    apiUrl: "https://kpapi-cs.ckjr001.com/api/ttapi/",
    PROD_TYPE: {
      'VIDEO': 110,
      'AUDIO': 111,
      'ARTICLE': 112,
      'COLUMN': 9,
    },
    PROD_ROUTER_MAP: {
      9: '/pages/home/details/column/index',
      110: '/pages/home/details/index',
      111: '/pages/home/details/index',
      112: '/pages/home/details/index'
    },
    shareTemplateId: '',
    companyName: '创客匠人',
    refereeId: '',
    userId: '',
    userName: '',
    wxPayUrl: '',
    userMobile: '',
    pushUrl: '',
    payRoute: '',
    audioPlayOrder: 1,//音频播放顺序
    backgroundAudioList: [],//音频列表 用来后台播放自动切下一首
    isInitAudioEvent: 0,
    shareConfig: null,
    columnPlayOrderList: [],
  }
})