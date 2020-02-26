const http = require('https')
const lowDB = require('lowdb')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ posts: []})
  .write()

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
    headers["location"] = `http://localhost:8080/#/redirect?access_token=${event.queryString.access_token}&user_info=${JSON.stringify(userInfo)}&id_token=${event.queryString.id_token}`
    return {
      statusCode: 302,
      body: "",
      headers
    };
}

exports.publish = async function publish(event) {
    const collection = db.get('posts')
  
    // Insert a new post...
    collection
    .insert({
        title: event.queryString.title,
        text: event.queryString.text,
        image: event.queryString.image,
        _id: event.queryString._id,
        public: event.queryString.public
    })
    .write()

    const post = db
    .get('posts')
    .find({ _id: event.queryString._id })
    .value()

    return {
        statusCode: 200,
        body: JSON.stringify(post),
    };
}

exports.list = async function publish(event) {
    const post = db
    .get('posts')
    .find({ _id: event.queryString._id })
    .value()

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