/**
 * Created by WareBare on 4/27/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    //title: `Settings :: Grim Dawn`,
    titlePage: `Relic Qualifiers`,
    //formTags: false,
    
    forms: {},
    
    content_: function(){
        let out_,
            objItems = {},
            aIgnoreQualifier = {bracelet: true},
            qualifiersTPL = wzTemplates.__getGroupFields(`database/templates/itemrelic.tpl`,[`Relic Qualifiers`]);
        //console.log(wzStorageGD.__get(this.contentType));
    
        objItems[`Qualifiers`] = objItems[`Qualifiers`] || {};
    
        for(let $_Index in qualifiersTPL){
            if(!aIgnoreQualifier[$_Index]) {
                objItems[`Qualifiers`][`${this.contentType}::${$_Index}`] = {
                    label: $_Index,
                    type: `checkBox`
                };
            }
        
        }
        this.forms.main_form = new WZ.Core.cForm({
            id: 'main_form',
            isModule: this.Base._mMateria,
            onChange: {
                custom: `formOnChange(this)`
            },
            items: objItems
        });
    
        out_ = this.forms.main_form.create();
        
        return out_;
    }
    
};
