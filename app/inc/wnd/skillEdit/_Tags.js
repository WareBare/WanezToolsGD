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
        out_ = `<div><span style="color: #80FFD5;">^a [Aqua]</span> | <span style="color:#39ABCF;">^b [Blue]</span> | <span style="color:#00FFFF;">^c [Cyan]</span> | <span style="color:#191919;">^d [DarkGray]</span> | <span style="color:#FF69B5;">^f [Fushia]</span> | <span style="color:#10EB5D;">^g [Green]</span> | <span style="color:#5A039A;">^i [Indigo]</span> | <span style="color:#F1E78C;">^k [Khaki]</span> | <span style="color:#92CC00;">^l [Olive]</span> | <span style="color:#800000;">^m [Maroon]</span> | <span style="color:#F3A44D;">^o [Orange]</span> | <span style="color:#BD94C6;">^p [Purple]</span> | <span style="color:#FF4200;">^r [Red]</span> | <span style="color:#9A9A9A;">^s [Silver]</span> | <span style="color:#00FFD2;">^t [Teal]</span> | <span style="color:#FFFFFF;">^w [White]</span> | <span style="color:#FFF62C;">^y [Yellow]</span> | <span>^n [Line Break/Carriage Return]</span></div>${this.forms.main_form.create()}`;
        
        return out_;
    }
    
};
