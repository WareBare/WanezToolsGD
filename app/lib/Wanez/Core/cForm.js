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
            title: `No Title`,
            id: Math.random() * (1000 - 1) + 1,
            items: false,
            isConfig: true
        },$opt || {});
        
        this.tplForm = {
            Frame: `<form id="{ID}" onsubmit="return false;">{FIELD_SETS}</form>`,
            Fieldset: `<fieldset><legend>{TITLE}</legend>{ITEMS}</fieldset>`,
            events: {
                onChange: {
                    wnd: `wzWND('${this.iOpt.isWnd || ``}').${(this.iOpt.onChange.custom) ? `__getContent().${this.iOpt.onChange.custom}` : `form('onChange','${this.iOpt.id}',this,{RELOAD})`}`,
                    cms: `_cms.editSkillOnBlur(event,this,'{FIELD}','{TYPE}');` // todo
                },
                onFocus: {
                    wnd: `wzWND('${this.iOpt.isWnd || ``}').${(this.iOpt.onChange.custom) ? `__getContent().${this.iOpt.onChange.custom}` : `form('onFocus','${this.iOpt.id}',this)`}`,
                    cms: `_cms.editSkillOnBlur(event,this,'{FIELD}','{TYPE}');` // todo
                }
            },
            fields: { // onfocus="{EVENT_ONFOCUS}"
                text: `<label><span>{LABEL}</span><input type="{TYPE}" name="{NAME}" wzType="{WZ_TYPE}" value="{VALUE}" onchange="{EVENT_ONCHANGE}"{SINGLE_ATTRIBUTES}></label>`,
                list: `<label><span>{LABEL}</span><textarea name="{NAME}" wzType="{WZ_TYPE}" onchange="{EVENT_ONCHANGE}"{SINGLE_ATTRIBUTES}>{VALUE}</textarea></label>`,
                comboBox: `<label><span>{LABEL}</span><select{SIZE} wzType="{WZ_TYPE}" name="{NAME}" {EVENT_TYPE}="{EVENT_ONCHANGE}"{SINGLE_ATTRIBUTES}>{VALUE}</select></label>`, //  class="comboBox" size="5"  onmousedown="if(this.options.length>4){this.size=4;}" onchange="this.size=0;{EVENT_ONCHANGE}"
                comboBoxItem: `<option value="{VALUE}"{SELECTED}>{TEXT}</option>`
            }
        };
        
        this.formConfig = false;
        if(this.iOpt.isConfig){
            this.formConfig = {};
        }
        
        this.nextEl = false;
        
        this.iniForm();
    }
    
    iniForm(){
    
    
    
    }
    
    create(){
        let form_,fieldset = ``,items = ``,tempItem,tempValue,tempArray,tempName,
            objFieldTypes = {
                text: this.tplForm.fields.text.wzOut({
                    TYPE: `text`,
                    WZ_TYPE: `TextDefault`
                }),
                textLarge: this.tplForm.fields.text.wzOut({
                    TYPE: `text`,
                    WZ_TYPE: `TextLarge`
                }),
                textLargeX: this.tplForm.fields.text.wzOut({
                    TYPE: `text`,
                    WZ_TYPE: `TextLargeX`
                }),
                listArea: this.tplForm.fields.list.wzOut({
                    WZ_TYPE: `ListArea`
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
                    WZ_TYPE: `ComboBox`,
                    SIZE: ` size="5"`,
                    EVENT_TYPE: `onBlur`
                })
            };
        
        if(this.iOpt.items){
            for(let $_Group in this.iOpt.items){
                items = ``;
                for(let $_FieldName in this.iOpt.items[$_Group]){
                    tempItem = this.iOpt.items[$_Group][$_FieldName];
                    tempValue = tempItem.value || ``;
                    if(this.formConfig){
                        tempName = $_FieldName.split(`::`);
                        this.formConfig[tempName[0]] = this.formConfig[tempName[0]] || new eConfig({name: tempName[0]});
                        tempValue = this.formConfig[tempName[0]].get(tempName[1]) || tempValue;
                        if( Array.isArray(tempValue) ){
                            tempArray = tempValue;
                            tempValue = ``;
                            for(let $_Index in tempArray){
                                if(tempValue !== ``) tempValue += `\n`;
                                tempValue += `${tempArray[$_Index]}`;
                            }
                            //console.log(tempValue);
                        }else if(tempItem.type.includes(`comboBox`) || tempItem.type === `listBox`){
                            tempValue = ``;
                            for(let $_Value in tempItem.data){
                                tempValue += this.tplForm.fields.comboBoxItem.wzOut({
                                    VALUE: $_Value,
                                    TEXT: (tempItem.dataUseValue) ? $_Value : tempItem.data[$_Value],
                                    SELECTED: `${(this.formConfig[tempName[0]].get(tempName[1]) === $_Value) ? ` selected` : ``}`
                                });
                            }
                        }
                        
                    }
                    //if(tempItem.type === `comboBox`){
                    
                    //}else{
                        items += objFieldTypes[tempItem.type || `text`].wzOut({
                            LABEL: tempItem.label || $_FieldName,
                            EVENT_ONCHANGE: this.tplForm.events.onChange[(this.iOpt.isWnd) ? `wnd` : `cms`].wzOut({
                                RELOAD: tempItem.reload || false
                            }),
                            EVENT_ONFOCUS: this.tplForm.events.onFocus[(this.iOpt.isWnd) ? `wnd` : `cms`],
                            VALUE: tempValue,
                            NAME: $_FieldName,
                            SINGLE_ATTRIBUTES: `${(tempItem.isRequired) ? ` required` : ``}`
                        });
                    //}
                    
                }
                
                if(fieldset !== ``) fieldset += `<br />`;
                fieldset += this.tplForm.Fieldset.wzOut({
                    TITLE: $_Group,
                    ITEMS: items
                });
            }
        }
    
        
        form_ = this.tplForm.Frame.wzOut({
            ID: this.iOpt.id,
            FIELD_SETS: this.tplForm.Fieldset.wzOut({
                TITLE: this.iOpt.title,
                ITEMS: `${fieldset}`
            })
        });
        
        return form_;
    }
    
    onChange($el){
        let wzType = $el.getAttribute(`wzType`),isWnd = this.iOpt.isWnd,
            newValue = $el.value,
            saveLoc = $el.name.split(`::`);
        
        if(wzType === `ListArea`){
            newValue = $el.value.split(`\n`);
        }
        
        // save changes
        this.formConfig[saveLoc[0]].set(saveLoc[1],newValue);
        
        // let user know data was saved
        wzNotify.save($el.parentNode.firstChild.innerHTML,`Saved`);
    
        //this.create();
        
        setTimeout(() => {
            if(isWnd){
                wzWND(isWnd).refresh();
            }
            wzCMS(appConfig.get('cms'));
        },10);
    }
    onFocus($el){
        this.nextEl = $el;
    }
    
};

wzOnFormEnter = function(e){
    if (e.keyCode === 13) {
        document.activeElement.blur();
    }
};
