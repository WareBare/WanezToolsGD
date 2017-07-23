/**
 * Created by WareBare on 4/20/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class mMateria extends libWZ.GrimDawn.cModule{
    
    constructor($path){
        super();
        
        this.aMateria = [];
        //this.objProperties = {};
    
        if($path) this.iniMateria($path);
    
    
        this.aSlotTagsCombo = {
            "all weapons": [`axe`,`mace`,`sword`,`dagger`,`scepter`,`ranged1h`,`ranged2h`,`axe2h`,`mace2h`,`sword2h`],
            "melee weapons": [`axe`,`mace`,`sword`,`dagger`,`axe2h`,`mace2h`,`sword2h`],
            "one-handed melee weapons": [`axe`,`mace`,`sword`,`dagger`],
            "two-handed melee weapons": [`ranged2h`,`axe2h`,`mace2h`,`sword2h`],
            "ranged weapons": [`ranged1h`,`ranged2h`],
            "axes": [`axe`,`axe2h`],
            "maces": [`mace`,`mace2h`],
            "swords": [`sword`,`sword2h`],
            "caster weapons": [`staff`,`scepter`],
            "all armor": [`head`,`shoulders`,`hands`,`chest`,`waist`,`legs`,`feet`]
        };
        this.aSlotTags = {
            'amulet': `amulets`,
            'ring': `rings`,
            'medal': `medals`,
            'head': `head armor`,
            'shoulders': `shoulder armor`,
            'hands': `hand armor`,
            'chest': `chest armor`,
            'waist': `waist`,
            'legs': `leg armor`,
            'feet': `boots`,
            'shield': `shields`,
            'offhand': `caster off-hands`,
            'spear': `spears`,
            'staff': `staves`,
            'axe': `one-handed axes`,
            'mace': `one-handed maces`,
            'sword': `one-handed swords`,
            'dagger': `daggers`,
            'scepter': `scepters`,
            'ranged1h': `one-handed guns`,
            'ranged2h': `two-handed guns`,
            'axe2h': `two-handed axes`,
            'mace2h': `two-handed maces`,
            'sword2h': `two-handed swords`
        };
        
        //console.log(wzStorageGD.getClass(this.aMateria[0]));
    }
    
    iniMateria($path){
        let tempPath,tempClass,objFiles = {};
        try{
            objFiles = wzIO.dir_get_contentsSync(`${this.fn.getPaths().Core}/${$path}`);
        }catch(err){} try{
            Object.assign(objFiles,wzIO.dir_get_contentsSync(`${this.fn.getPaths().Mod}/${$path}`));
        }catch(err){}
        
        for(let $_FileName in objFiles){
            tempPath = `${$path}/${$_FileName}`;
            tempClass = wzStorageGD.load(`${$path}/${$_FileName}`);
            if(tempClass.__getField(`templateName`) === `database/templates/itemrelic.tpl`) this.aMateria.push(tempPath);
        }
    }
    
    checkIfViableField($value){
        let isViable = false;
        if($value != '0' &&
            $value != '0.0' &&
            $value != '0.000000' &&
            $value != '' &&
            typeof $value != 'undefined'){
            isViable = true;
        }
        return isViable;
    }
    
    getList(){
        let list = {};
        
        for(let $_Index in this.aMateria){
            list[$_Index] = {
                text: this.aMateria[$_Index].replace(/^.*[\\\/]/, '')
            };
        }
        
        return list;
    }
    
    removePartials(){
        let tempClass, tempData, relicLength, isUpdated = false;
        
        for(let $_ID in this.aMateria){
            isUpdated = false;
            tempClass = wzStorageGD.__get(`${this.aMateria[$_ID]}`);
            tempData = tempClass.getData();
            relicLength = parseInt(tempData.completedRelicLevel);
            //console.log(tempClass.getData());
            // only check if completedRelicLevel is actually higher than 1 (otherwise it doesn't have partials to remove)
            if(relicLength > 1){
                for(let $_Field in tempData){
                    // check if data is array and has the length of the relic
                    if(Array.isArray(tempData[$_Field]) && tempData[$_Field].length >= relicLength){
                        //console.log($_Field);
                        //console.log(tempData[$_Field][relicLength - 1]);
                        tempClass.__setField($_Field,tempData[$_Field][relicLength - 1]);
                        isUpdated = true;
                        //console.log(tempData[$_Field]);
                    }
                }
                if(isUpdated){
                    tempClass.__setField("completedRelicLevel","1");
                    tempClass.saveDBR();
                }
            }
        }
        
    }
    
    getProperties(){
        let objProperties = {},tempClass,tempFields,tempFieldValue,fieldsTPL = wzTemplates.__getGroupFields(`database/templates/itemrelic.tpl`,[`Offensive Parameters`,`Defensive Parameters`,`Retaliation Parameters`,`Character Parameters`,`Skill Parameters`,`Conversion Parameters`,`Skill Augment`,`Skill Modifiers`,`Pet Bonus`,`Relic Qualifiers`]);
    
        // this.iType
        // records/items/materia
    
        for(let $_ID in this.aMateria){
            //aItems[$_ID]
            tempClass = wzStorageGD.__get(`${this.aMateria[$_ID]}`);
            tempFields = {};
            objProperties[this.aMateria[$_ID]] = {};
            for(let $_FieldName in fieldsTPL){
                //fieldsTPL[$_FieldName]
                //console.log($_FieldName);
                tempFieldValue = tempClass.__getField($_FieldName);
                if(this.checkIfViableField(tempFieldValue) && $_FieldName !== 'characterBaseAttackSpeedTag'){
                    objProperties[this.aMateria[$_ID]][$_FieldName] = (Array.isArray(tempFieldValue)) ? tempFieldValue[tempFieldValue.length - 1] : tempFieldValue;
                }
            }
            //objProperties[this.aMateria[$_ID]] =
        }
    
        return objProperties;
    }
    
    genSlotTags($baseStats){
        let tags_ = ``,aSlots = {},objRep,tempSlots,isChoice = true;
        
        for(let $_Index in this.aSlotTags){
            if( $baseStats[$_Index] ){
                aSlots[$_Index] = this.aSlotTags[$_Index];
            }
        }
        
        // check for slot groups
        for(let $_Tag in this.aSlotTagsCombo){
            tempSlots = this.aSlotTagsCombo[$_Tag];
            isChoice = true;
            for(let $_Index in tempSlots){
                if(!aSlots[tempSlots[$_Index]]){
                    isChoice = false;
                }
            }
            if(isChoice){
                for(let $_Index in tempSlots){
                    delete aSlots[tempSlots[$_Index]];
                }
                if(tags_ !== '') {
                    if(aSlots.length > 1){
                        tags_ += `, `;
                    }else{
                        tags_ += ` and `;
                    }
                    
                }else{
                    tags_ += `Used in `;
                }
                tags_ += `${$_Tag}`;
            }
        }
        // add remaining slots
        for(let $_Slot in aSlots){
            if(tags_ !== '') {
                if($_Slot === Object.keys(aSlots)[Object.keys(aSlots).length - 1] ){
                    tags_ += ` and `;
                }else{
                    tags_ += `, `;
                }
                
            }else{
                tags_ += `Used in `;
            }
            tags_ += `${aSlots[$_Slot]}`;
        }
        
        //console.log(tags_);
        
        return tags_;
    }
    
    getMateriaById($id){
        return wzStorageGD.__get(this.aMateria[$id]);
    }
    
    getField($type,$field){
        return wzStorageGD.__get(this.aMateria[$type]).getFieldValue($field);
    }
    
    setField($type,$opt,$dataMisc){
        wzStorageGD.update(this.aMateria[$type],$opt,$dataMisc,true);//.editDBR($opt,true);
    }
    
};
