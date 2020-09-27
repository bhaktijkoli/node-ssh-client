class Nginx {
    constructor(client) {
        this.client = client
    }

    isInstalled = async () => {
        const result = await this.client.execCommand('nginx -v')
        if (result.code !== null) return false;
        return true;
    }

    getVersion = async () => {
        const result = await this.client.execCommand('nginx -v')
        if (result.code !== null) return false;
        return result.stderr.replace('nginx version: ', '');
    }
}

module.exports = Nginx