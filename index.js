const fs = require('fs');
require('dotenv').config()
const { NodeSSH } = require('node-ssh')

const Server = require('./servers/Server');
const Nginx = require('./web-drivers/nginx');

let key = null;
if (process.env.SSH_KEYFILE) {
    key = fs.readFileSync(process.env.SSH_KEYFILE, "utf8")
}

const ssh = new NodeSSH()
ssh.connect({
    host: process.env.SSH_HOST,
    port: process.env.SSH_PORT,
    username: process.env.SSH_USERNAME,
    password: process.env.SSH_PASSWORD,
    privateKey: key,
}).then(async () => {
    console.log("connected");
    let server = new Server(ssh);
    console.log(await server.getKernelName());
    console.log(await server.getOS());
    console.log(await server.getProcessor());
    let webdriver = new Nginx(ssh);
    console.log(await webdriver.isInstalled());
    console.log(await webdriver.getVersion());
})