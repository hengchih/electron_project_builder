/**
 * Created by chrischang on 2015/11/22.
 */
var app = require('app');
var BrowserWindow = require('browser-window');
var child_process = require('child_process');
var fs = require('fs');

// Report crashes to our server.
require('crash-reporter').start();
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function () {
    var ipc = require('electron-safe-ipc/host');

    // Create the browser window.
    mainWindow = new BrowserWindow({width: 600, height: 650});

    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/index.html');

    // Open the DevTools.
    mainWindow.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null;
    });


    ipc.on('clickItemFromRenderer', function (website) {
        console.log('start build ' + website);
        child_process.exec('cd c:\\91Project && builder.bat ' + website, function(err, stdout, stderr){
            if(err){
                console.log(err);
                return;
            }
            if(stderr){
                console.log(stderr);
                return;
            }

            //// write build result to history.json
            fs.readFile(__dirname + '/history.json', function(err, data){
                if(err){
                    console.log(err);
                    return;
                }
                var history = JSON.parse(data.toString());
                console.log(website + ' length= ' + history[website].length);
                if(history[website].length < 3){
                    history[website].push({
                        buildTime: new Date(),
                        result: stdout
                    });
                }else{
                    var tempHistory = history[website].slice(1,3);
                    tempHistory.push({
                        buildTime: new Date(),
                        result: stdout
                    })
                    history[website] = tempHistory;
                }
                fs.writeFile(__dirname + '/history.json', JSON.stringify(history), function(err){
                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log('wrote');
                })

            })

            //console.log(stdout);

            if(stdout.indexOf('Build succeeded') >= 0){
                console.log('Build succeeded');
                ipc.send('buildResultFromMain', 'succeeded');
            }else{
                console.log('Build failure');
                ipc.send('buildResultFromMain', 'failure');    
            }

            
        })

    })
});