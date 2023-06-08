// 配置文件
module.exports = {
    // 每日说配置项（必填项）
    TXAPIKEY: '06008d4c1fc3a4b247ad216af69eb6f8', //此处须填写个人申请的天行apikey,请替换成自己的 申请地址https://www.tianapi.com/signup.html?source=474284281

    // 高级功能配置项（非必填项）
    AUTOREPLY: true, //自动聊天功能 默认开启, 关闭设置为: false

    // (自定义) 如果你有 DIY 和基本的编程基础, 可以在这自己定义变量, 用于 js 文件访问, 包括设置简单的定时任务, 例如可以定义 task 数组
    tasks: [
        { topic: '🇨🇳疯猫丑狗不正常🇨🇳', action: 'sendWeather', city: "北京",username:"琳总", date: '0 0 8 * * *' },
        { topic: '🇨🇳疯猫丑狗不正常🇨🇳', action: 'sendInfo', info: `-----⚠注意⚠-----\n放下二郎腿！！！！\n喝水去！！！！`, date: '0 30 10,11,14,15,16 * * 1-5' },
        { topic: '🇨🇳疯猫丑狗不正常🇨🇳', action: 'sendInfo', info: `-----❤温馨提醒❤-----\n上个厕所，准备快下班啦！！！`, date: '0 55 17 * * 1-4' },
        { topic: '🇨🇳疯猫丑狗不正常🇨🇳', action: 'sendInfo', info: `-----❤温馨提醒❤-----\n今天周五，有什么事下周一再说！！！\n准备摸鱼下班！！`, date: '0 30 17 * * 5' },
        { topic: '🇨🇳疯猫丑狗不正常🇨🇳', action: 'sendInfo', info: `-----⚠注意⚠-----\n别熬夜了！！快睡觉！！`, date: '0 0 23 * * *' },

        { topic: '喝水早睡提肛少久坐夸夸群', action: 'sendWeather',username:"一曈", city: "常州", date: '0 0 7 * * *' },
        { topic: '喝水早睡提肛少久坐夸夸群', action: 'sendInfo', info: `-----⚠注意⚠-----\n放下二郎腿！！！！\n喝水去！！！！`, date: '0 30 9,10,14,15 * * 1-5' },
        { topic: '喝水早睡提肛少久坐夸夸群', action: 'sendInfo', info: `-----❤温馨提醒❤-----\n上个厕所，准备快下班啦！！！`, date: '0 30 16 * * 1-5' },
        { topic: '喝水早睡提肛少久坐夸夸群', action: 'sendInfo', info: `-----⚠注意⚠-----\n快洗漱！！！！！！！`, date: '0 0 22 * * 1-5' },
        { topic: '喝水早睡提肛少久坐夸夸群', action: 'sendInfo', info: `-------⚠注意⚠-------\n快准备睡觉！！！！！！！\n记得打开forest种树！！\n记得打卡跟练！https://b23.tv/mU0PBFX`, date: '0 0 23 * * *' },
    ],
}
