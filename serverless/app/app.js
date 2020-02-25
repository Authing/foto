exports.callback = async function echo(event, context){
    // 此函数可用来获取 oidc 签发的 token，然后可用 token 换取 userInfo
    // 通过发送 Get 请求到如下链接获取 userInfo
    // https://users.authing.cn/oauth/oidc/user/userinfo?access_token=YOUR_ACCESS_TOKEN
    // token 获取方式：event.queryString.token
    return { 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(event.queryString.token), 
        statusCode: 200,
    }
}
exports.pathMap = [
    { path: "/", handlerName: "callback" },
]