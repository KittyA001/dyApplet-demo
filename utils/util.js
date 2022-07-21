//将毫秒转成 xx：xx:xx 时:分：秒
function millisecondToHour(millisecond){
  const HOUR = 60 * 60 * 1000;
  const MINUTE = 60 * 1000;
  let h = Math.floor(millisecond / HOUR);
  let m = Math.floor((millisecond - h * HOUR) / MINUTE);
  let s = Math.floor((millisecond - h * HOUR - m * MINUTE)/1000);
  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  return `${h}:${m}:${s}`;
}
/**
 * 将时间转成规定的时间
 * 规则:
 * 当时间于当前时间相差1小时，则为---‘刚刚’
 * 当时间大于1小时并且时间为当天，则返回时间08:00
 * 大于1天 返回日期 01-01
 * 非本年 返回年月日 2018-01-01
 * timeStr(2018-01-01 08:08:08)
 */
function timeChange(timeStr) {

  let timeDate = new Date(timeStr.replace(/\-/g, "/"));
  let curYear = timeDate.getFullYear();
  let curMouth = timeDate.getMonth() + 1;
  let curDay = timeDate.getDate();
  let curHour = timeDate.getHours();
  let curMinutes = timeDate.getMinutes();
  let curSeconds = timeDate.getSeconds();

  let now = new Date();
  let nowYear = now.getFullYear();
  let nowMouth = now.getMonth() + 1;
  let nowDay = now.getDate();

  let curStrMouth = curMouth < 10 ? '0' + curMouth : '' + curMouth;
  let curStrDay = curDay < 10 ? '0' + curDay : '' + curDay;
  let curStrHour = curHour < 10 ? '0' + curHour : '' + curHour;
  let curStrMinutes = curMinutes < 10 ? '0' + curMinutes : '' + curMinutes;
  let curStrSeconds = curSeconds < 10 ? '0' + curSeconds : '' + curSeconds;


  let returnYear = '';
  let returnDate = '';
  if (curYear != nowYear) {
    returnYear = curYear;
  }
  if (curYear == nowYear && curMouth == nowMouth && curDay == nowDay) {
    returnDate = '今天';
  } else if (curYear == nowYear && curMouth == nowMouth && curDay == nowDay - 1) {
    returnDate = '昨天';
  } else if (curYear == nowYear) {
    returnDate = curMouth + '-' + curDay;
  } else {
    returnDate = curYear + '-' + curMouth + '-' + curDay;
  }

  return returnDate + '  ' + curStrHour + ':' + curStrMinutes;




}



function istell(phoneStr) {
  var mobile = /^((1)+\d{10})$/;
  return mobile.test(phoneStr);
}

function isPassword(str) {
  var result = str.match(/\d{6}/);
  if (result == null) return false;
  return true;
}

function isBankCardNo(str) {
  var result = str.match(/\d{16}|\d{17}|\d{18}|\d{19}|\d{20}|\d{21}/);
  if (result == null) return false;
  return true;
}

function isidcard(str) {
  var result = str.match(/\d{15}|\d{18}/);
  if (result == null) return false;
  return true;
}

function isMobile(str) {
  var reg = /^0{0,1}(13[0-9]|145|147|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/i;
  if (!reg.test(str)) {
    return false;
  }
  return true;
}


function isIos() {
  var res = tt.getSystemInfoSync()
  if (res.system.toLowerCase().includes('ios')) {
    return true;
  } else {
    return false;
  }
}
// 获取字符长度
function getLength(str) {
  // 如果传入的是undefined 则不进行正则判断
  if (!str) {
    return 0
  }
  const chStr = str
  const reg = /([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[^\x00-\xff])/g
  // 中文及字符的长度
  var Ch = chStr.length - chStr.replace(reg, '').length
  // 非中文字符的长度 2个非中文算一个长度  3个取1个长度
  var En = Math.floor(chStr.replace(reg, '').length / 2)
  return (Ch + En)
}
//验证是否为数字
function isNumber(value) {
  var patrn = /^(-)?\d+(\.\d+)?$/;
  if (patrn.exec(value) == null || value == "") {
    return false
  } else {
    return true
  }
}
//  只能输入数字并且最多允许小数点2位
function numPoint2(num) {
  num = num.replace(/[^\d.]/g, '') // 仅保留数字和"."
  num = num.replace(/\.{2,}/g, '.') // 两个连续的"."仅保留第一个"."
  num = num
    .replace('.', '$#*')
    .replace(/\./g, '')
    .replace('$#*', '.') // 去除其他"."
  num = num.replace(/^(\d+)\.(\d\d).*$/, '$1.$2') // 限制只能输入两个小数
  if (num.indexOf('.') < 0 && num != '') {
    // 首位是0的话去掉
    num = parseFloat(num)
  }
  return num
}

function showMyToast(title = '成功', toaseType = 'success', time = 1500) {
  return new Promise(function (resolve, reject) {
    if (title.length > 7) {
      tt.showToast({
        title: title,
        icon: "none",
        duration: time,
        mask: true,
        success: function () {
          setTimeout(function () {
            resolve()
          }, time);
        },
        fail: function () {
          reject()
        }
      })
    } else {
      let icon = toaseType == 'success' ? 'success' : 'error' ? 'fail' : 'loading';
      tt.showToast({
        title: title,
        duration: time,
        icon: icon,
        success: function () {
          setTimeout(function () {
            resolve()
          }, time);
        },
        fail: function () {
          reject()
        }
      })
    }
  });
}


function showMyToastNoImg(title, time = 1500) {
  return new Promise(function (resolve, reject) {
    tt.showToast({
      title: title,
      icon: "none",
      duration: time,
      mask: true,
      success: function () {
        setTimeout(function () {
          resolve()
        }, time);
      },
      fail: function () {
        reject()
      }
    })
  });
}




function showModal(option = {}) {
  return new Promise(function (resolve, reeject) {
    tt.showModal({
      title: '提示',
      content: option.content,
      confirmText: option.confirmText,
      showCancel: option.showCancel,
      cancelText: option.cancelText,
      success: function (res) {
        if (res.confirm) {
          resolve(res);
        } else if (res.cancel) {
          reeject(res);
        }
      }
    });
  });

}

function showLoading(title) {
  tt.showLoading({
    title: title,
    mask: true
  });
}

function hideLoading() {
  setTimeout(function () {
    tt.hideLoading();
  }, 100);
}

function setClipboardData(data){
  let that = this;
  return new Promise(function (resolve, reject) {
    tt.setClipboardData({
      data: data,
      success() {
        that.showMyToast("复制成功");
        resolve();
      },
      fail() {
        that.showMyToast("复制失败");
        reject();
      },
    });
  })
}


//吊起微信支付
function h5WxPay(data) {
  let that = this;
  return new Promise(function (resolve, reject) {
    let url = getApp().globalData.apiUrl + 'payment/wxpayConf';
    that.ttRequestPost(url, data).then(res => {
      getApp().globalData.wxPayUrl = res.mweb_url;
      tt.navigateTo({
        url: '../wxH5Pay/index',
      })
    }, failRes => {
      that.showMyToast('调用支付失败', 'error').then(res => {
        reject(failRes);
      });;
    });
  });
}
//吊起抖音微信支付
function dyWxPay(data) {
  let that = this;
  that.showLoading('正在请求支付');
  return new Promise(function (resolve, reject) {
    let url = getApp().globalData.apiUrl + 'dyapp/dyPayConf';
    that.ttRequestPost(url, data).then(resData => {
      that.hideLoading();
      resData.risk_info = "{\"ip\":\"127.0.0.1\",\"device_id\":\"485737374363263\"}";
      tt.pay({
        orderInfo: resData,
        service: 1,
        _debug: 0,
        getOrderStatus(res) {
          let { out_order_no } = res
          console.log(res)
          return new Promise(function (resolve, reject) {
            let url = `${getApp().globalData.apiUrl}dyapp/getWxOrderStatus`;
            that.ttRequestPost(url, { out_order_no: out_order_no }).then(result => {
              console.log(`***支付结果${result}`)
              resolve({ code: result });
            })
          });
        },
        success(res) {
          switch (res.code * 1) {
            case 0:
              tt.navigateBack();
              break;
            case 4:
              that.showMyToast('支付失败', 'error');
              break;
            default:
              that.showMyToast('取消支付', 'error');
              break;
          }
        },
        fail(res) {
          // 调起收银台失败处理逻辑
          that.showMyToast('调用支付失败', 'error')
        },
      });
    }, failRes => {
      that.hideLoading();
      that.showMyToast('下单失败', 'error').then(res => {
        reject(failRes);
      });;
    });
  });
}

function dyPay(orderInfo) {
  return new Promise((resolve, reject) => {
    tt.pay({
      orderInfo: {
        order_id: orderInfo.order_id,
        order_token: orderInfo.order_token,
      },
      service: 5,
      success(res) {
        if (res.code == 0) {
          // 支付成功处理逻辑，只有res.code=0时，才表示支付成功
          // 但是最终状态要以商户后端结果为准
          resolve();
        }
      },
      fail(res) {
        // 调起收银台失败处理逻辑
      },
    });
  });
}
//发送模板消息
function sendTemplateMessage(data) {
  return new Promise((resolve, reject) => {
    let url = getApp().globalData.apiUrl + 'merchant/sendTemplateMessage';

    this.ttRequestPost(url, data).then(res => {
      resolve(res);
    }, failRes => {
      reject(failRes);
    });;
  });

}

function ttRequestPost(url, datas = {}) {
  let that = this;
  return new Promise(function (resolve, reject) {
    tt.request({
      url: `${getApp().globalData.apiUrl}${url}`,
      header: {
        'X-Requested-Version': '20220721',
        'versionno': '1.2.202204061',
        'from-app': 'dy',
        'auth-appid': 'tte8bd9e0077971162',
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + tt.getStorageSync("dyToken")
      },
      data: datas,
      method: 'POST',
      success: res => {
        if (res.data.statusCode == 200) {
          resolve(res.data.data);
          return;
        }
        const tokenErrorArr = [402, 6001, 6006];
        if (tokenErrorArr.includes(res.data.statusCode)) {
          that.showMyToast('登录信息已过期', 'error');
          tt.clearStorageSync();
          getApp().globalData.userId = '';
          getApp().globalData.userMobile = '';
          reject(res.data.data);
          tt.switchTab({
            url: '/pages/home/index/index' // 指定页面的url
          });
          return;
        }
        if (res.data.msg) {
          that.showMyToast(res.data.msg, 'error');
        }
        reject(res)
      },
      fail: res => {
        console.log('===============请求的参数===')
        console.log(datas)
        console.log('===============请求的token===')
        console.log(tt.getStorageSync("dyToken"))
        console.log('==============返回的参数===')
        console.log(res)
        that.showMyToast('网络连接错误！', 'error');
        reject(res)
      }
    });
  });

}

function ttRequestGet(url, datas = {}) {
  let that = this;
  return new Promise(function (resolve, reject) {
    tt.request({
      url: `${getApp().globalData.apiUrl}${url}`,
      header: {
        'X-Requested-Version': '20220721',
        'versionno': '1.2.202204061',
        'from-app': 'dy',
        'auth-appid': 'tte8bd9e0077971162',
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + tt.getStorageSync("dyToken")
      },
      // body: JSON.stringify(datas),  // 不符规范且浏览器也不允许get发body
      data: datas,
      method: 'GET',
      success: res => {
        if (res.data.statusCode == 200) {
          resolve(res.data.data);
          return;
        }
        const tokenErrorArr = [402, 6001, 6006];
        if (tokenErrorArr.includes(res.data.statusCode)) {
          that.showMyToast('登录信息已过期', 'error');
          tt.clearStorageSync();
          getApp().globalData.userId = '';
          getApp().globalData.userMobile = '';
          tt.switchTab({
            url: '/pages/home/index/index' // 指定页面的url
          });
          // reject(res.data.data);
          return;
        }
        if (res.data.msg) {
          that.showMyToast(res.data.msg, 'error');
        }
        reject(res)
      },
      fail: res => {
        console.log('===============请求的参数===')
        console.log(datas)
        console.log('===============请求的token===')
        console.log(tt.getStorageSync("dyToken"))
        console.log('==============返回的参数===')
        console.log(res)
        reject(res)
      }
    });
  });
}

function setImgDefault(e, that, defultImg) {
  let errorData = e.currentTarget.dataset.errImg;
  let dataObj = {};
  dataObj[errorData] = defultImg;
  that.setData(dataObj)

}


function getScrollTop(id) {
  return new Promise(function (resolve, reject) {
    tt.createSelectorQuery().select(id).boundingClientRect(function (rect) {
      resolve(-rect.top)
    }).exec()
  });

}

function setScrollTop(top) {
  console.log('滚到***' + top)
  setTimeout(() => {
    tt.pageScrollTo({
      scrollTop: top,
      duration: 0
    })
  }, 50);

}

//tt登陆
function ttLogin() {
  let that = this;
  return new Promise(function (resolve, reject) {
    tt.login({
      success: res => {
        if (res.code) {
          resolve(res);
        } else {
          that.showMyToast('头条登录失败' + res.errMsg, 'error').then(toastRes => {
            reject(res);
          });
        }
      },
      fail: res => {
        that.showMyToast('头条登录失败', 'error').then(toastRes => {
          reject(res);
        });

      }
    })
  });
}

//tt获取用户信息
function ttGetUserInfo() {
  let that = this;
  return new Promise(function (resolve, reject) {
    tt.getUserInfo({
      withCredentials: true,
      success: res => {
        resolve(res);
      },
      fail: res => {
        that.showMyToast('获取信息失败', 'error').then(toastRes => {
          tt.openSetting();
          reject(res);
        });
      }
    })
  });
}

function checkNeedLogin() {
  let refreshTime = tt.getStorageSync('refreshTime');
  let nowTime = Date.now() / 1000;
  let token = tt.getStorageSync('dyToken');
  let dyUserId = tt.getStorageSync('dyUserId');
  if (refreshTime && nowTime < refreshTime && token && dyUserId) {
    getApp().globalData.userId = dyUserId;
    getApp().globalData.userMobile = tt.getStorageSync('userMobile');
    getApp().globalData.userName = tt.getStorageSync('userName');
    return true;
  }
  return false;
}

async function userLogin(callBack) {
  if (this.checkNeedLogin()) {
    callBack && callBack({
      resCode: 1,
    })
    return;
  }
  this.showLoading('加载中...');
  let ttLoginRes = null;
  try {
    ttLoginRes = await this.ttLogin();
  } catch (error) {
  }

  if (!ttLoginRes) {
    this.hideLoading();
    callBack && callBack({ resCode: -1 });
    return;
  }
  let ttUserInfo = null;
  try {
    ttUserInfo = await this.ttGetUserInfo();
  } catch (error) {
  }
  if (!ttUserInfo) {
    this.hideLoading();
    callBack && callBack({ resCode: -2 });
    return;
  }
  let options = tt.getLaunchOptionsSync();
  let dyUserId = tt.getStorageSync('dyUserId');
  let refereeId = options && options.query && options.query.refereeId;
  let loginData = {
    dyUserId: dyUserId,
    code: ttLoginRes.code,
    refereeId: refereeId,
    nickName: ttUserInfo.userInfo.nickName,
    avatarUrl: ttUserInfo.userInfo.avatarUrl,
    gender: ttUserInfo.userInfo.gender,
    city: ttUserInfo.userInfo.city,
    province: ttUserInfo.userInfo.province,
    country: ttUserInfo.userInfo.country,
    language: ttUserInfo.userInfo.language,
  }
  let userLoginRes = null;
  console.log('登陆data---', loginData)
  try {
    userLoginRes = await this.ttRequestPost(`app/login?code=${ttLoginRes.code}`, loginData);
  } catch (error) {
  }
  if (!userLoginRes) {
    this.hideLoading();
    callBack && callBack({ resCode: -3 });
    return;
  }
  tt.setStorageSync('dyToken', userLoginRes.access_token);
  tt.setStorageSync('dyUserId', userLoginRes.userid);
  tt.setStorageSync('userMobile', userLoginRes.mobile);
  tt.setStorageSync('userName', userLoginRes.nickname);
  tt.setStorageSync('refreshTime', userLoginRes.refresh_time);
  getApp().globalData.userId = userLoginRes.userid;
  getApp().globalData.userName = userLoginRes.nickname;
  getApp().globalData.userMobile = userLoginRes.mobile;
  this.hideLoading();
  callBack && callBack({
    resCode: 1,
  })
}
function isLogin() {
  if (getApp().globalData.userId || this.checkNeedLogin()) {
    return true;
  } else {
    return false;
  }
}
//进入课程详情
function goCourseDetail(courseType, ckFrom, courseId, extId) {
  switch (courseType * 1) {
    case 0:
      tt.navigateTo({
        url: "/pages/home/course/video/index?courseId=" + courseId + '&ckFrom=' + ckFrom + '&extId=' + extId
      });
      break;
    case 1:
      tt.navigateTo({
        url: "/pages/home/course/audio/index?courseId=" + courseId + '&ckFrom=' + ckFrom + '&extId=' + extId
      });
      break;
    case 2:
      tt.navigateTo({
        url: "/pages/home/course/article/index?courseId=" + courseId + '&ckFrom=' + ckFrom + '&extId=' + extId
      });
      break;

    default:
      break;
  }
}

///是否有敏感字
function hasSensitiveText(str) {
  return str.toLowerCase().includes('vip') || str.toLowerCase().includes('svip') || str.includes('会员') || str.toLowerCase().includes('购买');

}
//后台编辑器详情页html的请求,注：只适合编辑器的内容，不含js代码块的，用于v-html的代码片段
function getPageHtml(url, datas = {}) {
  return new Promise(function (resolve, reject) {
    tt.request({
      url: url,
      header: {
        'data-type': 'html'
      },
      data: datas,
      method: 'GET',
      success: res => {
        console.log('===success===', res)
        resolve(res.data);
      },
      fail: res => {
        console.log('===============fail===', res)
        reject(res)
      }
    });
  });
}

function setAppShare(shareOption, prodOption) {
  let shareTitle = prodOption.name;
  let templateId = prodOption.templateId || getApp().globalData.shareTemplateId;
  let path = prodOption.path;
  let shareImgUrl = prodOption.cover;
  let topic = getApp().globalData.shareConfig && getApp().globalData.shareConfig.defaultTopic || shareTitle;
  console.log('setAppShare---')
  if (shareOption.channel == 'video') {
    return {
      title: shareTitle,
      templateId: templateId,
      path: path,
      extra: {
        videoTopics: [topic], // 只有抖音支持该属性
        hashtag_list: [topic]
      },
      success: () => {
        console.log('shareSuccessRecord---')
        this.shareSuccessRecord(prodOption.prodId);
      },
    };
  }
  return {
    title: shareTitle,
    templateId: getApp().globalData.shareTemplateId,
    imageUrl: shareImgUrl,
    path: path,
  };
}

function shareSuccessRecord(prodId) {
  if (!prodId) {
    return;
  }
  this.ttRequestPost(`dyprod/hangedProd?prodId=${prodId}`);
}

function setRefereeId(option = {}) {
  if (option.refereeId) {
    getApp().globalData.refereeId = option.refereeId;
  }
  let data = {
    method: 'pageOnLaunch',
    query: option,
  }
  this.reportSysLog(data);
}

function reportSysLog(sourceData) {
  let pageList = getCurrentPages();
  let routerPath = pageList.length > 0 && pageList[pageList.length - 1].route || '';
  let sysInfo = tt.getSystemInfoSync();
  let otherData = {
    platform: sysInfo.platform,
    brand: sysInfo.brand,
    version: sysInfo.version,
    appName: sysInfo.appName,
    SDKVersion: sysInfo.SDKVersion,
    SDKVersion: sysInfo.SDKVersion,
  }
  let otherInfo = { ...otherData, ...sourceData };
  let postData = {
    userId: getApp().globalData.userId,
    chlUserId: getApp().globalData.refereeId,
    phoneInfo: sysInfo.model + sysInfo.system,
    uri: routerPath,
    otherInfo: JSON.stringify(otherInfo)
  }
  this.ttRequestPost(`sysLog/create`, postData);
}

async function checkHasAuthUserInfo() {
  let res = null;
  try {
    res = await this.getAuthSetting();
  } catch (error) {
    res = null;
  }
  if (!res) {
    return false;
  }
  if (res.authSetting && res.authSetting['scope.userInfo']) {
    return true
  }
  return false;
}

function getAuthSetting() {
  return new Promise((resolve, reject) => {
    tt.getSetting({
      success(res) {
        resolve(res);
      },
      fail(res) {
        reject(res);
      },
    });
  })
}

function getShareTip() {
  this.ttRequestGet(`dict/getDictItems/share_topic`).then(res => {
    let optionArr = res || [];
    let defaultTitleArr = optionArr.filter(i => i.value == 1).map(i => i.text);
    let defaultTopicArr = optionArr.filter(i => i.value == 2).map(i => i.text);
    let defaultTitle = defaultTitleArr.length && defaultTitleArr[0];
    let defaultTopic = defaultTopicArr.length && defaultTopicArr[0];
    let config = {
      defaultTitle,
      defaultTopic
    }
    getApp().globalData.shareConfig = config;
  })
}
/**
 * 超过999的显示成999+
 * 超过1w的显示成x万+
 * @param {*} num 
 */
function transfromNumber(num) {
  if (!num) {
    return '';
  }
  if (num < 1000) {
    return num;
  }
  if (num < 10000) {
    return '999+'
  }
  let newNum = Math.floor(num / 10000);
  return `${newNum}万+`;


}
//购买前自动领取优惠券
function autoReceiveCoupon(prodId) {
  return new Promise((resolve) => {
    let url = `dyCoupon/autoReceive/${prodId}`;
    this.ttRequestPost(url).then((res) => {
      res.receiveStatus != 3 && this.showMyToast(res.msg);
      resolve();
    })
  })
}
//处理图片自适应
function formatLaber(text) {
  //替换富文本  标签
  if (!text) {
    return '';
  }
  let res = text.replace(/[<img] [^>]*style=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
    match = match.replace('style="', 'style="display:block;max-width: 100%;')
    return match
  })
  return res
}

function transfromDuration(duration){
  if(!duration){
    return '--';
  }
  let str = this.millisecondToHour(duration * 1000);
  return str;
}
module.exports = {
  millisecondToHour,
  timeChange,
  istell,
  isPassword,
  isBankCardNo,
  isidcard,
  isMobile,
  isIos,
  getLength,
  isNumber,
  numPoint2,
  showMyToast,
  setClipboardData,
  showMyToastNoImg,
  showModal,
  showLoading,
  hideLoading,
  // wechatPay,
  ttRequestPost,
  ttRequestGet,
  setImgDefault,
  getScrollTop,
  setScrollTop,
  h5WxPay,
  dyWxPay,
  dyPay,
  sendTemplateMessage,
  ttLogin,
  ttGetUserInfo,
  isLogin,
  userLogin,
  goCourseDetail,
  hasSensitiveText,
  getPageHtml,
  setAppShare,
  shareSuccessRecord,
  setRefereeId,
  reportSysLog,
  checkHasAuthUserInfo,
  getAuthSetting,
  getShareTip,
  checkNeedLogin,
  transfromNumber,
  autoReceiveCoupon,
  formatLaber,
  transfromDuration
}