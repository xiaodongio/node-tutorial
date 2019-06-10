'use strict';

const fs = require('fs');
const net = require('net');
const filename = process.argv[2];

if(!filename) {
  throw Error('Error: No filename specified.');
}

net.createServer(connection => {
  //reporting
  console.log('Subscriber connectd.');
  connection.write(`Now watching "${filename}" for changes... \n`);
  
  //watcher up
  const watcher = fs.watch(filename, () => connection.write(`File changed : ${new Date()} \n`));
  
  //clean up
  connection.on('close', () => {
    console.log('Subscriber disconnected');
    watcher.close();
  });
}).listen(60300, () => console.log('Listening for subscribers...'));
