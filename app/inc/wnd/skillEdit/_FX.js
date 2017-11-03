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
    titlePage: `FX`,
    
    forms: {
        main_form: false
    },
    
    content_: function(){
        let out_ = ``, File,TempClass,dbr_templateName = this._mSkill.getField(`logic`, `templateName`);
        
        if(this.bLoadFX){
            if(wzTemplates.hasField(dbr_templateName, `skillProjectileName`) && (File = this._mSkill.getField(`logic`, `skillProjectileName`)) ){Log(File);
                // Array
                this.FXskillProjectileName = new WZ.GrimDawn.mFX(File);
            }
    
            if(wzTemplates.hasField(dbr_templateName, `projectileFragmentsName`) && (File = this._mSkill.getField(`logic`, `projectileFragmentsName`)) ){
                // Variable
                this.FXprojectileFragmentsName = new WZ.GrimDawn.mFX(File);
            }
    
            if(wzTemplates.hasField(dbr_templateName, `radiusEffectName`) && (File = this._mSkill.getField(`logic`, `radiusEffectName`)) ){
                // Array
                this.FXradiusEffectName = new WZ.GrimDawn.mFX(File);
            }
    
            this.bLoadFX = false;
        }
        
        
        return out_;
    }
    
};
