const VIDEO_OPTION = {
    autoplay: false, //是否自动播放
    poster: '', //视频封面的图片网络资源地址
    loop: false, //是否循环播放
    showFullscreenBtn: true, //是否显示全屏按钮
    showPlayBtn: true, //是否显示播放、暂停、重播按钮，不包括视频封面的播放按钮
    controls: true, //是否显示全部播放控件
    objectFit: 'contain', //当视频大小与 video 容器大小不一致时，视频的表现形式：contain（包含），fill（填充），cover（覆盖）
    playBtnPosition: 'bottom', //播放按钮的位置：center（视频中间），bottom（控制条上
    vslideGesture: false, //在非全屏模式下，是否开启亮度与音量调节手势，开启后表现详见手势响应-亮度与音量
    vslideGestureInFullscreen: true,//在全屏模式下，是否开启亮度与音量调节手势，开启后表现详见手势响应-亮度与音量
    enableProgressGesture: false,//是否开启控制进度的手势，开启后表现详见手势响应-播放进度
    enablePlayGesture: false,//是否开启播放手势，即双击切换播放/暂停
    muted: false,//是否静音播放
    showMuteBtn: false,//是否显示静音控件
    showPlaybackRateBtn: true,//是否显示倍速控件，点击倍速控件后可选择倍速，可选值： 0.75/1.0/1.25/1.5/2
    direction: -90,//设置全屏时视频的方向，取值见表 direction 的合法值
}

const LOAD_STATUS_MAP = {
    'LOADING': 1,
    'LOAD_MORE': 2,
    'NO_MORE_DATA': 3,
    'NO_DATA': 4,
}

const PROD_STATUS_MSG_MAP = {
    '-1':'已删除',
    '0':'已下架',
    '2':'审核中',
    '3':'审核不通过',
}

const COUPON_TYPE_MAP = {
    1:'无门槛',
    2:'到店券'
}

const PROD_TYPE = {
    110: '视频',
    111: '音频',
    112: '图文',
    9: '专栏'
}

module.exports = {
    VIDEO_OPTION,
    LOAD_STATUS_MAP,
    PROD_STATUS_MSG_MAP,
    COUPON_TYPE_MAP,
    PROD_TYPE
}