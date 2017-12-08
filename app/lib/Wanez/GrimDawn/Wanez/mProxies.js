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
            `areae`,
            `areaf`,
            `areavoid`,
            `boss&quest`,
            `boss&questgdx1`,
            `factionspawns`,
            `factionspawnsgdx1`
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
                //if(!$_FileName.includes(`aethercrystal`)){
                    tempClass = new libWZ.GrimDawn.cData(`${this.fn.getPaths().Core}/${tempPath}/${$_FileName}`);
                    if( (tempClass.__getField(`Class`) === `Proxy` || tempClass.__getField(`Class`) === `ProxyAmbush`) && tempClass.__getField(`delayedRun`) === `0`){
    
                        //Log(tempPath);
                        //if(tempClass.__getField(`onSpawn`)) Log(tempClass.__getField(`onSpawn`));
                        tempClass.changeFilePath(`${this.fn.getPaths().Mod}/${tempPath}/${$_FileName}`);
                        tempClass.editDBR({ //  && tempClass.__getField(`Class`) !== `ProxyAmbush`
                            difficultyLimitsFile: `records/proxies/limit_unlimited.dbr`,
                            onAddToWorld: (tempClass.__getField(`onAddToWorld`)) ? tempClass.__getField(`onAddToWorld`) : ( (tempPath.includes(`boss&quest`)) ? `wanez.Campaign.Proxy_OnAddToWorld` : `` ),
                            //onRemoveFromWorld: `wanez.Campaign.Proxy_OnRemoveFromWorld`,
                            onSpawn: (tempClass.__getField(`onSpawn`)) ? `` : `wanez.Campaign.Proxy_OnSpawn`
                            //onDestroy: `wanez.Campaign.Proxy_OnDestroy`
                            //onAddToWorld: `wanez.gd.cloneProxy`
                            //onDestroy: `wanez.gd.ProxyOnDestroy`,
                            //onSpawn: `wanez.gd.ProxyOnSpawn`,
                            //onRemoveFromWorld: `wanez.gd.ProxyOnRemoveFromWorld`
                            //delayedRun: `1`
                        });
                        //console.log(tempClass);
                        this.aProxies.push(tempClass);
        
                        if( tempClass.__getField(`onAddToWorld`) === `wanez.Campaign.Proxy_OnAddToWorld` ){
                            tempClass = new libWZ.GrimDawn.cData(`${this.fn.getPaths().Core}/${tempPath}/${$_FileName}`);
                            tempClass.changeFilePath(`${this.fn.getPaths().Mod}/${tempPath}/${$_FileName.replace(`.dbr`,`_clone.dbr`)}`);
                            tempClass.editDBR({
                                difficultyLimitsFile: `records/proxies/limit_unlimited.dbr`,
                                onSpawn: (tempClass.__getField(`onSpawn`)) ? `` : `wanez.Campaign.Proxy_OnSpawn`
                                //onAddToWorld: `wanez.gd.clonedProxy`
                            });
                            this.aProxies.push(tempClass);
                        }
                        //console.log(tempClass);
                    }
                //}
                
            }
            
            
        }
        
    }
    
};
