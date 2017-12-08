/**
 * Created by WareBare on 4/23/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cItem extends libWZ.GrimDawn.cData{
    
    constructor($assetType,$arrAffixes,$lvl,$itemFile,$tier,$ini){
        super();
        
        if(Array.isArray($assetType)){
            this.aData = new libWZ.GrimDawn.Assets.aGear(false,`${$assetType[0]}${$assetType[1]}`).getData();
        }else{
            switch($assetType){
                case 'Affix':
                    this.aData = new libWZ.GrimDawn.Assets.aLootRandomizer().getData();
                    break;
                default:
                    break;
            }
        }
        if($ini){
            this.editDBR($ini);
        }
        
        this.assetType = $assetType;
        this.iItemFile = $itemFile;
        this.iTier = $tier;
        
        this.AffixID = '';
        this._petBonus = false;
        this.affixWeight = 0;
        
        this.aAffixes = this.iniAffixes($arrAffixes,$lvl);
        this.prevFile = false;
        
        this.editDBR(this.aAffixes);
    }
    
    iniAffixes($arrAffixes,$lvl){
        let aAffixes = {},tempAffix,tempArr,petBonuses = false,tempVariation = false,tempCount = false;
        aAffixes.levelRequirement = $lvl;
        //
        for(let $_Index in $arrAffixes){
            tempAffix = $arrAffixes[$_Index];
            this.affixWeight = this.affixWeight + tempAffix.weight;
            
            tempArr = tempAffix.field;
            if(typeof tempAffix.field === 'string') tempArr = [tempAffix.field];
            
            for( let $_i in tempArr){
                //Log(tempArr[$_i]);
                if(tempAffix.isPet){
                    petBonuses = petBonuses || {};
                    petBonuses[tempArr[$_i]] = Math.ceil(this.mathStatValue(tempArr[$_i],$lvl,1) * tempAffix.mul);
                }else if(tempAffix.value){
                    aAffixes[tempArr[$_i]] = tempAffix.value;
                }else{
                    if(tempArr[$_i] === `characterBaseAttackSpeed`){
                        aAffixes[tempArr[$_i]] = (this.mathStatValue(tempArr[$_i],$lvl,1) * tempAffix.mul * -0.1).toFixed(2);
                        //console.log(aAffixes[tempArr[$_i]]);
                    }else if(tempArr[$_i] === `blockRecoveryTime`){
                        aAffixes[tempArr[$_i]] = (this.mathStatValue(tempArr[$_i],$lvl,1) * tempAffix.mul).toFixed(2);
                    }else{
                        aAffixes[tempArr[$_i]] = Math.ceil(this.mathStatValue(tempArr[$_i],$lvl,1) * tempAffix.mul);
                    }
                }
                
            }
            if(tempAffix.ID){
                this.AffixID += (`0${tempAffix.ID}`).slice(-2);
            }
            tempVariation = tempVariation || tempAffix.Variation;
            tempCount = tempCount || tempAffix.Count;
            
        }
        
        if(tempVariation && tempCount){
            this.AffixID = `${(`0${tempVariation}`).slice(-2)}${(`0${tempCount}`).slice(-2)}`;
        }
        if(petBonuses){
            let filePath = this.iItemFile.path,
                fileName = this.iItemFile.tplPet.wzOut({
                    "TYPE": this.assetType[0] || `00`,
                    "SLOT": this.assetType[1] || `00`,
                    "INDEX": this.assetType[2] || `00`,
                    "RARITY": "a",
                    "ID": this.AffixID,
                    "TIER": (`0${this.iTier}`).slice(-2)// this.parseIntToString(this.iTier,1)
                }),
                itemFile = (filePath+fileName+'.dbr').toLowerCase();
            
            //this._petBonus = new libWZ.GrimDawn.wzGear.cPetBonus(wzGD_dataSet.PathsDS.Mod.Home+'/database/'+itemFile,petBonuses);
            this._petBonus = new libWZ.GrimDawn.Assets.aPetBonus(`${itemFile}`);
            this._petBonus.editDBR(petBonuses);
            
            aAffixes["petBonusName"] = itemFile;
        }
        
        return aAffixes;
    }
    
    getItemNameTag(){
        return this.itemNameTag || "";
    }
    
    getTableData(){
        return [this.itemFile,this.affixWeight];
    }
    
    genFileName($opt,$setTags = false){
        $opt = wzSetArDef($opt,{
            "ID": this.AffixID,
            "TIER": (`0${this.iTier}`).slice(-2)// this.parseIntToString(this.iTier,1)
        });
        let filePath = this.iItemFile.path,
            fileName = this.iItemFile.tpl.wzOut($opt),
            itemFile = (filePath+fileName+'.dbr').toLowerCase();
        
        if($setTags){
            let tagText_NAME = this.iItemFile.name.wzOut($opt);
            this.tagItemNAME = 'tagWaGear'+fileName+'_NAME';
            this.editDBR({
                "itemNameTag": this.tagItemNAME
            });
            this.aTags = this.aTags || {};
            this.aTags[this.tagItemNAME] = tagText_NAME;
        }
        
        this.itemFile = itemFile;
        
        this.changeFilePath(`${this.fn.getPaths().Mod}/${itemFile}`);
    }
    
    saveItem($dataMisc){
        $dataMisc = $dataMisc || false;
        
        if(this._petBonus){
            this._petBonus.saveDBR();
        }
        
        this.saveDBR($dataMisc);
    }
    
};
