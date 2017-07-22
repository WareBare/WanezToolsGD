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

log.warn(`Program loaded using: v${app.getVersion()}`);

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
    
    if(appConfig.get('cms')[0] === `Mastery` && appConfig.get('cms')[1] === `Skill Allocation`){
        if(e.keyCode === 18){
            _cms.pressConnector = false;
            //console.log(`no please`);
        }
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
    if(appConfig.get('cms')[0] === `Mastery` && appConfig.get('cms')[1] === `Setup` && _cms.contentType === `Selection`){
        if(e.keyCode === 38){
            _cms.moveButtonWithKey(`Up`);
            //console.log(`arrow Up`);
        }else if(e.keyCode === 39){
    
            _cms.moveButtonWithKey(`Right`);
            //console.log(`arrow Right`);
        }else if(e.keyCode === 40){
    
            _cms.moveButtonWithKey(`Down`);
            //console.log(`arrow Down`);
        }else if(e.keyCode === 37){
    
            _cms.moveButtonWithKey(`Left`);
            //console.log(`arrow Left`);
        }
    }
    
};
let keyDown = (e) => {
    if(appConfig.get('cms')[0] === `Mastery` && appConfig.get('cms')[1] === `Skill Allocation`){
        if (e.keyCode === 18) {
            _cms.pressConnector = true;
            //console.log(`yes please`);
        }
    }
};


//log.info('Hello, info');
//log.error('Hello, error');
//log.debug('Hello, debug');


document.addEventListener('keyup', keyUp, false);
document.addEventListener('keydown',keyDown,false);
