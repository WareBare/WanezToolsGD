/**
 * Created by WareBare on 3/25/2017.
 */

module.exports = {
    tplContent: {},
    contentType: false,
    contentParam: false,
    modeConnect: false,
    objBackups: {},
    //_mUI: false,
    
    saveCurrentData: function(){
        //this.Base._mUI.saveModuleData([this.Base._tagsSkills,false,false]);
        this.Base._mUI.saveModuleUI([this.Base._tagsSkills,false,false]);
    },
    saveCurrentTags: function(){
        this.Base._tagsSkills.saveData();
    },
    
    // appConfig.get(`GrimDawn.Mastery.SourcePFX`) && appConfig.get(`GrimDawn.Mastery.SourcePFX`) !== `` && appConfig.get(`GrimDawn.Mastery.PathPFX`) && appConfig.get(`GrimDawn.Mastery.PathPFX`) !== ``
    syncPFX: function(){
        let aFiles = wzIO.dir_get_contentsSync(`${WZ.GrimDawn.tFn.getPaths().InstallPFX}/${appConfig.get(`GrimDawn.Mastery.SourcePFX`)}/${this.contentType}`),
            isSuccess = true;
        // `${WZ.GrimDawn.tFn.getPaths().Source}/${appConfig.get(`GrimDawn.Mastery.PathPFX`)}/${this.contentType}`
        //console.log(aFiles);
        for(let $_FileName in aFiles){
            try {
                fs.copySync(`${aFiles[$_FileName]}`, `${WZ.GrimDawn.tFn.getPaths().Source}/${appConfig.get(`GrimDawn.Mastery.PathPFX`)}/${this.contentType}/${$_FileName}`);
                //console.log("success!")
                console.log(`${WZ.GrimDawn.tFn.getPaths().Source}/${appConfig.get(`GrimDawn.Mastery.PathPFX`)}/${this.contentType}/${$_FileName}`);
            } catch (err) {
                //console.error(err)
                wzNotify.err(`An error occurred while copying *.pfx files`,`Error - PFX`);
                isSuccess = false;
            }
        }
        if(isSuccess) wzNotify.info(`All *.pfx were copied successfully`,`Success - Copy PFX`);
    },
    
    contextmenuBackupListItem: function($el,$skillId){
        //console.log(`success from inside cms`);
        return false;
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
            //mSkill.saveModuleData([this.Base._tagsSkills,false,false]);
            //this.saveCurrentData();
        }catch(err){
        
        }
        //this.Base._mUI = false;
        //wzCMS(appConfig.get('cms'));
        setTimeout(function(){
            wzCMS(appConfig.get('cms'));
        }, 10);
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
            if(this.pressConnector && this.Base._mSkill){
                this.modeConnect = `Default`;
            }
            if(this.modeConnect){
                this.Base._mSkill.setConnector(this.Base._mUI.getSkillPerId($id),this.modeConnect);
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
            this.modeConnect = $type;
            //document.body.style.cursor = 'crosshair';
            wzNotify.info(`Click on the Skill you want as Transmuter/Modifier`);
        }else{
            //console.log(`requires a skill to be set first!`);
            wzNotify.warn(`You need to select a Skill first.`);
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
        }else{
            wzNotify.warn(`You need to select a Skill first.`);
        }
    },
    createBackup: function(){
        if(this.contentType && this.contentParam){
            //console.log(this.Base._mUI.getBackupData());
            this.objBackups[this.contentType] = this.objBackups[this.contentType] || [];
            //let aBackups = [];
    
            this.objBackups[this.contentType].push({
                TimeStamp: moment().format("DD/MM/YYYY hh:mm a"),
                Data: this.Base._mUI.getBackupData()
            });
            // oncontextmenu="javascript:alert('success!');return false;"
    
            let backUpEl = document.getElementById(`uiBackUps`);
            if(backUpEl){
                backUpEl.innerHTML = this.Base._mUI.genBackupsList(this.objBackups[this.contentType]);
            }
            
            /*
            this.objBackups[this.contentType] = this.objBackups[this.contentType] || [];
    
            let aFiles = wzIO.dir_get_contentsSync(`${this.Base.pathGD.Mod}/${this.contentParam}/${this.contentType}`,true),
                tempClass,
                aBackups = [];
            //console.log(aFiles);
            
            for(let $_FileName in aFiles){
                tempClass = new WZ.GrimDawn.cData(aFiles[$_FileName]);
                //tempClass.editDBR(false,true);
                aBackups.push(tempClass);
            }
            this.objBackups[this.contentType].push({
                TimeStamp: moment().format("hh:mm a"),
                Data: aBackups
            });
            let backUpEl = document.getElementById(`uiBackUps`);
    
            if(backUpEl){
                backUpEl.innerHTML = this.Base._mUI.genBackupsList(this.objBackups[this.contentType]);
            }
            //console.log(this.objBackups[this.contentType]);
            */
        }else{
            wzNotify.warn(`need to open UI first!`);
        }
    },
    loadBackup: function($backupId){
        try{
            //for(let $_Index in this.objBackups[this.contentType][$backupId].Data){
                //this.objBackups[this.contentType][$backupId].Data[$_Index].saveData(false,true);
                //console.log(this.objBackups[this.contentType][$backUpId][$_Index]);
                //this.Base._mUI.useBackupData(this.objBackups[this.contentType][$backupId].Data[$_Index]);
            //}
            this.Base._mUI.useBackupData(this.objBackups[this.contentType][$backupId].Data);
            wzReloadCMS(10);
        }catch(err){
            wzNotify.err(`BackUp doesn't exist!`);
            //console.error(err);
        }
    },
    
    showUI: function(){
        return this.Base._mUI.genOutput(this.Base._mSkill);
        //return `in progress`;
    },
    contentShowUI: function(){
        let ret = this.contentType;
        
        if(ret){
            this.Base._mUI = new WZ.GrimDawn.Mastery.mUI(this.contentType,this.contentParam,this.Base.aGenderPC01,this.Base._tagsSkills,this.Base._mSkill,this.objBackups[this.contentType]); // if(!this.Base._mUI)
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
        
        let out_ = this.contentShowUI() || `Mastery UI<br />The tool starts parsing every directory in records/ui/skills. The list of available classes is shown on the right, by clicking on a name the tool than starts parsing everything inside records/ui/skills/[mastery].<br />Any Subdirectories inside that directory will be ignored, this way you can move old files into a new folder.<br /><br />You will have to stick to Crate's Naming Conventions<ul><li>classimage.dbr</li><li>classpanelbackgroundimage.dbr</li><li>classpanelreallocationimage.dbr</li><li>classtable.dbr</li><li>classtraining.dbr</li><li>classtrainingbar.dbr</li></ul>have their particular use, keep these names or the Tool won't be able to perform certain actions, every other file is considered a skill (UI File), in this case it does not matter if it is called skill01.dbr or Cadence.dbr.<br /><br />Skill Icons can either be .tga or .png, if there is no Icon available or set - the ui file's File Description is used (keep in mind you cannot use a <b>,</b>).`;
        //console.log(this.Base.skillsMasterTable);
        
        return out_;
    },
    
    sidebarBtns_: function(){
        let syncPFX = false,
            syncData = false,
            createBackup = false,
            newUI = false,
            setConnector = false,
            remConnector = false,
            editSkill = false;
    
        if(this.contentType){
            if(appConfig.get(`GrimDawn.Mastery.SourcePFX`) && appConfig.get(`GrimDawn.Mastery.SourcePFX`) !== `` && appConfig.get(`GrimDawn.Mastery.PathPFX`) && appConfig.get(`GrimDawn.Mastery.PathPFX`) !== ``){
                syncPFX = {
                    "ONCLICK": "_cms.syncPFX()",
                    "TEXT": "Sync *.pfx"
                };
            }
            syncData = {
                "ONCLICK": "_cms.saveCurrentData()",
                "TEXT": "Save UI"
            };
            createBackup = {
                "ONCLICK": "_cms.createBackup()",
                "TEXT": "Create Backup"
            };
            newUI = {
                "ONCLICK": "_cms.Base.createSkill()",
                "TEXT": "New UI File"
            };
            
            if(this.Base._mSkill){
                setConnector = {
                    "ONCLICK": "_cms.setConnector('Default')",
                    "TEXT": "Set Connector"
                };
                remConnector = {
                    "ONCLICK": "_cms.removeConnector()",
                    "TEXT": "Del. Connector"
                };
                editSkill = {
                    "ONCLICK": "_cms.Base.goToEditSkill()",
                    "TEXT": "Edit Skill"
                };
            }
        }
        
        
        
        return [
            /*{
                "ONCLICK": `_cms.Base.loadTags();wzReloadCMS(25)`,
                "TEXT": "Reload Tags"
            },*/
            syncData,
            editSkill,
            setConnector,
            remConnector,
            newUI,
            createBackup,
            syncPFX
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
