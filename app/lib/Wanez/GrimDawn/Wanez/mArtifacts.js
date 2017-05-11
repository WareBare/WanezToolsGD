/**
 * Created by WareBare on 5/8/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class mArtifacts extends libWZ.GrimDawn.cModule{
    
    constructor($data){
        super();
        
        this.iData = $data;
        
        this.aArtifacts = [];
        this.aBlueprints = [];
        this.aPages = [];
        
        this.pathArtifacts = `mod_wanez/_gear/items/artifacts`;
        
        this.iniArtifacts($data);
        
        this.aModuleData = [
            this.aArtifacts,
            this.aPages,
            this.aBlueprints
        ];
        
        console.log(this.aModuleData);
    }
    
    iniArtifacts($data){
        let tempStats,tempArtifact,tempItem,artifactName,tempBlueprintPath,
            aCreationCost = [50000,100000,200000,300000,500000,700000,900000,1000000,1250000,1500000],
            aReagentQuantity = [1,1,3,5,10,25,50,100,150,200];
        // items: Book Pages
        // items: base item/pattern (for faction vendor)
        // items: upgrades
        
        for(let $_ID in $data){
            tempArtifact = [];
            tempStats = $data[$_ID].stats;
            // check if stats exists to prevent error
            if(tempStats){
                // BASE ITEM (PATTERN) \\
                tempItem = new libWZ.GrimDawn.Assets.aEnchantment(`mod_wanez/_gear/items/artifacts/${(`00${$_ID}`).slice(-3)}_artifact_00.dbr`);
                tempItem.__setTags({
                    itemText: {
                        key: `tagWaGearArtifact_X_artifact_00_DESC`,
                        value: `"This is a pattern for a new Artifact, it can be used at a Blacksmith to create an equippable Artifact."`
                    },
                    description: {
                        key: `tagWaGearArtifact_${(`00${$_ID}`).slice(-3)}_artifact_00_NAME`,
                        value: `Artifact: ^k${$data[$_ID].name}`
                    }
                });
                tempItem.editDBR({
                    bitmap: $data[$_ID].params.bitmap,
                    itemClassification: `Legendary`
                });
                tempArtifact.push(tempItem);
                
                // PAGES \\
                tempItem = new libWZ.GrimDawn.Assets.aCharm(`mod_wanez/_gear/items/artifacts/${(`00${$_ID}`).slice(-3)}_pages.dbr`);
                tempItem.__setTags({
                    itemText: {
                        key: `tagWaGearArtifact_X_pages_DESC`,
                        value: `"You can merge pages to form a Tome, the Tome can then be used to craft and upgrade an Artifact."`
                    },
                    description: {
                        key: `tagWaGearArtifact_${(`00${$_ID}`).slice(-3)}_pages_NAME`,
                        value: `Artifact: ^k${$data[$_ID].name}`
                    }
                });
                tempItem.editDBR({
                    completedRelicLevel: `${$data[$_ID].pageCount}`,
                    shardBitmap: `wanez/items/artifact_page.tex`,
                    relicBitmap: `wanez/items/artifact_tome.tex`,
                    itemClassification: `Legendary`,
                    itemCost: `100000`
                });
                this.aPages.push(tempItem);
                
                // LOOTTABLES - PAGES + PATTERN \\
                
                // loop through stats to prepare upgrades \\
                for(let $_Tier in tempStats){
                    // ITEMS \\
                    tempItem = new libWZ.GrimDawn.Wanez.cArtifact(
                        $data[$_ID].gearAsset,
                        tempStats[$_Tier],
                        $_Tier,
                        $_ID,
                        $data[$_ID].name,
                        $data[$_ID].params
                    );
                    tempArtifact.push(tempItem);
                    
                    // BLUEPRINTS \\
                    tempBlueprintPath = `mod_wanez/_gear/items/artifacts/blueprints/${(`blueprint_00${$_ID}`).slice(-3)}_artifact_${(`0${parseInt($_Tier) + 1}`).slice(-2)}.dbr`;
                    tempItem = new libWZ.GrimDawn.Assets.aBlueprint(tempBlueprintPath);
                    tempItem.setReagent([
                        // base reagents
                        (parseInt($_Tier)) ? `mod_wanez/_patron/items/currency_planarinvader.dbr` : `mod_wanez/_gear/items/artifacts/${(`00${$_ID}`).slice(-3)}_pages.dbr`,
                        `${aReagentQuantity[$_Tier]}`,
                        `${aCreationCost[$_Tier]}`
                    ],[ // optional reagents
                        `mod_wanez/_gear/items/artifacts/${(`00${$_ID}`).slice(-3)}_artifact_${(`0${parseInt($_Tier)}`).slice(-2)}.dbr`
                    ]);
                    tempItem.editDBR({
                        artifactName: `mod_wanez/_gear/items/artifacts/${(`00${$_ID}`).slice(-3)}_artifact_${(`0${parseInt($_Tier) + 1}`).slice(-2)}.dbr`
                    });
                    // description
                    tempItem.__setTags({
                        description: {
                            key: `tagWaGearArtifact_${(`00${$_ID}`).slice(-3)}_Blueprint_NAME`,
                            value: `Artifact: ^k${$data[$_ID].name}`
                        }
                    });
                    this.aBlueprints.push(tempItem);
                }
            }
    
            this.aArtifacts.push(tempArtifact);
        }
        //console.log(this.aArtifacts);
    }
    
};
