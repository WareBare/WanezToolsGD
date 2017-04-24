/**
 * Created by WareBare on 4/20/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent: {},
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        let out_ = `From here you are able to edit Items and Loottables.`;
        
        return `${out_}`;
    },
    
    sidebarBtns_: function(){
        return [];
    },
    sidebarList_: function(){
        return {}
    }
    
};
