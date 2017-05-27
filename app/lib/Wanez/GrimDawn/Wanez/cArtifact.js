/**
 * Created by WareBare on 5/8/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cArtifact extends libWZ.GrimDawn.cData{
    
    constructor($assetType,$arrAffixes,$tier,$id,$name,$ini,$itemSkill){
        super();
    
        this.aData = new libWZ.GrimDawn.Assets.aGear(false,`${$assetType}`).getData();
        
        if($ini) this.editDBR($ini);
        
        this.tierToLevel = [73,76,79,82,85,88,91,94,97,100];
        
        //this.assetType = $assetType;
        this.iItemFile = {
            path: `mod_wanez/_gear/items/artifacts/`,
            tpl: "{ID}_artifact_{TIER}.dbr",
            name: `^k${$name} (Level ${parseInt($tier) + 1})`,
            tplPet: `{ID}_artifact_petbonus_{TIER}`
        };
        this.iTier = $tier;
        
        this.iItemSkill = $itemSkill;
        this.AffixID = $id;
        this._petBonus = false;
        this.affixWeight = 100;
        
        this.aAffixes = this.iniAffixes($arrAffixes,this.tierToLevel[this.iTier]);
        this.prevFile = false;
        
        this.editDBR(this.aAffixes);
        
        this.genFileName(true);
    }
    
    iniAffixes($arrAffixes,$lvl){
        let aAffixes = {},tempAffix,tempArr,petBonuses = false,tempVariation = false,tempCount = false;
        aAffixes.levelRequirement = $lvl;
        //
        for(let $_Index in $arrAffixes){
            tempAffix = $arrAffixes[$_Index];
            //this.affixWeight = this.affixWeight + tempAffix.weight;
            
            tempArr = tempAffix.field;
            if(typeof tempAffix.field === 'string') tempArr = [tempAffix.field];
            
            for( let $_i in tempArr){
    
                aAffixes[tempArr[$_i]] = parseFloat(aAffixes[tempArr[$_i]]) || 0.0;
                
                if(tempAffix.isPet){
                    petBonuses = petBonuses || {};
                    petBonuses[tempArr[$_i]] = parseFloat(petBonuses[tempArr[$_i]]) || 0.0;
                    petBonuses[tempArr[$_i]] = petBonuses[tempArr[$_i]] + Math.ceil(this.mathStatValue(tempArr[$_i],$lvl,1) * tempAffix.mul);
                }else if(tempAffix.value){
                    aAffixes[tempArr[$_i]] = aAffixes[tempArr[$_i]] +  + tempAffix.value;
                }else{
                    if(tempArr[$_i] === `characterBaseAttackSpeed`){
                        aAffixes[tempArr[$_i]] = (aAffixes[tempArr[$_i]] + (this.mathStatValue(tempArr[$_i],$lvl,1) * tempAffix.mul * -0.1)).toFixed(2);
                        //console.log(aAffixes[tempArr[$_i]]);
                    }else if(tempArr[$_i] === `blockRecoveryTime`){
                        aAffixes[tempArr[$_i]] = (aAffixes[tempArr[$_i]] + (this.mathStatValue(tempArr[$_i],$lvl,1) * tempAffix.mul)).toFixed(2);
                    }else{
                        aAffixes[tempArr[$_i]] = aAffixes[tempArr[$_i]] + Math.ceil(this.mathStatValue(tempArr[$_i],$lvl,1) * tempAffix.mul);
                    }
                }
                
            }
        }
        
        if(petBonuses){
            let filePath = this.iItemFile.path,
                fileName = this.iItemFile.tplPet.wzOut({
                    "ID": (`00${this.AffixID}`).slice(-3),
                    "TIER": (`0${parseInt(this.iTier) + 1}`).slice(-2)
                }),
                itemFile = (filePath+fileName+'.dbr').toLowerCase();
            
            this._petBonus = new libWZ.GrimDawn.Assets.aPetBonus(`${itemFile}`);
            this._petBonus.editDBR(petBonuses);
            
            aAffixes["petBonusName"] = itemFile;
        }
        
        if(this.iItemSkill){
            aAffixes[`itemSkillName`] = this.iItemSkill[0];
            aAffixes[`itemSkillLevelEq`] = this.iItemSkill[1];
        }
        aAffixes.itemClassification = `Legendary`;
        
        return aAffixes;
    }
    
    genFileName($setTags = false){
        let aRep = {
                "ID": (`00${this.AffixID}`).slice(-3),
                "TIER": (`0${parseInt(this.iTier) + 1}`).slice(-2)
            },filePath = this.iItemFile.path,
            fileName = this.iItemFile.tpl.wzOut(aRep),
            itemFile = (filePath+fileName).toLowerCase();
        
        if($setTags){
            let tagText_NAME = this.iItemFile.name.wzOut(aRep);
            this.tagItemNAME = 'tagWaGearArtifact_'+fileName.replace(`.dbr`,``)+'_NAME';
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
