/**
 * Created by WareBare on 4/29/2017.
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
    
    checkIfViableField($value){
        let isViable = false;
        if($value !== '0' &&
            $value !== '0.0' &&
            $value !== '0.000000' &&
            $value !== '' &&
            typeof $value !== 'undefined'){
            isViable = true;
        }
        return isViable;
    },
    
    content_: function(){
        let out_,
            _materia = this._mItems.getMateriaById(this.currentItemId),
            objItems = {},
            aIgnoreQualifier = {characterBaseAttackSpeedTag: true},
            qualifiersTPL = wzTemplates.__getGroupFields(`database/templates/itemrelic.tpl`,[`Offensive Parameters`,`Defensive Parameters`,`Retaliation Parameters`,`Character Parameters`,`Skill Parameters`,`Conversion Parameters`,`Skill Augment`,`Skill Modifiers`]);
        //console.log(wzStorageGD.__get(this.contentType));
        
        objItems[`Qualifiers`] = objItems[`Qualifiers`] || {};
        //console.log(this.currentMateria);
        for(let $_Index in qualifiersTPL){
            if(this.checkIfViableField(_materia.__getField($_Index)) && !aIgnoreQualifier[$_Index]) {
                objItems[`Qualifiers`][`${this.currentItemId}::${$_Index}`] = {
                    label: $_Index,
                    type: (Array.isArray(_materia.__getField($_Index))) ? `listArea` : `textLarge`
                };
            }
            
        }
        this.forms.main_form = new WZ.Core.cForm({
            id: 'main_form',
            isWnd: this.wndId,
            fieldSetStyle: `width: 300px;`,
            isModule: this._mItems,
            onChange: {
                //custom: `formOnChange(this)`
            },
            items: objItems
        });
        
        out_ = this.forms.main_form.create();
        
        return out_;
    }
    
};
