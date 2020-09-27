class Server {

    constructor(client) {
        this.client = client;
    }

    getKernelName = async () => {
        const result = await this.client.execCommand('uname -s');
        return result.stdout;
    }

    getProcessor = async () => {
        const result = await this.client.execCommand('uname -m');
        return result.stdout;
    }

    getOS = async () => {
        const result = await this.client.execCommand('lsb_release -a | grep Description:');
        return result.stdout.replace('Description:\t', '');
    }

    detectWebDrivers = async () => {

    }
}

module.exports = Server