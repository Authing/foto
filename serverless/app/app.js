const http = require('https')

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

    const userInfo = await myHttp(`https://users.authing.cn/oauth/oidc/user/userinfo?access_token=${event.queryString.token}`);

    const headers = {}
    headers["Content-Type"] = headers["Content-Type"] || "text/plain"
    headers["location"] = `http://localhost:8080/#/redirect?access_token=${event.queryString.token}&userInfo=${JSON.stringify(userInfo)}`
    return {
      statusCode: 302,
      body: "",
      headers
    };

    return { 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(userInfo), 
        statusCode: 200,
    }
}
exports.pathMap = [
    { path: "/", handlerName: "callback" },
]