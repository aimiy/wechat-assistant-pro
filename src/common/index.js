/**
 * 群关键词回复
 * @param {*} contact
 * @param {*} msg
 * @param {*} isRoom
 */
 async function roomSay(room, contact, msg) {
    console.log('msg', msg);
    if (msg.id) {
        msg = await getMaterial(msg.id);
    }
    try {
        if (msg.type === 1 && msg.content) {
            // 文字
            console.log('回复内容', msg.content);
            contact ? await room.say(msg.content, contact) : await room.say(msg.content);
        }
        else if (msg.type === 2 && msg.url) {
            // url文件
            let obj = FileBox.fromUrl(msg.url);
            console.log('回复内容', obj);
            contact ? await room.say('', contact) : '';
            await delay(500);
            await room.say(obj);
        }
        else if (msg.type === 3 && msg.url) {
            // bse64文件
            let obj = FileBox.fromDataURL(msg.url, 'room-avatar.jpg');
            contact ? await room.say('', contact) : '';
            await delay(500);
            await room.say(obj);
        }
        else if (msg.type === 4 && msg.url && msg.title && msg.description) {
            let url = new this.UrlLink({
                description: msg.description,
                thumbnailUrl: msg.thumbUrl,
                title: msg.title,
                url: msg.url,
            });
            console.log(url);
            await room.say(url);
        }
        else if (msg.type === 5 && msg.appid && msg.title && msg.pagePath && msg.description && msg.thumbUrl && msg.thumbKey) {
            let miniProgram = new this.MiniProgram({
                appid: msg.appid,
                title: msg.title,
                pagePath: msg.pagePath,
                description: msg.description,
                thumbUrl: msg.thumbUrl,
                thumbKey: msg.thumbKey,
            });
            await room.say(miniProgram);
        }
    }
    catch (e) {
        console.log('群回复错误', e);
    }
}