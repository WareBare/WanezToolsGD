/**
 * Created by Ware on 10/12/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent: {},
    
    OnCreateBlueprints: function(){
        let tempClass, tempClassification, tempLevel, aBlueprints = [], LevelMalus, LevelBonus, LevelMul,
            /** Material Cost - Legendary Essence */
            ItemCost,
            /** Item Price - Iron Bits */
            ItemPrice,
            /** Instead of using the Level, using this and Multiply a base value - ceil(Level/10) - 10: 1, 90: 9 */
            ItemLevelMul;
    
        let tplObj = {
            "wzAsset": "aBlueprint",
            "tpl": "blueprint_{INDEX_TAG}{INDEX_4}",
            "fileExt": "dbr",
            "replace": {
                "INDEX": [],
                "VALUE": []
            },
            "misc": {
                "artifactName": "{INDEX_TAG2}",
                //"forcedRandomArtifactName": "mod_wanez/_gear/exchange/craft_vanilla_{TYPE}_{TABLE_3}{POTENCY}.dbr",
                "artifactCreationCost": "{VALUE}",
                "reagentBaseBaseName": "records/omega/items/questitems/omega_essence_legendary.dbr",
                "reagentBaseQuantity": "{VALUE_TAG}",
                "reagent1BaseName": "",
                "reagent1Quantity": ""
            }
        };
    
        for( let $_Index in this.Base.aLegendaryItemsClasses ){
            tempClass = this.Base.aLegendaryItemsClasses[$_Index];
            
            if(tempClass.__getField(`FileDescription`) !== `BLANK`){
                tempClassification = (tempClass.__getField(`itemClassification`) === `Legendary`) ? `d` : `c`;
                tempLevel = tempClass.__getField(`levelRequirement`);
                ItemCost = 0;
                ItemPrice = 1234;
                LevelMul = 1;
                LevelMalus = -50;
                ItemLevelMul = (parseInt(tempLevel) >= 30) ?  Math.ceil(parseInt(tempLevel) / 10) : 2;
                //Log(ItemLevelMul);
                ItemCost = (parseInt(tempLevel) >= 30) ?  (ItemLevelMul * (ItemLevelMul * 3) - 26) * 2 : 2;
                ItemPrice = (parseInt(tempLevel) >= 30) ?  (ItemPrice * ( (ItemLevelMul * (ItemLevelMul * 2) - 15) * 2 )) * 3: 1000;
                
                if(tempClass.__getField(`itemClassification`) !== `Legendary`){
                    ItemCost = ItemCost / 2;
                    ItemPrice = ItemPrice / 2;
                }
                // INDEX \\
                tplObj.replace.INDEX = [ [
                    $_Index,
                    tempClassification,
                    tempClass.getFilePath().split(`/database/`)[1]
                ] ];
                // VALUE \\
                // fix the cost for low level epics
                tempLevel = (parseInt(tempLevel) <= 25) ? 16 : tempLevel;
                tplObj.replace.VALUE = [ [
                    ItemPrice,
                    ItemCost
                ] ];
    
                //Log(`${tempClassification} - ${tempLevel} - ${ItemCost} : ${ItemPrice}`);
                aBlueprints.push(JSON.parse(JSON.stringify(tplObj)));
            }
        }
        //console.log(aBlueprints);
        let _mDBR = new WZ.GrimDawn.Assets.dbrModule(aBlueprints,`mod_wanez/_lc/blueprints`);
        _mDBR.saveModuleData([false,false,false]);
    },
    
    OnCreateBlacksmith: function(){
        let pathBlueprints = `mod_wanez/_lc/blueprints`;
    
        this.Base.saveCrafter(
            new WZ.GrimDawn.cData(`${WZ.GrimDawn.tFn.getPaths().Mod}/mod_wanez/misc/npcs/blacksmith_jailor.dbr`),
            [pathBlueprints]
        );
    },
    
    content_Main: function(){
        let out_ = `Files have been loaded, use the buttons on the right to create Blueprints (/mod_wanez/_lc/blueprints/) and save them into the Blacksmith.<br />As long as that button remains pressed the Program is generating Blueprints, wait for it to go back up before you are using the Blacksmith button.`;
        
        //this.Base._mDBR = new WZ.GrimDawn.Assets.dbrModule(aLore,`mod_wanez/_runes/items/lore`);
        
        return out_;
    },
    
    content_: function($contentType){
        this.contentType = $contentType || `Main`; // this.contentType
        
        let out_ = `Legendary Crafter`;
        this.Base.LoadLegendaryItems();
        
        if(this.contentType){
            if(this.contentType === `Main`){
                out_ = this.content_Main();
            }
            
        }
        
        return `${out_}`;
    },
    
    sidebarBtns_: function(){
        return [{
            "ONCLICK": "_cms.OnCreateBlueprints();",
            "TEXT": "Create Blueprints"
        },{
            "ONCLICK": "_cms.OnCreateBlacksmith();",
            "TEXT": "Create Blacksmith"
        }];
    },
    sidebarList_: function(){
        return {
        
        };
    }
    
};
