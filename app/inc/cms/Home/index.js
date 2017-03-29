/**
 * Created by WareBare on 3/24/2017.
 */

module.exports = {
    tplContent: {},
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        let out_ = `Welcome<br />
        Changes made outside the tool, will require a reload, you should start by going to "Settings"<br /><br />
        You can also jump right to the <span onclick="wzCMS(['Home','Settings']);_cms.Base.loadContent('Grim Dawn');" class="linkBTN">Grim Dawn Settings</span><br />General Information about the Tool from the <span onclick="wzCMS(['Docs','General','ReadMe']);" class="linkBTN">GitHub README.md</span>`;
        
        return `${out_}`;
    },
    
    sidebarBtns_: function(){
        return [];
    },
    sidebarList_: function(){
        return {}
    }
    
};
