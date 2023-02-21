
import superagent from '../../superagent/index.cjs'
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let isTiku = false; // 是否进入了题库模式
let count = 1; //每轮计数
let rankingList = {}; // 每轮积分
let currentTimer = null;
let currentAnswer;
let currentAnswerList = {}

const starQ = async (contactOrRoom) => {
    if (!isTiku) {
        isTiku = true;
        currentAnswer = await superagent.getTiku();
        currentAnswerList = {};
        huifu = `题目${count}：${currentAnswer.title}\nA：${currentAnswer.answerA}\nB：${currentAnswer.answerB}\nC：${currentAnswer.answerC}\nD：${currentAnswer.answerD}`
        if (currentTimer) {
            clearTimeout(currentTimer)
            currentTimer = null;
        }
        currentTimer = setTimeout(async () => {
            try {
                await delay(2000);
                await contactOrRoom.say(`超时！无人答对！答案是${currentAnswer.answer}：${currentAnswer['answer' + currentAnswer.answer]}`);
                count++;
                isTiku = false;
            } catch (e) {
                console.error(e);
            }
        }, 30000)
    }
}
const validateA = (answer) => {
    if (/[ABCD]/.test(answer)) {
        if (currentAnswerList[name]) {
            return;
        }
        currentAnswerList[name] = 1;
        if (answer === currentAnswer.answer) {
            if (!rankingList[name]) {
                rankingList[name] = 0;
            }
            rankingList[name] += 1;
            huifu = `恭喜@${name}回答正确！答案是${currentAnswer.answer}：${currentAnswer['answer' + currentAnswer.answer]}本轮积分为${rankingList[name]}`
            if (count >= 10) {
                let arr = []
                for (let key in rankingList) {
                    arr.push({ name: key, v: rankingList[key] })
                }
                let result = arr.sort((a, b) => b.v - a.v)
                huifu += `\n本轮回答结束，冠军是：${result[0].name}(${result[0].v}分)！！！！！`
                count = 0;
                rankingList = {}
            }
            if (currentTimer) {
                clearTimeout(currentTimer)
                currentTimer = null;
            }
            count++;
            isTiku = false;
        }
    }

}
const closeQ = () => {
    
}

const baikeMessage = async (that, content, name, contactOrRoom) => {
    let huifu;
    switch (true) {
        case "知识问答" == content:
        case "下一题" == content:
            if (!isTiku) {
                isTiku = true;
                currentAnswer = await superagent.getTiku();
                currentAnswerList = {};
                huifu = `题目${count}：${currentAnswer.title}\nA：${currentAnswer.answerA}\nB：${currentAnswer.answerB}\nC：${currentAnswer.answerC}\nD：${currentAnswer.answerD}`
                if (currentTimer) {
                    clearTimeout(currentTimer)
                    currentTimer = null;
                }
                currentTimer = setTimeout(async () => {
                    try {
                        await delay(2000);
                        await contactOrRoom.say(`超时！无人答对！答案是${currentAnswer.answer}：${currentAnswer['answer' + currentAnswer.answer]}`);
                        count++;
                        isTiku = false;
                    } catch (e) {
                        console.error(e);
                    }
                }, 30000)
            }
            break;
    }
    if (isTiku) {
        let answer = content.toLocaleUpperCase()[0]
        if (/[ABCD]/.test(answer)) {
            if (currentAnswerList[name]) {
                return;
            }
            currentAnswerList[name] = 1;
            if (answer === currentAnswer.answer) {
                if (!rankingList[name]) {
                    rankingList[name] = 0;
                }
                rankingList[name] += 1;
                huifu = `恭喜@${name}回答正确！答案是${currentAnswer.answer}：${currentAnswer['answer' + currentAnswer.answer]}本轮积分为${rankingList[name]}`
                if (count >= 10) {
                    let arr = []
                    for (let key in rankingList) {
                        arr.push({ name: key, v: rankingList[key] })
                    }
                    let result = arr.sort((a, b) => b.v - a.v)
                    huifu += `\n本轮回答结束，冠军是：${result[0].name}(${result[0].v}分)！！！！！`
                    count = 0;
                    rankingList = {}
                }
                if (currentTimer) {
                    clearTimeout(currentTimer)
                    currentTimer = null;
                }
                count++;
                isTiku = false;
            }
        }
    }

    if (huifu) {
        try {
            await delay(2000);
            await contactOrRoom.say(huifu);
        } catch (e) {
            console.error(e);
        }
    }
}

export {
    baikeMessage
}