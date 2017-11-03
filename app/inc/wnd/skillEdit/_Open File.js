/**
 * Created by Ware on 11/2/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    //title: `Settings :: Grim Dawn`,
    titlePage: `Open File`,
    
    forms: {
        main_form: false
    },
    
    content_: function(){
        let out_ = ``, File,TempClass,dbr_templateName = this._mSkill.getField(`logic`, `templateName`),
            mFiles = {
                'Skill': this._mSkill.getSkillPaths().logicRelFilePath,
                'Buff': this._mSkill.getSkillPaths().logicRelBuffFilePath,
                'SpawnObjects': (this._mSkill.getField(`logic`,`spawnObjects`)) ? this._mSkill.getField(`logic`,`spawnObjects`)[0] : false,
                'SpawnObjects2': (this._mSkill.getField(`logic`,`spawnObjects2`)) ? this._mSkill.getField(`logic`,`spawnObjects2`)[0] : false,
                'SpawnObjects3': (this._mSkill.getField(`logic`,`spawnObjects3`)) ? this._mSkill.getField(`logic`,`spawnObjects3`)[0] : false,
                'SpawnObjects4': (this._mSkill.getField(`logic`,`spawnObjects4`)) ? this._mSkill.getField(`logic`,`spawnObjects4`)[0] : false
            },
            Items_ = ``,
            Item_ = ``,
            Frame_ = ``,
            Items2_ = ``,
            tplFrame = `<fieldset><legend>{TITLE}</legend>{ITEM}{ITEMS}</fieldset>`,
            tplItem = `<label onclick="wzOpenModFile('{PATH_TO_OPEN_FILE}')"><span><b>{FIELD_NAME}:</b> <i>{PATH_TO_OPEN_FILE}</i></span></label>`;
        
        //if(this.bLoadFX){
            this.mFiles = {};
            if(wzTemplates.hasField(dbr_templateName, `skillProjectileName`) && (File = this._mSkill.getField(`logic`, `skillProjectileName`)) ){Log(File);
                // Array
                this.FXskillProjectileName = new WZ.GrimDawn.mFX(File);
                this.mFiles[`skillProjectileName`] = this.FXskillProjectileName.mFiles;
            }
            
            if(wzTemplates.hasField(dbr_templateName, `projectileFragmentsName`) && (File = this._mSkill.getField(`logic`, `projectileFragmentsName`)) ){
                // Variable
                this.FXprojectileFragmentsName = new WZ.GrimDawn.mFX(File);
                this.mFiles[`projectileFragmentsName`] = this.FXprojectileFragmentsName.mFiles;
            }
            
            if(wzTemplates.hasField(dbr_templateName, `radiusEffectName`) && (File = this._mSkill.getField(`logic`, `radiusEffectName`)) ){
                // Array
                this.FXradiusEffectName = new WZ.GrimDawn.mFX(File);
                this.mFiles[`radiusEffectName`] = this.FXradiusEffectName.mFiles;
            }
            
            //this.bLoadFX = false;
        //}
    
        for(let kFileName in mFiles){
            if(mFiles[kFileName]){
                try{
                    fs.accessSync(`${WZ.GrimDawn.tFn.getPaths().Mod}/${mFiles[kFileName]}`);
                    
    
                    out_ += tplItem.wzReplace({
                        FIELD_NAME: kFileName,
                        PATH_TO_OPEN_FILE: mFiles[kFileName]
                    });
                    
                    if(kFileName.startsWith(`SpawnObjects`)){
                        Log(mFiles[kFileName]);
                        let TempClass = wzStorageGD.__get(mFiles[kFileName]);
                        Log(TempClass);
                        for(let i=1; i <= 17; i++){
                            if(TempClass.__getField(`skillName${i}`) && TempClass.__getField(`skillName${i}`) !== ``){
                                try{
                                    fs.accessSync(`${WZ.GrimDawn.tFn.getPaths().Mod}/${TempClass.__getField(`skillName${i}`)}`);
    
                                    out_ += tplItem.wzReplace({
                                        FIELD_NAME: `skillName${i}`,
                                        PATH_TO_OPEN_FILE: TempClass.__getField(`skillName${i}`)
                                    });
                                }catch (err){}
                            }
                            
                        }
                        try{
                        
                        }catch(err){}
                    }
                }catch(err){}
            }
        }
        
        for(let kFieldName in this.mFiles){
            //Log(this.mFiles[kFieldName]);
            Items_ = ``;
            Frame_ = ``;
            for(let kFieldPath in this.mFiles[kFieldName]){
                Items2_ = ``;
                
                for(let kFieldName2 in this.mFiles[kFieldName][kFieldPath]){
                    Items2_ += tplItem.wzReplace({
                        FIELD_NAME: kFieldName2,
                        PATH_TO_OPEN_FILE: this.mFiles[kFieldName][kFieldPath][kFieldName2]
                    });
                }
                
                Frame_ += tplFrame.wzReplace({
                    TITLE: kFieldPath,
                    ITEMS: Items2_,
                    ITEM: tplItem.wzReplace({
                        FIELD_NAME: kFieldName,
                        PATH_TO_OPEN_FILE: kFieldPath
                    })
                });
    
            }
            out_ += tplFrame.wzReplace({
                TITLE: kFieldName,
                ITEMS: Frame_,
                ITEM: ``
            });
        }
        
        return `<div class="wndMasterySkillEdit">${out_}</div>`;
    }
    
};
