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

_app = new WZ.Core.cApp();
_app.create_();
wzCMS(appConfig.get('cms'));

//console.log(`is fine`);
//document.getElementById(`appVersion`).innerHTML = `v${app.getVersion()}`;
