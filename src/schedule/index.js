import config from '../config/index.cjs';
import schedule from "./schedule.cjs";
import superagent from '../superagent/index.cjs'
import untils from '../utils/index.cjs'
import { clearDB } from "../api/room.js"
import { getIsWorkToday } from "../api/config.js"
// 延时函数，防止检测出类似机器人行为操作
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 创建微信每日说定时任务
async function initDay(bot) {
    console.log(`已经设定每日说任务`);
    let tasks = config.tasks;
    for (let item of tasks) {
        schedule.setSchedule(item.date, async () => {
            console.log('你的贴心小助理开始工作啦！');
            let room = await bot.Room.find({ topic: item.topic })
            let logMsg;
            switch (item.action) {
                case "sendInfo":
                    logMsg = `${item.info}`;
                    break;
                case "sendWeather": {
                    let one = await superagent.getOne(); //获取每日一句
                    let today = await untils.formatDate(new Date()); //获取今天的日期
                    let weather = await superagent.getTXweather(item.city);

                    let str = `${today}\n亲爱的${item.username}~${item.city}今日天气\n${weather.weatherTips}\n${weather.todayWeather}\n${one}`;
                    logMsg = str;
                    break;
                }
                case "offWork":
                    let workmk = await getIsWorkToday();
                    if (workmk !== '1') {
                        return
                    }
                    logMsg = `亲爱的${item.username}\n-----❤温馨提醒❤-----\n上个厕所，准备快下班啦！！！`
                    break;
            }
            try {
                await delay(2000);
                await room.say(logMsg); // 发送消息
            } catch (e) {
                logMsg = e.message;
            }
            console.log(logMsg);
        });
    }

    schedule.setSchedule('0 0 1 * * *', async () => {
        console.log('清空聊天库');
        clearDB()
    });
}

export { initDay }