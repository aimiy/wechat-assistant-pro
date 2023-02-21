import nedb from './nedb.js';
const rdb = nedb('chat.db');
/**
 * 记录群聊天记录 记录格式
 * { roomName: '群名', roomId: '', content: '内容', contact: '用户名', wxid: '', time: '时间' }
 * @param info
 * @returns {Promise<unknown>}
 */
export async function addRoomRecord(info) {
    try {
        let doc = await rdb.insert(info);
        return doc;
    }
    catch (error) {
        console.log('插入数据错误', error);
    }
}
/**
 * 获取指定群的聊天记录
 * @param room
 * @returns {Promise<*>}
 */
export async function getRoomRecord(roomId) {
    try {
        let search = await rdb.find({ roomId });
        return search;
    }
    catch (error) {
        console.log('查询数据错误', error);
    }
}
/**
 * 清楚指定群的聊天记录
 * @param roomName
 * @returns {Promise<void>}
 */
export async function removeRecord(roomName) {
    try {
        let search = await rdb.remove({ roomName }, { multi: true });
        return search;
    }
    catch (e) {
        console.log("error", e);
    }
}
/**
 * 获取指定群聊的全部聊天内容
 * @param roomName
 * @param day 取的天数
 * @returns {Promise<*>}
 */
export async function getRoomRecordContent(roomId, day) {
    try {
        let list = await getRoomRecord(roomId);
        list = list.filter(item => {
            return item.time >= new Date().getTime() - day * 24 * 60 * 60 * 1000;
        });
        let word = '';
        list.forEach((item) => {
            word = word + item.content;
        });
        return word;
    }
    catch (e) {
        console.log("error", e);
    }
}
/**
 * 获取指定群聊过去day天的的统计数据
 * @param roomName
 * @param day 取的天数
 * @returns {Promise<*>}
 */
export async function getRoomRecordStatistic(roomId, day) {
    try {
        let list = await getRoomRecord(roomId);
        list = list.filter(item => {
            return item.time >= new Date(new Date().getTime() - day * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0);

        });
        let chatStatistic = {}
        list.forEach((item) => {
            if (item.roomId === roomId) {
                let data = chatStatistic[item.wxid]
                if (!data) {
                    item.count = 1;
                } else {
                    let count = data.count
                    count += 1
                    item.count = count;
                }
                chatStatistic[item.wxid] = item;
            }
        })

        let statistic = []
        for (let key in chatStatistic) {
            statistic.push(chatStatistic[key])
        }

        for (let i = 0; i < statistic.length; i++) {
            for (let j = 0; j < statistic.length - 1 - i; j++) {
                let last = statistic[j].count || 0;
                let next = statistic[j + 1].count || 0;
                if (last < next) {
                    let tempKey = statistic[j + 1];
                    statistic[j + 1] = statistic[j]
                    statistic[j] = tempKey;
                }
            }
        }

        let reply = "";
        let count = 0;
        for (let item of statistic) {
            if (item.count) {
                if (count == 0) {
                    reply += `蓝鲸🐳`
                }
                if (count == 1) {
                    reply += `海豚🐬`
                }
                if (count == 2) {
                    reply += `热鱼🐠`
                }
                if (count > 2) {
                    reply += `小鱼🐟`
                }
                reply += `@${item.contact}（${item.count}次）!\n`
                if (count == 2) {
                    reply += `\n`
                }
                count++;
            }
        }
        return reply;
    }
    catch (e) {
        console.log("error", e);
    }
}
// TODO 刷新roomId
//# sourceMappingURL=roomDb.js.map