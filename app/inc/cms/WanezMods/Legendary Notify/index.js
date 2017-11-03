/**
 * Created by Ware on 10/30/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent: {},
    
    content_Main: function(){
        let out_ = `Files have been loaded, use the buttons on the right to create Blueprints (/mod_wanez/_lc/blueprints/) and save them into the Blacksmith.<br />As long as that button remains pressed the Program is generating Blueprints, wait for it to go back up before you are using the Blacksmith button.`;
        
        //this.Base._mDBR = new WZ.GrimDawn.Assets.dbrModule(aLore,`mod_wanez/_runes/items/lore`);
        
        return out_;
    },
    
    content_: function($contentType){
        this.contentType = $contentType || `Main`; // this.contentType
        
        let out_ = `Legendary Notify - WARNING: Assets are still missing, because this is not yet finished! Unless you have a working Mod with Wanez: Legendary Notify, the dbr changes won't do a thing.`;
        this.Base.LoadLegendaryItems();
        
        if(this.contentType){
            if(this.contentType === `Main`){
                out_ = this.content_Main();
            }
            
        }
        
        return `${out_}`;
    },
    
    Generate: function(){
        let TempClass;
        for(let iClassId in this.Base.aLegendaryItemsClasses){
            TempClass = this.Base.aLegendaryItemsClasses[iClassId];
            
            if(TempClass.__getField(`itemClassification`) === `Legendary`){
                TempClass.__setField(`onAddToWorld`, `wanez.LN.OnAddToWorld_Legendary`);
                TempClass.__setField(`onRemoveFromWorld`, `wanez.LN.OnPickUp_Legendary`);
            }else if(TempClass.__getField(`itemClassification`) === `Epic`){
                TempClass.__setField(`onAddToWorld`, `wanez.LN.OnAddToWorld_Epic`);
                TempClass.__setField(`onRemoveFromWorld`, `wanez.LN.OnPickUp_Epic`);
            }
    
            if(TempClass.__getField(`FileDescription`) !== `BLANK`) TempClass.saveDBR();
            //Log(TempClass);
        }
    },
    
    sidebarBtns_: function(){
        let GenerateBTN = {};
        
        if(this.contentType){
            GenerateBTN = {
                "ONCLICK": "_cms.Generate();",
                "TEXT": "Generate"
            };
        }
        
        return [
            GenerateBTN
        ];
    },
    sidebarList_: function(){
        return {
        
        };
    }
    
};
