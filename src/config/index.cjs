// 配置文件
module.exports = {
    // 每日说配置项（必填项）
    TXAPIKEY: '06008d4c1fc3a4b247ad216af69eb6f8', //此处须填写个人申请的天行apikey,请替换成自己的 申请地址https://www.tianapi.com/signup.html?source=474284281

    // 高级功能配置项（非必填项）
    AUTOREPLY: true, //自动聊天功能 默认开启, 关闭设置为: false

    // (自定义) 如果你有 DIY 和基本的编程基础, 可以在这自己定义变量, 用于 js 文件访问, 包括设置简单的定时任务, 例如可以定义 task 数组
    tasks: [
        { topic: '🇨🇳疯猫丑狗不正常🇨🇳', action: 'sendWeather', city: "武汉", date: '0 0 8 * * *' },
        { topic: '🇨🇳疯猫丑狗不正常🇨🇳', action: 'sendInfo', info: "喝水提醒！！！！放下二郎腿！！！！", date: '0 30 10 * * *' },
        { topic: '🇨🇳疯猫丑狗不正常🇨🇳', action: 'sendInfo', info: "-----封群-----", date: '0 0 12 * * *' },
        { topic: '🇨🇳疯猫丑狗不正常🇨🇳', action: 'sendInfo', info: "-----开群-----", date: '0 30 13 * * *' },
        { topic: '🇨🇳疯猫丑狗不正常🇨🇳', action: 'sendInfo', info: "喝水提醒！！！！放下二郎腿！！！！", date: '0 30 14 * * *' },
        { topic: '🇨🇳疯猫丑狗不正常🇨🇳', action: 'sendInfo', info: "喝水提醒！！！！放下二郎腿！！！！", date: '0 30 15 * * *' },
        { topic: '🇨🇳疯猫丑狗不正常🇨🇳', action: 'sendInfo', info: "快下班啦！！！", date: '0 0 18 * * *' },
        { topic: '🇨🇳疯猫丑狗不正常🇨🇳', action: 'sendInfo', info: "别熬夜了！！快睡觉！！", date: '0 0 23 * * *' },

        { topic: '多喝水早睡夸夸群', action: 'sendWeather', city: "常州", date: '0 0 7 * * *' },
        { topic: '多喝水早睡夸夸群', action: 'sendInfo', info: "快洗漱！！！！！！！", date: '0 0 22 * * *' },
    ],
}
