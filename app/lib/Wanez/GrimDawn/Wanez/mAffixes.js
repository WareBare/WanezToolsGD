/**
 * Created by WareBare on 4/23/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class mAffixes extends libWZ.GrimDawn.cModule{
    
    constructor($affixCombinations,$lvl,$affixSettings,$tier){
        super();
        
        this.iSettings = $affixSettings;
        this.iTier = $tier;
        this.aData = this.iniAffixes($affixCombinations,$lvl);
        this.aAffixes = this.aData.affixes;
        this.aTables = this.iniTables(this.aData.tables);
    }
    
    iniAffixes($affixCombinations,$lvl){
        let aAffixes = [],tempClass,tempEntry = {},tempCount = {},tempObj = {},tempCounter = {},rarity,
            aEntries = ["randomizerName{0}","randomizerLevelMin{0}","randomizerLevelMax{0}","randomizerWeight{0}"],
            aRarities = ["0","a","b","c","d"];
        
        for( let $_Index in $affixCombinations){
            // cAffix
            tempClass = new libWZ.GrimDawn.Wanez.cAffix($affixCombinations[$_Index],$lvl,this.iSettings.affixFile,this.iTier);
            aAffixes.push(tempClass);
            
            // AFFIX_TABLE PREPARATION
            rarity = aRarities[$affixCombinations[$_Index].length];
            tempCounter[rarity] = tempCounter[rarity] || 1;
            if(tempCounter[rarity] === 101) {
                tempCounter[rarity] = 1;
                tempCount[rarity] = tempCount[rarity] || [];
                tempCount[rarity].push(tempObj[rarity]);
                tempObj[rarity] = {};
            }
            tempClass.genFileName({
                "RARITY": rarity
            });
            
            tempEntry[rarity] = aEntries[0].wzOut([tempCounter[rarity]]);
            tempObj[rarity] = tempObj[rarity] || {};
            tempObj[rarity][aEntries[0].wzOut([tempCounter[rarity]])] = tempClass.itemFile;
            tempObj[rarity][aEntries[1].wzOut([tempCounter[rarity]])] = 1;
            tempObj[rarity][aEntries[2].wzOut([tempCounter[rarity]])] = 250;
            tempObj[rarity][aEntries[3].wzOut([tempCounter[rarity]])] = tempClass.affixWeight;
            
            tempCounter[rarity]++;
            
        }
        
        tempCount["a"] = tempCount["a"] || [];
        tempCount["a"].push(tempObj["a"]);
        tempCount["b"] = tempCount["b"] || [];
        tempCount["b"].push(tempObj["b"]);
        tempCount["c"] = tempCount["c"] || [];
        tempCount["c"].push(tempObj["c"]);
        
        return {
            "affixes": aAffixes,
            "tables":{
                "a": tempCount["a"],
                "b": tempCount["b"],
                "c": tempCount["c"]
            }
        };
    }
    
    iniTables($tablesData){
        
        let filePath = this.iSettings.tableFile.path,tplData,
            fileName,affixFile,aTables = [],
            aRarityClass = {"a":false,"b":false,"c":true};
        
        for( let $_Rarity in $tablesData ){
            for( let $_Index in $tablesData[$_Rarity] ){
                tplData = {
                    "RARITY": $_Rarity,
                    "COUNT": (`0${$_Index}`).slice(-2), // this.parseIntToString($_Index,1)
                    "TIER": (`0${this.iTier}`).slice(-2)// this.parseIntToString(this.iTier,1)
                };
                fileName = this.iSettings.tableFile.tpl.wzOut(tplData);
                affixFile = filePath + fileName + '.dbr';
                // check if table has data and create a new cAffixTable instance if it does
                if($tablesData[$_Rarity][$_Index]) aTables.push(new libWZ.GrimDawn.Wanez.cAffixTable(affixFile,$tablesData[$_Rarity][$_Index],aRarityClass[$_Rarity]));
            }
        }
        
        return aTables;
    }
    
    getTables(){
        return this.aTables;
    }
    
    saveAffixes($dataMisc){
        this.aModuleData = [
            this.aAffixes,
            this.aTables
        ];
        this.saveModule($dataMisc);
        /*
         $dataMisc = $dataMisc || false;
         
         for( let $_Index in this.aAffixes ){
         // cAffix => SAVE
         this.aAffixes[$_Index].saveDataGD($dataMisc);
         }
         for( let $_Index in this.aTables ){
         // cAffixTable => SAVE
         this.aTables[$_Index].saveDataGD($dataMisc);
         }
         */
    }
    
};
