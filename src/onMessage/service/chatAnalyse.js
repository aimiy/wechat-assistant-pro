import { getRoomRecordContent, getRoomRecordStatistic } from "../../db/roomDb.js"
import { createCanvas, loadImage } from 'canvas'
import { FileBox } from "file-box"
import WordCloud1 from 'node-wordcloud'
let WordCloud = WordCloud1()
import Segment from "segment"


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function draw() {
    return new Promise(async resolve => {
        const canvas = createCanvas(200, 200)
        console.log(canvas)
        // 开始分词
        let content = await getRoomRecordContent("@@dcddc21607c531ef7d35035a962b34add29420b3b98813316d3d55b3964cea56", 1)
        // console.log(content)
        // 创建实例
        var segment = new Segment();
        // 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
        segment.useDefault();
        console.log(segment.doSegment(content, {
            simple: true,
            stripPunctuation: true
        }));

        const wd = WordCloud(canvas, { list: [['foo', 12], ['bar', 6]] });
        wd.draw()
        const ctx = canvas.getContext('2d')

        // Write "Awesome!"
        ctx.font = '30px Impact'
        ctx.rotate(0.1)
        ctx.fillText('Awesome!', 50, 100)

        // Draw line under text
        var text = ctx.measureText('Awesome!')
        ctx.strokeStyle = 'rgba(0,0,0,0.5)'
        ctx.beginPath()
        ctx.lineTo(50, 102)
        ctx.lineTo(50 + text.width, 102)
        ctx.stroke()

        // Draw cat with lime helmet
        loadImage("lime-cat.jpg").then((image) => {
            ctx.drawImage(image, 50, 0, 70, 70)
            resolve(canvas.toDataURL())
            console.log('<img src="' + canvas.toDataURL() + '" />')
        })
    })
}

const analyMessage = async (that, content, name, contactOrRoom) => {
    let huifu;
    switch (true) {
        case "聊天分析" == content:
            let url = await draw();
            huifu = FileBox.fromDataURL(url, 'room-avatar.jpg')
            break;
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
    analyMessage
}