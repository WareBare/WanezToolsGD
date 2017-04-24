/**
 * Created by WareBare on 4/22/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class mRuneStones extends libWZ.GrimDawn.cModule{
    
    constructor($type){
        super();
        
        this.iType = $type;
        this.runeConfig = new eConfig({name: `wz-runes`});
        this.runeData = this.runeConfig.get(`Items.${$type}`);
        // appData[`app-gd`].Gear.types || appData[`app-gd`].Gear.slots
        
        this.tpl = {
            Content: ``
        };
        
        this.aRuneStones = this.iniRunes();
        
    }
    
    iniRuneStones(){
    
    }
    
};
