/**
 * Created by Ware on 7/23/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    //title: `Settings :: Grim Dawn`,
    titlePage: `Relic Tags`,
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
        let out_,objItems = {};
    
        if(this._tagsItems){
            objItems[`Tags`] = {};
            /*
             objItems[`Tags`][`${this.currentMateria}::description`] = {
             label: `Description`,
             type: `textLarge`
             };
             */
            objItems[`Tags`][`item::${this._mItems.getMateriaById(this.currentItemId).__getField("description")}`] = {
                label: `Name`,
                type: `textLarge`
            };
            objItems[`Tags`][`item::${this._mItems.getMateriaById(this.currentItemId).__getField("itemText")}`] = {
                label: `Text`,
                type: `textArea`
            };
    
            this.forms.main_form = new WZ.Core.cForm({
                id: 'main_form',
                isWnd: this.wndId,
                fieldSetStyle: `width: 300px;`,
                //isModule: this._mMateria,
                _tags: {
                    //skills: this._tagsSkills
                    item: `text_en/${appConfig.get(`GrimDawn.Items.TagsItems`)}`
                },
                onChange: {
                    //custom: `formOnChange(this)`
                },
                items: objItems
            });
    
            out_ = this.forms.main_form.create();
        }else{
            out_ = `You need to set the Materia tag file in the Settings (Grim Dawn) before you can use this.`;
        }
        
        
        return out_;
    }
    
};