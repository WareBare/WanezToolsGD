/**
 * Created by WareBare on 4/23/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */
module.exports = class mArmor extends libWZ.GrimDawn.cModule{
    
    constructor($items,$lvl,$itemSettings,$tier,$itemParams,$index){
        super();
        
        this.iIndex = $index;
        this.iSettings = $itemSettings;
        this.iTier = $tier;
        this.iParams = $itemParams[this.iIndex];
        this.aData = this.iniArmor($items[this.iIndex],$lvl);
        this.aModuleData = false;
    }
    
    iniArmor($items,$lvl){
        let aArmor = {}, objType,arrSlot,arrVariation,tempArmorKey,tempVariation,tempClass,tempParams;
        
        for( let $_Type in $items ){
            objType = $items[$_Type];
            for( let $_Slot in objType ){
                arrSlot = objType[$_Slot];
                tempArmorKey = $_Type+$_Slot;
                aArmor[tempArmorKey] = [];
                for( let $_Variation in arrSlot ){
                    arrVariation = arrSlot[$_Variation];
                    //tempVariation = [];
                    for( let $_Index in arrVariation ){
                        tempParams = this.iParams[$_Type][$_Slot].params || false;
                        //console.log(tempParams);
                        tempClass = new libWZ.GrimDawn.Wanez.cItem([$_Type,$_Slot,this.iIndex],arrVariation[$_Index],$lvl,this.iSettings.itemFile,this.iTier,tempParams);
                        tempClass.editDBR({
                            itemClassification: ($lvl >= 50) ? `Legendary` : (($lvl >= 25) ? `Epic` : `Rare`)
                        });
                        //console.log(arrVariation[$_Index]);
                        aArmor[tempArmorKey].push(tempClass);
                        
                        tempClass.genFileName({
                            "TYPE": $_Type,
                            "SLOT": $_Slot,
                            "INDEX": this.iIndex
                        },true);
                    }
                }
            }
        }
        
        //tempClass = new libWZ.GrimDawn.wzGear.cAffix($affixCombinations[$_Index],$lvl,this.iSettings.affixFile,this.iTier);
        return aArmor;
    }
    
    getTagAttackSpeed($value){
        let speedTags = this._propertiesGD.getData().settings.speedTags,retTag;
        
        for( let $_Tag in speedTags ){
            if(speedTags[$_Tag] <= $value) retTag = $_Tag;
        }
        
        return retTag;
    }
    
    saveArmor($dataMisc){
        this.aModuleData = [
            this.aData
        ];
        //console.log(this.aModuleData);
        this.saveModule($dataMisc);
    }
    
};
