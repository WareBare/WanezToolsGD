/**
 * Created by WareBare on 3/24/2017.
 *
 * Wanez Framework/CMS for Electron
 * @author WareBare (Daniel Kamp)
 * @copyright Copyright (c) 2017, WareBare (Daniel Kamp). All rights reserved.
 * @website https://github.com/WareBare
 * @version 0.1
 *
 */

appConfig = new eConfig({name: `settings-app`});

//clipboard.writeText('Example String', 'selection');
//console.log(clipboard.readText('selection'));

/*
let storageInterval = setInterval(() => {
    wzStorageGD.watchClasses();
},100);
*/

/*
config.set('unicorn', '🦄');
console.log(config.get('unicorn'));
//=> '🦄'

// use dot-notation to access nested properties
config.set('foo.bar', true);
console.log(config.get('foo'));
//=> {bar: true}

config.delete('unicorn');
console.log(config.get('unicorn'));
//=> undefined
*/

if(!appConfig.has('cms')){
    appConfig.set('cms.0',`Home`);
    appConfig.set('cms.1',false);
    appConfig.set('cms.2',false);
}

require(`./cms`);
require(`./wnd`);

_app = new WZ.Core.cApp();
_app.create_();
wzCMS(appConfig.get('cms'));


let keyUp = (e) => {
    //console.log(`${e.keyCode}`);
    
    if(appConfig.get('cms')[0] === `Mastery` && appConfig.get('cms')[1] === `UI`){
        if (e.altKey && e.keyCode === 90) {
            //console.log(`Zenith - Down`);
            _cms.setConnector(`ZenithDown`);
        }else if(e.altKey && e.keyCode === 88){
            //console.log(`Zenith - Up`);
            //_cms.setConnector(`ZenithUp`);
            wzNotify.info(`Sorry this is not yet possible!`);
        }else if(e.altKey && e.keyCode === 67){
            //console.log(`Zenith - Up`);
            _cms.setConnector(`Default`);
        }else if(e.altKey && e.keyCode === 86){
            //console.log(`Zenith - Up`);
            _cms.removeConnector();
        }
    }
    
};

document.addEventListener('keyup', keyUp, false);
