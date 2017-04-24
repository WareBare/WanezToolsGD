/**
 * Created by WareBare on 4/22/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class dbrData extends libWZ.GrimDawn.cData{
    
    constructor($data,$objReplace,$savePath){
        //super(`${wzDir.Assets}/${$data.wzAsset}.dbr`,new libWZ.GrimDawn.Parser.cDBR());
        super();
        
        this.aData = new libWZ.GrimDawn.Assets[$data.wzAsset]($savePath).getData();
        //console.log(this.aData);
        this.iData = $data;
        this.iObjReplace = $objReplace;
        this.iSavePath = `${this.fn.getPaths().Mod}/${$savePath}`;
        
        this.iniFile(this.iData);
    }
    
    iniFile($data){
        
        this.setTPL($data);
        let newDBR = Object.assign({},this.iData.dbr);
        
        for(let $_Field in this.iData.misc){
            if(typeof this.iData.misc[$_Field] === 'string'){
                newDBR[$_Field] = this.iData.misc[$_Field].wzOut(this.iObjReplace);
            }else{
                newDBR[$_Field] = this.iData.misc[$_Field];
            }
            
        }
        if(this.iObjReplace.ID){
            for(let $_Field in this.iData.skill[this.iObjReplace.ID]){
                if(typeof this.iData.misc[$_Field] === 'string'){
                    newDBR[$_Field] = this.iData.skill[this.iObjReplace.ID][$_Field].wzOut(this.iObjReplace);
                }else{
                    newDBR[$_Field] = this.iData.skill[this.iObjReplace.ID][$_Field];
                }
                
            }
            //console.log(this.iObjReplace.ID);
        }
        //console.log(newDBR);
        Object.assign(newDBR,this.getFields(`tags`));
        Object.assign(newDBR,this.getFields(`luaEvents`));
        
        this.changeFilePath(`${this.iSavePath}${this.iData.subDir.wzOut(this.iObjReplace)}/${this.iObjReplace.TPL.toLowerCase()}.${this.iData.fileExt}`);
        
        this.editDBR(newDBR);
    }
    
    setTPL($data){
        //return $data.tpl.wzOut(this.iObjReplace);
        this.iObjReplace.TPL = $data.tpl.wzOut(this.iObjReplace);
    }
    
    getFields($type){
        let tempDBR = {},tempKey,tempValue,tempArgs,tempVar = {};
        
        for(let $_Field in this.iData[$type]){
            tempKey = false;
            tempValue = false;
            tempArgs = false;
            for(let $_Key in this.iData[$type][$_Field]){
                
                if($_Key == `key`){
                    tempKey = this.iData[$type][$_Field][$_Key].wzOut(this.iObjReplace);
                }else if($_Key == `value`){
                    tempValue = this.iData[$type][$_Field][$_Key].wzOut(this.iObjReplace);
                }else if($_Key == `args`){
                    tempArgs = this.iData[$type][$_Field][$_Key].wzOut(this.iObjReplace);
                }
            }
            tempDBR[$_Field] = tempKey;
            if(tempValue) {
                switch($type){
                    case `luaEvents`:
                        tempArgs = tempArgs || ``;
                        tempVar[`${tempKey}(${tempArgs})`] = tempValue;
                        break;
                    case `tags`:
                        tempVar[`${tempKey}`] = tempValue;
                        break;
                    default:
                        break;
                }
            }
        }
        
        switch($type){
            case `luaEvents`:
                this.aLuaFN = this.aLuaFN || {};
                Object.assign(this.aLuaFN,tempVar);
                break;
            case `tags`:
                this.aTags = this.aTags || {};
                Object.assign(this.aTags,tempVar);
                break;
            default:
                break;
        }
        return tempDBR;
    }
    
    saveItem($dataMisc){
        $dataMisc = $dataMisc || false;
        
        let saveDBR = false;
        // check if any changes have been made to the item \\
        // open file
        if(!this.prevFile){
            try{
                this.prevFile = new libWZ.GrimDawn.cData(this.filepath);
            }catch(err){
                this.prevFile = false;
            }
        }else{
            this.prevFile.reload();
        }
        
        this.prevFile.editDBR({"FileDescription":this.getData().FileDescription});
        
        // compare files // this.prevFile ||
        if(this.cParser.stringifyData(this.getData()) != this.cParser.stringifyData(this.prevFile.getData())){
            saveDBR = true;
            //console.log(JSON.stringify(this.getData()));
            //console.log(JSON.stringify(this.prevFile.getData()));
        }
        this.saveDataGD($dataMisc,saveDBR);
    }
    
};
