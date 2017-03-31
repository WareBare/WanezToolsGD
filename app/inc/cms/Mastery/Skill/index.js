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
    _aSkillFiles: false,
    
    editSkillOnBlur: function(e,el,$field,$type,$reloadUI = false){
        let alwaysSave = false;
        //console.log(opt);
        if($type === `tag`){
            this.Base._mSkill.setSkillTag($field,el.value);
        }else{
            let opt = {};
            opt[$field] = el.value;
            if(this._aSkillFiles[`${opt[$field]}.dbr`]){
                opt[$field] = this._aSkillFiles[`${opt[$field]}.dbr`].split(`/database/`)[1];
                //console.log(opt[$field]);
            }
            this.Base._mSkill.setField($type,opt);
            //console.log($type);
            if($field === `FileDescription`) alwaysSave = true;
        }
    
        this.Base._mSkill.saveModuleData([this.Base._tagsSkills,false,false],alwaysSave);
        this.Base._tagsSkills.saveData();
    
        if($reloadUI){
            //let mSkill = this.Base._mSkill;
            this.Base._mUI.iniUI();
            this.Base._mSkill = false;
            //setTimeout(function(){
                //mSkill.reloadSkills();
            //},20);
            //this.Base._mSkill = mSkill;
            
            setTimeout(function(){
                wzCMS([`Mastery`,`UI`]);
                //_cms.reloadSkill();
            }, 10);
            
            //wzReloadCMS(40);
        }else{
            wzCMS([`Mastery`,`Skill`]);
        }
        
    },
    editSkillOnEnter: function(e){
        if (e.keyCode === 13) {
            document.activeElement.blur();
        }
    },
    emptyDataList: function(e){
    
    },
    reloadSkill: function(){
        this.Base._mSkill = this.Base._mUI.getSkillPerFileName(this.Base._mSkill.getSkillPaths().fileName);
        console.log(this.Base._mUI.getSkillPerFileName(this.Base._mSkill.getSkillPaths().fileName));
        //this.Base._mSkill = false;
        //wzCMS([`Mastery`,`Skill`]);
        setTimeout(function(){
            wzCMS([`Mastery`,`UI`]);
            //_cms.Base.loadContent(`EditSkill`);
        }, 1000);
    },
    dataSkillsAutoComplete: function(e,el){
        let tempItems = ``,tempElement,tempName,
            ul = el.nextSibling;
        this._aSkillFiles = this.Base._mUI.getSkillFiles();
        ul.innerHTML = ``;
        
        for(let $_FileName in this._aSkillFiles){
            tempName = $_FileName.replace(`.dbr`,``);
            tempElement = document.createElement(`li`);
            tempElement.innerHTML = $_FileName.replace(`.dbr`,``);
            tempElement.addEventListener(`mouseover`,function(){
                el.value = $_FileName.replace(`.dbr`,``);
            });
            //tempElement.addEventListener(`click`,function(){
                //el.value = $_FileName.replace(`.dbr`,``);
            //});
            //if($_FileName.includes(el.value)) tempItems += `<li>${$_FileName}</li>`;
            if($_FileName.includes(el.value)) ul.appendChild(tempElement);
            //console.log();
        }
    
        //ul.innerHTML = tempItems;
    },
    
    content_EditSkill: function(){
        let out_ = `Loading...`;
        
        if(this.Base._mSkill){
            out_ = this.Base._mSkill.generateForm(this.Base._mUI.getSkillFiles());
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
