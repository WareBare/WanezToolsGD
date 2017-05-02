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
        let out_,aMagic_BTNs = [],aRare_BTNs = [],aOther_BTNs = [],list = this.Base._mMateria.getList(),
            tpl = `<ul style="display: inline-block;vertical-align: top;">{MAGIC}</ul><ul style="display: inline-block;vertical-align: top;">{RARE}</ul><ul style="display: inline-block;vertical-align: top;">{OTHER}</ul>`;
        
    
        for( let $_contentType in list ){
            //console.log(list[$_contentType].text);
            if(list[$_contentType].text.includes(`compa_`)){
                aMagic_BTNs.push({
                    "ONCLICK": `_cms.Base.showMateriaEdit('${$_contentType}');`,//`_cms.Base.loadCMS('${$_contentType}','${list[$_contentType].param}');`,
                    "TEXT": list[$_contentType].text || $_contentType,
                    "CHECKED": ($_contentType === this.Base.currentMateria) ? 'checked':''
                });
            }else if(list[$_contentType].text.includes(`compb_`)){
                aRare_BTNs.push({
                    "ONCLICK": `_cms.Base.showMateriaEdit('${$_contentType}');`,//`_cms.Base.loadCMS('${$_contentType}','${list[$_contentType].param}');`,
                    "TEXT": list[$_contentType].text || $_contentType,
                    "CHECKED": ($_contentType === this.Base.currentMateria) ? 'checked':''
                });
            }else{
                aOther_BTNs.push({
                    "ONCLICK": `_cms.Base.showMateriaEdit('${$_contentType}');`,//`_cms.Base.loadCMS('${$_contentType}','${list[$_contentType].param}');`,
                    "TEXT": list[$_contentType].text || $_contentType,
                    "CHECKED": ($_contentType === this.Base.currentMateria) ? 'checked':''
                });
            }
            
        }
    
        out_ = tpl.wzOut({
            MAGIC: appData.tpl.Buttons.ListContent.wzParseTPL(aMagic_BTNs),
            RARE: appData.tpl.Buttons.ListContent.wzParseTPL(aRare_BTNs),
            OTHER: appData.tpl.Buttons.ListContent.wzParseTPL(aOther_BTNs)
        });
        
        return out_;
    },
    
    content_: function($contentType){
        this.contentType = $contentType || `Edit`; // this.contentType
        
        let out_ = `Materia => Components`;
        this.Base.iniMateria();
    
        if(this.contentType){
            if(this.contentType === `Edit`){
                out_ = this.content_Edit();
            }
            
        }
        
        return `${out_}`;
    },
    
    sidebarBtns_: function(){
        return [];
    },
    sidebarList_: function(){
        return {
            Edit: {}
        };
    }
    
};
