/**
 * Created by WareBare on 3/26/2017.
 */

module.exports = class mUI extends libWZ.GrimDawn.cModule{
    
    constructor($dir,$path,$aGenderPC01,$tags,$currentSkill,$objBackups){
        super();
        
        //console.log(`${$path}/${$dir}`);
        this.iDir = $dir;
        this.iPath = $path;
        this.iGenderPC01 = $aGenderPC01;
        this.iTags = $tags;
        this.iCurrentSkill = $currentSkill;
        this.iBackups = $objBackups;
        
        this.aSkills = [];
        this.aSkillFiles = false;
        this.aGroups = false;
        this.objSkills = {};
        this.objMiscUI = {};
        this.objMisc = {};
        
        this.uiInfo = `Drag Skill into the slot where you want to move them, moving skills into the container ↑ will make them "unused" and remove them from /classtable.dbr and skilltree after pressing the "Save DBR" button.`;
        this.tpl = {
            "Main": `<div id="appGD_UI">{SKILL_WINDOW}</div>`, // <canvas id="canvas" width="400" height="400">No canvas support</canvas>
            "SkillWindow": "<div class='skillWindow'><div class='skillConnectors'>{SKILL_CONNECTORS}</div><div class='skillConnectors skillConnectors2'>{SKILL_CONNECTORS2}</div><div class='skillPositions'>{SKILL_POSITIONS}</div><div class='skillPicker'>{SKILL_PICKER}</div></div><img src='img/skills_classbackgroundimage.png' />", // target | skills_classbackgroundimage
            "SkillPicker": `<div ondrop="_cms.skillDropUnused(event)" ondragover="_cms.skillAllowDrop(event)">{UNUSED}</div><div id="uiBackUps">{BACKUPS}</div>`, //{USED}
            //"SkillBTN": "<div wz-mode='{MODE}' class='skillCell'>{ICON}<wztip>{INFO}</wztip></div>"
            "SkillBTN": `<div wz-mode="{MODE}" id="btn_{COORDS}" ondrop="_cms.skillDrop(event)" ondragover="_cms.skillAllowDrop(event)" ondragstart="_cms.skillDrag(event)" draggable="true" wz-coords="{COORDS}" wz-id="{ID}" wz-tier="{TIER}" class="skillCell{CLASS_CIRCULAR}" onclick="_cms.setSkill({ID});"><span>{ICON}</span>{INFO}</div>`, // <wztip>{INFO}</wztip> |  ondblclick="_cms.setSkillConnector({ID});"
            SkillToolTip: `<wztip><h1>{SKILL_NAME}</h1>{COORDS_X}, {COORDS_Y}<br />isCircular: {IS_CIRCULAR}<br />Has Connector: {HAS_CONNECTOR}</wztip>`,
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
        
        //const pathUI = this._modDBR_DS.getDataPath(this.aMastery.Paths.UI);
        
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
        /*
        for( let $_Coords in this.objSkills ){
            fileUI = pathUI[$_Index];
            
            if(fileUI.getTemplate() && fileUI.getTemplate() == 'database/templates/ingameui/skillbutton.tpl' && $_Index != 'classtraining.dbr'){
                let coords = fileUI.getData().bitmapPositionX+','+fileUI.getData().bitmapPositionY;
                
                fileData = this.loopBuff(this._modDBR_DS.getDataPath(fileUI.getData().skillName));
                
                if(aSkills[coords]){
                    if(fileData.getData().skillConnectionOn && fileData.getData().skillConnectionOn != ''){
                        let conCoords = {};
                        for( let i = 1; i <= fileData.getData().skillConnectionOn.length; i++ ){
                            // type of connection (fileData.getData().skillConnectionOn[i])
                            conCoords[this._tplApp.UI.SkillSlots.X[(aSkills[coords].Tier + i)-2] + ',' + this._tplApp.UI.SkillSlots.Y[aSkills[coords].Line]] = 'app/img/'+fileData.getData().skillConnectionOn[i-1].replace(/^.*[\\\/]/, '').replace(/\.tex/,'.png');
                            //conCoords.push();
                        }
                        aConnector.push([
                            fileData,
                            conCoords
                        ]);
                    }
                    aSkills[coords].isUsed = true;
                    aSkills[coords]._UI = fileUI;
                    aSkills[coords]._Data = fileData;
                    aSkills[coords].Icon = fileData.getSkillIcon(wzGD_dataSet.PathsDS.Mod.Source);
                }else{
                    //console.log('Unused Skill');
                    unusedSkills.push({
                        "_UI": fileUI,
                        "_Data": fileData,
                        "Icon": ""
                    });
                }
            
            }
            
        }
        */
    
        let tempObj = false,aGroups = false;
        for( let $_Index in aConnector ){
            for( let $_CoordKey in aConnector[$_Index][1] ){
                if(aSkills[$_CoordKey]) {
                    aSkills[$_CoordKey].Connected = aConnector[$_Index][1][$_CoordKey];
                    if(aSkills[$_CoordKey].isUsed) {
                        aSkills[$_CoordKey].Parent = aConnector[$_Index][0];
                        //console.log(aConnector[$_Index][1][$_CoordKey]);
                        //console.log(aConnector[$_Index][0].getSkillId()); // $_CoordKey
                        //console.log($_CoordKey);
                        //if(tempObj) aGroups.push(tempObj);
                        //tempObj = [];
                        aGroups = aGroups || [];
                        aGroups[aConnector[$_Index][0].getSkillId()] = aGroups[aConnector[$_Index][0].getSkillId()] || [(aSkills[$_CoordKey] && aSkills[$_CoordKey].mSkill) ? aSkills[$_CoordKey].mSkill : false];
    
                        aSkills[$_CoordKey].hasGroup = true;
                    }
    
                    // todo dynamic
                    if(aConnector[$_Index][1][$_CoordKey] === `img/skills_connectoroncenter.png`){
                        tempCoords = $_CoordKey.split(`,`);
                        tempCoords = `${parseInt(tempCoords[0]) + 80},${tempCoords[1]}`; //  + this.tpl.SkillSlotsDif.X
                        if(aSkills[tempCoords] && aSkills[tempCoords].mSkill){
                            //console.log(aSkills[tempCoords].mSkill.getSkillName());
                            aGroups[aConnector[$_Index][0].getSkillId()].push(aSkills[tempCoords].mSkill); // .getSkillPaths().logicRelPath
                            aSkills[tempCoords].hasGroup = true;
                        }
                    }else if(aConnector[$_Index][1][$_CoordKey] === `img/skills_connectoronbranchup.png`){
                        tempCoords = $_CoordKey.split(`,`);
                        tempCoords = `${parseInt(tempCoords[0]) + 80},${parseInt(tempCoords[1]) - 38}`; //  + this.tpl.SkillSlotsDif.X
                        if(aSkills[tempCoords] && aSkills[tempCoords].mSkill){
                            //console.log(aSkills[tempCoords].mSkill.getSkillName());
                            aGroups[aConnector[$_Index][0].getSkillId()].push(aSkills[tempCoords].mSkill);
                            aSkills[tempCoords].hasGroup = true;
                        }
                        
                        tempCoords = $_CoordKey.split(`,`);
                        tempCoords = `${parseInt(tempCoords[0]) + 80},${tempCoords[1]}`; //  + this.tpl.SkillSlotsDif.X
                        if(aSkills[tempCoords] && aSkills[tempCoords].mSkill){
                            //console.log(aSkills[tempCoords].mSkill.getSkillName());
                            aGroups[aConnector[$_Index][0].getSkillId()].push(aSkills[tempCoords].mSkill);
                            aSkills[tempCoords].hasGroup = true;
                        }
                    }else if(aConnector[$_Index][1][$_CoordKey] === `img/skills_connectoronbranchdown.png`){
                        tempCoords = $_CoordKey.split(`,`);
                        tempCoords = `${parseInt(tempCoords[0]) + 80},${parseInt(tempCoords[1]) + 32}`; //  + this.tpl.SkillSlotsDif.X
                        if(aSkills[tempCoords] && aSkills[tempCoords].mSkill){
                            //console.log(aSkills[tempCoords].mSkill.getSkillName());
                            aGroups[aConnector[$_Index][0].getSkillId()].push(aSkills[tempCoords].mSkill);
                            aSkills[tempCoords].hasGroup = true;
                        }
        
                        tempCoords = $_CoordKey.split(`,`);
                        tempCoords = `${parseInt(tempCoords[0]) + 80},${tempCoords[1]}`; //  + this.tpl.SkillSlotsDif.X
                        if(aSkills[tempCoords] && aSkills[tempCoords].mSkill){
                            //console.log(aSkills[tempCoords].mSkill.getSkillName());
                            aGroups[aConnector[$_Index][0].getSkillId()].push(aSkills[tempCoords].mSkill);
                            aSkills[tempCoords].hasGroup = true;
                        }
                    }else if(aConnector[$_Index][1][$_CoordKey] === `img/skills_connectoronbranchboth.png`){
    
                        tempCoords = $_CoordKey.split(`,`);
                        tempCoords = `${parseInt(tempCoords[0]) + 80},${tempCoords[1]}`; //  + this.tpl.SkillSlotsDif.X
                        if(aSkills[tempCoords] && aSkills[tempCoords].mSkill){
                            //console.log(aSkills[tempCoords].mSkill.getSkillName());
                            aGroups[aConnector[$_Index][0].getSkillId()].push(aSkills[tempCoords].mSkill);
                            aSkills[tempCoords].hasGroup = true;
                        }
    
                        tempCoords = $_CoordKey.split(`,`);
                        tempCoords = `${parseInt(tempCoords[0]) + 80},${parseInt(tempCoords[1]) + 32}`; //  + this.tpl.SkillSlotsDif.X
                        if(aSkills[tempCoords] && aSkills[tempCoords].mSkill){
                            //console.log(aSkills[tempCoords].mSkill.getSkillName());
                            aGroups[aConnector[$_Index][0].getSkillId()].push(aSkills[tempCoords].mSkill);
                            aSkills[tempCoords].hasGroup = true;
                        }
                        tempCoords = $_CoordKey.split(`,`);
                        tempCoords = `${parseInt(tempCoords[0]) + 80},${parseInt(tempCoords[1]) - 38}`; //  + this.tpl.SkillSlotsDif.X
                        if(aSkills[tempCoords] && aSkills[tempCoords].mSkill){
                            //console.log(aSkills[tempCoords].mSkill.getSkillName());
                            aGroups[aConnector[$_Index][0].getSkillId()].push(aSkills[tempCoords].mSkill);
                            aSkills[tempCoords].hasGroup = true;
                        }
                    }else if(aConnector[$_Index][1][$_CoordKey] === `img/skills_connectorontransmuterup.png`){
                        tempCoords = $_CoordKey.split(`,`);
                        tempCoords = `${parseInt(tempCoords[0]) + 80},${parseInt(tempCoords[1]) - 38}`; //  + this.tpl.SkillSlotsDif.X
                        if(aSkills[tempCoords] && aSkills[tempCoords].mSkill){
                            //console.log(aSkills[tempCoords].mSkill.getSkillName());
                            aGroups[aConnector[$_Index][0].getSkillId()].push(aSkills[tempCoords].mSkill);
                            aSkills[tempCoords].hasGroup = true;
                        }
                    }else if(aConnector[$_Index][1][$_CoordKey] === `img/skills_connectorontransmuterdown.png`){
                        tempCoords = $_CoordKey.split(`,`);
                        tempCoords = `${parseInt(tempCoords[0]) + 80},${parseInt(tempCoords[1]) + 32}`; //  + this.tpl.SkillSlotsDif.X
                        if(aSkills[tempCoords] && aSkills[tempCoords].mSkill){
                            //console.log(aSkills[tempCoords].mSkill.getSkillName());
                            aGroups[aConnector[$_Index][0].getSkillId()].push(aSkills[tempCoords].mSkill);
                            aSkills[tempCoords].hasGroup = true;
                        }
                    }
                    
                    
                    // img/skills_connectoronbranchup.png
                    // img/skills_connectoroncenter.png
                }
                
            }
        }
        
        for(let $_Coords in aSkills){
            if(aSkills[$_Coords].hasGroup){
            
            }else if(aSkills[$_Coords] && aSkills[$_Coords].mSkill && aSkills[$_Coords].isUsed){
                aGroups = aGroups || [];
                aGroups[aSkills[$_Coords].mSkill.getSkillId()] = [aSkills[$_Coords].mSkill];
                
                aSkills[$_Coords].hasGroup = true;
            }
        }
        
        this.aGroups = aGroups;
        //console.log(aGroups);
        return [aSkills,unusedSkills];
    }
    
    genOutput($currentSkill){ // CONTENT_
        let out_ = '',pos_='',con_='',con2_=``,picker_='',pUnused_='',pUsed_='',
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
        
        //_wzTPL.AppGD.UI.Coords.X
        //_wzTPL.AppGD.UI.Coords.Y
        /*
         for( let $_Line in _wzTPL.AppGD.UI.SkillSlots.Y ){
         
         for( let $_Tier in _wzTPL.AppGD.UI.SkillSlots.X ){
         skills_ += this.tplContent.SkillBTN.wzOut({
         "ICON": $_Tier + ' - ' + $_Line,
         "INFO": 'Tier: '+$_Tier + '\nLine: ' + $_Line
         })
         }
         skills_ += '<br />';
         }
         */
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
                canvasIcon = (canvasIcon != '') ? tmpIcon.wzReplace([canvasIcon.getCanvas().toDataURL()]) : tmpAlt.wzReplace([aSkills[0][$_Coords].mSkill.getField(`UI`,`FileDescription`)]);
                
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
                    HAS_CONNECTOR: (aSkills[0][$_Coords].hasConnector) ? `Yes` : `No`
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
            
            
            pos_ += this.tpl.SkillBTN.wzOut(aRep);
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
            "SKILL_PICKER": picker_
        });
        
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
    getSkillFiles(){
        let tempPath;
        if(!this.aSkillFiles){
            tempPath = this.objMiscUI.classtraining.getFieldValue(`skillName`);
            tempPath = tempPath.substring(0, tempPath.lastIndexOf("/"));
            this.aSkillFiles = wzIO.dir_get_contentsSync(`${this.fn.getPaths().Mod}/${tempPath}`,true);
            //console.log(this.aSkillFiles);
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
                tempOpt[`skillName${counter}`] = tempItem.getSkillPaths().logicRelPath;
                tempOpt[`skillLevel${counter}`] = `0`;
            }
        }
        console.log(tempOpt);
        this.objMisc.skillTree.editDBR(tempOpt);
        
        
        //console.log(aUsedSkills);
        this.saveModuleData($dataMisc);
    }
    
};
