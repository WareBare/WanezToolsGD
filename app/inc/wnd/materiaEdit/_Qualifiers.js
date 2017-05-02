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
            objGroups = {
                amulet: `Accessory`,
                ring: `Accessory`,
                medal: `Accessory`,
                head: `Armor`,
                shoulders: `Armor`,
                hands: `Armor`,
                chest: `Armor`,
                waist: `Accessory`,
                legs: `Armor`,
                feet: `Armor`,
                shield: `Misc`,
                offhand: `Misc`,
                spear: `1H Weapon`,
                staff: `2H Weapon`,
                axe: `1H Weapon`,
                mace: `1H Weapon`,
                sword: `1H Weapon`,
                dagger: `1H Weapon`,
                scepter: `1H Weapon`,
                ranged1h: `1H Weapon`,
                ranged2h: `2H Weapon`,
                axe2h: `2H Weapon`,
                mace2h: `2H Weapon`,
                sword2h: `2H Weapon`
            },
            qualifiersTPL = wzTemplates.__getGroupFields(`database/templates/itemrelic.tpl`,[`Relic Qualifiers`]);
        //console.log(wzStorageGD.__get(this.contentType));
    
    
        for(let $_Index in qualifiersTPL){
            if(!aIgnoreQualifier[$_Index]) {
                objItems[objGroups[$_Index]] = objItems[objGroups[$_Index]] || {};
                objItems[objGroups[$_Index]][`${this.currentMateria}::${$_Index}`] = {
                    label: $_Index,
                    type: `checkBox`
                };
            }
        
        }
        this.forms.main_form = new WZ.Core.cForm({
            id: 'main_form',
            //title: `Relic Qualifiers`,
            isWnd: this.wndId,
            fieldSetStyle: `width: 500px;`,
            isModule: this._mMateria,
            onChange: {
                //custom: `formOnChange(this)`
            },
            items: objItems
        });
    
        out_ = this.forms.main_form.create();
        
        return out_;
    }
    
};
