// import { openaiReq } from "./openai.js"
// openaiReq({
//     url: "https://api.openai.com/v1/chat/completions", method: 'POST', data: {
//         "model": "gpt-3.5-turbo",
//         "messages": [{ "role": "user", "content": "你好" }],
//         "temperature": 0.7,
//         "prompt": "Say this is a test",
//         "max_tokens": 7,
//         "top_p": 1,
//         "n": 1,
//         "stream": false,
//         "logprobs": null,
//         "stop": "\n"
//     }
// }).then(res => {
//     console.log(res)
// }).catch(error => {
//     console.log(error)
// })

// openaiReq({
//     url: "http://aihelper.dev.yuntongxun.com/ai-admin/auth/login", method: 'POST', params: null, data: { "username": "NItW+KXFYxQc5wUaMsfyrA==", "password": "x1D5JxMRPh7axC2xl7LFog==", "channelId": "CH77777777", "verifyCode": "", "showVerifyCode": true }
// }).then(res => {
//     console.log(res)
// }).catch(error => {
//     console.log(error)
// })

import superagent from '../superagent/index.cjs'
import untils from '../utils/index.cjs'
let test = async () => {
    // let today = await untils.formatDateNum(new Date()); //获取今天的日期
    let res = await superagent.getWorkDay('2023-3-25');
    if (res.result.workmk !== '1') {
        console.log(111)
        return
    }
    let logMsg = `亲爱的`
    console.log(logMsg)
}
test()