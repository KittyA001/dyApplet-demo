function initReport() {
    let uUid = getUid();
    tt.onAppShow((options) => {
        let data = {
            uUid:uUid,
            options:JSON.stringify(options),
            enentType:'ttAppShow',
        }
        reportToServe(data);
    })
    tt.onAppHide((options) => {
        let data = {
            uUid:uUid,
            options:JSON.stringify(options),
            enentType:'ttAppHide',
        }
        reportToServe(data);
    })
    tt.onError((options) => {
        let data = {
            uUid:uUid,
            options:JSON.stringify(options),
            enentType:'ttAppError',
        }
        reportToServe(data);
    })
    tt.onUnhandledRejection((options) => {
        let data = {
            uUid:uUid,
            options:JSON.stringify(options),
            enentType:'ttAppUnhandledRejection',
        }
        reportToServe(data);
    })
}

function getUid() {
    let uuid = new Date().getTime() + Math.random().toString(36).substr(2);
    return uuid;
}

function reportToServe(data) {
    let sysInfo = tt.getSystemInfoSync();
    let systemInfo = {
        platform: sysInfo.platform,
        brand: sysInfo.brand,
        version: sysInfo.version,
        appName: sysInfo.appName,
        SDKVersion: sysInfo.SDKVersion,
        model: sysInfo.model,
        system: sysInfo.system,
    }
    let postData = {
        userId: getApp().globalData.userId,
        chlUserId: getApp().globalData.refereeId,
        systemInfo: JSON.stringify(systemInfo),
    }
    postData = {...postData,...data};
    console.log('---上报数据',postData)
    tt.reportAnalytics('ttAppEvent', postData);
}
module.exports = {
    initReport
}