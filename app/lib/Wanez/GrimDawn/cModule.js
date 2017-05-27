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
    
}

module.exports = cModule;
