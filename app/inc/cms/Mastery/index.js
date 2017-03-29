/**
 * Created by WareBare on 3/25/2017.
 */

// <span onclick="wzCMS(['Mastery','UI']);_cms.Base.loadCMS('nature',false);">Go To UI Nature</span>
module.exports = {
    tplContent: {},
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        let out_ = `Mastery Overview`;
        
        return out_;
    },
    
    sidebarBtns_: function(){
        return [];
    },
    sidebarList_: function(){
        return {}
    }
    
};
