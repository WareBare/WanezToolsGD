/**
 * Created by WareBare on 3/25/2017.
 */

module.exports = {
    tplContent: {},
    contentType: false,
    contentParam: false,
    modeConnect: false,
    //_mUI: false,
    
    saveCurrentData: function(){
        //this.Base._mUI.saveModuleData([this.Base._tagsSkills,false,false]);
        this.Base._mUI.saveModuleUI([this.Base._tagsSkills,false,false]);
    },
    saveCurrentTags: function(){
        this.Base._tagsSkills.saveData();
    },
    
    skillAllowDrop: function(e) {
        e.preventDefault();
    },
    skillDrag: function(e) {
        //e.dataTransfer.setData("elId", e.target.id);
        e.dataTransfer.setData('id', e.target.getAttribute(`wz-id`));
        //console.log(e.target.getAttribute(`wz-coords`));
        e.target.style.opacity = '0.2';
    },
    skillDrop: function(e) {
        e.preventDefault();
        try{
            //console.log(e.dataTransfer.getData(`elId`).style.opacity);
            //document.getElementById(e.dataTransfer.getData(`elId`)).style.opacity = '1.0';
            let tier = e.target.getAttribute(`wz-tier`),
                id = e.dataTransfer.getData(`id`),
                aCoordsNew = e.target.getAttribute(`wz-coords`).split(`,`),
                mSkill = this.Base._mUI.getSkillPerId(id);
    
            mSkill.editSkills({
                'bitmapPositionX': aCoordsNew[0],
                'bitmapPositionY': aCoordsNew[1],
                'skillTier': tier
            });
            mSkill.saveModuleData([this.Base._tagsSkills,false,false]);
            //this.saveCurrentData();
        }catch(err){
        
        }
        //this.Base._mUI = false;
        //wzCMS(appConfig.get('cms'));
        setTimeout(function(){
            wzCMS(appConfig.get('cms'));
        }, 25);
    },
    skillDropUnused: function(e){
        e.preventDefault();
        try{
            let id = e.dataTransfer.getData(`id`),
                mSkill = this.Base._mUI.getSkillPerId(id);
    
            mSkill.editSkills({
                'bitmapPositionX': `0`,
                'bitmapPositionY': `0`
            });
            mSkill.saveModuleData([this.Base._tagsSkills,false,false]);
            //this.saveCurrentData();
        }catch(err){
        
        }
    
        //this.Base._mUI = false;
        setTimeout(function(){
            wzCMS(appConfig.get('cms'));
        }, 10);
    },
    
    setSkill: function($id){
        //$id = $id || false;
        
        if(!isNaN($id)){
            if(this.modeConnect){
                this.Base._mSkill.setConnector(this.Base._mUI.getSkillPerId($id));
                this.Base._mSkill.saveModuleData([this.Base._tagsSkills,false,false]);
                
                this.modeConnect = false;
                this.Base._mSkill = false;
                document.body.style.cursor = 'default';
                setTimeout(function(){
                    wzCMS(appConfig.get('cms'));
                }, 10);
            }else{
                this.Base._mSkill = this.Base._mUI.getSkillPerId($id);
                wzCMS(appConfig.get('cms'));
            }
            
            //$el.setAttribute(`wz-mode`,`current`);
        }
        
    },
    setSkillConnector: function($id){
        this.modeConnect = true;
        this.setSkill($id);
    },
    setConnector: function($type){
        if(this.Base._mSkill){
            this.modeConnect = true;
            document.body.style.cursor = 'crosshair';
        }else{
            console.log(`requires a skill to be set first!`);
        }
        
        /*
        if($type === `trans`){
            console.log(`ToDo: Transmuter for ${this.Base._mSkill.getSkillName()}`);
        }else{
            console.log(`ToDo: Modifier for ${this.Base._mSkill.getSkillName()}`);
        }
        */
    },
    removeConnector: function(){
        if(this.Base._mSkill){
            this.Base._mSkill.removeConnector();
    
            this.Base._mSkill.saveModuleData([this.Base._tagsSkills,false,false]);
            
            setTimeout(function(){
                wzCMS(appConfig.get('cms'));
            }, 10);
        }
    },
    
    showUI: function(){
        return this.Base._mUI.genOutput(this.Base._mSkill);
        //return `in progress`;
    },
    contentShowUI: function(){
        let ret = this.contentType;
        
        if(ret){
            this.Base._mUI = new WZ.GrimDawn.Mastery.mUI(this.contentType,this.contentParam,this.Base.aGenderPC01,this.Base._tagsSkills,this.Base._mSkill); // if(!this.Base._mUI)
            ret = this.showUI();
        }
        
        
        return ret;
    },
    
    content_: function($contentType,$param){
        if($contentType){
            this.Base._mSkill = false; // reset skill to prevent errors
            //this.Base._mUI = false;
        }else if($contentType !== 'undefined') {
            //this.Base._mUI = false;
        }
        //console.log(`Old: ${this.contentType} - New: ${$contentType}`);
        this.contentType = $contentType || this.contentType;
        this.contentParam = $param || this.contentParam;
        
        //console.log($param);
        
        let out_ = this.contentShowUI() || `Mastery UI<br />The tool starts parsing every directory in records/ui/skills. The list of available classes is shown on the right, by clicking on a name the tool than starts parsing everything inside records/ui/skills/[mastery].<br />Any Subdirectories inside that directory will be ignored, this way you can move old files into a new folder.<br /><br />You will have to stick to Crate's Naming Conventions<ul><li>classimage.dbr</li><li>classpanelbackgroundimage.dbr</li><li>classpanelreallocationimage.dbr</li><li>classtable.dbr</li><li>classtraining.dbr</li><li>classtrainingbar.dbr</li></ul>have their particular use, keep these names or the Tool won't be able to perform certain actions, every other file is considered a skill (UI File), in this case it does not matter if it is called skill01.dbr or Cadence.dbr.<br /><br />Currently only .tga is supported for Skill Icons, let me know if there is a different format you are using (though .psd is not going to happen for a while).`;
        //console.log(this.Base.skillsMasterTable);
        
        return out_;
    },
    
    sidebarBtns_: function(){
        return [
            {
                "ONCLICK": "_cms.saveCurrentData()",
                "TEXT": "Save DBR"
            }, {
                "ONCLICK": "_cms.saveCurrentTags()",
                "TEXT": "Save Skill Tags"
            }, {
                "ONCLICK": "_cms.setConnector()",
                "TEXT": "Set Connector"
            }, {
                "ONCLICK": "_cms.removeConnector()",
                "TEXT": "Del. Connector"
            }, {
                "ONCLICK": "_cms.Base.goToEditSkill()",
                "TEXT": "Edit Skill"
            }/*, {
                "ONCLICK": "_cms.setConnector('transUp')",
                "TEXT": "Transmuter ↑"
            }, {
                "ONCLICK": "_cms.setConnector('transDown')",
                "TEXT": "Transmuter ↓"
            }*/
        ];
    },
    sidebarList_: function(){
        let obj = {};
        for(let $_Path in this.Base.masteryUI){
            for(let $_Dir in this.Base.masteryUI[$_Path]){
                obj[$_Dir] = {
                    'param': $_Path,
                    'text': this.Base.masteryUI[$_Path][$_Dir].tag
                }
            }
        }
        return obj;
    }
    
};
