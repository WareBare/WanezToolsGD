/**
 * Created by WareBare on 3/26/2017.
 */

module.exports = class mSkill extends libWZ.GrimDawn.cModule{
    
    constructor($fileName,$filePath,$tags){
        super();
        
        this.iFileName = $fileName;
        this.iFilePath = $filePath;
        this.iTags = $tags;
        
        
        // UI, logic, buff
        this.aSkills = {};
        this.objSkillPaths = {};
    
        this.skillId = false; // tool reference to the skills array position
        
        /*
        this.isUsed = false;
        this.bitmapPositionX = 0;
        this.bitmapPositionY = 0;
        this.skillTier = 0;
        this.skillMaxLevel = 1;
        this.skillUltimateLevel = 2;
        this.skillMasteryLevelRequired = 1;
        */
        //
        this.iniSkill();
    
        this.aModuleData = [
            //this.aUI,
            this.aSkills
        ];
    }
    
    reloadSkills(){
        this.aSkills = {};
        this.iniSkill();
    }
    
    /**
     */
    removeConnector(){
        this.setField(`logic`,{
            'skillConnectionOff': ``,
            'skillConnectionOn': ``
        });
    }
    
    /**
     * 1. calculate difference between skill slots
     * 2. get length of current connector array
     * 3. subtract the current length from the length of the ones added
     * 4. add remaining connectors to the array
     *
     * @param $connectSkill
     */
    setConnector($connectSkill,$type){
        let aCoordsThis = this.getCoordsStr().split(`,`),slotDif,arrayDif,isType = `modifier`,conIndex,
            aCoordsConnect = $connectSkill.getCoordsStr().split(`,`),
            aConnectors = this.getField(`logic`,`skillConnectionOn`) || [],
            aConnectorsOff = [],
            connectorLength = (aConnectors) ? ( (Array.isArray(aConnectors)) ? aConnectors.length : 1 ) : 0, // get length of current connector array
            aTempConnectors = [],
            objConnectorToPng = {
                'branchboth': `ui/skills/skillallocation/skills_connectoronbranchboth.tex`,
                'branchdown': `ui/skills/skillallocation/skills_connectoronbranchdown.tex`,
                'branchup': `ui/skills/skillallocation/skills_connectoronbranchup.tex`,
                'center': `ui/skills/skillallocation/skills_connectoroncenter.tex`,
                'transmuterdown': `ui/skills/skillallocation/skills_connectorontransmuterdown.tex`,
                'transmuterup': `ui/skills/skillallocation/skills_connectorontransmuterup.tex`,
                'zenithBottomDown': `ui/skills/skill_down_on.tex`,
                'zenithBottomUp': `ui/skills/skill_up_on.tex`,
                'zenithBottom': `ui/skills/skill_bottom_on.tex`
            },
            objConnectorZenith = {
                'ZenithDown': [objConnectorToPng.zenithBottomDown,objConnectorToPng.zenithBottom,objConnectorToPng.zenithBottomUp]
            },
            objConnectorPng = {
                'ui/skills/skillallocation/skills_connectoroncenter.tex' : {
                    'up': objConnectorToPng.branchup,
                    'down': objConnectorToPng.branchdown
                },
                'ui/skills/skillallocation/skills_connectoronbranchdown.tex': {
                    'up': objConnectorToPng.branchboth
                },
                'ui/skills/skillallocation/skills_connectoronbranchup.tex': {
                    'down': objConnectorToPng.branchboth
                },
                'ui/skills/skillallocation/skills_connectorontransmuterdown.tex': {
                    'modifier': objConnectorToPng.branchdown
                },
                'ui/skills/skillallocation/skills_connectorontransmuterup.tex': {
                    'modifier': objConnectorToPng.branchup
                }
            };
    
        aConnectors = (Array.isArray(aConnectors)) ? aConnectors : [aConnectors];
        
        // calculate difference between skill slots
        //console.log(`X: ${aCoordsThis[0]} - ${aCoordsConnect[0]} | Y: ${aCoordsThis[1]} - ${aCoordsConnect[1]}`);
        if($type === `Default`){
            if(parseInt(aCoordsThis[1]) < parseInt(aCoordsConnect[1])){
                isType = `down`;
            }else if(parseInt(aCoordsThis[1]) > parseInt(aCoordsConnect[1])){
                //console.log(`is up`);
                isType = `up`;
            }
            console.log(isType);
            slotDif = (aCoordsConnect[0] - aCoordsThis[0]) / 80;
            arrayDif = slotDif - connectorLength;
            //console.log(aConnectors);
            if(isType === `modifier`){
                if(arrayDif < 0){
                    aConnectors.splice(aConnectors.length + arrayDif,arrayDif * -1);
                    //aConnectorsOff.splice(aConnectorsOff.length + arrayDif,arrayDif * -1);
                }else{
            
                    if(aConnectors.length >= 1){
                        for(let $_Index in aConnectors){
                            if(objConnectorPng[aConnectors[$_Index]].modifier){
                                aConnectors[$_Index] = objConnectorPng[aConnectors[$_Index]].modifier;
                            }
                        }
                    }
            
                }
                if(arrayDif > 0){
                    console.log(`do sth`);
                    for(let i=0; arrayDif > i; i++){
                        //console.log(`do sth`);
                        aConnectors.push(objConnectorToPng.center);
                        //aConnectors = [objConnectorToPng.center];
                    }
                }
            }else{
                if(arrayDif > 0){
                    aConnectors.push(objConnectorToPng[`transmuter${isType}`]);
                }else{
                    conIndex = slotDif - 1;
                    console.log(conIndex);
                    if(objConnectorPng[aConnectors[conIndex]][isType]){
                        aConnectors[conIndex] = objConnectorPng[aConnectors[conIndex]][isType];
                        //console.log(objConnectorPng[aConnectors[conIndex]][isType]);
                    }
                }
            }
    
            //console.log(aConnectors);
            for(let $_Index in aConnectors){
                aConnectorsOff[$_Index] = aConnectors[$_Index].replace(`connectoron`,`connectoroff`);
            }
        }else if($type === `ZenithDown` || $type === `ZenithUp`){
            let tempSlot = 0;
            slotDif = (aCoordsConnect[0] - aCoordsThis[0]) / 80;
            //arrayDif = slotDif - connectorLength;
            aConnectors[0] = objConnectorZenith[$type][0];
            for(let i=1; i<slotDif; i++){
                aConnectors[i] = objConnectorZenith[$type][1];
                tempSlot = i;
            }
            aConnectors[tempSlot] = objConnectorZenith[$type][2];
            //console.log(slotDif);
            for(let $_Index in aConnectors){
                aConnectorsOff[$_Index] = aConnectors[$_Index].replace(`_on`,`_off`);
            }
        }
        
        //console.log(`Slot: ${slotDif} | Array: ${arrayDif}`);
        //console.log(aConnectorsOff);
    
        this.setField(`logic`,{
            'skillConnectionOff': aConnectorsOff,
            'skillConnectionOn': aConnectors
        });
    }
    
    loopBuff($dbr){
        let skill = $dbr,temp,tempClass;
        
        temp = $dbr.getFieldValue(`buffSkillName`) || $dbr.getFieldValue(`petSkillName`);
        if(temp){
            this.objSkillPaths[temp] = true;
            tempClass = new libWZ.GrimDawn.cData(`${this.fn.getPaths().Mod}/${temp}`);
            this.aSkills.buff = this.aSkills.buff || [];
            this.aSkills.buff.push($dbr);
            //console.log($dbr);
            skill = this.loopBuff(tempClass);
        }else{
            this.aSkills.buff = this.aSkills.buff || false;
        }
        
        return skill;
    }
    
    iniSpawnObjects(){
        let tempSpawnObjects,tempLvL;
        
        if(this.aSkills.logic){ //  && !this.aSkills.spawnObjects
            tempSpawnObjects = this.aSkills.logic.getFieldValue(`spawnObjects`);
            if(tempSpawnObjects){
                tempSpawnObjects = (Array.isArray(tempSpawnObjects)) ? tempSpawnObjects : [tempSpawnObjects];
                this.aSkills.spawnObjects = [];
                for(let $_Index in tempSpawnObjects){
                    this.objSkillPaths[tempSpawnObjects[$_Index]] = true;
                    tempLvL = parseInt($_Index) + 1;
                    // todo check if file exists and create if not
                    try{
                        //console.log(`${this.fn.getPaths().Mod}/${tempSpawnObjects[$_Index]}`);
                        fs.accessSync(`${this.fn.getPaths().Mod}/${tempSpawnObjects[$_Index]}`); // check if file exists
                        this.aSkills.spawnObjects[tempLvL] = new libWZ.GrimDawn.cData(`${this.fn.getPaths().Mod}/${tempSpawnObjects[$_Index]}`);
                    }catch (err){
                        console.log(`create file`);
                        let prevIndex = $_Index - 1;
                        this.aSkills.spawnObjects[tempLvL] = new libWZ.GrimDawn.cData(`${this.fn.getPaths().Mod}/${tempSpawnObjects[prevIndex]}`);
                        this.aSkills.spawnObjects[tempLvL].changeFilePath(`${this.fn.getPaths().Mod}/${tempSpawnObjects[$_Index]}`);
                        //this.aSkills.spawnObjects[tempLvL].editDBR({},true);
                        this.aSkills.spawnObjects[tempLvL].saveData(false,true);
                    }
                }
                //console.log(this.aSkills.spawnObjects);
            }
        }
    }
    
    iniSkill(){
        let tempClass,tempPath;
        tempClass = new libWZ.GrimDawn.cData(this.iFilePath);
        //this.bitmapPositionX = tempClass.getFieldValue(`bitmapPositionX`);
        //this.bitmapPositionY = tempClass.getFieldValue(`bitmapPositionY`);
        //if(this.bitmapPositionX && this.bitmapPositionY) this.isUsed = true;
        this.aSkills.UI = tempClass;
        tempPath = `${this.fn.getPaths().Mod}/${tempClass.getFieldValue(`skillName`)}`;
        try{
            fs.accessSync(`${tempPath}`); // check if file exists
    
            tempClass = this.loopBuff(new libWZ.GrimDawn.cData(tempPath));
            this.objSkillPaths[tempPath.split(`/database/`)[1]] = true;
        }catch(err){
            tempClass = false;
        }
        
        this.aSkills.logic = tempClass;
    
        /*
        if(this.aSkills.logic) {
            tempSpawnObjects = this.aSkills.logic.getFieldValue(`spawnObjects`);
            if (tempSpawnObjects) {
            
            }
        }
        */
    }
    
    generateForm($aSkillFiles){
        let out_ = ``,items = {UI:``,logic:``,tag:``},tempId,tempListItems,
            aSkillFiles = $aSkillFiles,
            data = {
                FileDescription: [`UI`,`Text`],
                isCircular: [`UI`,`Boolean`],
                skillName: [`UI`,`DataSkills`],
                
                skillMasteryLevelRequired: [`logic`,`Number`],
                skillMaxLevel: [`logic`,`Number`],
                skillUltimateLevel: [`logic`,`Number`],
                skillDisplayName: [`logic`,`TextLong`],
                skillBaseDescription: [`logic`,`TextLong`],
    
                skillDownBitmapName: [`logic`,`TextLongX`],
                skillUpBitmapName: [`logic`,`TextLongX`]
            },
            dataLists = {},
            parsedData = {
                DataSkills: (this.getField(`UI`,`skillName`)) ? this.getField(`UI`,`skillName`).replace(/^.*[\\\/]/, '').replace(`.dbr`,``) : ``
            },
            tpl = {
                DataListItem: `<li>{VALUE}</li>`,
                DataList: `<ul>{ITEMS}</ul>`,
                Frame: `{INFO} <form onsubmit="return false;"><fieldset><legend>{SKILL_NAME}</legend>{ITEMS}</fieldset></form>`,
                Text: `<label><span>{FIELD}</span><input type="text" value="{VALUE}" onchange="_cms.editSkillOnBlur(event,this,'{FIELD}','{TYPE}');" onkeydown="_cms.editSkillOnEnter(event);" /></label>`,
                TextLong: `<label><span>{FIELD}</span><input type="text" wzType="TextLong" value="{VALUE}" onchange="_cms.editSkillOnBlur(event,this,'{FIELD}','{TYPE}');" onkeydown="_cms.editSkillOnEnter(event);" /></label>`,
                TextLongX: `<label><span>{FIELD}</span><input type="text" wzType="TextLong" value="{VALUE}" onchange="_cms.editSkillOnBlur(event,this,'{FIELD}','{TYPE}');" onkeydown="_cms.editSkillOnEnter(event);" /></label>`,
                Number: `<label><span>{FIELD}</span><input type="number" value="{VALUE}" onchange="_cms.editSkillOnBlur(event,this,'{FIELD}','{TYPE}');" onkeydown="_cms.editSkillOnEnter(event);" /></label>`,
                Boolean: `<label><span>{FIELD}</span><select onchange="_cms.editSkillOnBlur(event,this,'{FIELD}','{TYPE}');"><option value="0"{SELECTED_FALSE}>False<option value="1"{SELECTED_TRUE}>True</select></label>`,
                TextLarge: `<label><span>{FIELD}</span><textarea wzType="ListArea" onchange="_cms.editSkillOnBlur(event,this,'{FIELD}','{TYPE}');" onkeydown="_cms.editSkillOnEnter(event);">{VALUE}</textarea></label>`,
                Items: `<fieldset><legend>{TYPE}</legend>{ITEMS}</fieldset>`,
                // Data
                DataSkills: `<label><span>{FIELD}</span><input type="text" wzType="TextLong" value="{VALUE}" oninput="_cms.dataSkillsAutoComplete(event,this);" onchange="_cms.editSkillOnBlur(event,this,'{FIELD}','{TYPE}',true);" onkeydown="_cms.editSkillOnEnter(event);" /><ul id="dataSkillsList"></ul></label>` //
            };
        
        data[this.getField(`logic`,`skillDisplayName`)] = [`tag`,`TextLong`];
        data[this.getField(`logic`,`skillBaseDescription`)] = [`tag`,`TextLarge`];
        
        /*
         <datalist id="DataSkills">
             <option value="HTML">
             <option value="CSS">
             <option value="JavaScript">
             <option value="Java">
             <option value="Ruby">
             <option value="PHP">
             <option value="Go">
             <option value="Erlang">
             <option value="Python">
             <option value="C">
             <option value="C#">
             <option value="C++">
         </datalist>
         */
        tempListItems = ``;
        for(let $_FileName in aSkillFiles){
            tempListItems += tpl.DataListItem.wzOut({
                VALUE: $_FileName//aSkillFiles[$_FileName].split(`/database/`)[1]
            });
            //console.log($_FileName);
        }
        dataLists.DataSkills = tpl.DataList.wzOut({
            ITEMS: tempListItems
        });
        
        for(let $_Field in data){
            if(items[data[$_Field][0]] !== ``) items[data[$_Field][0]] += `<br />`;
            if(data[$_Field][0] === `tag`){
                items[data[$_Field][0]] += tpl[data[$_Field][1]].wzOut({
                    FIELD: $_Field,
                    VALUE: this.iTags.getData()[$_Field],
                    TYPE: data[$_Field][0]
                });
            }else{
                items[data[$_Field][0]] += tpl[data[$_Field][1]].wzOut({
                    FIELD: $_Field,
                    VALUE: parsedData[data[$_Field][1]] || this.getField(data[$_Field][0],$_Field),
                    TYPE: data[$_Field][0],
                    SELECTED_FALSE: (parseInt(this.getField(data[$_Field][0],$_Field)) === 0) ? ` selected` : ``,
                    SELECTED_TRUE: (parseInt(this.getField(data[$_Field][0],$_Field)) === 1) ? ` selected` : ``,
                    DATA_LIST: dataLists[data[$_Field][1]] || ``,
                    DATA: aSkillFiles
                });
            }
            
        }
        
        out_ = tpl.Frame.wzOut({
            INFO: `Data is saved automatically (when you use enter/tab or click on another field), changes happen in real-time.<br />Changing the skillName will return you to the UI, because the data needs to be parsed again.`,
            SKILL_NAME: this.getSkillName(),
            ITEMS: tpl.Items.wzOut({
                TYPE: `UI`,
                ITEMS: items.UI
            }) + tpl.Items.wzOut({
                TYPE: `Skill`,
                ITEMS: items.logic
            }) + tpl.Items.wzOut({
                TYPE: `Tags`,
                ITEMS: items.tag
            })
        });
        
        return out_;
    }
    
    setUsage($bool){
        this.isUsed = $bool || false;
    }
    getCoordsStr(){
        return this.aSkills.UI.getFieldValue(`bitmapPositionX`) + ',' + this.aSkills.UI.getFieldValue(`bitmapPositionY`);
    }
    setSkillTag($field,$value){
        //this.aTags = this.aTags || {};
    
        //this.aTags[$field] = $value;
        this.aSkills.logic.genTag($field,$value)
    }
    getSkillName(){
        let skillName = this.getField(`UI`,`FileDescription`) || `noName-ID: ${this.getSkillId()}`,tempName;
        if(this.aSkills.logic){
            tempName = this.iTags.getData()[this.aSkills.logic.getFieldValue(`skillDisplayName`)];
            if(tempName){
                skillName = tempName;
            }
        }
        //console.log(this.iTags.getData()[this.aSkills.logic.getFieldValue(`skillDisplayName`)]);
        return skillName;
    }
    getSkillIcon(){
        //let imgPath = $modPath+'/'+this.aData.skillUpBitmapName.replace(/\.tex$/g,'.tga'),canvas = '';
        let imgPath = (this.aSkills.logic && this.aSkills.logic.getFieldValue(`skillUpBitmapName`)) ? `${this.fn.getPaths().Source}/${this.aSkills.logic.getFieldValue(`skillUpBitmapName`).replace(/\.tex$/g,'.tga')}` : ``,
            canvas = '';
        //console.log(this.aSkills.logic);
        
        try{
            fs.accessSync(imgPath, fs.F_OK); // check if file exists
            let tga = new TGA();
            tga.load(new Uint8Array(fs.readFileSync(imgPath)));
            
            
            canvas = tga;
        }catch(err){
        
        }
        return canvas;
    }
    setSkillId($id){
        this.skillId = $id || false;
    }
    getSkillId(){
        return this.skillId;
    }
    getSkillPaths(){
        let logicRelFilePath = (this.aSkills.buff) ? this.aSkills.buff[0].getFilePath().split(`/database/`)[1] : ( (this.aSkills.logic) ? this.aSkills.logic.getFilePath().split(`/database/`)[1] : `` ),aPaths = {
            'relPath': this.iFilePath.split(`/database/`)[1].replace(`/${this.iFileName}`,``),
            'relFilePath': this.iFilePath.split(`/database/`)[1],
            'filePath': this.iFilePath,
            'fileName': this.iFileName,
            'logicRelFilePath': logicRelFilePath,
            'logicRelPath': logicRelFilePath.substring(0, logicRelFilePath.lastIndexOf("/"))
        };
        return aPaths;
    }
    
    getField($type,$field){
        let aKeys = $type.split(`.`),tempArray = this.aSkills;
        
        for(let $_Index in aKeys){
            tempArray = tempArray[aKeys[$_Index]];
        }
        
        return (tempArray) ? tempArray.getFieldValue($field) : ``;
    }
    setField($type,$opt){
        let aKeys = $type.split(`.`),tempArray = this.aSkills;
    
        for(let $_Index in aKeys){
            tempArray = tempArray[aKeys[$_Index]];
        }
        
        if(tempArray) tempArray.editDBR($opt,true);
    }
    editSkills($opt){
        let objChanges = {},tempFieldName,tempOpt,
            objFields = {
            'UI':[`bitmapPositionX`,`bitmapPositionY`],
            'logic':[`skillTier`,`skillMaxLevel`,`skillUltimateLevel`,`skillMasteryLevelRequired`]
        };
        
        for(let $_Type in objFields){
            for(let $_Index in objFields[$_Type]){
                tempFieldName = objFields[$_Type][$_Index];
                objChanges[tempFieldName] = {
                    'type': $_Type,
                    'value': $opt[tempFieldName] || this.getField($_Type,tempFieldName) || ``
                }
            }
        }
        
        //$opt = wzSetArDef($opt,objDefaults);
        
        //console.log(objChanges);
        
        for(let $_fieldName in objChanges){
            tempOpt = {};
            tempOpt[$_fieldName] = objChanges[$_fieldName].value || ``;
            this.setField(objChanges[$_fieldName].type,tempOpt);
        }
        
    }
    
};
