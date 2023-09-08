import nedb from '../db/nedb.js';
const configdb = nedb('config.db');
import superagent from '../superagent/index.cjs'
import utils from "../utils/index.cjs"

// 获取指定类型配置
export async function getConfig(type) {
    try {
        let search = await configdb.find({ type });
        return search;
    }
    catch (error) {
        console.log('查询数据错误', error);
    }
}
// 插入指定类型配置
export async function setConfig(type) {
    try {
        let doc = await configdb.insert({ type });
        return doc;
    }
    catch (error) {
        console.log('插入数据错误', error);
    }
}

export async function getIsWorkToday() {
    try {
        let workConfig = await getConfig('work');
        let today = await utils.formatDateNum(new Date()); //获取今天的日期
        if (!workConfig.length) {
            await setConfig('work')
        }
        console.log(workConfig)
        if(!workConfig.length || workConfig[0].day !== today){
            console.log("调接口")
            let res = await superagent.getWorkDay(today);
            await configdb.update({ type: 'work' }, { $set: { workmk: res.result.workmk, day: today } });
            return res.result.workmk
        }
        return workConfig[0].workmk;
    }
    catch (error) {
        console.log('查询数据错误', error);
    }
}