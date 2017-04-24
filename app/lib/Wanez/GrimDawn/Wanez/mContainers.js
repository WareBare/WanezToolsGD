/**
 * Created by WareBare on 4/24/2017.
 *
 * =============================================================================================
 * JSON - wz-containers.json
 * -------------------------
 * [Containers]
 * -- {Object/ID} [FileName] => without extension (.dbr)
 * -- -- {Object} dbr => dbr entries (for $ini)
 * -- -- {String} style => pre-defined style settings (HeroOrb)
 * -- -- {String} tagName => Container Name (not its tag, the tag is set inside params)
 * -- -- {String} type => Destructible, RegularChestXX
 * -- -- {String} lootTable => used LootTable for this container (FileName set in LootTables)
 *
 * [LootTables]
 * -- scales
 * -- -- {Array/ID} [Type] => 6 entries
 * -- -- -- {Array} => slots to use chances
 * -- items
 * -- -- {Object/ID} [FileName]
 * -- -- -- {Object} settings
 * -- -- -- -- -- {Array} difficulties => [normal mul, elite mul, ultimate mul] multiply weights with the value if set
 * -- -- -- -- -- {Float} mulUber => additional multiplier for Uber Modes
 * -- -- -- -- -- {Object} scale
 * -- -- -- -- -- -- {String} ID => the scale used from >LootTables.scales<
 * -- -- -- -- -- -- {Array} mul => [ {Float} mul , ... ] 6 entries (DGA-Difficulties)
 * -- -- -- -- -- {Object} spawnEquation
 * -- -- -- -- -- -- {String} tpl => tpl for min/max
 * -- -- -- -- -- -- {Array} min => [ [{int} Value, {Float} mul for DGA-Difficulty], ...]
 * -- -- -- -- -- -- {Array} max => same as min
 * -- -- -- {Array} items => 6 entries
 * -- -- -- -- [ {String} dbr,
 *                 [ {int} Weight , {Float} weight mul for DGA-Difficulty ]
 *
 * =============================================================================================
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class mContainers extends libWZ.GrimDawn.cModule{
    
    constructor($jsonData,$aDifficulty){
        super();
        
        this.iDataJSON = $jsonData;
        this.iDataDifficulty = $aDifficulty;
        
        this.useAssets = { // todo
            'lootchests': `${dirAssets}/wzEntities/lootchests`,
            'chestloottables': `${dirAssets}/wzEntities/lootchests/chestloottables`
        };
        this.pathTargetContainers = `mod_wanez/_dga/difficulties/${this.iDataDifficulty.name}/lootchests`;
        this.pathTargetLootTables = `mod_wanez/_dga/difficulties/${this.iDataDifficulty.name}/lootchests/chestloottables`;
        
        this.aModuleData = [
            this.iniLootTables(),
            this.iniContainers()
        ];
        
        console.log({'LootTables':this.aModuleData[0],'Containers':this.aModuleData[1]});
    }
    
    iniLootTables(){
        let tempClass,aLootTables = [];
        
        for(let $_NameLT in this.iDataJSON.get(`LootTables.items`)){
            tempClass = new libWZ.GrimDawn.Wanez.cEntityLootTable(
                this.iDataJSON.get(`LootTables`),
                $_NameLT,this.iDataDifficulty,
                this.pathTargetLootTables
            );
            
            aLootTables.push(tempClass);
        }
        
        return aLootTables;
    }
    
    iniContainers(){
        let tempClass,aContainers = [];
        
        for(let $_NameLT in this.iDataJSON.get(`Containers`)){
            // $assetType,$data,$name,$path,$pathLT,$ini
            tempClass = new libWZ.GrimDawn.Wanez.cContainer(
                this.iDataJSON.get(`Containers.${$_NameLT}.type`), //`Destructible`,
                this.iDataJSON.get(`Containers`),
                $_NameLT,
                this.pathTargetContainers,
                this.pathTargetLootTables
            );
            
            aContainers.push(tempClass);
        }
        
        
        return aContainers;
    }
};
