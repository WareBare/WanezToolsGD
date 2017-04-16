/**
 * Created by WareBare on 4/1/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cFrom extends libWZ.Core.cBase{
    
    constructor($opt){
        super();
        
        //$opt = $opt || {};
        
        this.iOpt = Object.assign({
            title: false, // false || string, if string another fieldset will be created around the form groups
            id: Math.random() * (1000 - 1) + 1, // it needs an id, even if it's random
            items: false, // groups & fields
            isModule: false, // false || module instance
            _tags: false, // false || tag, if isModule: false but tags are set, tags will be edited
            useContent: false,
        },$opt || {});
        
        this.tplForm = {
            Frame: `<form id="{ID}" style="${this.iOpt.style || ``}" onsubmit="return false;">{FIELD_SETS}</form>`,
            Fieldset: `<fieldset style="${this.iOpt.fieldSetStyle || ``}"><legend>{TITLE}</legend>{ITEMS}</fieldset>`,
            events: {
                onChange: {
                    wnd: `wzWND('${this.iOpt.isWnd || ``}').${(this.iOpt.onChange.custom) ? `__getContent().${this.iOpt.onChange.custom}` : `form('onChange','${this.iOpt.id}',this,{RELOAD})`}`,
                    cms: `_cms.${this.iOpt.onChange.custom};` // todo
                    //cms: `wzWND('${this.iOpt.isWnd || ``}').${(this.iOpt.onChange.custom) ? `__getContent().${this.iOpt.onChange.custom}` : `form('onChange','${this.iOpt.id}',this,{RELOAD})`}`,
                },
                onFocus: {
                    wnd: `wzWND('${this.iOpt.isWnd || ``}').${(this.iOpt.onChange.custom) ? `__getContent().${this.iOpt.onChange.custom}` : `form('onFocus','${this.iOpt.id}',this)`}`,
                    cms: `_cms.editSkillOnBlur(event,this,'{FIELD}','{TYPE}');` // todo
                }
            },
            fields: { // onfocus="{EVENT_ONFOCUS}"
                input: `<label><span>{LABEL}</span><input type="{TYPE}" placeholder="{PLACEHOLDER}" name="{NAME}"{SPECIAL} wzReload="{RELOAD}" wzType="{WZ_TYPE}" value="{VALUE}" {EVENT_TYPE}="{EVENT_ONCHANGE}"{SINGLE_ATTRIBUTES}></label>`,
                list: `<label><span>{LABEL}</span><textarea name="{NAME}" wzReload="{RELOAD}" wzType="{WZ_TYPE}" onchange="{EVENT_ONCHANGE}"{SINGLE_ATTRIBUTES}>{VALUE}</textarea></label>`,
                textArea: `<label><span>{LABEL}</span><textarea name="{NAME}" wzReload="{RELOAD}" wzType="{WZ_TYPE}" onkeydown="wzOnFormEnter(event);"onchange="{EVENT_ONCHANGE}"{SINGLE_ATTRIBUTES}>{VALUE}</textarea></label>`,
                comboBox: `<label><span>{LABEL}</span><select{SIZE} wzType="{WZ_TYPE}" wzReload="{RELOAD}" name="{NAME}" {EVENT_TYPE}="{EVENT_ONCHANGE}"{SINGLE_ATTRIBUTES}>{VALUE}</select></label>`, //  class="comboBox" size="5"  onmousedown="if(this.options.length>4){this.size=4;}" onchange="this.size=0;{EVENT_ONCHANGE}"
                comboBoxItem: `<option value="{VALUE}"{SELECTED}>{TEXT}</option>`,
                checkBox: `<label><span>{LABEL}</span><input type="{TYPE}" name="{NAME}" wzReload="{RELOAD}" wzType="{WZ_TYPE}" value="{VALUE}" onchange="{EVENT_ONCHANGE}"{SINGLE_ATTRIBUTES}></label>`
            }
        };
    
        this.useContent = this.iOpt.useContent;
        this.useModule = this.iOpt.isModule;
        this._tags = this.iOpt._tags;
        
        this.formConfig = false;
        if(!this.useModule && !this._tags){
            this.formConfig = {};
        }
        
        this.nextEl = false;
        
        this.iniForm();
    }
    
    iniForm(){
    
    
    
    }
    
    getValue($tempValue,$tempItem){
        let retValue = ``,tempArray,tempValue;
    
        if( Array.isArray($tempValue) ){
            tempArray = $tempValue;
            for(let $_Index in tempArray){
                if(retValue !== ``) retValue += `\n`;
                retValue += `${tempArray[$_Index]}`;
            }
        }else if($tempItem.type.includes(`comboBox`) || $tempItem.type === `listBox` || $tempItem.type === `listBoxLarge`) {
            for (let $_Value in $tempItem.data) {
                tempValue = ($tempItem.dataUseValue) ? $_Value : $tempItem.data[$_Value];
                if(tempValue === `Clear` || tempValue === ``){
                    $_Value = ``;
                }else if($tempItem.dataPath){
                    $_Value = `${$tempItem.dataPath}/${$_Value}`;
                }
                retValue += this.tplForm.fields.comboBoxItem.wzOut({
                    VALUE: $_Value,
                    TEXT: tempValue,
                    SELECTED: `${($tempValue === $_Value) ? ` selected` : ``}`
                });
            }
        }else if($tempItem.type.includes(`check`)){
            retValue = $tempValue;
            if(retValue === `0`) retValue = false;
        }else{
            retValue = $tempValue;
        }
        
        return retValue;
    }
    
    create(){
        let form_,fieldset = ``,items = ``,tempItem,tempValue,tempArray,tempName,
            objFieldTypes = {
                text: this.tplForm.fields.input.wzOut({
                    TYPE: `text`,
                    WZ_TYPE: `TextDefault`,
                    EVENT_TYPE: `onChange`,
                    SPECIAL: ``
                }),
                textLarge: this.tplForm.fields.input.wzOut({
                    TYPE: `text`,
                    WZ_TYPE: `TextLarge`,
                    EVENT_TYPE: `onChange`,
                    SPECIAL: ``
                }),
                textLarger: this.tplForm.fields.input.wzOut({
                    TYPE: `text`,
                    WZ_TYPE: `TextLarger`,
                    EVENT_TYPE: `onChange`,
                    SPECIAL: ``
                }),
                textLargeX: this.tplForm.fields.input.wzOut({
                    TYPE: `text`,
                    WZ_TYPE: `TextLargeX`,
                    EVENT_TYPE: `onChange`,
                    SPECIAL: ``
                }),
                textArea: this.tplForm.fields.textArea.wzOut({
                    //TYPE: `text`,
                    WZ_TYPE: `TextArea`
                }),
                listArea: this.tplForm.fields.list.wzOut({
                    WZ_TYPE: `ListArea`
                }),
                listAreaLarge: this.tplForm.fields.list.wzOut({
                    WZ_TYPE: `ListAreaLarge`
                }),
                comboBox: this.tplForm.fields.comboBox.wzOut({
                    WZ_TYPE: `ComboBox`,
                    SIZE: ``,
                    EVENT_TYPE: `onChange`
                }),
                comboBoxLarge: this.tplForm.fields.comboBox.wzOut({
                    WZ_TYPE: `ComboBoxLarge`,
                    SIZE: ``,
                    EVENT_TYPE: `onChange`
                }),
                listBox: this.tplForm.fields.comboBox.wzOut({
                    WZ_TYPE: `ListBox`,
                    SIZE: ` size="5"`,
                    EVENT_TYPE: `onBlur`
                }),
                listBoxLarge: this.tplForm.fields.comboBox.wzOut({
                    WZ_TYPE: `ListBoxLarge`,
                    SIZE: ` size="10"`,
                    EVENT_TYPE: `onBlur`
                }),
                checkBox: this.tplForm.fields.checkBox.wzOut({
                    TYPE: `checkbox`,
                    WZ_TYPE: `CheckDefault`
                }),
                radio: this.tplForm.fields.checkBox.wzOut({
                    TYPE: `radio`,
                    WZ_TYPE: `CheckDefault`
                }),
                number: this.tplForm.fields.input.wzOut({
                    TYPE: `number`,
                    WZ_TYPE: `NumberDefault`,
                    EVENT_TYPE: `onBlur`,
                    SPECIAL: ` step="{STEP}"`
                })
            };
        
        if(this.iOpt.items){
            for(let $_Group in this.iOpt.items){
                items = ``;
                for(let $_FieldName in this.iOpt.items[$_Group]){
                    tempItem = this.iOpt.items[$_Group][$_FieldName];
                    tempValue = tempItem.value || ``;
                    tempName = $_FieldName.split(`::`);
                    if(this.useContent){
                        if(this.useContent[tempName[0]] && this.useContent[tempName[0]][tempName[1]]) {
                            tempValue = this.getValue(this.useContent[tempName[0]][tempName[1]], tempItem) || ``;
                        }else{
                            tempValue = this.getValue(tempValue, tempItem) || ``;
                        }
                    }else if(this.formConfig) {
                        this.formConfig[tempName[0]] = this.formConfig[tempName[0]] || new eConfig({name: tempName[0]});
                        tempValue = this.getValue(this.formConfig[tempName[0]].get(tempName[1]) || tempValue, tempItem);
                    }else if(this.useModule) {
                        //tempName = $_FieldName.split(`::`);
                        tempValue = this.getValue(this.useModule.getField(tempName[0], tempName[1]), tempItem);
                    }else if(this._tags) {
                        tempValue = this._tags[tempName[0]].__getField(tempName[1]);
                        //console.log(`${tempName[0]} - ${tempName[1]}`);
                    }else if(tempValue !== ``){
                        tempValue = this.getValue(tempValue,tempItem);
                    }
                    //if(tempItem.type === `comboBox`){
                    //if(typeof tempItem.reload === `undefined`) tempItem.reload = true;
                    //console.log(tempItem.reload);
                    //}else{
                        items += objFieldTypes[tempItem.type || `text`].wzOut({
                            LABEL: tempItem.label || $_FieldName,
                            EVENT_ONCHANGE: this.tplForm.events.onChange[(this.iOpt.isWnd) ? `wnd` : `cms`].wzOut({
                                RELOAD: tempItem.reload || false
                            }),
                            EVENT_ONFOCUS: this.tplForm.events.onFocus[(this.iOpt.isWnd) ? `wnd` : `cms`],
                            VALUE: (tempItem.type.includes(`radio`)) ? tempName[1] : tempValue,
                            NAME: (tempItem.name) ? `${tempItem.name}` : $_FieldName,
                            STEP: tempItem.step || `1`,
                            PLACEHOLDER: tempItem.ph || ``,
                            RELOAD: (typeof tempItem.reload === `undefined`) ? 1 : ( (tempItem.reload) ? 1 : 0 ),
                            SINGLE_ATTRIBUTES: `${(tempItem.isRequired) ? ` required` : ``}${(tempItem.type.includes(`check`) && tempValue) ? ` checked` : ``}${(tempItem.type.includes(`radio`) && tempValue === parseInt(tempName[1])) ? ` checked` : ``}${(typeof tempItem.reload === `undefined`) ? ` reload` : ( (tempItem.reload) ? ` reload` : `` )}`
                        });
                    //}
                    if(tempItem.newLine) items += `<br />`;
                }
                
                if(fieldset !== ``) fieldset += `<br />`;
                fieldset += this.tplForm.Fieldset.wzOut({
                    TITLE: $_Group,
                    ITEMS: items
                });
            }
        }
    
        let items_ = (this.iOpt.title) ? this.tplForm.Fieldset.wzOut({
            TITLE: this.iOpt.title,
            ITEMS: `${fieldset}`
        }) : `${fieldset}`;
        form_ = this.tplForm.Frame.wzOut({
            ID: this.iOpt.id,
            FIELD_SETS: items_
        });
        
        return form_;
    }
    
    onChange($el){
        let wzType = $el.getAttribute(`wzType`),alwaysSave = false,
            //isWnd = this.iOpt.isWnd,
            //_tags = (isWnd) ? wzWND(this.iOpt.isWnd).__getContent().formTags : false,
            newValue = $el.value,tempOpt = {},
            reload = $el.getAttribute(`reload`),
            saveLoc = $el.name.split(`::`);
        //console.log(reload);
        if(wzType === `ListArea` || wzType === `ListAreaLarge`){
            newValue = $el.value.split(`\n`);
        }
        
        // save changes
        if(this.useContent){
            this.useContent[saveLoc[0]] = this.useContent[saveLoc[0]] || {};
            this.useContent[saveLoc[0]][saveLoc[1]] = newValue;
        }else if(this.useModule) {
            if (wzType.includes(`Check`)) {
                newValue = ($el.checked) ? `1` : `0`;
            }
            if (saveLoc[1] === `FileDescription`) alwaysSave = true;
            tempOpt[saveLoc[1]] = newValue;
            this.useModule.setField(saveLoc[0], tempOpt);
            this.useModule.saveModuleData([this._tags, false, false], alwaysSave);
            if (this._tags) this._tags.saveData();
        }else if(this._tags){
            //this._tags[saveLoc[0]][saveLoc[1]] = newValue;
            this._tags[saveLoc[0]].__setField(saveLoc[1],newValue);
            this._tags[saveLoc[0]].saveData();
        }else{
            this.formConfig[saveLoc[0]].set(saveLoc[1],newValue);
            // let user know data was saved
            wzNotify.save($el.parentNode.firstChild.innerHTML,`Saved`);
        }
        
        if(reload !== null) this.onReload();
    }
    onFocus($el){
        this.nextEl = $el;
    }
    
    onReload(){
        let isWnd = this.iOpt.isWnd;
        
        setTimeout(() => {
            wzCMS(appConfig.get('cms'));
            if(isWnd){
                wzWND(isWnd).refresh();
            }
        },10);
    }
    
};

wzOnFormEnter = function(e){
    if (e.keyCode === 13) {
        document.activeElement.blur();
    }
};
