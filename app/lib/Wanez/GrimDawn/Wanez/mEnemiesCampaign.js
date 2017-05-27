/**
 * Created by WareBare on 5/6/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class mEnemiesCampaign extends libWZ.GrimDawn.cModule{
    
    constructor(){
        super();
        
        this.aEnemies = [];
        // monsterClassification
        this.iniEnemies();
        
        this.aModuleData = [
            this.aEnemies
        ];
        
        //console.log(this.aEnemies);
    }
    
    /**
     * get Enemies from Core files
     */
    iniEnemies(){
        let path = `${this.fn.getPaths().Core}/records/creatures/enemies`,
            ignoreFolders = {
                anm: true,
                bios: true,
                special: true
            },tempClass,
            onDie = {
                Common: `wanez.gd.onDieCommon`,
                Champion: `wa`
            },
            aFiles = wzIO.dir_get_contentsSync(path);
        
        for(let $_FileName in aFiles){
            if($_FileName.endsWith(`.dbr`) && !$_FileName.startsWith(`trap_`)){
                tempClass = new libWZ.GrimDawn.cData(aFiles[$_FileName]);
                tempClass.changeFilePath(aFiles[$_FileName].replace(this.fn.getPaths().Core,this.fn.getPaths().Mod));
                if(!tempClass.__getField(`onDie`) || tempClass.__getField(`onDie`) === ``) {
                    tempClass.__setField(`onDie`,`wanez.gd.onDie${tempClass.__getField(`monsterClassification`)}`);
                }else{
                    tempClass.__setField(`onDie`,tempClass.__getField(`onDie`));
                }
                
                this.aEnemies.push( tempClass );
            }else if(!$_FileName.endsWith(`.dbr`) && !ignoreFolders[$_FileName]){
                for(let $_subFileName in aFiles[$_FileName]){
                    tempClass = new libWZ.GrimDawn.cData(aFiles[$_FileName][$_subFileName]);
                    tempClass.changeFilePath(aFiles[$_FileName][$_subFileName].replace(this.fn.getPaths().Core,this.fn.getPaths().Mod));
                    if(!tempClass.__getField(`onDie`) || tempClass.__getField(`onDie`) === ``) {
                        tempClass.__setField(`onDie`,`wanez.gd.onDie${tempClass.__getField(`monsterClassification`)}`);
                    }else{
                        tempClass.__setField(`onDie`,tempClass.__getField(`onDie`));
                    }
    
                    this.aEnemies.push( tempClass );
                }
            }
        }
        
    }
    
};
