/**
 * Created by WareBare on 4/8/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    //title: `Settings :: Grim Dawn`,
    titlePage: `UI`,
    
    forms: {
        main_form:false
    },
    
    content_: function(){
        this._mSkill.iniSpawnObjects();
        
        let out_,objItems = {};
    
        objItems[`Main Tags`] = {};
        objItems[`Main Tags`][`skills::${this._mSkill.getField(`logic`,`skillDisplayName`)}`] = {
            label: `${this._mSkill.getField(`logic`,`skillDisplayName`)}`,
            type: `textLarge`
        };
        objItems[`Main Tags`][`skills::${this._mSkill.getField(`logic`,`skillBaseDescription`)}`] = {
            label: `${this._mSkill.getField(`logic`,`skillBaseDescription`)}`,
            type: `textArea`
        };
        if(this._mSkill.aSkills.spawnObjects){
            objItems[`Pet Tags`] = {};
            //console.log(this._mSkill.aSkills.spawnObjects);
            for(let $_ID in this._mSkill.aSkills.spawnObjects){
                //console.log($_ID);
                objItems[`Pet Tags`][`skills::${this._mSkill.getField(`spawnObjects.${$_ID}`,`description`)}`] = {
                    label: `${this._mSkill.getField(`spawnObjects.${$_ID}`,`description`)}`,
                    type: `textLarge`
                };
            }
        }
        
        this.forms.main_form = new WZ.Core.cForm({
            id: 'main_form',
            title: `Tags (saved inside /${appConfig.get(`GrimDawn.Mastery.TagsSkills`)})`,
            isWnd: this.wndId,
            //isModule: this._mSkill,
            _tags: {
                skills: this._tagsSkills
            },
            onChange: {
                //custom: `submitForm(this)`
            },
            items: objItems
        });
        out_ = this.forms.main_form.create();
        
        return out_;
    }
    
};
