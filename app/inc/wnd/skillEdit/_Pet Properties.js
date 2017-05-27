/**
 * Created by WareBare on 4/9/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    //title: `Settings :: Grim Dawn`,
    titlePage: `UI`,
    ignoreLvL: [true],
    //ignoreTag: false,
    //formTags: false,
    
    forms: {},
    
    submitCustomForm: function($el){
        let field = $el.name.split(`::`);
    
        //console.log(this.ignoreTag);
        if(field[0] === `ignoreSkill`){
            this.ignoreLvL[parseInt(field[1])] = $el.checked;
        }else if(field[0] === `ignoreTag`){
            this.ignoreTag = $el.checked;
            //console.log(this.ignoreTag);
            //console.log($el.checked);
        }
        //console.log(`${$el.checked}`);
        wzWND(this.wndId).refresh();
        //console.log(this.ignoreTag);
    },
    
    content_: function(){
        let out_,tempOpt = {},Items = {},ItemsCustom = {},tempPet,showExtraSkill,
            tpl = `<div>{CUSTOM}</div><div>{FORM}</div>`;
        //this.formTags = _cms.Base._tagsSkills;
        this._mSkill.iniSpawnObjects();
        if(typeof this.ignoreTag === `undefined`) this.ignoreTag = true;
        if(this._mSkill.getField(`UI`,`skillName`)) tempOpt[`${this._mSkill.getField(`UI`,`skillName`).replace(`${this._mUI.getLogicPath()}/`,``)}`] = `${this._mSkill.getField(`UI`,`skillName`)}`;
    
    
        ItemsCustom[`Hide Fields`] = ItemsCustom[`Hide Fields`] || {};
        ItemsCustom[`Hide Fields`][`ignoreSkill::0`] = {
            label: `Empty`,
            type: `checkBox`,
            value: this.ignoreLvL[0]
        };
        
        for(let $_Level in this._mSkill.aSkills.spawnObjects){
            tempPet = this._mSkill.aSkills.spawnObjects[$_Level];
    
            showExtraSkill = true;
            Items[`Pet Level ${$_Level}`] = {};
            for(let i = 1; i<= 17; i++){
                if(this._mSkill.getField(`spawnObjects.${$_Level}`,`skillName${i}`)){
                    ItemsCustom[`Hide Fields`][`ignoreSkill::${i}`] = {
                        label: `${i}`,
                        type: `checkBox`,
                        value: this.ignoreLvL[i]
                    };
                }
                
                if(!this.ignoreLvL[i]){
                    if( this._mSkill.getField(`spawnObjects.${$_Level}`,`skillName${i}`) ){ //  || (showExtraSkill && !this.ignoreLvL[0])
                        Items[`Pet Level ${$_Level}`][`spawnObjects.${$_Level}::skillName${i}`] = {
                            label: `skillName${i}`,
                            type: `textLarger`
                        };
                        Items[`Pet Level ${$_Level}`][`spawnObjects.${$_Level}::skillLevel${i}`] = {
                            label: `skillLevel${i}`,
                            type: `text`,
                            reload: false
                        };
                        //if(!this._mSkill.getField(`spawnObjects.${$_Level}`,`skillName${i}`) && showExtraSkill) showExtraSkill = false;
                    }else if(showExtraSkill && !this.ignoreLvL[0]){
        
                        Items[`Pet Level ${$_Level}`][`spawnObjects.${$_Level}::skillName${i}`] = {
                            label: `skillName${i}`,
                            type: `textLarger`
                        };
                        Items[`Pet Level ${$_Level}`][`spawnObjects.${$_Level}::skillLevel${i}`] = {
                            label: `skillLevel${i}`,
                            type: `text`,
                            reload: false
                        };
        
                        showExtraSkill = false;
                    }
                }
            }
            if(!this.ignoreTag){
                Items[`Pet Level ${$_Level}`][`spawnObjects.${$_Level}::description`] = {
                    label: `description (tag)`,
                    type: `textLarge`
                };
            }
            
        }
    
        ItemsCustom[`Hide Fields`][`ignoreTag::petTag`] = {
            label: `tag`,
            type: `checkBox`,
            value: this.ignoreTag
        };
        
        this.forms.custom_form = new WZ.Core.cForm({
            id: 'custom_form',
            //title: `Skill UI`,
            isWnd: this.wndId,
            //isModule: this._mSkill,
            //_tags: this._tagsSkills,
            onChange: {
                custom: `submitCustomForm(this)`
            },
            items: ItemsCustom
        });
        
        this.forms.main_form = new WZ.Core.cForm({
            id: 'main_form',
            //title: `Skill UI`,
            isWnd: this.wndId,
            isModule: this._mSkill,
            _tags: this._tagsSkills,
            //fieldSetStyle: `width: 575px;`,
            onChange: {
                //custom: `submitForm(this)`
            },
            items: Items
        });
        
        out_ = tpl.wzOut({
            CUSTOM: this.forms.custom_form.create(),
            FORM: this.forms.main_form.create()
        });
        //console.log(`${WZ.GrimDawn.tFn.getPaths().Mod}/${this._mSkill.getSkillPaths().logicRelPath}`);
        
        return out_;
    }
    
};
