/**
 * Created by WareBare on 4/12/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    aData: {},
    //appConfig: new eConfig({name: `settings-app`}),
    //pathCore: libWZ.GrimDawn.tFn.getPaths().Core.replace(`database`,``),
    //pathMod: libWZ.GrimDawn.tFn.getPaths().Mod.replace(`database`,``),
    
    loader($relFilePath){
        //let wantedData = this.aData[$relFilePath];
        $relFilePath = $relFilePath.replace(/\\/g,`/`).toLowerCase().replace(`%template_dir%`,``);
        
        if(!this.aData[$relFilePath]){
            try{
                //console.log(`File: ${this.pathMod}${$relFilePath}`);
                this.aData[$relFilePath] = this.parseData(wzIO.file_get_contents(`${libWZ.GrimDawn.tFn.getPaths().Mod.replace(`database`,``)}${$relFilePath}`));
            }catch(err){
                try{
                    //console.log(`File: ${this.pathCore}${$relFilePath}`);
                    this.aData[$relFilePath] = this.parseData(wzIO.file_get_contents(`${libWZ.GrimDawn.tFn.getPaths().Core.replace(`database`,``)}${$relFilePath}`));
                }catch(err){
                    console.log(err);
                    wzNotify.err(`${$relFilePath}`,`Template Does Not Exist`);
                }
            }
        }
        //console.log(this.aData[$relFilePath]);
        //console.log(this.aData);
        return this.aData[$relFilePath] || {};
    },
    __get($relFilePath){
        return this.loader($relFilePath)[`All Groups`];
    },
    __getDBR($relFilePath){
        this.aDBR = this.aDBR || {};
        let data = this.loader($relFilePath)[`All Groups`];
            //dataDBR = this.convertToDBR(data);
        
        this.aDBR[$relFilePath] = this.aDBR[$relFilePath] || Object.assign({templateName: $relFilePath},this.convertToDBR(data));
        /*
        if(!this.aDBR[$relFilePath]){
            this.aDBR[$relFilePath] = {
                templateName: $relFilePath
            };
            Object.assign(this.aDBR[$relFilePath],this.convertToDBR(data));
        }
        */
        
        //dataDBR.templateName = $relFilePath;
        return this.aDBR[$relFilePath];
    },
    __getGroupFields($relFilePath,$groupNames){
        let data = this.loader($relFilePath)[`All Groups`],
            objNames = {},
            dataFields = {};
    
    
        for( let $_Index in $groupNames ){
            objNames[$groupNames[$_Index]] = true;
        }
        
        for(let $_Group in data){
            if(objNames[$_Group]){
                Object.assign(dataFields,this.convertToDBR(data[$_Group]))
            }
        }
        
        return dataFields;
    },
    convertToDBR($data){
        let dataDBR = {},ignoreKeys = {
            'Object Variable': true
        };
    
        for(let $_Key in $data){
            // wzSetArDef()
            if($data[$_Key].name){
                if(!ignoreKeys[$_Key]) dataDBR[$_Key] = $data[$_Key].defaultValue;
            }else{
                Object.assign(dataDBR,this.convertToDBR($data[$_Key]));
            }
        }
        //console.log(`convertToDBR`);
        return dataDBR;
    },
    
    parseData($fileContents){
        let parsedData,parsedContents;
        
        parsedContents = this.parseContents($fileContents);
        
        //parsedData = this.parseGroup(parsedContents);
        //console.info('Parsed a Template (Grim Dawn)');
        
        return parsedContents;
    },
    
    parseContents($fileContents){
        let aLines,tempContent,objData = {},objTempData,isGroup = false,tempObj,aTempGroup,tempGroupKeys = ``,tempData,tempName,tempKey,tempValue;
        
        aLines = $fileContents.split('\n');
        for( let $_Index in aLines ){
            //parsedContents.push(aLines[$_Index].trim());
            tempContent = aLines[$_Index].trim();
            if(tempContent === `}` && !isGroup){
    
                aTempGroup = tempGroupKeys.split(`::`);
                objTempData = objData;
                for(let i=0; i<aTempGroup.length - 1;i++){
                    objTempData[aTempGroup[i]] = objTempData[aTempGroup[i]] || {};
                    objTempData = objTempData[aTempGroup[i]];
                }
                objTempData[aTempGroup[aTempGroup.length - 1]] = objTempData[aTempGroup[aTempGroup.length - 1]] || {};
    
                if(tempName === `Include File`){
                    //console.log(`objData`);
                    //console.log(Object.values(objData).length);
                    //console.log(`tempObj`);
                    //console.log(this.loader(tempObj.defaultValue));
                    //Object.assign(objData, JSON.parse(JSON.stringify(this.loader(tempObj.defaultValue) )) ); // JSON.parse(JSON.stringify(this.loader(tempObj.defaultValue)))
                    //objData = JSON.parse(JSON.stringify(objData));
                    objData = wzSetArDef2( objData , JSON.parse(JSON.stringify(this.loader(tempObj.defaultValue) )));
                }else{
                    objTempData[aTempGroup[aTempGroup.length - 1]][tempName] = tempObj;
                }
                isGroup = true;
            }else if(tempContent === `}` && isGroup){
                tempGroupKeys = tempGroupKeys.substr(0, tempGroupKeys.lastIndexOf("::"));
                //console.log(tempGroupKeys);
            }
            if(tempContent !== `` && tempContent !== `{` && tempContent !== `}`) {
                //parsedContents.push(tempContent);
                if (tempContent === `Group`) {
                    isGroup = true;
                }else if(tempContent === `Variable`){
                    isGroup = false;
                    tempObj = {};
                }else if(tempContent.includes(`=`)){
                    tempData = tempContent.split(`=`);
                    tempKey = tempData[0].trim();
                    tempValue = tempData[1].trim().replace(/"/g,'');
                    
                    if(isGroup){
                        if(tempKey === `name`){
                            tempObj = objData;
                            if(tempGroupKeys !== ``) tempGroupKeys += `::`;
                            tempGroupKeys += tempValue;
                        }
                    }else{
                        if(tempKey === `name`){
                            tempName = tempValue;
                        }
                        tempObj[tempKey] = tempValue;
                    }
                }
                
            }
        }
        
        return objData;
    },
    
    hasField: function(InTemplatePath,InFieldName){
        let bHasField = false,
            mTemplateData = this.__getDBR(InTemplatePath);
        
        if(mTemplateData[InFieldName] || mTemplateData[InFieldName] === ``) bHasField = true;
        
        return bHasField;
    }
    
};
