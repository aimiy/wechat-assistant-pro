import { WechatyBuilder } from 'wechaty'
// import {WechatyWebPanelPlugin} from 'wechaty-web-panel'
import { onMessage } from './onMessage/index.js'
import Qrterminal from 'qrcode-terminal';
import { initDay } from './schedule/index.js';

const name = 'wechat-assistant-pro';
let bot = '';
let padLocalToken = '' // 如果申请了ipadlocal的token,可以直接填入

if (process.env['PAD_LOCAL_TOKEN']) {
    console.log('读取到环境变量中的ipadLocalToken')
    padLocalToken = process.env['PAD_LOCAL_TOKEN']
}

if (padLocalToken) {
    console.log('读取到环境变量中的ipad token 使用ipad协议启动')
    bot = WechatyBuilder.build({
        name, // generate xxxx.memory-card.json and save login data for the next login
        puppetOptions: {
            token: padLocalToken
        }, puppet: 'wechaty-puppet-padlocal',
    });

} else {
    console.log('默认使用wechat4u协议启动')
    bot = WechatyBuilder.build({
        name, // generate xxxx.memory-card.json and save login data for the next login
        puppet: 'wechaty-puppet-wechat4u',
    });
}

// 插件使用
// bot.use(WechatyWebPanelPlugin({
//     apiKey: '32e36363bef783142eaafaf76cd1061acec7a5de', apiSecret: '195519de800eb73de662cb420dd3841f5887a5bc',
// }))
// 自己实现开始
async function onScan(qrcode, status) {
    Qrterminal.generate(qrcode);
    console.log('扫描状态', status);
    const qrImgUrl = ['https://api.qrserver.com/v1/create-qr-code/?data=', encodeURIComponent(qrcode)].join('');
    console.loh(qrImgUrl)
}

// 登录
async function onLogin(user) {
    console.log(`贴心小助理${user}登录了`);
    // 登陆后创建定时任务
    await initDay(bot);
}
// 登出
function onLogout(user) {
    console.log(`小助手${user} 已经登出`);
}
bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('logout', onLogout);
bot.on('message', onMessage);
// 自己实现结束

bot.start()
    .catch((e) => console.error(e));