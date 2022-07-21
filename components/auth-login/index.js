let utilJs = require("../../utils/util.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowCancel: {
      type: Boolean,
      value: true,
    }
  },
  ready() {
  },

  /**
   * 组件的初始数据
   */
  data: {
    showDialog: false,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    async public_openAuth() {
      //如果已授权用户信息，则不弹出授权直接登录
      let result = await utilJs.checkHasAuthUserInfo();
      if (result) {
        utilJs.userLogin();
        return;
      }
      this.setData({
        showDialog: true,
      })
    },
    tapCancel() {
      this.setData({
        showDialog: false,
      })
    },
    tapLogin(){
      if(this.isClicking){
        return;
      }
      this.isClicking = true;
      utilJs.userLogin(() => {
        this.isClicking = false;
      });
    },
    getPhoneNumberHandler(e) {
      if (!e.detail.encryptedData || !e.detail.iv) {
        utilJs.showMyToast(e.detail.errMsg, 'error');
        return;
      }
      let url = `dymine/binUserMobile`;
      let data = {
        "encryptedData": e.detail.encryptedData,
        "iv": e.detail.iv,
        "code": this.loginCode
      }
      utilJs.ttRequestPost(url, data).then(res => {
        utilJs.showMyToast('绑定成功');
        tt.setStorageSync('userMobile', res);
        getApp().globalData.userMobile = res;
        this.triggerEvent('bindSuccess');
      });
    },
  }
})