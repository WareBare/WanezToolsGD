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
    removePartials: function(){
        this.Base._mItems.removePartials();
    },
    
    content_Edit: function(){
        let out_,aMagic_BTNs = [],aRare_BTNs = [],aOther_BTNs = [],list = this.Base._mItems.getList(),
            tpl = `<ul style="display: inline-block;vertical-align: top;">{MAGIC}</ul><ul style="display: inline-block;vertical-align: top;">{RARE}</ul><ul style="display: inline-block;vertical-align: top;">{OTHER}</ul>`;
        
    
        for( let $_contentType in list ){
            //console.log(list[$_contentType].text);
            if(list[$_contentType].text.includes(`compa_`)){
                aMagic_BTNs.push({
                    "ONCLICK": `_cms.Base.showMateriaEdit('${$_contentType}');`,//`_cms.Base.loadCMS('${$_contentType}','${list[$_contentType].param}');`,
                    "TEXT": list[$_contentType].text || $_contentType,
                    "CHECKED": ($_contentType === this.Base.currentItemId) ? 'checked':''
                });
            }else if(list[$_contentType].text.includes(`compb_`)){
                aRare_BTNs.push({
                    "ONCLICK": `_cms.Base.showMateriaEdit('${$_contentType}');`,//`_cms.Base.loadCMS('${$_contentType}','${list[$_contentType].param}');`,
                    "TEXT": list[$_contentType].text || $_contentType,
                    "CHECKED": ($_contentType === this.Base.currentItemId) ? 'checked':''
                });
            }else{
                aOther_BTNs.push({
                    "ONCLICK": `_cms.Base.showMateriaEdit('${$_contentType}');`,//`_cms.Base.loadCMS('${$_contentType}','${list[$_contentType].param}');`,
                    "TEXT": list[$_contentType].text || $_contentType,
                    "CHECKED": ($_contentType === this.Base.currentItemId) ? 'checked':''
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
        this.contentType = $contentType || this.contentType;
        if(!this.contentType){
            this.contentType = (appConfig.get(`GrimDawn.Items.MateriaCustomPath`) && appConfig.get(`GrimDawn.Items.MateriaCustomPath`) !== ``) ? `Custom` : `Vanilla`;
        }
        if($contentType && $contentType === this.contentType){
            this.Base.currentItemId = 0;
        }
        
        let out_ = `Materia => Components`;
    
        switch(this.contentType){
            case `Custom`:
                this.Base.iniMateria(appConfig.get(`GrimDawn.Items.MateriaCustomPath`));
                break;
            default:
                this.Base.iniMateria();
                break;
        }
        out_ = this.content_Edit();
        
        return `${out_}`;
    },
    
    sidebarBtns_: function(){
        return [{
            "ONCLICK": "_cms.removePartials();",
            "TEXT": "Remove Partials"
        }];
    },
    sidebarList_: function(){
        let mList = {};
        
        if(appConfig.get(`GrimDawn.Items.MateriaCustomPath`) && appConfig.get(`GrimDawn.Items.MateriaCustomPath`) !== ``){
            mList[`Custom`] = {};
        }
        mList[`Vanilla`] = {};
        
        
        return mList;
    }
    
};
