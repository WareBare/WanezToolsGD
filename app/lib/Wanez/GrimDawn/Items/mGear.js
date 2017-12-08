/**
 * Created by Ware on 11/23/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class mGear extends libWZ.GrimDawn.cModule{
    
    constructor(InDirectory){
        super();
        
        this.GearDirectory = InDirectory;
        
        this.aGear = this.iniGear();
    
        this.aModuleData = [
            this.aBeasts,
            this.aProxies,
            this.aMateria
        ];
    }
    
    iniGear(){
        let aGear = [];
    }
    
};
