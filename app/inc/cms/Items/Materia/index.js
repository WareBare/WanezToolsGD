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
    forms: {},
    
    formOnChange: function($el){
        //this.forms.main_form.onChange($el);
    },
    
    content_Edit: function(){
        let out_ = ``;
        
        
        
        return out_;
    },
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        let out_ = `Materia => Components`;
    
        if(this.contentType){
            out_ = this.content_Edit();
        }
        
        return `${out_}`;
    },
    
    sidebarBtns_: function(){
        return [];
    },
    sidebarList_: function(){
        this.Base.iniMateria();
        
        return this.Base._mMateria.getList();
    }
    
};
