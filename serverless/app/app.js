const http = require('https')
const lodashId = require('lodash-id')

function myHttp(url){
    let promise = new Promise(function (resolve, reject) {
        let req = http.get(url)
         req.on("response",function (res) {
             let finalData = ''
             res.on("data",function (data) {
                 finalData += data
             })
             res.on('end', function(){
                 resolve(finalData.toString())
             })
         })
    })
    return promise
}

exports.callback = async function echo(event, context){
    // 此函数可用来获取 oidc 签发的 token，然后可用 token 换取 userInfo
    // 通过发送 Get 请求到如下链接获取 userInfo
    // https://users.authing.cn/oauth/oidc/user/userinfo?access_token=YOUR_ACCESS_TOKEN
    // token 获取方式：event.queryString.token

    const userInfo = await myHttp(`https://users.authing.cn/oauth/oidc/user/userinfo?access_token=${event.queryString.access_token}`);

    const headers = {}
    headers["Content-Type"] = headers["Content-Type"] || "text/plain"
    headers["location"] = `http://h0d7gjj-hko2zsj-1253396422.cos-website.ap-guangzhou.myqcloud.com/#/redirect?access_token=${event.queryString.access_token}&user_info=${JSON.stringify(userInfo)}&id_token=${event.queryString.id_token}`
    return {
      statusCode: 302,
      body: "",
      headers
    };
}

exports.publish = async function publish(event) {

    return {
        statusCode: 200,
        body: JSON.stringify(post),
    };
}

exports.list = async function publish(event) {

    return {
        statusCode: 200,
        body: JSON.stringify(post),
    };
}

exports.pathMap = [
    { path: "/", handlerName: "callback" },
    { path: "/publish", handlerName: "publish" },
    { path: "/list", handlerName: "list" },
]