/**
 * Created by WareBare on 3/29/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    Forms:{},
    tplContent: {},
    
    editSkillOnBlur: function(e,el,$field,$type){
        let alwaysSave = false;
        //console.log(opt);
        if($type === `tag`){
            this.Base._mSkill.setSkillTag($field,el.value);
        }else{
            let opt = {};
            opt[$field] = el.value;
            this.Base._mSkill.setField($type,opt);
            //console.log($type);
            if($field === `FileDescription`) alwaysSave = true;
        }
    
        this.Base._mSkill.saveModuleData([this.Base._tagsSkills,false,false],alwaysSave);
        this.Base._tagsSkills.saveData();
    
        wzCMS([`Mastery`,`Skill`]);
    },
    editSkillOnEnter: function(e){
        if (e.keyCode==13) {
            document.activeElement.blur();
        }
    },
    
    content_EditSkill: function(){
        let out_ = `Loading...`;
        
        if(this.Base._mSkill){
            out_ = this.Base._mSkill.generateForm();
        }else{
            this.contentType = false;
            wzCMS([`Mastery`,`Skill`]);
        }
        
        return out_;
    },
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        let out_ = `Work In Progress - currently only skills from the skill tree are possible to be edited, more in the future (such as generating new skills)`;
        
        if(this.contentType){
            if(this.contentType === `EditSkill`){
                out_ = this.content_EditSkill();
            }
        }
        
        return out_;
    },
    
    sidebarBtns_: function(){
        return [];
    },
    sidebarList_: function(){
        return {}
    }
    
};
