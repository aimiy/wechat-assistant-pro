const db = require('./index.cjs')

const AddCount = async (data) => {
    let topic = data.topic;
    let date = data.date;
    let name = data.name;
    let id = data.id;

    let chatStatistic = await db.getDB(topic, "chatStatistic");
    if (!chatStatistic) {
        chatStatistic = []
    }
    let index = chatStatistic.findIndex(item => item.id == id)
    if (index == -1) {
        chatStatistic.push(
            {
                "id": id,
                count: {}
            }
        )
        index = chatStatistic.length - 1
    }

    chatStatistic[index].name = name
    if (!chatStatistic[index].count) {
        chatStatistic[index].count = {}
    }
    let count = chatStatistic[index].count || {};
    if (!count[date]) {
        count[date] = 0
    }
    count[date] += 1;

    chatStatistic[index].count = count

    db.setDB(topic, chatStatistic, "chatStatistic")
}

const GetReplyInfo = async (data) => {
    let topic = data.topic;
    let date = data.date;

    let chatStatistic = await db.getDB(topic, "chatStatistic");
    for (let i = 0; i < chatStatistic.length; i++) {
        for (let j = 0; j < chatStatistic.length - 1 - i; j++) {
            let last = chatStatistic[j].count[date] || 0;
            let next = chatStatistic[j + 1].count[date] || 0;
            if (last < next) {
                let tempKey = chatStatistic[j + 1];
                chatStatistic[j + 1] = chatStatistic[j]
                chatStatistic[j] = tempKey;
            }
        }
    }

    let reply = "";
    let count = 0;
    for (let item of chatStatistic) {
        if (item.count[date]) {
            if(count == 0){
                reply += `蓝鲸🐳`
            }
            if(count == 1){
                reply += `海豚🐬`
            }
            if(count == 2){
                reply += `热鱼🐠`
            }
            if(count > 2){
                reply += `小鱼🐟`
            }
            reply += `@${item.name}（${item.count[date]}次）!\n`
            if(count == 2){
                reply += `\n`
            }
            count++;
        }
    }
    return reply
}

module.exports = {
    AddCount,
    GetReplyInfo
};
// GetReplyInfo({ topic: "疯猫丑狗会暴富", date: "2022-9-30日" })
// AddCount({ topic: "疯猫丑狗会暴富", date: "2022-9-10", name: "test" })
// Update({topic:"紫月自律2",date:"2022-9-10",data:{"a":1}})