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
    
        this.aModuleClasses = [
            this.aSkills
        ];
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
        let skill = $dbr,temp,tempClass,
            buffTemplates = {
                'database/templates/skill_buffradiustoggled.tpl': true,
                'database/templates/skill_attackbuffradius.tpl': true,
                'database/templates/skillsecondary_buffradius.tpl': true,
                'database/templates/skillsecondary_petmodifier.tpl': true
            };
        
        temp = $dbr.getFieldValue(`buffSkillName`) || $dbr.getFieldValue(`petSkillName`);
        
        // check if the file linkes exists (if not it's most likely a core file)
        if(temp){
            try{
                fs.accessSync(`${this.fn.getPaths().Mod}/${temp}`); // check if file exists
            }catch(err){
                temp = false;
            }
        }
        
        if(temp){
            this.objSkillPaths[temp] = true;
            //tempClass = new libWZ.GrimDawn.cData(`${this.fn.getPaths().Mod}/${temp}`);
            tempClass = wzStorageGD.load(temp);
            this.aSkills.buff = this.aSkills.buff || [];
            //this.aSkills.buff.push($dbr);
            this.aSkills.buff.push($dbr.getFilePath().split(`/database/`)[1]); // temp
            //console.log($dbr.getFilePath().split(`/database/`)[1]);
            skill = this.loopBuff(tempClass);
            //skill = temp;
        }else if(buffTemplates[$dbr.getFieldValue(`templateName`)]){
            temp = $dbr.getFilePath().split(`/database/`)[1];
            //tempClass = wzStorageGD.load(temp);
            this.aSkills.buff = this.aSkills.buff || [];
            this.aSkills.buff.push(temp);
            skill = false;
        }else{
            this.aSkills.buff = this.aSkills.buff || false;
        }
    
        return skill;
    }
    
    iniSpawnObjects(){
        let tempSpawnObjects,tempLvL,
            aSkillLogic = wzStorageGD.__get(this.aSkills.logic);
        
        if(aSkillLogic){ //  && !this.aSkills.spawnObjects
            tempSpawnObjects = aSkillLogic.getFieldValue(`spawnObjects`);
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
                        //this.aSkills.spawnObjects[tempLvL] = new libWZ.GrimDawn.cData(`${this.fn.getPaths().Mod}/${tempSpawnObjects[$_Index]}`);
                    }catch (err){
                        console.log(`create file`);
                        let prevIndex = $_Index - 1;
                        this.aSkills.spawnObjects[tempLvL] = new libWZ.GrimDawn.cData(`${this.fn.getPaths().Mod}/${tempSpawnObjects[prevIndex]}`);
                        this.aSkills.spawnObjects[tempLvL].changeFilePath(`${this.fn.getPaths().Mod}/${tempSpawnObjects[$_Index]}`);
                        //this.aSkills.spawnObjects[tempLvL].editDBR({},true);
                        this.aSkills.spawnObjects[tempLvL].saveData(false,true);
                    }
                    this.aSkills.spawnObjects[tempLvL] = wzStorageGD.load(tempSpawnObjects[$_Index]);
                }
                //console.log(this.aSkills.spawnObjects);
            }
        }
    }
    
    iniSkill(){
        let tempClass,tempPath;
        tempClass = new libWZ.GrimDawn.cData(this.iFilePath);
        //this.aSkills.UI = tempClass;
        this.aSkills.UI = this.iFilePath.split(`/database/`)[1];
    
        if(tempClass.getFieldValue(`skillName`)){
            tempPath = `${this.fn.getPaths().Mod}/${tempClass.getFieldValue(`skillName`)}`;
            try{
                fs.accessSync(`${tempPath}`); // check if file exists
                if(!fs.lstatSync(tempPath).isDirectory()){
                    tempClass = this.loopBuff(wzStorageGD.load(tempClass.getFieldValue(`skillName`))); // new libWZ.GrimDawn.cData(tempPath)
                    this.objSkillPaths[tempPath.split(`/database/`)[1]] = true;
    
                    if(tempClass) tempClass = tempClass.getFilePath().split(`/database/`)[1];
                }
        
            }catch(err){
                tempClass = false;
            }
        }else{
            tempClass = false;
        }
        this.aSkills.logic = tempClass;
        //console.log(tempClass);
        /*
        if(this.aSkills.logic) {
            tempSpawnObjects = this.aSkills.logic.getFieldValue(`spawnObjects`);
            if (tempSpawnObjects) {
            
            }
        }
        */
    }
    /*
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
    */
    setUsage($bool){
        this.isUsed = $bool || false;
    }
    getCoordsStr(){
        //return this.aSkills.UI.getFieldValue(`bitmapPositionX`) + ',' + this.aSkills.UI.getFieldValue(`bitmapPositionY`);
        let tempClass = wzStorageGD.__get(this.aSkills.UI);
        
        return tempClass.getFieldValue(`bitmapPositionX`) + ',' + tempClass.getFieldValue(`bitmapPositionY`);
    }
    setSkillTag($field,$value){
        //this.aTags = this.aTags || {};
    
        //this.aTags[$field] = $value;
        
        //this.aSkills.logic.genTag($field,$value)
        wzStorageGD.__get(this.aSkills.logic).genTag($field,$value);
    }
    getSkillName(){
        let skillName = this.getField(`UI`,`FileDescription`) || `noName-ID: ${this.getSkillId()}`,tempName,
            aSkillLogic = wzStorageGD.__get(this.aSkills.logic);
        //if(this.aSkills.logic){
        if(aSkillLogic){
            tempName = this.iTags.getData()[aSkillLogic.getFieldValue(`skillDisplayName`)]; // this.aSkills.logic
            if(tempName){
                skillName = tempName;
            }
        }
        //console.log(this.iTags.getData()[this.aSkills.logic.getFieldValue(`skillDisplayName`)]);
        return skillName;
    }
    getSkillIcon(){
        //let imgPath = $modPath+'/'+this.aData.skillUpBitmapName.replace(/\.tex$/g,'.tga'),canvas = '';
        let aSkillLogic = wzStorageGD.__get(this.aSkills.logic),
            imgPath = (aSkillLogic && aSkillLogic.getFieldValue(`skillUpBitmapName`)) ? `${this.fn.getPaths().Source}/${aSkillLogic.getFieldValue(`skillUpBitmapName`).replace(/\.tex$/g,'.tga')}` : ``,
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
        let aSkillLogic = wzStorageGD.__get(this.aSkills.logic),
            aSkillBuff = (this.aSkills.buff) ? wzStorageGD.__get(this.aSkills.buff[0]) : false,
            logicRelFilePath = (aSkillBuff) ? aSkillBuff.getFilePath().split(`/database/`)[1] : ( (aSkillLogic) ? aSkillLogic.getFilePath().split(`/database/`)[1] : `` ),aPaths = {
            'relPath': this.iFilePath.split(`/database/`)[1].replace(`/${this.iFileName}`,``),
            'relFilePath': this.iFilePath.split(`/database/`)[1],
            'filePath': this.iFilePath,
            'fileName': this.iFileName,
            'logicRelFilePath': logicRelFilePath,
            'logicRelPath': logicRelFilePath.substring(0, logicRelFilePath.lastIndexOf("/"))
        };
        return aPaths;
    }
    
    setSkillTier(){
        if(this.aSkills.logic){
            let dataX = appData[`app-gd`].UI.SkillSlots.X, newTier;
            for(let $_Index in dataX){
                newTier = parseInt($_Index) + 1;
                if(parseInt(this.getField(`UI`,`bitmapPositionX`)) === dataX[$_Index] && newTier !== parseInt(this.getField(`logic`,`skillTier`))){
                    this.setField(`logic`,{
                        skillTier: newTier
                    })
                }
            }
        }
    }
    
    getField($type,$field){
        let aKeys = $type.split(`.`),
            tempArray = this.aSkills;
        
        for(let $_Index in aKeys){
            tempArray = tempArray[aKeys[$_Index]];
        }
        
        return (tempArray) ? wzStorageGD.__get(tempArray).getFieldValue($field) : ``;
    }
    setField($type,$opt,$dataMisc){
        let aKeys = $type.split(`.`),tempArray = this.aSkills;
    
        for(let $_Index in aKeys){
            tempArray = tempArray[aKeys[$_Index]];
        }
        
        if(tempArray) wzStorageGD.update(tempArray,$opt,$dataMisc,true);//.editDBR($opt,true);
    }
    getScalableFields(){
        let aSkillLogic = wzStorageGD.__get(this.aSkills.logic),
            retValue = false;
        if(aSkillLogic){
            retValue = aSkillLogic.getScalableFields();
        }
        return retValue;
    }
    editSkills($opt){
        let objChanges = {},tempFieldName,tempOpt = {},
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
        
        for(let $_fieldName in objChanges){
            tempOpt[objChanges[$_fieldName].type] = tempOpt[objChanges[$_fieldName].type] || {};
            tempOpt[objChanges[$_fieldName].type][$_fieldName] = objChanges[$_fieldName].value || ``;
        }
    
        for(let $_Type in tempOpt){
            this.setField($_Type,tempOpt[$_Type]);
        }
        
    }
    
};
