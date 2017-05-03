/**
 * Created by WareBare on 4/7/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    //title: `Settings :: Grim Dawn`,
    titlePage: `Files`,
    
    forms: {},
    //submitForm: function($el){
        //console.log(`custom submit: ${$el.value}`);
    //},
    
    content_: function(){
        let out_ = ``,tempFormId,tempOpt,tempItems,fieldName;
        
        if(this._mSkill.aSkills.buff){
            for(let $_Index in this._mSkill.aSkills.buff){
                tempItems = {};
                tempOpt = {};
    
                if(this._mSkill.getField(`buff.${$_Index}`,`Class`).includes(`Pet`) || this._mSkill.getField(`buff.${$_Index}`,`Class`).includes(`pet`)){
                    fieldName = `petSkillName`;
                }else{
                    fieldName = `buffSkillName`;
                }
                
                if(this._mSkill.getField(`buff.${$_Index}`,fieldName)) tempOpt[`${this._mSkill.getField(`buff.${$_Index}`,fieldName).replace(`${this._mUI.getLogicPath()}/`,``)}`] = `${this._mSkill.getField(`buff.${$_Index}`,fieldName)}`;
                
                tempItems[`Buff/Pet`] = {};
                tempItems[`Buff/Pet`][`buff.${$_Index}::${fieldName}`] = {
                    label: fieldName,
                    type: `listBoxLarge`,
                    data: Object.assign({'':``},tempOpt,this._mUI.getSkillFiles(true)),
                    dataUseValue: true,
                    dataPath: this._mUI.getLogicPath()
                };
                
                tempFormId = `buff_form_${$_Index}`;
                this.forms[tempFormId] = new WZ.Core.cForm({
                    id: tempFormId,
                    isWnd: this.wndId,
                    isModule: this._mSkill,
                    _tags: this._tagsSkills,
                    onChange: {
                        //custom: `submitForm(this)`
                    },
                    items: tempItems
                });
                out_ += this.forms[tempFormId].create();
            }
        }
        if(this._mSkill.aSkills.logic && (this._mSkill.getField(`logic`,`Class`).includes(`Pet`) || this._mSkill.getField(`logic`,`Class`).includes(`pet`) || this._mSkill.getField(`logic`,`spawnObjects`)) ){
            this.forms.main_form = new WZ.Core.cForm({
                id: 'main_form',
                isWnd: this.wndId,
                isModule: this._mSkill,
                _tags: this._tagsSkills,
                onChange: {
                    //custom: `submitForm(this)`
                },
                items: {
                    'Main File': {
                        'logic::spawnObjects': {
                            label: `spawnObjects`,
                            type: `listAreaLarge`,
                            data: Object.assign({'':``},this._mUI.getSkillFiles(true)),
                            dataUseValue: true,
                            dataPath: this._mUI.getLogicPath()
                        }
                    }
                }
            });
            out_ += this.forms.main_form.create();
        }
        
        
        //out_ = ``;
        
        return out_;
    }
    
};
