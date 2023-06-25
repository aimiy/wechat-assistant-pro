import superagent from 'superagent'

const openaiReq = ({ url, method, params, data, cookies, spider = false, platform = 'tx' }) => {
    return new Promise(function (resolve, reject) {
        console.log(method, data)
        superagent(method, url)
            .query(params)
            .send(data)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer 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')
            .end(function (err, response) {
                if (err) {
                    console.log('请求出错', err)
                    reject(err)
                }
                resolve(response)
                // if (spider) { // 如果是爬取内容，直接返回页面html
                //     resolve(response.text)
                // } else { // 如果是非爬虫，返回格式化后的内容
                //     const res = JSON.parse(response.text);
                //     if (res.code !== 200 && platform === 'tx' || res.code !== 100000 && platform === 'tl') {
                //         console.error('接口请求失败', res.msg || res.text)
                //     }
                //     resolve(res)
                // }
            })
    })
}
export {
    openaiReq
}