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
    aLegendaryItemsClasses: false,
    aAutoLootItemsClasses: false,
    
    aDirsVanillaItemsForAutoLoot: [
        `records/items/materia`,
        `records/items/crafting/materials`
    ],
    aDirsVanillaItems: [
        `records/items/gearaccessories/medals`,
        `records/items/gearaccessories/necklaces`,
        `records/items/gearaccessories/rings`,
        `records/items/gearaccessories/waist`,
        `records/items/gearfeet`,
        `records/items/gearhands`,
        `records/items/gearhead`,
        `records/items/gearlegs`,
        `records/items/gearshoulders`,
        `records/items/geartorso`,
        `records/items/gearweapons/axe1h`,
        `records/items/gearweapons/blunt1h`,
        `records/items/gearweapons/caster`,
        `records/items/gearweapons/focus`,
        `records/items/gearweapons/guns1h`,
        `records/items/gearweapons/guns2h`,
        `records/items/gearweapons/melee2h`,
        `records/items/gearweapons/shields`,
        `records/items/gearweapons/swords1h`,
        `records/items/upgraded/gearaccessories/medals`,
        `records/items/upgraded/gearaccessories/necklaces`,
        `records/items/upgraded/gearaccessories/rings`,
        `records/items/upgraded/gearaccessories/waist`,
        `records/items/upgraded/gearfeet`,
        `records/items/upgraded/gearhands`,
        `records/items/upgraded/gearhead`,
        `records/items/upgraded/gearlegs`,
        `records/items/upgraded/gearshoulders`,
        `records/items/upgraded/geartorso`,
        `records/items/upgraded/gearweapons/axe1h`,
        `records/items/upgraded/gearweapons/blunt1h`,
        `records/items/upgraded/gearweapons/caster`,
        `records/items/upgraded/gearweapons/focus`,
        `records/items/upgraded/gearweapons/guns1h`,
        `records/items/upgraded/gearweapons/guns2h`,
        `records/items/upgraded/gearweapons/melee2h`,
        `records/items/upgraded/gearweapons/shields`,
        `records/items/upgraded/gearweapons/swords1h`,
    ],
    
    AddLegendaryItem: function(ItemClass){
    
    },
    
    LoadAutoLootItems: function(){
        if(!this.aAutoLootItemsClasses){
            this.aAutoLootItemsClasses = this.aAutoLootItemsClasses || [];
            
            let TempClass,
                aFiles,
                aFilesMod,
                aFilesCore,
                aDirs = appConfig.get(`WanezMods.AutoLoot.Directories`) || [];
    
            aDirs = aDirs.concat(this.aDirsVanillaItemsForAutoLoot);
            for( let $_Index in aDirs ){
                aFilesMod = {};
                aFilesCore = {};
                
                try{
                    //aFilesMod = wzIO.dir_get_contentsSync(`${WZ.GrimDawn.tFn.getPaths().Mod}/${aDirs[$_Index]}`) || {};
                }catch(err){console.log(err);}
                try{
                    aFilesCore = wzIO.dir_get_contentsSync(`${WZ.GrimDawn.tFn.getPaths().Core}/${aDirs[$_Index]}`) || {};
                }catch(err){console.log(err);}
    
                aFiles = Object.assign(aFilesCore, JSON.parse(JSON.stringify( aFilesMod )));
    
                for( let $_FileIndex in aFiles ){
                    
                    TempClass = wzStorageGD.__get(aFiles[$_FileIndex].split(`/database/`)[1]);
    
                    this.aAutoLootItemsClasses.push(TempClass);
                    
                }
            }
            //TempClass = wzStorageGD.__get(`records/items/questitems/scrapmetal.dbr`);
            this.aAutoLootItemsClasses.push(wzStorageGD.__get(`records/items/questitems/scrapmetal.dbr`));
    
            //TempClass = wzStorageGD.__get(`records/items/questitems/quest_dynamite.dbr`);
            this.aAutoLootItemsClasses.push(wzStorageGD.__get(`records/items/questitems/quest_dynamite.dbr`));
        }
    },
    
    LoadLegendaryItems: function(){
        if(!this.aLegendaryItemsClasses){
            // WanezMods.LegendaryCrafter.allFiles
            // WanezMods.LegendaryCrafter.excludeEpic
            let addAllFiles = appConfig.get(`WanezMods.LegendaryCrafter.allFiles`) || false;
    
            let tempClass;
            let addFile = true;
            let aFiles;
            let aFilesMod;
            let aFilesCore;
            let aDirs = appConfig.get(`GrimDawn.Items.Directories`) || [];
            aDirs = aDirs.concat(this.aDirsVanillaItems);
            for( let $_Index in aDirs ){
                if(aDirs[$_Index] !== ``){
                    // add items to array
                    //wzStorageGD.load(`records/creatures/pc/femalepc01.dbr`),
                    //aFiles = wzIO.dir_get_contentsSync(`${WZ.GrimDawn.tFn.getPaths().Core}/${aDirs[$_Index]}`);
                    aFilesMod = {};
                    aFilesCore = {};
                    try{
                        //aFilesMod = wzIO.dir_get_contentsSync(`${WZ.GrimDawn.tFn.getPaths().Mod}/${aDirs[$_Index]}`) || {};
                    }catch(err){console.log(err);}
                    try{
                        aFilesCore = wzIO.dir_get_contentsSync(`${WZ.GrimDawn.tFn.getPaths().Core}/${aDirs[$_Index]}`) || {};
                    }catch(err){console.log(err);}
                    
                    aFiles = Object.assign(aFilesCore, JSON.parse(JSON.stringify( aFilesMod )));
                    //console.log(aFiles);
                    for( let $_FileIndex in aFiles ){
                        if(!addAllFiles){
                            addFile = ($_FileIndex.startsWith( (appConfig.get(`WanezMods.LegendaryCrafter.excludeEpic`) ? `d` : `c`) ) || $_FileIndex.startsWith(`d`));
                        }
                        if(addFile){
                            tempClass = wzStorageGD.__get(aFiles[$_FileIndex].split(`/database/`)[1]);
                            //tempClass = new WZ.GrimDawn.cData(aFiles[$_FileIndex].split(`/database/`)[1]);
                            //wzStorageGD.__get(aFiles[$_FileIndex].split(`/database/`)[1]);
                            let classification = tempClass.__getField(`itemClassification`);
                            if(classification === (appConfig.get(`WanezMods.LegendaryCrafter.excludeEpic`) ? `Legendary` : `Epic`) || classification === `Legendary`){
                                //console.log(tempClass);
                                this.aLegendaryItemsClasses = this.aLegendaryItemsClasses || [];
                                this.aLegendaryItemsClasses.push(tempClass);
                            }
                            
                        }
                    }
                }
            }
            //console.log(this.aLegendaryItemsClasses);
        }
    },
    
    saveCrafter: function($classNPC,$pathBlueprints){
        $pathBlueprints = (Array.isArray($pathBlueprints)) ? $pathBlueprints : [$pathBlueprints];
        
        let aBlueprints = [],tempBlueprintPaths;
        
        let files = [];
        for(let $_Index in $pathBlueprints){
            tempBlueprintPaths = fs.readdirSync(`${WZ.GrimDawn.tFn.getPaths().Mod}/${$pathBlueprints[$_Index]}`);
            for(let $_Index2 in tempBlueprintPaths){
                files.push(`${$pathBlueprints[$_Index]}/${tempBlueprintPaths[$_Index2]}`);
            }
        }
        for( let $_Index in files ){
            aBlueprints.push(`${files[$_Index]}`); //${$pathBlueprints}/
        }
        $classNPC.editDBR({
            "defaultRecipes": aBlueprints
        });
        $classNPC.saveData();
    },
    
    content_: function(){
        let out_ = '';
        
        out_ = '';
        
        return out_;
    },
    sidebar_: function(){
        let out_ = '';
        
        return out_;
    }
    
};
