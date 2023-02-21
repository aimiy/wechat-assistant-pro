import { addRoomRecord, getRoomRecord } from "./roomDb.js"

addRoomRecord({ roomName: '群名', roomId: '', content: '内容', contact: '用户名', wxid: '', time: '时间' })
getRoomRecord('群名').then(res => {
    console.log(res)
})