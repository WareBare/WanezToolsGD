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
    
};
