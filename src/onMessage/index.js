import untils from '../utils/index.cjs'
import superagent from '../superagent/index.cjs'
import { baikeMessage } from "./service/baike.js"
import { addRoomRecord, getRoomRecordStatistic } from "../db/roomDb.js"
// import { analyMessage } from "./service/chatAnalyse.js"

// 延时函数，防止检测出类似机器人行为操作
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 监听对话
async function onMessage(msg) {
    try {
        const contact = msg.talker(); // 发消息人
        const content = msg.text().trim(); // 消息内容
        const room = msg.room(); // 是否是群消息
        const contactName = await contact.alias() || await contact.name(); // 发消息人备注
        const name = await contact.name();
        const isText = msg.type() === this.Message.Type.Text;
        let today = await untils.formatDate(new Date()); //获取今天的日期

        // 忽略的消息判断
        if (msg.self()) {
            return;
        }

        if (room) {
            // 群消息 
            const roomName = await room.topic();

            let contactId = contact.id || '111';
            let contactRoomAlias = await room.alias(contact) || name

            // 摸鱼统计
            addRoomRecord({ roomName, roomId: room.id, content, contact: contactRoomAlias, wxid: contactId, time: new Date().getTime(), isText });
            if (!isText) {
                return;
            }
            console.log({ content, alias: await room.alias(contact) })
            let huifu;
            switch (true) {
                case content.substr(0, 2) == '三猫':
                    let contactContent = content.replace('三猫', '');
                    if (contactContent) {
                        huifu = await superagent.getReply(contactContent);
                    }
                    break;
                case "今日排名" == content:
                case "今日排行" == content:
                case /摸鱼/.test(content):
                    let sweetWord = await superagent.getSweetWord();
                    huifu = `${today}\n今日摸鱼排行：\n`
                    huifu += await getRoomRecordStatistic(room.id, 0);
                    huifu += `\n${sweetWord}`
                    break;
                case "三日排行" == content:
                    huifu = `截止${today}\n三日摸鱼排行：\n`
                    huifu += await getRoomRecordStatistic(room.id, 2);
                    break;
                case "新闻" == content:
                    let list = await superagent.getHuabian();
                    huifu = "";
                    let index = 1
                    for (let item of list) {
                        huifu += `${index}：${item.title}${item.url}\n`
                        index++;
                    }
                    break;
            }
            baikeMessage(this, content, contactRoomAlias, room)
            if (huifu) {
                try {
                    await delay(2000);
                    await room.say(huifu);
                } catch (e) {
                    console.error(e);
                }
            }
        } else {
            if (!isText) {
                return;
            }
            let huifu;
            switch (true) {
                case content.substr(0, 2) == '三猫':
                    let contactContent = content.replace('三猫', '');
                    if (contactContent) {
                        huifu = await superagent.getReply(contactContent);
                    }
                    break;
                case "新闻" == content:
                    let list = await superagent.getHuabian();
                    huifu = "";
                    let index = 1
                    for (let item of list) {
                        huifu += `${index}：${item.title}${item.url}\n`
                        index++;
                    }
                    break;
            }
            baikeMessage(this, content, name, contact)
            // analyMessage(this, content, name, contact)
            if (huifu) {
                try {
                    await delay(2000);
                    await contact.say(huifu);
                } catch (e) {
                    console.error(e);
                }
            }
        }
    } catch (error) {
        console.log("onmessage监听错误", error)
    }
}

export {
    onMessage
};