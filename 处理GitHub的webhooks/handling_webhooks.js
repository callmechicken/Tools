const http = require('http');
const childProcess = require('child_process');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/fuck') {
        let reqBody = [];
        req.on('data', chunk => {
            reqBody.push(chunk);
        });
        req.on('end', () => {
            reqBody = JSON.parse(Buffer.concat(reqBody).toString());
            childProcess.exec('git pull', (error, stdout, stderr) => {
                console.log('=====================UPDATE=====================\n', stdout);
            });
        });
    }
});
server.listen(7777);