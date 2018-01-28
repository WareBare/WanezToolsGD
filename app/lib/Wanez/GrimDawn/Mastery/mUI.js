/**
 * Created by WareBare on 3/26/2017.
 */

module.exports = class mUI extends libWZ.GrimDawn.cModule{
    
    constructor($dir,$path,$aGenderPC01,$tags,$currentSkill,$objBackups){
        super();
        
        this.SkillsConfig = new eConfig({name: `gd-skills`});
        this.SkillsToLink = this.SkillsConfig.get(`linkedSkills`);
        //console.log(`${$path}/${$dir}`);
        this.iDir = $dir;
        this.iPath = $path;
        this.iGenderPC01 = $aGenderPC01;
        this.iTags = $tags;
        this.iCurrentSkill = $currentSkill;
        this.iBackups = $objBackups;
        this.mBonusCoords = {
            360: {
                20: true,
                75: true,
                130: true,
                185: true
            }//[`5`,`85`,`165`]
        };
        this.mBonusCoords_old = {
            '165,360': [165, 360]
        };
        
        this.aSkills = [];
        this.aSkillFiles = false;
        this.objSkillPaths = {};
        this.aGroups = false;
        this.objSkills = {};
        this.objMiscUI = {};
        this.objMisc = {};
        
        this.uiInfo = `Drag Skill into the slot where you want to move them, moving skills into the container ↑ will make them "unused" and remove them from /classtable.dbr and skilltree after pressing the "Save DBR" button.`;
        this.tpl = {
            "Main": `<div id="appGD_UI">{SKILL_WINDOW}</div>`, // <canvas id="canvas" width="400" height="400">No canvas support</canvas>
            "SkillWindow": "<div class='skillWindow'><div class='skillConnectors'>{SKILL_CONNECTORS}</div><div class='skillConnectors skillConnectors2'>{SKILL_CONNECTORS2}</div><div class='skillPositions'>{SKILL_POSITIONS}</div><div class='skillLeftPane'><div class='skillPicker'>{SKILL_PICKER}</div><div class='skillBonusLeft'>{SKILL_BONUS_LEFT}</div></div></div><img src='img/skills_classbackgroundimage.png' />", // target | skills_classbackgroundimage
            "SkillPicker": `<div ondrop="_cms.skillDropUnused(event)" ondragover="_cms.skillAllowDrop(event)">{UNUSED}</div><div id="uiBackUps">{BACKUPS}</div>`, //{USED}
            //"SkillBTN": "<div wz-mode='{MODE}' class='skillCell'>{ICON}<wztip>{INFO}</wztip></div>"
            "SkillBTN": `<div wz-mode="{MODE}" id="btn_{COORDS}" ondrop="_cms.skillDrop(event)" ondragover="_cms.skillAllowDrop(event)" ondragstart="_cms.skillDrag(event)" draggable="true" wz-coords="{COORDS}" wz-id="{ID}" wz-tier="{TIER}" class="skillCell{CLASS_CIRCULAR}" onclick="_cms.setSkill({ID});" ondblclick="_cms.Base.goToEditSkill();" oncontextmenu="_cms.setSkill({ID});_cms.Base.goToEditSkill();"><span>{ICON}</span>{INFO}</div>`, // <wztip>{INFO}</wztip> |  ondblclick="_cms.setSkillConnector({ID});"
            SkillToolTip: `<wztip><h1>{SKILL_NAME}</h1>{COORDS_X}, {COORDS_Y}<br />isCircular: {IS_CIRCULAR}<br />Has Connector: {HAS_CONNECTOR}<br />Tier: {TIER}<br />Ranks: {RANK_MAX} / {RANK_ULTIMATE}</wztip>`,
            "Connector": "<img wz-mode='{MODE}' src='{IMG}' alt='!' />",
            "SkillSlots": this.appData.tpl_gd.UI.SkillSlots,
            "SkillSlotsDif": this.appData.tpl_gd.UI.SkillSlotsDif
        };
        
        this.masteryEnum = false;
        this.usedSkills = false;
        
        // get all ui skills (this is an array with instances for skills [mSkill]
        this.iniUI();
        
        //console.log(this.masteryEnum);
        
        this.aModuleData = [
            this.aSkills,
            this.objMiscUI,
            this.objMisc
        ];
        
    }
    
    iniUI(){
    
        this.aSkills = [];
        this.aSkillFiles = false;
        this.aGroups = false;
        this.objSkills = {};
        this.objMiscUI = {};
        this.objMisc = {};
        this.usedSkills = false;
        
        this.getSkills();
    }
    
    /**
     * masteryTable (Enum)
     * xpc01 (use Enum)
     * skilltree
     * tempPath.replace(/^.*[\\\/]/,``).replace(`.dbr`,``)
     */
    getSkills(){
        let aFiles = wzIO.dir_get_contentsSync(`${this.fn.getPaths().Mod}/${this.iPath}/${this.iDir}`,true),tempPath,
            tempClass,tempArray,
            aIgnoreFiles = {'classimage.dbr':true,'classpanelbackgroundimage.dbr':true,'classpanelreallocationimage.dbr':true,'classtable.dbr':true,'classtraining.dbr':true,'classtrainingbar.dbr':true};
        
        for(let $_FileName in aFiles){
            if(!aIgnoreFiles[$_FileName]){
                tempClass = new libWZ.GrimDawn.Mastery.mSkill($_FileName,aFiles[$_FileName],this.iTags);
                this.objSkills[tempClass.getCoordsStr()] = tempClass; // $_FileName.replace(`.dbr`,``)
                this.aSkills.push(tempClass);
                Object.assign(this.objSkillPaths,tempClass.objSkillPaths);
            }else{
                this.objMiscUI[$_FileName.replace(`.dbr`,``)] = new libWZ.GrimDawn.cData(aFiles[$_FileName]);
            }
        }
        tempClass = new libWZ.GrimDawn.cData(`${this.fn.getPaths().Mod}/${this.objMiscUI.classtraining.getFieldValue(`skillName`)}`);
        this.objMisc.masteryTable = tempClass;
        //tempEnum = tempClass.getFieldValue(`MasteryEnumeration`).replace(`SkillClass`,`skillTree`);
        this.masteryEnum = parseInt(tempClass.getFieldValue(`MasteryEnumeration`).replace(`SkillClass`,``));
        this.objMisc.femalepc01 = this.iGenderPC01[0];
        this.objMisc.malepc01 = this.iGenderPC01[1];
        //console.log(this.masteryEnum);
        //console.log(`${this.fn.getPaths().Mod}/${this.iGenderPC01[0].getFieldValue(`skillTree${this.masteryEnum}`)}`);
        tempClass = new libWZ.GrimDawn.cData(`${this.fn.getPaths().Mod}/${this.iGenderPC01[0].getFieldValue(`skillTree${this.masteryEnum}`)}`);
        //console.log(tempClass);
        this.objMisc.skillTree = tempClass;
        
        // set usage
        /*
        tempArray = this.objMiscUI.classtable.getFieldValue(`tabSkillButtons`);
        for(let $_Coords in tempArray){
        
        }
        */
    }
    
    createSkillUI(){
        let newClass = new libWZ.GrimDawn.cData();
        
        newClass.changeFilePath(`${this.fn.getPaths().Mod}/${this.iPath}/${this.iDir}/skill${(`0${this.aSkills.length + 1}`).slice(-2)}.dbr`);
        newClass.fetchTemplate(`database/templates/ingameui/skillbutton.tpl`);
        newClass.editDBR({
            FileDescription: `${(`0${this.aSkills.length + 1}`).slice(-2)}`,
            bitmapNameDown: `ui/skills/skillallocation/skills_buttonborderdown01.tex`,
            bitmapNameInFocus: `ui/skills/skillallocation/skills_buttonborderover01.tex`,
            bitmapNameUp: `ui/skills/skillallocation/skills_buttonborder01.tex`,
            bitmapPositionX: `0`,
            bitmapPositionY: `0`,
            isCircular: `0`,
            //skillName: `0`,
            skillOffsetX: `4`,
            skillOffsetY: `4`,
            soundNameDown: `records/sounds/ui/spak_buttonskillincrement.dbr`
        });
        
        newClass.saveDBR();
    }
    
    getBackupData(){
        let objData = {},tempSkill;
        
        for(let $_ID in this.aSkills){
            tempSkill = this.aSkills[$_ID];
            objData[tempSkill.getSkillPaths().fileName] = {
                UI: {
                    bitmapPositionX: tempSkill.getField(`UI`,`bitmapPositionX`) || `0`,
                    bitmapPositionY: tempSkill.getField(`UI`,`bitmapPositionY`) || `0`
                },
                logic: {
                    skillTier: tempSkill.getField(`logic`,`skillTier`),
                    skillConnectionOff: tempSkill.getField(`logic`,`skillConnectionOff`) || ``,
                    skillConnectionOn: tempSkill.getField(`logic`,`skillConnectionOn`) || ``
                }
            }
        }
        
        return objData;
    }
    
    genBackupsList($aBackups){
        let out_ = ``,items_ = ``,aBackups = $aBackups || ((this.iBackups) ? this.iBackups : false),
            tpl = {
                Frame: `<ul>{ITEMS}</ul>`,
                Item: `<li onclick="_cms.loadBackup({ID})" oncontextmenu="_cms.contextmenuBackupListItem(this,{ID});">{TIMESTAMP}</li>`
            };
    
        if(aBackups){
            for(let $_Index in aBackups){
                items_ = tpl.Item.wzOut({
                    ID: $_Index,
                    TIMESTAMP: aBackups[$_Index].TimeStamp
                }) + items_;
            }
            out_ = tpl.Frame.wzOut({
                ITEMS: items_
            });
        }else{
            out_ = this.uiInfo;
        }
        
        
        return out_;
    }
    
    useBackupData($data){
        let tempFileName,tempSkill,tempObj;
        //console.log($data);
        for(let $_ID in this.aSkills){
            tempSkill = this.aSkills[$_ID];
            tempFileName = tempSkill.getSkillPaths().fileName;
            //console.log(tempSkill);
            //console.log($data[tempFileName]);
            //tempSkill.editSkills($data[tempFileName]);
            
            for(let $_Type in $data[tempFileName]){
                for(let $_FieldName in $data[tempFileName][$_Type]){
                    tempObj = {};
                    if( tempSkill.getField($_Type,$_FieldName).toString() !== $data[tempFileName][$_Type][$_FieldName].toString()) {
                        //console.log(`#01: ${tempSkill.getField($_Type,$_FieldName)}`);
                        //console.log(`#02: ${$data[tempFileName][$_Type][$_FieldName]}`);
                        tempObj[$_FieldName] = $data[tempFileName][$_Type][$_FieldName];
                    }
                    tempSkill.setField($_Type,tempObj);
                }
            }
            
            //setTimeout(() => {
                tempSkill.saveModule();
            //},10)
        }
        
    }
    
    // $aConnector,$coordKey,$aSkills - InConnectorsArray,InCoordsKey,InSkillsArray
    checkConnectorGroup($aConnector,$coordKey,$aSkills){ // aConnector[$_Index][1],$_CoordKey,aSkills
        
        let tempCoords, currentCoords,isGroup = false,
            objChecks = {
                transmuterUp: {
                    'img/skills_connectoronbranchup.png': true,
                    'img/skills_connectoronbranchboth.png': true,
                    'img/skills_connectorontransmuterup.png': true,
                    'img/skills_connectorontransmuterboth.png': true,
                    test: true
                },
                transmuterDown: {
                    'img/skills_connectoronbranchdown.png': true,
                    'img/skills_connectoronbranchboth.png': true,
                    'img/skills_connectorontransmuterdown.png': true,
                    'img/skills_connectorontransmuterboth.png': true,
                    'img/skill_down_on.png': true,
                    'img/skill_bottom_on.png': true,
                    test: false
                },
                modifier: {
                    'img/skills_connectoroncenter.png': true,
                    'img/skills_connectoronbranchup.png': true,
                    'img/skills_connectoronbranchdown.png': true,
                    'img/skills_connectoronbranchboth.png': true,
                    'img/skill_down_on.png': false,
                    'img/skill_bottom_on.png': false,
                    'img/skill_up_on.png': true
                }
            };
    
        tempCoords = $coordKey.split(`,`);
        for(let $_Type in objChecks){
            
            
            if(typeof objChecks[$_Type][$aConnector[$coordKey]] !== `undefined`){ //
                if($_Type === `modifier`) currentCoords = `${parseInt(tempCoords[0]) + 80},${tempCoords[1]}`;
                if($_Type === `transmuterUp`) {
                    currentCoords = `${parseInt(tempCoords[0]) + 80},${parseInt(tempCoords[1]) - 38}`;
                    if($aSkills[currentCoords] && $aSkills[currentCoords].mSkill){
                    
                    }else{
                        currentCoords = `${parseInt(tempCoords[0]) + 80},${parseInt(tempCoords[1]) - 32}`;
                    }
                }
                if($_Type === `transmuterDown`) {
                    currentCoords = `${parseInt(tempCoords[0]) + 80},${parseInt(tempCoords[1]) + 32}`;
                    if($aSkills[currentCoords] && $aSkills[currentCoords].mSkill){
                    
                    }else{
                        currentCoords = `${parseInt(tempCoords[0]) + 80},${parseInt(tempCoords[1]) + 38}`;
                    }
                }
                if($aSkills[currentCoords] && $aSkills[currentCoords].mSkill){
                    if(objChecks[$_Type][$aConnector[$coordKey]]) {
                        isGroup = [true, currentCoords];
                    }else if(objChecks[$_Type][$aConnector[$coordKey]] === false){
                        isGroup = [false, currentCoords];
                    }
                }
            }
        }
        
        return isGroup;
    }
    
    genLayout(){
        let aSkills = {},unusedSkills = [],tempTier,tempCoords,aConnector = [];
        
        // generate Layout
        for( let $_Line in this.tpl.SkillSlots.Y ){
            for( let $_Tier in this.tpl.SkillSlots.X ){
                tempTier = parseInt($_Tier) + 1;
                tempCoords = this.tpl.SkillSlots.X[$_Tier] + ',' + this.tpl.SkillSlots.Y[$_Line];
                aSkills[tempCoords] = {
                    "isUsed": false,
                    "Tier": tempTier,
                    "Line": $_Line,
                    "Connected": false,
                    "hasConnector": false,
                    "isCircular": false,
                    "Parent": false
                }
            }
        }
        // todo DEV
        if(app.getName() === `Electron`){
            let mBonusCoords = this.mBonusCoords, iCounter = 50;
            for(let kY in mBonusCoords){
                for(let kX in mBonusCoords[kY]){
            
                    aSkills[`${kX},${kY}`] = {
                        "isUsed": false,
                        "Tier": 9,
                        "Line": iCounter,
                        "Connected": false,
                        "hasConnector": false,
                        "isCircular": false,
                        "Parent": false
                    };
                }
                iCounter++;
            }
        }
        
        for(let $_SkillID in this.aSkills){
            tempCoords = this.aSkills[$_SkillID].getCoordsStr();
            this.aSkills[$_SkillID].setSkillId($_SkillID);
            if(aSkills[tempCoords]){
                // todo connection
                if(this.objSkills[tempCoords].getField(`logic`,`skillConnectionOn`) && this.objSkills[tempCoords].getField(`logic`,`skillConnectionOn`) !== ''){
                    let conCoords = {},tempConnector;
                    // check if array
                    for( let i = 1; i <= (Array.isArray(this.objSkills[tempCoords].getField(`logic`,`skillConnectionOn`)) ? this.objSkills[tempCoords].getField(`logic`,`skillConnectionOn`).length : 1); i++ ){
                        // type of connection (fileData.getData().skillConnectionOn[i])
                        tempConnector = (Array.isArray(this.objSkills[tempCoords].getField(`logic`,`skillConnectionOn`))) ? this.objSkills[tempCoords].getField(`logic`,`skillConnectionOn`)[i-1] : this.objSkills[tempCoords].getField(`logic`,`skillConnectionOn`);
                        conCoords[`${this.tpl.SkillSlots.X[(aSkills[tempCoords].Tier + i)-2]},${this.tpl.SkillSlots.Y[aSkills[tempCoords].Line]}`] = `img/${tempConnector.replace(/^.*[\\\/]/, '').replace(/\.tex/,'.png')}`;
                    }
                    //console.log(conCoords);
                    aConnector.push([
                        this.aSkills[$_SkillID],
                        conCoords
                    ]);
                }
                
                aSkills[tempCoords].isUsed = true;
                aSkills[tempCoords].mSkill = this.aSkills[$_SkillID];
                aSkills[tempCoords].isCircular = parseInt(aSkills[tempCoords].mSkill.getField(`UI`,`isCircular`));
                aSkills[tempCoords].hasConnector = aSkills[tempCoords].mSkill.getField(`logic`,`skillConnectionOn`);
                //aSkills[coords]._UI = fileUI;
                //aSkills[coords]._Data = fileData;
                //aSkills[coords].Icon = fileData.getSkillIcon(wzGD_dataSet.PathsDS.Mod.Source);
            }else{
                unusedSkills.push(this.aSkills[$_SkillID]);
            }
            
        }
    
        let tempObj = false,aGroups = false,tempGrp;
        for( let $_Index in aConnector ){
            for( let $_CoordKey in aConnector[$_Index][1] ){
                if(aSkills[$_CoordKey]) {
                    aSkills[$_CoordKey].Connected = aConnector[$_Index][1][$_CoordKey];
                    if(aSkills[$_CoordKey].isUsed) {
                        aSkills[$_CoordKey].Parent = aConnector[$_Index][0];
                        
                        aGroups = aGroups || [];
                        if(aConnector[$_Index][0].getField(`logic`,`templateName`) === `database/templates/skill_transmuter.tpl` || aConnector[$_Index][0].getField(`logic`,`templateName`) === `database/templates/skill_modifier.tpl`){
                            //console.log(aGroups[aConnector[$_Index][0].getSkillId()]);
                            aGroups[aConnector[$_Index][0].getSkillId()] = aGroups[aConnector[$_Index][0].getSkillId()] || [false,(aSkills[$_CoordKey] && aSkills[$_CoordKey].mSkill) ? aSkills[$_CoordKey].mSkill : false];
                        }else{
                            aGroups[aConnector[$_Index][0].getSkillId()] = aGroups[aConnector[$_Index][0].getSkillId()] || [(aSkills[$_CoordKey] && aSkills[$_CoordKey].mSkill) ? aSkills[$_CoordKey].mSkill : false];
                        }
                        
                        aSkills[$_CoordKey].hasGroup = true;
                    }
    
                    tempGrp = this.checkConnectorGroup(aConnector[$_Index][1],$_CoordKey,aSkills);
                    //console.log(tempGrp);
                    if( tempGrp[0] ){
                        if(!aGroups[aConnector[$_Index][0].getSkillId()][0]){
                            if(aSkills[tempGrp[1]].mSkill.getField(`logic`,`templateName`) === `database/templates/skill_transmuter.tpl` || aSkills[tempGrp[1]].mSkill.getField(`logic`,`templateName`) === `database/templates/skill_projectiletransmuter.tpl` || aSkills[tempGrp[1]].mSkill.getField(`logic`,`templateName`) === `database/templates/skill_modifier.tpl`|| aSkills[tempGrp[1]].mSkill.getField(`logic`,`templateName`) === `database/templates/skill_projectilemodifier.tpl`){
                                aGroups[aConnector[$_Index][0].getSkillId()].push(aSkills[tempGrp[1]].mSkill); // .getSkillPaths().logicRelPath
                            }else{
                                aGroups[aConnector[$_Index][0].getSkillId()][0] = aSkills[tempGrp[1]].mSkill; // .getSkillPaths().logicRelPath
                            }
                        }else{
                            aGroups[aConnector[$_Index][0].getSkillId()].push(aSkills[tempGrp[1]].mSkill); // .getSkillPaths().logicRelPath
                        }
                        
                        aSkills[tempGrp[1]].hasGroup = true;
                    }else if(tempGrp){
                        aGroups[aSkills[tempGrp[1]].mSkill.getSkillId()] = [aSkills[tempGrp[1]].mSkill];
                    }
                    
                }
                
            }
        }
        //let TempLinkedModifierClass;
        /*
         ,
         "linkedSkills": {
         "mod_wanez/_mastery/ui/misc02/skill08": {
         "mod_wanez/_mastery/ui/misc02/skill01": true,
         "mod_wanez/_mastery/ui/misc02/skill03": true,
         "mod_wanez/_mastery/ui/misc02/skill02": true
         }
         }
         */
        for(let $_Coords in aSkills){
            if(aSkills[$_Coords].hasGroup){
            
            }else if(aSkills[$_Coords] && aSkills[$_Coords].mSkill && aSkills[$_Coords].isUsed && this.SkillsToLink && !this.SkillsToLink[ aSkills[$_Coords].mSkill.getSkillPaths().filePathModifierConfig ]){
                aGroups = aGroups || [];
                aGroups[aSkills[$_Coords].mSkill.getSkillId()] = [aSkills[$_Coords].mSkill];
                
                aSkills[$_Coords].hasGroup = true;
            }
            
            //Log(this.SkillsToLink);
            if(aSkills[$_Coords] && aSkills[$_Coords].mSkill && this.SkillsToLink && this.SkillsToLink[ aSkills[$_Coords].mSkill.getSkillPaths().filePathModifierConfig ]){
                //Log(aSkills[$_Coords].mSkill.getSkillPaths().filePathModifierConfig);
                //console.log(`we are here!`);
                for(let $_Coords2 in aSkills){
                    if(aSkills[$_Coords2] && aSkills[$_Coords2].mSkill && aSkills[$_Coords2].isUsed){
                        if(this.SkillsToLink[ aSkills[$_Coords].mSkill.getSkillPaths().filePathModifierConfig ][ aSkills[$_Coords2].mSkill.getSkillPaths().filePathModifierConfig ]){
    
                            //Log(aSkills[$_Coords].mSkill.getSkillPaths().filePathModifierConfig);
                            
                            aGroups[ aSkills[$_Coords2].mSkill.getSkillId() ] =
                                aGroups[ aSkills[$_Coords2].mSkill.getSkillId() ] ||
                                [ aSkills[$_Coords2].mSkill ];
                            aGroups[ aSkills[$_Coords2].mSkill.getSkillId() ].push(aSkills[$_Coords].mSkill);
    
                            aSkills[$_Coords2].hasGroup = true;
                        }
                    }
                }
            }
        }
        
        
        
        this.aGroups = aGroups;
        //console.log(aGroups);
        return [aSkills,unusedSkills];
    }
    
    genOutput($currentSkill){ // CONTENT_
        let out_ = '',pos_='',bonus_=``,con_='',con2_=``,picker_='',pUnused_='',pUsed_='',
            tmpIcon = '<img draggable="false" src="{0}" />',
            tmpAlt = '{0}';
        const aSkills = this.genLayout(),
            ignoreFields = {'1-1':true,'1-3':true,'1-5':true,'1-7':true,'1-9':true,'1-11':true},
            transmuterLine = {1:true,3:true,5:true,7:true,9:true,11:true};
        
        this.usedSkills = aSkills[0];
        //console.log(this.usedSkills);
        
        // PICKER - START
        for( let $_Index in aSkills[1] ){
            pUnused_ += `<li ondragstart="_cms.skillDrag(event)" draggable="true" wz-id="${aSkills[1][$_Index].getSkillId()}" onclick="console.log(${aSkills[1][$_Index].getSkillId()});">${aSkills[1][$_Index].getSkillName()}</li>`;
        } //  ondrop="_cms.skillDrop(event)" ondragover="_cms.skillAllowDrop(event)"
        
        // PICKER - MERGE
        picker_ += this.tpl.SkillPicker.wzOut({
            "UNUSED": `<ul>${pUnused_}</ul>`,
            "BACKUPS": this.genBackupsList()
        });
        
        // POSITIONS - START
        for( let $_Coords in aSkills[0] ){
            let aCoords = $_Coords.split(','),
                field = aSkills[0][$_Coords].Tier+'-'+aSkills[0][$_Coords].Line,
                skillName,canvasIcon = '',
                aRep = {
                    MODE: `inactive`,//(ignoreFields[field]) ? 'ignore' : 'inactive',
                    ICON: ``,
                    ALT: ``,
                    INFO: ``,
                    ID: (aSkills[0][$_Coords].mSkill) ? aSkills[0][$_Coords].mSkill.getSkillId() : ``,
                    COORDS: $_Coords,
                    TIER: aSkills[0][$_Coords].Tier,
                    CLASS_CIRCULAR: (transmuterLine[aSkills[0][$_Coords].Line]) ? ` transmuter` : ``
                },
                aConnector = {
                    MODE: `hidden`,
                    IMG: ``
                };
            if(aSkills[0][$_Coords].isUsed){
                skillName = aSkills[0][$_Coords].mSkill.getSkillName();
                //canvasIcon = aSkills[0][$_Coords]._Data.getSkillIcon(wzGD_dataSet.PathsDS.Mod.Source);
                canvasIcon = aSkills[0][$_Coords].mSkill.getSkillIcon();
                //console.log(canvasIcon);
                canvasIcon = new libWZ.GrimDawn.cImageLoader(aSkills[0][$_Coords].mSkill.getField(`logic`,`skillUpBitmapName`),{
                    retFalse: true
                }).load() || tmpAlt.wzReplace([aSkills[0][$_Coords].mSkill.getField(`UI`,`FileDescription`)]); // tmpIcon.wzReplace([canvasIcon.getCanvas().toDataURL()])
                
                aRep.MODE = 'active';
                aRep.ICON = canvasIcon;
                //aRep.ALT = aSkills[0][$_Coords]._UI.getFileDescription();
                //aRep.INFO = '<h1>'+skillName+'</h1>X: '+aCoords[0] + '<br />Y: ' + aCoords[1]+'<br />Used: '+aSkills[0][$_Coords].isUsed; // wz-tip=""
                // <h1>{SKILL_NAME}</h1>X: {COORDS_X}<br />Y: {COORDS_Y}<br />isCircular: {IS_CIRCULAR}<br />Has Connector: {HAS_CONNECTOR}
                aRep.INFO = this.tpl.SkillToolTip.wzOut({
                    SKILL_NAME: skillName,
                    COORDS_X: aCoords[0],
                    COORDS_Y: aCoords[1],
                    IS_USED: aSkills[0][$_Coords].isUsed,
                    IS_CIRCULAR: aSkills[0][$_Coords].isCircular,
                    HAS_CONNECTOR: (aSkills[0][$_Coords].hasConnector) ? `Yes` : `No`,
                    RANK_MAX: aSkills[0][$_Coords].mSkill.getField(`logic`,`skillMaxLevel`),
                    RANK_ULTIMATE: aSkills[0][$_Coords].mSkill.getField(`logic`,`skillUltimateLevel`),
                    TIER: aSkills[0][$_Coords].mSkill.getField(`logic`,`skillTier`) || `?`//aSkills[0][$_Coords].Tier
                });
            }
            if(aSkills[0][$_Coords].Connected){
                aConnector.MODE = 'active';
                aConnector.IMG = aSkills[0][$_Coords].Connected;
            }
            // check if skill has connector
            if(aSkills[0][$_Coords].hasConnector){
                aRep.MODE = 'hasConnector';
            }
            if(aSkills[0][$_Coords] && aSkills[0][$_Coords].mSkill && $currentSkill){
                if(aSkills[0][$_Coords].mSkill.getSkillPaths().relFilePath === $currentSkill.getSkillPaths().relFilePath){
                    aRep.MODE = 'current';
                }
            }
    
            //aRep.CLASS_CIRCULAR = ``;
            // check if skill is circular
            if(aSkills[0][$_Coords].isCircular){
                aRep.CLASS_CIRCULAR += ` isCircular`;
            }
            
            //Log(aSkills[0][$_Coords].Line);
            if(aSkills[0][$_Coords].Line >= 50){
                // todo lines
                //Log(aSkills[0][$_Coords].Line);
                bonus_ += this.tpl.SkillBTN.wzOut(aRep);
            }else{
                pos_ += this.tpl.SkillBTN.wzOut(aRep);
            }
            
            if(aSkills[0][$_Coords].Line & 1){
                con2_ += this.tpl.Connector.wzOut(aConnector);
            }else {
                if(aSkills[0][$_Coords].Tier !== 9) con_ += this.tpl.Connector.wzOut(aConnector);
            }
            //con_ += this.tpl.Connector.wzOut(aConnector);
            if(aSkills[0][$_Coords].Tier === 9) {
                pos_ += '<br />';
                if(aSkills[0][$_Coords].Line & 1){
                    con2_ += '<br />';
                }else {
                    con_ += '<br />';
                }
            }
            //con_ += '<br />';
        }
        
        out_ += this.tpl.SkillWindow.wzOut({
            "SKILL_POSITIONS": pos_,
            "SKILL_CONNECTORS": con_,
            "SKILL_CONNECTORS2": `<br />${con2_}`,
            "SKILL_PICKER": picker_,
            "SKILL_BONUS_LEFT": bonus_
        });
        //Log(aSkills);
        return this.tpl.Main.wzOut({
            'SKILL_WINDOW': out_
        });
    }
    
    getSkillPerId($id){
        return this.aSkills[$id] || false;
    }
    getSkillPerFileName($fileName){
        let theNewSkill = false;
        for(let $_ID in this.aSkills){
            if(this.aSkills[$_ID].getSkillPaths().fileName === $fileName) {
                theNewSkill = this.aSkills[$_ID];
                //console.log(theNewSkill);
            }
        }
        return theNewSkill;
    }
    
    getLogicPath(){
        let tempPath = this.objMiscUI.classtraining.getFieldValue(`skillName`);
        tempPath = tempPath.substring(0, tempPath.lastIndexOf("/"));
        //Log(tempPath);
        return tempPath;
    }
    
    getSkillFiles($subDirs){
        $subDirs = $subDirs || false;
        let tempPath = this.getLogicPath(),tempFiles,ignoreDir = {backup: true, bak: true,copy: true, 'New Folder': true};
        //console.log(this.objSkillPaths);
        if($subDirs){
            tempFiles = wzIO.dir_get_contentsSync(`${this.fn.getPaths().Mod}/${tempPath}`,false);
            this.aSkillFiles = {};
            for(let $_Name in tempFiles){
                if(typeof tempFiles[$_Name] !== `string`){
                    //console.log(tempFiles[$_Name]);
                    if(!ignoreDir[$_Name]){
                        for(let $_FileName in tempFiles[$_Name]){
                            if(typeof tempFiles[$_Name][$_FileName] === `string` && !$_FileName.startsWith(`copy `)) this.aSkillFiles[`${$_Name}/${$_FileName}`] = `${tempFiles[$_Name][$_FileName]}`;
                        }
                    }
                }else{
                    if(!$_Name.startsWith(`copy `)) this.aSkillFiles[$_Name] = this.aSkillFiles[$_Name];
                }
            }
        }else{
            this.aSkillFiles = wzIO.dir_get_contentsSync(`${this.fn.getPaths().Mod}/${tempPath}`,true);
        }
        for(let $_Key in this.aSkillFiles){
            if(this.objSkillPaths[`${this.getLogicPath()}/${$_Key}`] || $_Key.startsWith(`copy `)){
                //console.log(`${this.getLogicPath()}/${$_Key}`);
                delete this.aSkillFiles[`${$_Key}`];
            }
        }
        
        return this.aSkillFiles;
    }
    
    saveModuleUI($dataMisc){
        let aUsedSkills = [],relPath = ``,tempOpt,tempItem,counter = 1;
        for(let $_Index in this.usedSkills){
            if(this.usedSkills[$_Index].isUsed){
                aUsedSkills.push(this.usedSkills[$_Index].mSkill.getSkillPaths().relFilePath);
                relPath = this.usedSkills[$_Index].mSkill.getSkillPaths().relPath;
            }
        }
        aUsedSkills.push(`${relPath}/classtraining.dbr`);
        this.objMiscUI.classtable.editDBR({
            'tabSkillButtons': aUsedSkills
        });
        
        //this.aGroups
        tempOpt = {
            'skillName1': this.objMisc.masteryTable.getFilePath().split(`/database/`)[1],
            'skillLevel1': `0`
        };
        for(let i = 2; i <= 99; i++){
            tempOpt[`skillName${i}`] = ``;
        }
        for(let $_parentId in this.aGroups){
            for(let $_Index in this.aGroups[$_parentId]){
                counter++;
                tempItem = this.aGroups[$_parentId][$_Index];
                //console.log(tempItem);
                tempOpt[`skillName${counter}`] = tempItem.getSkillPaths().logicRelFilePath;
                tempOpt[`skillLevel${counter}`] = `0`;
            }
        }
        //console.log(tempOpt);
        this.objMisc.skillTree.editDBR(tempOpt);
        
        
        //console.log(aUsedSkills);
        this.saveModuleData($dataMisc);
    }
    
};
