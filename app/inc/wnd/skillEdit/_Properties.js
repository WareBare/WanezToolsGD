/**
 * Created by WareBare on 4/17/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    //title: `Settings :: Grim Dawn`,
    titlePage: `Properties`,
    //curSwitch: ``,
    
    //ActiveFile: false,
    
    forms: {},
    
    submitNewField($el){ // OLD
        //console.log($el.value);
        let tempOpt = {};
    
        tempOpt[$el.value] = [1,2];
        this._mSkill.setField(this.ActiveFile || `logic`,tempOpt);
        this.curSwitch = $el.value;
        
        wzWND(this.wndId).refresh();
    },
    
    AddNewField($el){
        let tempOpt = {};
    
        tempOpt[$el.value] = [1,2];
        this._mSkill.setField(this.ActiveFile || `logic`,tempOpt);
        this.curSwitch = $el.value;
    
        wzWND(this.wndId).refresh();
        
        Log(tempOpt);
    },
    
    deleteProperty(){
        let tempOpt = {};
    
        tempOpt[this.curSwitch] = ``;
        this._mSkill.setField(this.ActiveFile || `logic`,tempOpt);
        this.curSwitch = false;
    
        wzWND(this.wndId).refresh();
    },
    
    submitSwitch: function($el){
        this.curSwitch = $el.value;
        
        wzWND(this.wndId).refresh();
    
        setTimeout(() => {
            window.location = `#wnd-values-form`;
        },10);
    },
    onChange: function($el){
        //console.log(`${$el.value}`);
        let type = ($el) ? $el.name.split(`::`)[1] : false,tempOpt = {},
            newValues_ = `<h3>New</h3>`,
            typeToIndex = {
                start: 0,
                inc: 1,
                mul: 2,
                incEvery: 3,
                incInc: 4,
                incOnceEvery: 5,
                end: 6,
                parabola: 7,
                parabolaStr: 8
            };
    
        if(type) {
            this.newData[typeToIndex[type]] = parseFloat($el.value);
        }
        
        this.newValues = wzMathGD.genValues({
            dec: 1,
            mul: this.newData[2],
            max: parseInt(this._mSkill.getField(this.ActiveFile || `logic`,`skillUltimateLevel`)) + 10,
            start: this.newData[0],
            number: this.newData[1],
            incInc: this.newData[4],
            incEvery: this.newData[3],
            incOnceEvery: this.newData[5],
            numberMax: this.newData[6],
            parabola: this.newData[7],
            parabolaStr: this.newData[8]
        });
        
        for(let $_Index in this.newValues){
            //if(oldValues_ !== ``) oldValues_ += ``
            newValues_ += `<div>${this.newValues[$_Index]}</div>`;
        }
        
        if(document.getElementById(`skillProperies_newValues`)) document.getElementById(`skillProperies_newValues`).innerHTML = newValues_;
    },
    saveProperties: function(){
        //console.log(`save`);
        if(this.newValues){
            //console.log();
            this.skillConfig.set(`editProperties.${(this.ActiveFile) ? this.ActiveFile.replace(`.dbr`, ``) : this._mSkill.getSkillPaths().logicRelFilePath.replace(`.dbr`,``)}.${this.curSwitch}`,this.newData);
            
            let tempOpt = {};
            //this._mSkill.setField(`logic`,tempOpt);
            tempOpt[this.curSwitch] = this.newValues;
            //tempOpt[`toolMath${this.curSwitch}`] = this.newData;
            this._mSkill.setField(this.ActiveFile || `logic`,tempOpt);
            //this._mSkill.saveModuleData();
            setTimeout(() => {
                wzCMS(appConfig.get('cms'));
                wzWND(`skillEdit`).refresh();
            },10);
        }else{
            wzNotify.warn(`No Data Set To Save`);
        }
    },
    
    SetActiveFile: function(el){
        //Log(el.value);
        if(el.checked) this.ActiveFile = (el.value === `0`) ? false : el.value;
    
        wzWND(this.wndId).refresh();
        
        setTimeout(() => {
            window.location = `#wnd-active-field`;
        },10);
    },
    
    content_: function(){
        let out_,itemsSwitch = {},content_ = `Choose a Property you wish to edit.`,newField = ``,
            scalableFields = this._mSkill.getScalableFields(this.ActiveFile),
            oldValues_ = `<h3>Old</h3>`,
            newValues_ = `<h3>New</h3>`,
            lvl_ = `<h3>LvL</h3>`,
            ActiveFile_ = ``,
            ActiveFileItems_ = ``,
            ActiveField_ = ``,
            ActiveFieldItems_ = ``,
            tplFieldset = `<fieldset><legend>{TITLE}</legend>{ITEMS}</fieldset>`,
            tplActiveFileItem = `<label><input type="checkbox" value="{VALUE}" onchange="wzWND('${this.wndId}').__getContent().SetActiveFile(this);"{STATE} /><span>{TEXT}</span></label>`,
            tplActiveFieldItem = `<label><input type="checkbox" value="{VALUE}" onchange="wzWND('${this.wndId}').__getContent().submitSwitch(this);"{STATE} /><span>{TEXT}</span></label>`,
            tplContent = `<div class="form">{FORM}{BUTTON}</div><div class="propValues"><div class="propLevels">{LEVELS}</div><div class="left">{OLD_VALUES}</div><div id="skillProperies_newValues" class="right">{NEW_VALUES}</div></div>`,
            tpl = `<div id="wndGD_SkillProperties"><div class="wndMasterySkillEdit">{ACTIVE_FILE}</div><a name="wnd-active-field"></a><div class="dataSelection wndMasterySkillEdit">{CUSTOM}</div><a name="wnd-values-form"></a><div class="dataValues">{FORM}</div><div class="dataNewField">{NEW_FIELD}</div></div>`;
            /*curStats = scalableFields[this.curSwitch] || [0,0,0],
            v1 = parseFloat(curStats[1]) - parseFloat(curStats[0]),
            v2 = parseFloat(curStats[2]) - parseFloat(curStats[1]),
            dif = v2 - v1,
            perc = (v1) ? (dif / v1 + 1).toFixed(2) : (1).toFixed(2),
            p1 = ((v1 + parseFloat(curStats[0]) - parseFloat(curStats[0]) * parseFloat(perc)) % 1); //  * 10
        p1 = (p1) ? p1.toFixed(1) : v1.toFixed(1);*/
        
        //console.log(scalableFields[this.curSwitch]);
        //console.log(`${v1 + curStats[0]} - ${(curStats[0] * parseFloat(perc)) % 1} = ${dif} (${perc}) -> ${p1} --- ${((v1 + curStats[0] - curStats[0] * parseFloat(perc)) % 1) * 10} ---- ${(v1 + parseFloat(curStats[0]) - parseFloat(curStats[0]) * parseFloat(perc)) % 1}`);
    
        if(this._mSkill.getField(`logic`, `spawnObjects`)){
            let SpawnObject = (Array.isArray(this._mSkill.getField(`logic`, `spawnObjects`))) ? this._mSkill.getField(`logic`, `spawnObjects`)[0] : this._mSkill.getField(`logic`, `spawnObjects`),
                SpawnObjectClass = wzStorageGD.__get(SpawnObject),
                TempSkillFile;
    
            for(let i=1; i<=17; i++){
                if( SpawnObjectClass.__getField(`skillName${i}`) && SpawnObjectClass.__getField(`skillName${i}`) !== ``){
                    try{
                        fs.accessSync(`${WZ.GrimDawn.tFn.getPaths().Mod}/${SpawnObjectClass.__getField(`skillName${i}`)}`);
                        ActiveFileItems_ += tplActiveFileItem.wzReplace({
                            VALUE: `${SpawnObjectClass.__getField(`skillName${i}`)}`,
                            STATE: (SpawnObjectClass.__getField(`skillName${i}`) === this.ActiveFile) ? ` checked` : ``,
                            TEXT: `${SpawnObjectClass.__getField(`skillName${i}`)}`
                        });
                    }catch(err){}
                    
                }
                
                
            }
            if(ActiveFileItems_ !== ``){
                ActiveFileItems_ = tplActiveFileItem.wzReplace({
                    VALUE: 0,
                    STATE: (this.ActiveFile) ? `` : ` checked`,
                    TEXT: `Main Skill`
                }) + ActiveFileItems_;
            }
            ActiveFile_ = tplFieldset.wzReplace({
                TITLE: `Skill File`,
                ITEMS: ActiveFileItems_
            });
        }
        
        
        
        
        //this.formTags = _cms.Base._tagsSkills;
        //this.newData = this.newData || [0,0,1.0];
        this.newData = [(0).toFixed(1),(0).toFixed(1),(1).toFixed(3),1,(0).toFixed(1),1,0];
        //this.newData = [curStats[0],p1,perc];
        if(this.curSwitch) {
            //this.newData = this._mSkill.getField(`logic`,`toolMath${this.curSwitch}`) || this.newData;
            this.newData = this.skillConfig.get(`editProperties.${(this.ActiveFile) ? this.ActiveFile.replace(`.dbr`,``) : this._mSkill.getSkillPaths().logicRelFilePath.replace(`.dbr`,``)}.${this.curSwitch}`) || this.newData;
            this.onChange();
        }
        
        itemsSwitch[`Show Property`] = itemsSwitch[`Show Property`] || {};
        
        /*
        for(let $_FieldName in scalableFields){
            itemsSwitch[`Show Property`][`show::${$_FieldName}`] = {
                label: `${$_FieldName}`,
                type: `radio`,
                name: `radioSkillProperties`,
                value: this.curSwitch
            };
        }
        
        this.forms.switch_form = new WZ.Core.cForm({
            id: 'switch_form',
            isWnd: this.wndId,
            isConfig: false,
            onChange: {
                custom: `submitSwitch(this)`
            },
            items: itemsSwitch
        });
        */
        for(let kFieldName in scalableFields){
            
            ActiveFieldItems_ += tplActiveFieldItem.wzReplace({
                VALUE: kFieldName,
                STATE: (this.curSwitch === kFieldName) ? ` checked` : ``,
                TEXT: kFieldName
            });
        }
        ActiveField_ = tplFieldset.wzReplace({
            TITLE: `DBR Field`,
            ITEMS: ActiveFieldItems_
        });
    
        let availFields = wzTemplates.__getGroupFields(this._mSkill.getField(this.ActiveFile || `logic`,`templateName`),[`Offensive Parameters`,`Defensive Parameters`,`Retaliation Parameters`,`Character Parameters`,`Skill Parameters`,`Modifiers`,`Projectile Config`,`Spawn Config`,`Spark Config`]);
        //console.log(availFields);
    
        for(let $_FieldName in availFields){
            newField += $_FieldName;
        }
        
        this.forms.newfield_form = new WZ.Core.cForm({
            id: 'newfield_form',
            isWnd: this.wndId,
            isConfig: false,
            onChange: {
                custom: `AddNewField(this)`
            },
            items: {
                'New DBR Field': {
                    'newField::start': {
                        label: `Use the Text Field to make the search easier, this is case-sensitive and you may skip letters. e.g. defPrC would show defensiveProtectionChance`,
                        type: `dataList`,
                        data: Object.assign({weaponDamagePct: ``},availFields),
                        dataUseValue: true,
                        //value: curStats[0],
                        value: `Clear`
                    },
                }
            }
        });
        
        this.forms.main_form = new WZ.Core.cForm({
            id: 'main_form',
            isWnd: this.wndId,
            isConfig: false,
            onChange: {
                custom: `onChange(this)`
            },
            items: {
                'Values': {
                    'newValue::start': {
                        label: `Starting Value`,
                        type: `numberOnChange`,
                        reload: false,
                        step: `0.1`,
                        //value: curStats[0],
                        value: this.newData[0]
                    },
                    'newValue::end': {
                        label: `Maximum Value`,
                        type: `numberOnChange`,
                        reload: false,
                        //step: `0.1`,
                        //value: curStats[0],
                        value: this.newData[6],
                        newLine: true
                    },
                    'newValue::inc': {
                        label: `Increment`,
                        type: `numberOnChange`,
                        reload: false,
                        step: `0.1`,
                        //value: p1,
                        value: this.newData[1]
                    },
                    'newValue::incOnceEvery': {
                        label: `Inc. once every`,
                        type: `numberOnChange`,
                        reload: false,
                        //step: `0.1`,
                        //value: p1,
                        value: this.newData[5],
                        newLine: true
                    },
                    'newValue::parabola': {
                        label: `Special Scale at`,
                        type: `numberOnChange`,
                        reload: false,
                        //step: `1`,
                        //value: perc,
                        value: this.newData[7] || 0
                    },
                    'newValue::parabolaStr': {
                        label: `Special Scale strength`,
                        type: `numberOnChange`,
                        reload: false,
                        step: `0.001`,
                        //value: perc,
                        value: this.newData[8],
                        newLine: true
                    },
                    'newValue::mul': {
                        label: `Multiplier`,
                        type: `numberOnChange`,
                        reload: false,
                        step: `0.001`,
                        //value: perc,
                        value: this.newData[2],
                        newLine: true
                    },
                    'newValue::incInc': {
                        label: `Inc. Inc.`,
                        type: `numberOnChange`,
                        reload: false,
                        step: `0.1`,
                        //value: p1,
                        value: this.newData[4]
                    },
                    'newValue::incEvery': {
                        label: `Inc. every`,
                        type: `numberOnChange`,
                        reload: false,
                        //step: `0.1`,
                        //value: p1,
                        value: this.newData[3]
                    }
                }
            }
        });
        
        if(this.curSwitch){
            //content_ = ``;
            
            //content_ += `${this.curSwitch}`;
    
            for(let $_Index in scalableFields[this.curSwitch]){
                //if(oldValues_ !== ``) oldValues_ += ``
                oldValues_ += `<div>${scalableFields[this.curSwitch][$_Index]}</div>`;
            }
        }
    
        for(let $_Index in this.newValues){
            //if(oldValues_ !== ``) oldValues_ += ``
            lvl_ += `<div>${(`0${parseInt($_Index) + 1}`).slice(-2)}</div>`;
            newValues_ += `<div>${this.newValues[$_Index]}</div>`;
        }
    
        
        out_ = tpl.wzOut({
            ACTIVE_FILE: ActiveFile_,
            NEW_FIELD: this.forms.newfield_form.create(),
            CUSTOM: ActiveField_, //this.forms.switch_form.create(),
            FORM: (this.curSwitch) ? tplContent.wzOut({
                FORM: this.forms.main_form.create(),
                BUTTON: `<span class="formBTN" onclick="wzWND('${this.wndId}').__getContent().saveProperties();">Save</span><span class="formBTN" onclick="wzWND('${this.wndId}').__getContent().deleteProperty();">Delete</span>`,
                LEVELS: lvl_,
                OLD_VALUES: oldValues_,
                NEW_VALUES: newValues_
            }) : `Pick a field to edit. <br />Check the Wiki for more information.`
        });
        //console.log(`${WZ.GrimDawn.tFn.getPaths().Mod}/${this._mSkill.getSkillPaths().logicRelPath}`);
        //console.log(this._mSkill.getScalableFields());
        
        return out_;
    }
    
};
