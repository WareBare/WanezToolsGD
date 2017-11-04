/**
 * Created by Ware on 11/2/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class mFX extends libWZ.GrimDawn.cModule {
    
    constructor(InPathFX) {
        super();
        
        this.InPathFX = (Array.isArray(InPathFX)) ? InPathFX : [InPathFX];
        this.mFiles = {};
        this.mFXClasses = {};
        
        this.ini();
    };
    
    ini(){
        let TempPathsArray;
        for(let kSkillRank in this.InPathFX){
            if(!this.mFXClasses[this.InPathFX[kSkillRank]]) {
                try{
                    fs.accessSync(`${WZ.GrimDawn.tFn.getPaths().Mod}/${this.InPathFX[kSkillRank]}`, fs.F_OK);
                    this.mFXClasses[this.InPathFX[kSkillRank]] = new libWZ.GrimDawn.cData(`/${this.InPathFX[kSkillRank]}`);
                    //Log(this.mFXClasses[this.InPathFX[kSkillRank]].aData);
                    this.mFiles[this.InPathFX[kSkillRank]] = {};
    
                    for(let kFieldName in this.mFXClasses[this.InPathFX[kSkillRank]].aData){
                        try{
                            fs.accessSync(`${WZ.GrimDawn.tFn.getPaths().Mod}/${this.mFXClasses[this.InPathFX[kSkillRank]].aData[kFieldName]}`, fs.F_OK);
                            if(this.mFXClasses[this.InPathFX[kSkillRank]].aData[kFieldName].endsWith(`.dbr`)){
                                //this.mFXClasses[`${kFieldName}_${this.InPathFX[kSkillRank]}`] = new libWZ.GrimDawn.cData(`/${this.mFXClasses[this.InPathFX[kSkillRank]].aData[kFieldName]}`);
        
                                this.mFiles[this.InPathFX[kSkillRank]][kFieldName] = this.mFXClasses[this.InPathFX[kSkillRank]].aData[kFieldName];
                                
                            }
                        }catch (err){}
                    }
                }catch(err){}
                
            }
        }
        //Log(this.mFiles);
    }
    
    GenerateOutput(){
    
    }
    
    __getFiles(){
        return JSON.parse(JSON.stringify(this.mFiles));
    }
    
};
