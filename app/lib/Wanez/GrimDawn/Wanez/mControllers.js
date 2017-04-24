/**
 * Created by WareBare on 4/24/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class mControllers extends libWZ.GrimDawn.cModule{
    
    constructor(){
        super();
        
        this.pathSourceControllers = `records/controllers/enemy`;
        this.pathTargetControllers = `mod_wanez/_dga/controllers/enemy`;
        
        this.aControllers = this.iniControllers();
        //console.log(this.aControllers);
    }
    
    iniControllers(){
        let aControllers = [],tempClass,tempDBR,
            aFiles = wzIO.dir_get_contentsSync(`${this.fn.getPaths().Core}/${this.pathSourceControllers}`,true);
        
        for(let $_FileName in aFiles){
            
            tempClass = new libWZ.GrimDawn.cData(aFiles[$_FileName]);
            tempClass.changeFilePath(`${this.fn.getPaths().Mod}/${this.pathTargetControllers}/${$_FileName}`);
            tempDBR = {
                'MaxTimeBeforeRoam':250,
                'MinTimeBeforeRoam':100,
                'RoamDistance':8.000000
            };
            tempClass.editDBR(tempDBR);
            
            aControllers.push(tempClass);
        }
        
        return aControllers;
    }
    
    saveControllers(){
        
        this.aModuleData = [
            this.aControllers
        ];
        
        //this.aModuleData = this.aEnemies;
        this.saveModule(false);
        
    }
};
