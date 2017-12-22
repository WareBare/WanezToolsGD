/**
 * Created by WareBare on 11/12/2016.
 *
 * Parent for features like
 * RunicInscriptions
 * RunicStones
 * Equipment
 *
 */

class cModule extends libWZ.GrimDawn.cBase{
    
    constructor(){
        super();
    }
    
    getData(){
        return this.aData;
    }
    
    performSaveAction($data,$dataMisc,$alwaysSave = false){
        $data = (typeof $data === `string`) ? wzStorageGD.__get($data) : $data;
        if($data){
            try{
                // saveItem() if it is an item, otherwise just saveDataGD()
                // saveItem() checks if there has been changes, and only saves the file if that's the case to prevent stat re-rolling with every update
                $data.saveItem($dataMisc);
            }catch(err){
                //$data.saveDataGD($dataMisc,true);
                try{
                    $data.saveDBR($dataMisc,$alwaysSave);
                    //console.log(`go save`);
                }catch(err2){
                    try{
                        $data.saveModuleData($dataMisc,$alwaysSave);
                        //console.log(`Module saved inside a Module`);
                    }catch(err3){
                        //console.log(`Error while saving Module`);
                    }
                }
            }
        }
    }
    
    saveModuleLoop(){
        
    }
    
    saveModule2(){
        
    }
    
    saveModule($dataMisc,$alwaysSave = false){
        $dataMisc = $dataMisc || false;
        
        let tempData;
        
        for( let $_Index in this.aModuleData ){
            for( let $_Index02 in this.aModuleData[$_Index] ){
                tempData = this.aModuleData[$_Index][$_Index02];
                if(Array.isArray(tempData)){
                    for( let $_Index03 in tempData ){
                        this.performSaveAction(tempData[$_Index03],$dataMisc,$alwaysSave);
                    }
                }else{
                    this.performSaveAction(tempData,$dataMisc,$alwaysSave);
                }
                
            }
            
        }
        //wzNotify.save(`Module Data was saved.`);
    }
    
    saveModuleData($dataMisc,$alwaysSave = false){
        $dataMisc = $dataMisc || false;
        this.saveModule($dataMisc,$alwaysSave);
        //console.log(`save`);
        wzNotify.save(`Module Data was saved.`);
    }
    
    saveModuleClasses($dataMisc,$alwaysSave = false){
        //this.aModuleClasses
        
        this.saveModuleData($dataMisc,$alwaysSave);
    }
    
    /**
     *
     * @param {String} InPathToTdyn - used for cData (= relative Path with leading / tries Mod first)
     * @param {Array} InData
     * @return {class} TDYN
     * @constructor
     */
    EditTdyn(InPathToTdyn, InData){
        let cTdyn = false, TempData;
        
        try{
            if(typeof InPathToTdyn === `string`){
                cTdyn = new libWZ.GrimDawn.cData(InPathToTdyn);
            }else{
                cTdyn = InPathToTdyn;
            }
            
            for(let kIndex in InData){
                TempData = Array.isArray(InData[kIndex]) ? InData[kIndex] : [InData[kIndex], 100];
    
                //Log(parseInt(kIndex) + 1);
                cTdyn.__setField(`lootName${parseInt(kIndex) + 1}`, TempData[0]);
                cTdyn.__setField(`lootWeight${parseInt(kIndex) + 1}`, TempData[1]);
            }
            for(let i = InData.length + 1; i <= 80; i++ ){
                cTdyn.__setField(`lootName${i}`, ``);
                cTdyn.__setField(`lootWeight${i}`, ``);
            }
        }catch(err){console.log(err);}
        
        if(!cTdyn) console.warn(`An Error Has Occurred at cModule:EditTdyn()`);
        
        return cTdyn;
    }
    
    
    EditAffixTable(InPathToAffixTable, InData){
        let cAffixTable = false, TempData;
        
        try{
            if(typeof InPathToAffixTable === `string`){
                cAffixTable = new libWZ.GrimDawn.cData(InPathToAffixTable);
            }else{
                cAffixTable = InPathToAffixTable;
            }
            
            for(let kIndex in InData){
                TempData = Array.isArray(InData[kIndex]) ? InData[kIndex] : [InData[kIndex], 1, 250, 100];
                
                cAffixTable.__setField(`randomizerName${parseInt(kIndex) + 1}`, TempData[0]);
                cAffixTable.__setField(`randomizerLevelMin${parseInt(kIndex) + 1}`, TempData[1]);
                cAffixTable.__setField(`randomizerLevelMax${parseInt(kIndex) + 1}`, TempData[2]);
                cAffixTable.__setField(`randomizerWeight${parseInt(kIndex) + 1}`, TempData[3]);
            }
            for(let i = InData.length + 1; i <= 80; i++ ){
                cAffixTable.__setField(`randomizerName${i}`, ``);
                cAffixTable.__setField(`randomizerLevelMin${i}`, ``);
                cAffixTable.__setField(`randomizerLevelMax${i}`, ``);
                cAffixTable.__setField(`randomizerWeight${i}`, ``);
            }
        }catch(err){console.log(err);}
        
        if(!cAffixTable) console.warn(`An Error Has Occurred at cModule:EditAffixTable()`);
        
        return cAffixTable;
    }
    
}

module.exports = cModule;
