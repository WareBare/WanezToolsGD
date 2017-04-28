/**
 * Created by WareBare on 4/25/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class mProxies extends libWZ.GrimDawn.cModule{
    
    constructor(){
        super();
        
        this.pathProxies = `records/proxies`;
        this.aProxyFolders = [
            `area001`,
            `boss&quest`,
            `factionspawns`
        ];
        
        this.aProxies = [];
        this.aProxies2 = [];
        
        this.iniProxies();
        
        this.aModuleData = [
            this.aProxies
        ];
    }
    
    iniProxies(){
        // Class: `Proxy`
        // Class: `ProxyAmbush`
        let aFiles,tempPath,tempClass;
        
        for(let $_Index in this.aProxyFolders){
            tempPath = `${this.pathProxies}/${this.aProxyFolders[$_Index]}`;
            aFiles = wzIO.dir_get_contentsSync(`${this.fn.getPaths().Core}/${tempPath}`,true);
            //console.log(`${this.fn.getPaths().Core}/${tempPath}`);
            //console.log(this.aProxyFolders[$_Index]);
            for(let $_FileName in aFiles){
                if(!$_FileName.includes(`aethercrystal`)){
                    tempClass = new libWZ.GrimDawn.cData(`${this.fn.getPaths().Core}/${tempPath}/${$_FileName}`);
                    if( (tempClass.__getField(`Class`) === `Proxy` || tempClass.__getField(`Class`) === `ProxyAmbush`) && tempClass.__getField(`delayedRun`) === `0`){
    
                        tempClass.changeFilePath(`${this.fn.getPaths().Mod}/${tempPath}/${$_FileName}`);
                        tempClass.editDBR({
                            onAddToWorld: `wanez.gd.cloneProxy`,
                            delayedRun: `1`
                        });
                        //console.log(tempClass);
                        this.aProxies.push(tempClass);
        
                        tempClass = new libWZ.GrimDawn.cData(`${this.fn.getPaths().Core}/${tempPath}/${$_FileName}`);
                        tempClass.changeFilePath(`${this.fn.getPaths().Mod}/${tempPath}/${$_FileName.replace(`.dbr`,`_clone.dbr`)}`);
                        tempClass.editDBR({
                            onAddToWorld: `wanez.gd.clonedProxy`,
                            difficultyLimitsFile: `records/proxies/limit_area001.dbr`
                        });
                        this.aProxies.push(tempClass);
                        //console.log(tempClass);
                    }
                }
                
            }
            
            
        }
        
    }
    
};
