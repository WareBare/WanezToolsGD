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
        warn: `${dirBase}/img/icon_warn.png`,
        save: `img/icon_save.png`
    },
    
    err($msg,$title){
        /*
        new Notification(`Error`, {
            body: $msg || `An Error occured`,
            icon: this.icons.err
        });
        */
        //console.log(`wzNotify.err: ${$msg || `An Error Occurred`}`);
        wzWND({
            Title: $title || `ERROR!`,
            Body: $msg || ``,
            Icon: this.icons.err
        },`notify`).show();
    },
    todo($msg){
        console.log(`wzNotify.todo: ${$msg || `An Error Occurred`}`);
    },
    warn($msg,$title){
        //console.log(`wzNotify.warn: ${$msg || `You are warned`}`);
        wzWND({
            Title: $title || `Warning!`,
            Body: $msg || ``,
            Icon: this.icons.warn
        },`notify`).show();
    },
    
    info($msg,$title){
        wzWND({
            Title: $title || `Information`,
            Body: $msg || ``,
            Icon: this.icons.info
        },`notify`).show();
    },
    
    save($msg,$title){
        wzWND({
            Title: $title || `File Saved!`,
            Body: $msg || ``,
            Icon: this.icons.save
        },`notify`).show();
    },
    
};
