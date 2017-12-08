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
        let out_ = ``,
            objItems = {},
            tagSlots = {},
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
    
        Log(this.currentItemId);
        for(let $_Index in qualifiersTPL){
            if(!aIgnoreQualifier[$_Index]) {
                objItems[objGroups[$_Index]] = objItems[objGroups[$_Index]] || {};
                objItems[objGroups[$_Index]][`${this.currentItemId}::${$_Index}`] = {
                    label: $_Index,
                    type: `checkBox`
                };
                if(this._tagsItems){
                    if(this._mItems.getMateriaById(this.currentItemId).__getField($_Index) === `1`){
                        //console.log(`${$_Index}`);
                        //tagSlots.push($_Index);
                        tagSlots[$_Index] = true;
                    }
                }
                
            }
        
        }
        this.forms.main_form = new WZ.Core.cForm({
            id: 'main_form',
            //title: `Relic Qualifiers`,
            isWnd: this.wndId,
            fieldSetStyle: `width: 500px;`,
            isModule: this._mItems,
            onChange: {
                //custom: `formOnChange(this)`
            },
            items: objItems
        });
    
        
        if(this._tagsItems){
            //console.log(tagSlots);
            //console.log(this._mMateria.genSlotTags(tagSlots));
            let itemText = this._tagsItems.__getField(this._mItems.getMateriaById(this.currentItemId).__getField("itemText"));
            let itemText2 = itemText.split(`^w^n`);
            //console.log(itemText.replace(itemText2[1],`(${this._mMateria.genSlotTags(tagSlots)})`));
            //itemText[1] = `(${this._mMateria.genSlotTags(tagSlots)})`;
            if(itemText2[1]){
                if(itemText2[1] !== `(${this._mItems.genSlotTags(tagSlots)})` && !appConfig.get(`GrimDawn.Items.allowTagChangeQualifier`)){
                    this._tagsItems.__setField(this._mItems.getMateriaById(this.currentItemId).__getField("itemText"), itemText.replace(itemText2[1],`(${this._mItems.genSlotTags(tagSlots)})`));
                    this._tagsItems.saveData();
                }
                
                out_ += `${(appConfig.get(`GrimDawn.Items.allowTagChangeQualifier`)) ? `<span style="color: darkred;">Tags will not be updated with:</span> ` : `<span style="color: darkgreen;">Tags have been updated:</span> ` }${this._mItems.genSlotTags(tagSlots)}<br />`;
            }
            
        }else{
            out_ += `When you add the file for Materia Tags in the <span style="color: lightblue;cursor: pointer;" onclick="wzWND('Settings').refresh();">Settings (Grim Dawn)</span> changing a Qualifier will update the tag for you, however this requires the vanilla formating [{TEXT}^w^n{Qualifier}] - without ^w^n the tool won't know where to change the text and may cause weird behavior. Remember to refresh this window when you do (just click on Qualifier on the left).<br />`;
        }
        
        out_ += this.forms.main_form.create();
        
        return out_;
    }
    
};
