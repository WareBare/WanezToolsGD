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
        let tempClass, tempClassification, tempLevel, aBlueprints = [];
    
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
        
            tempClassification = (tempClass.__getField(`itemClassification`) === `Legendary`) ? `d` : `c`;
            tempLevel = tempClass.__getField(`levelRequirement`);
            
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
                ((parseInt(tempLevel) - 25) * 1000 * 5) * ( (tempClassification === `d`) ? 1 : 0.5 ),
                ((parseInt(tempLevel) - 25) * 5 + 50) * ( (tempClassification === `d`) ? 1 : 0.5 )
            ] ];
    
            aBlueprints.push(JSON.parse(JSON.stringify(tplObj)));
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
