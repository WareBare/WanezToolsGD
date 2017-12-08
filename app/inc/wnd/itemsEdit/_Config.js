/**
 * Created by Ware on 11/11/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    //title: `Settings :: Grim Dawn`,
    titlePage: `Item Config`,
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
        let out_, TempFieldName,
            _CurrentItem = this._mItems.getMateriaById(this.currentItemId),
            bIsMateria = (this._mItems.getField(this.currentItemId,`templateName`) === `database/templates/itemrelic.tpl`),
            objItems = {},
            qualifiersTPL = wzTemplates.__getGroupFields(`database/templates/itemrelic.tpl`,[`Offensive Parameters`,`Defensive Parameters`,`Retaliation Parameters`,`Character Parameters`,`Skill Parameters`,`Conversion Parameters`,`Skill Augment`,`Skill Modifiers`]);
    
        // BASICS \\
        objItems[`Basics`] = objItems[`Basics`] || {};
        TempFieldName = `FileDescription`;
        objItems[`Basics`][`${this.currentItemId}::${TempFieldName}`] = {
            label: `${TempFieldName}`,
            type: `textMedium`,
            newLine: true
        };
        TempFieldName = `itemLevel`;
        objItems[`Basics`][`${this.currentItemId}::${TempFieldName}`] = {
            label: `${TempFieldName}`,
            type: `number`
        };
        TempFieldName = `levelRequirement`;
        objItems[`Basics`][`${this.currentItemId}::${TempFieldName}`] = {
            label: `${TempFieldName}`,
            type: `number`,
            newLine: true
        };
        TempFieldName = `strengthRequirement`;
        objItems[`Basics`][`${this.currentItemId}::${TempFieldName}`] = {
            label: `${TempFieldName}`,
            type: `number`
        };
        TempFieldName = `dexterityRequirement`;
        objItems[`Basics`][`${this.currentItemId}::${TempFieldName}`] = {
            label: `${TempFieldName}`,
            type: `number`
        };
        TempFieldName = `intelligenceRequirement`;
        objItems[`Basics`][`${this.currentItemId}::${TempFieldName}`] = {
            label: `${TempFieldName}`,
            type: `number`,
            newLine: true
        };
        if(bIsMateria){
            TempFieldName = `completedRelicLevel`;
            objItems[`Basics`][`${this.currentItemId}::${TempFieldName}`] = {
                label: `${TempFieldName}`,
                type: `number`
            };
        }
        TempFieldName = `itemCost`;
        objItems[`Basics`][`${this.currentItemId}::${TempFieldName}`] = {
            label: `${TempFieldName}`,
            type: (this._mItems.getField(this.currentItemId,`completedRelicLevel`) && parseInt(this._mItems.getField(this.currentItemId,`completedRelicLevel`)) > 1) ? `listArea` : `number`
        };
        
        // TAGS \\
        objItems[`Tags`] = objItems[`Tags`] || {};
        TempFieldName = `itemText`;
        objItems[`Tags`][`${this.currentItemId}::${TempFieldName}`] = {
            label: `${TempFieldName}`,
            type: `textMedium`
        };
        if(bIsMateria){
            TempFieldName = `description`;
            objItems[`Tags`][`${this.currentItemId}::${TempFieldName}`] = {
                label: `${TempFieldName}`,
                type: `textMedium`
            };
        }else{
            TempFieldName = `itemNameTag`;
            objItems[`Tags`][`${this.currentItemId}::${TempFieldName}`] = {
                label: `${TempFieldName}`,
                type: `textMedium`
            };
            TempFieldName = `itemQualityTag`;
            objItems[`Tags`][`${this.currentItemId}::${TempFieldName}`] = {
                label: `${TempFieldName}`,
                type: `textMedium`
            };
            TempFieldName = `itemStyleTag`;
            objItems[`Tags`][`${this.currentItemId}::${TempFieldName}`] = {
                label: `${TempFieldName}`,
                type: `textMedium`
            };
        }
        
        
        this.forms.main_form = new WZ.Core.cForm({
            id: 'main_form',
            isWnd: this.wndId,
            fieldSetStyle: `width: 560px;`,
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
