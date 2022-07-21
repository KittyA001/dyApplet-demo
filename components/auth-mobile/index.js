let utilJs = require("../../utils/util.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
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
    public_openAuth() {
      let that = this;
      this.setData({
        showDialog: true,
      })
      tt.login({
        force: true,
        success(res) {
          that.loginCode = res.code;
        }
      });
    },
    tapCancel() {
      this.setData({
        showDialog: false,
      })
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