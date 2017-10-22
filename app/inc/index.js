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

/*
MenuItem({
    prepend: (params, browserWindow) => [{
        label: 'Rainbow',
        // Only show it when right-clicking images
        visible: params.mediaType === 'image'
    }]
});
*/
/*
window.addEventListener('contextmenu', function(e) {
    // Only show the context menu in text editors.
    //if (!e.target.closest('textarea, input, [contenteditable="true"]')) return;
    
    let menu = ctxMenu();
    
    // The 'contextmenu' event is emitted after 'selectionchange' has fired but possibly before the
    // visible selection has changed. Try to wait to show the menu until after that, otherwise the
    // visible selection will update after the menu dismisses and look weird.
    setTimeout(function() {
        menu.popup(remote.getCurrentWindow());
    }, 30);
});
*/

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

ExecuteProgramGD = function(InExecutable){
    if(appConfig.get(`GrimDawn.Paths.Game`)){
        child_process(`${appConfig.get(`GrimDawn.Paths.Game`)}/${InExecutable}`, function(err, data) {
            if(err){
                console.error(err);
                return;
            }
        
            console.log(data.toString());
        });
    }
};

require(`./cms`);
require(`./wnd`);

_app = new WZ.Core.cApp();
_app.create_();
wzCMS(appConfig.get('cms'));



let keyUp = (e) => {
    //console.log(e.keyCode);
    
    if(e.keyCode === 116){
        location.reload();
    }else if(e.keyCode === 112){
        wzCMS([`Docs`,`ReadMe`]);
    }else if(e.keyCode === 113){
        wzCMS([`Docs`,`Change Log`]);
    }else if(e.keyCode === 117){
        wzWND('Settings').refresh();
    }
    
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
