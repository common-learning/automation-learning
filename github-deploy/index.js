var http = require('http')
var createHandler = require('github-webhook-handler')  //gitee与github的npm包不同请到npm官方查找
var handler = createHandler({ path: '/webhook', secret: 'myhashsecret' })

//ps: https://www.lovelucy.info/auto-deploy-website-by-webhooks-of-github-and-gitlab.html

/**
 * run script
 * @param {*} cmd 
 * @param {*} args 
 * @param {*} callback 
 */
function run_cmd(cmd, args, callback) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString(); });
    child.stdout.on('end', function () { callback(resp) });
}

/**
 * start: node index.js
 */
http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(3000)

handler.on('error', function (err) {
    console.error('Error:', err.message)
})

handler.on('push', function (event) {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref)
    run_cmd('sh', ['deploy.sh'], function (text) { console.log(text) })
})
