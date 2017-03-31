/**
 * Created by WareBare on 3/29/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    icons: {
        err: `${dirBase}/img/icon_cancel.png`,
        info: `${dirBase}/img/icon_info.png`,
        save: `${dirBase}/img/icon_save.png`
    },
    
    err($msg){
        /*
        new Notification(`Error`, {
            body: $msg || `An Error occured`,
            icon: this.icons.err
        });
        */
        console.log(`wzNotify.err: ${$msg || `An Error Occurred`}`);
    },
    todo($msg){
        console.log(`wzNotify.todo: ${$msg || `An Error Occurred`}`);
    },
    warn($msg){
        console.log(`wzNotify.warn: ${$msg || `You are warned`}`);
    },
    
    info($msg){
        new Notification(`Information`, {
            body: $msg || `Needs a text, please report`,
            icon: this.icons.info
        });
    },
    
    save($msg){
        new Notification(`Saved File`, {
            body: $msg || `Needs a text, please report`,
            icon: this.icons.save
        });
    },
    
};
