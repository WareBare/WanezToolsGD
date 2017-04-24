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
    
        this.Base.iniMateria();
        
        let out_ = `Materia => Components`;
        
        return `${out_}`;
    },
    
    sidebarBtns_: function(){
        return [];
    },
    sidebarList_: function(){
        return {}
    }
    
};
