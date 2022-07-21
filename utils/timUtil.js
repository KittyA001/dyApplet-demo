const TIM = require('../utils/tim-wx.js')
export default class TimUtil {
    constructor(eventCallBack) {
        this.isSdkReady = false;
        this.groupID = '';
        this.eventCallBack = eventCallBack;
        this.initTim();
    }
    initTim() {
        let options = {
            SDKAppID: 1400695088 // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
        };
        // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
        this.timClient = TIM.create(options); // SDK 实例通常用 tim 表示
        this.initImEvent();
    }
    initImEvent() {
        this.timClient.on(TIM.EVENT.SDK_READY, this.onSdkReady, this);
        this.timClient.on(TIM.EVENT.SDK_NOT_READY, this.onSdkNotReady, this);
        this.timClient.on(TIM.EVENT.MESSAGE_RECEIVED, this.onMessageReceived, this);
        this.timClient.on(TIM.EVENT.MESSAGE_REVOKED, this.onMessageRevoked, this);
        this.timClient.on(TIM.EVENT.KICKED_OUT, this.onKickedOut, this);
    }
    onSdkReady() {
        console.log('---im--onSdkReady')
        this.isSdkReady = true;
    }
    onSdkNotReady() {
        console.log('---im--onSdkNotReady')
        this.isSdkReady = false;
    }
    onMessageReceived(e) {
        console.log('---im--onMessageReceived', e)
        let eventData = e.data;
        for (let item of eventData) {
            if (item.conversationID == `GROUP${this.groupID}` && item.payload.data) {
                this.eventCallBack('MESSAGE_RECEIVED', item)
            }
        }
    }
    onMessageRevoked(e) {
        console.log('---im--onMessageRevoked', e)
        let eventData = e.data;
        for (let item of eventData) {
            if (item.conversationID == this.groupID) {
                this.eventCallBack('MESSAGE_REVOKED', item)
            }
        }

    }
    onKickedOut(e) {
        console.log('---im--onKickedOut', e)
    }
    destroyTim() {
        this.timClient.off(TIM.EVENT.SDK_READY, this.onSdkReady, this);
        this.timClient.off(TIM.EVENT.MESSAGE_RECEIVED, this.onMessageReceived, this);
        this.timClient.off(TIM.EVENT.MESSAGE_REVOKED, this.onMessageRevoked, this);
        this.timClient.off(TIM.EVENT.KICKED_OUT, this.onKickedOut, this);
        this.timClient.destroy();
    }
    public_loginIm(roomInfo) {
        this.groupID = roomInfo.roomId;
        this.userId = roomInfo.userId;
        this.userSig = roomInfo.userSig;
        let promise = this.timClient.login({ userID: this.userId, userSig: this.userSig });
        promise.then((imResponse) => {
            console.log(imResponse.data); // 登录成功
            if (imResponse.data.repeatLogin === true) {
                // 标识帐号已登录，本次登录操作为重复登录。v2.5.1 起支持
                console.log(imResponse.data.errorInfo);
            }
            this.joinImGroup();
        }).catch((imError) => {
            console.warn('login error:', imError); // 登录失败的相关信息
        });
    }
    joinImGroup() {
        let promise = this.timClient.joinGroup({ groupID: this.groupID, type: TIM.TYPES.GRP_AVCHATROOM });
        promise.then((imResponse) => {
            switch (imResponse.data.status) {
                case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // 等待管理员同意
                    break;
                case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
                    console.log(imResponse.data.group); // 加入的群组资料
                    break;
                case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
                    break;
                default:
                    break;
            }
        }).catch((imError) => {
            console.warn('joinGroup error:', imError); // 申请加群失败的相关信息
        });
    }

    sendMsg(msgItem) {
        return new Promise((resolve,reject)=>{
            let priority = msgItem.role == 2 ? TIM.TYPES.MSG_PRIORITY_HIGH : TIM.TYPES.MSG_PRIORITY_NORMAL;
        // 发送文本消息，Web 端与小程序端相同
        // 1. 创建消息实例，接口返回的实例可以上屏
        let message = this.timClient.createCustomMessage({
            to: this.groupID,
            conversationType: TIM.TYPES.CONV_GROUP,
            // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
            // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
            priority: priority,
            payload: {
                data: JSON.stringify(msgItem)
            },
        });
        // 2. 发送消息
        let promise = this.timClient.sendMessage(message);
        promise.then(function (imResponse) {
            // 发送成功
            console.log(imResponse);
            resolve(message);
        }).catch(function (imError) {
            // 发送失败
            console.warn('sendMessage error:', imError);
        });
        })
    }

    revokeMsg(message) {
        console.log('--revokeMsg--',message)
        // const msg = {
        //     clientSequence:message.clientSequence,
        //     ID:message.ID,
        //     type:message.type,
        //     conversationID:message.conversationID,
        //     conversationType:message.conversationType,
        //     from:message.from,
        //     payload:message.payload,
        // }
        // 主动撤回消息
        let promise = this.timClient.revokeMessage(message);
        promise.then(function (imResponse) {
            // 消息撤回成功
            console.log('revokeMessage success:', imResponse);
        }).catch(function (imError) {
            // 消息撤回失败
            console.warn('revokeMessage error:', imError);
        });
    }

}