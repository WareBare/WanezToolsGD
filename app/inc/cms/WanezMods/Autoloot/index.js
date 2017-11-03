/**
 * Created by Ware on 10/31/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent: {},
    
    
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        let out_ = `WanezMod Tools - Auto Pick Up - WARNING: Assets are still missing, because this is not yet finished! Unless you have a working Mod with Wanez Auto Pick Up, the dbr changes won't do a thing.`;
        
        this.Base.LoadAutoLootItems();
        
        return `${out_}`;
    },
    
    SaveAutoLootItems: function(){
        let TempClass;
        for(let iClassId in this.Base.aAutoLootItemsClasses){
            TempClass = this.Base.aAutoLootItemsClasses[iClassId];
    
            TempClass.__setField(`onPickUp`,[`wanez.AutoPickUp.OnPickUp`]);
            TempClass.__setField(`onDrop`,[`wanez.AutoPickUp.OnDrop`]);
            TempClass.__setField(`onAddToWorld`, `wanez.AutoPickUp.OnAddToWorld`);
            TempClass.__setField(`onDestroy`, `wanez.AutoPickUp.OnDestroy`);
            
            TempClass.saveDBR();
        }
    },
    
    sidebarBtns_: function(){
        let SaveLootBTN = {};
        
        //if(this.contentType){
            SaveLootBTN = {
                "ONCLICK": "_cms.SaveAutoLootItems();",
                "TEXT": "Save Items"
            };
        //}
        
        return [
            SaveLootBTN
        ];
    },
    sidebarList_: function(){
        return {}
    }
    
};
