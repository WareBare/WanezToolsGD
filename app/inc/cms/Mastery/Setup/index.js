/**
 * Created by WareBare on 4/10/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent: {},
    forms: {},
    
    TagsVanillaClasses: [
        ``,
        `Soldier`,
        `Demolitionist`,
        `Occultist`,
        `Nightblade`,
        `Arcanist`,
        `Shaman`,
        `Inquisitor`,
        `Necromancer`
    ],
    
    curSwitch: 0,
    
    _mSelection: false,
    currentButton: false,
    currentElement: false,
    moveTo: false,
    //buttonSize: [207,52],
    //windowSize: [960,554],
    
    saveCurrentData: function(){
        this._mSelection.saveModuleData([this.Base._tagsClasses,false,false]);
    },
    
    submitSwitch: function($el){
        this.curSwitch = parseInt($el.value);
        
        wzCMS(appConfig.get('cms'));
    },
    submitTagsForm: function($el){
        this.forms.main_form.onChange($el);
    },
    editMastery(){
    
    },
    
    genMasteryCombo: function($data){
        let aCombo = [],tempOpt;
        
        for(let $_Index01 in $data){
            for(let $_Index02 in $data){
                if($data[$_Index02].int > $data[$_Index01].int){
                    // tagSkillClassNameXXYY
                    tempOpt = [];
                    tempOpt[$data[$_Index01].int] = true;
                    tempOpt[$data[$_Index02].int] = true;
                    
                    aCombo.push({
                        tag: `tagSkillClassName${$data[$_Index01].str}${$data[$_Index02].str}`,
                        masteryEnums: tempOpt,
                        masteryNames: `${this.Base._tagsClasses.__getField(`tagSkillClassName${$data[$_Index01].str}`) || `${this.TagsVanillaClasses[parseInt($_Index01) + 1] || `No Tag`}`} + ${this.Base._tagsClasses.__getField(`tagSkillClassName${$data[$_Index02].str}`) || `${this.TagsVanillaClasses[parseInt($_Index02) + 1] || `No Tag`}`}`
                    });
                }
            }
        }
        
        return aCombo;
    },
    
    content_Config: function(){
        let info_ = `Only tags are listed similar to the way Crate is using them:<p>tagSkillClassNameXX<br />tagSkillClassNameXXYY<br />tagSkillClassDescriptionXX<br />tagClassXXSkillName00<br />tagClassXXSkillDescription00</p>Vanilla Combinations won't show up in here, but you can leave those fields empty, because the game will still load the Tags.`,
            itemsSwitch = {},
            itemsContent = {},
            curEnum_ = (`0${this.curSwitch}`).slice(-2),
            content_ = ``,
            tpl = `<div id="appGD_MasterySetup"><div class="switch">{SWITCH}</div><div class="content">{CONTENT}</div></div>`,
            usedEnum = [],tempField;
    
        itemsSwitch[`Show Mastery`] = itemsSwitch[`Show Mastery`] || {};
        
        for(let i=1; i<=40; i++){
            tempField = this.Base.aGenderPC01[0].__getField(`skillTree${i}`) || false;
            console.log(tempField);
            if(tempField && tempField.includes(`.dbr`)) {
                usedEnum.push({
                    int: i,
                    str: (`0${i}`).slice(-2)
                });
    
                itemsSwitch[`Show Mastery`][`show::${i}`] = {
                    label: this.Base._tagsClasses.__getField(`tagSkillClassName${(`0${i}`).slice(-2)}`) || `${this.TagsVanillaClasses[i]}`,
                    type: `radio`,
                    name: `radioShow`,
                    value: this.curSwitch
                };
            }
        }
        this.forms.switch_form = new WZ.Core.cForm({
            id: 'switch_form',
            isConfig: false,
            onChange: {
                custom: `submitSwitch(this)`
            },
            items: itemsSwitch
        });
        
        if(this.curSwitch){
            itemsContent[`Tags`] = itemsContent[`Tags`] || {};
            itemsContent[`Tags`][`classes::tagSkillClassName${curEnum_}`] = {
                label: `tagSkillClassName${curEnum_}`,// this.Base._tagsClasses.__getField(`tagSkillClassName${curEnum_}`),
                type: `textLargeX`,
                value: this.Base._tagsClasses.__getField(`tagSkillClassName${curEnum_}`) || ``
            };
            itemsContent[`Tags`][`classes::tagClass${curEnum_}SkillName00`] = {
                label: `tagClass${curEnum_}SkillName00`,// this.Base._tagsClasses.__getField(`tagSkillClassName${curEnum_}`),
                type: `textLargeX`,
                value: this.Base._tagsClasses.__getField(`tagClass${curEnum_}SkillName00`) || ``,
                newLine: true
            };
            itemsContent[`Tags`][`classes::tagSkillClassDescription${curEnum_}`] = {
                label: `tagSkillClassDescription${curEnum_}`,// this.Base._tagsClasses.__getField(`tagSkillClassName${curEnum_}`),
                type: `textArea`,
                value: this.Base._tagsClasses.__getField(`tagSkillClassDescription${curEnum_}`) || ``
            };
            itemsContent[`Tags`][`classes::tagClass${curEnum_}SkillDescription00`] = {
                label: `tagClass${curEnum_}SkillDescription00`,// this.Base._tagsClasses.__getField(`tagSkillClassName${curEnum_}`),
                type: `textArea`,
                value: this.Base._tagsClasses.__getField(`tagClass${curEnum_}SkillDescription00`) || ``,
                newLine: true
            };
            
            let aCombo = this.genMasteryCombo(usedEnum);
            for(let $_Index in aCombo){
                //if(aCombo[$_Index].tag.includes(curEnum_)){
                if(aCombo[$_Index].masteryEnums[this.curSwitch]){
                    itemsContent[`Tags`][`classes::${aCombo[$_Index].tag}`] = {
                        label: `${aCombo[$_Index].masteryNames}`,// this.Base._tagsClasses.__getField(`tagSkillClassName${curEnum_}`),
                        type: `textLarge`,
                        value: this.Base._tagsClasses.__getField(`${aCombo[$_Index].tag}`) || ``
                    };
                }
            }
            //console.log(aCombo);
            this.forms.main_form = new WZ.Core.cForm({
                id: 'main_form',
                //title: `Tags (saved inside /${appConfig.get(`GrimDawn.Mastery.TagsSkills`)})`,
                //isWnd: this.wndId,
                //isModule: this._mSkill,
                fieldSetStyle: `max-width: 1040px;`,
                _tags: {
                    classes: this.Base._tagsClasses
                },
                onChange: {
                    custom: `submitTagsForm(this)`
                },
                items: itemsContent
            });
        }
        
        
        return tpl.wzOut({
            INFO: info_,
            SWITCH: this.forms.switch_form.create(),
            CONTENT: (this.forms.main_form) ? this.forms.main_form.create() : info_
        });
    },
    
    saveOffset: function($el, $type){
        appConfig.set(`GrimDawn.Mastery.Offset${$type}`,parseInt($el.value));
        appConfig.set(`GrimDawn.Mastery.Offset${$type}`,parseInt($el.value));
        wzCMS(appConfig.get('cms'));
    },
    saveCoords: function($el,$type){
        $type = $type || false;
    
        if($type === `x`){
            this.currentElement.style.left = `${$el.value}px`;
            this._mSelection.setCoords(this.currentButton,[$el.value,false]);
        }else if($type === `y`){
            this.currentElement.style.top = `${$el.value}px`;
            this._mSelection.setCoords(this.currentButton,[false,$el.value]);
        }
    },
    moveButtonWithKey($direction){
        let fieldX = document.getElementById(`coordX`),
            fieldY = document.getElementById(`coordY`),
            newX = fieldX.value,newY = fieldY.value;
        
        switch($direction){
            case `Up`:
                newY = parseInt(fieldY.value) - 1;
                break;
            case `Right`:
                newX = parseInt(fieldX.value) + 1;
                break;
            case `Down`:
                newY = parseInt(fieldY.value) + 1;
                break;
            case `Left`:
                newX = parseInt(fieldX.value) - 1;
                break;
            default:
                console.log(`move button switch-case: default`);
                break;
        }
        fieldX.value = parseInt(newX);
        fieldY.value = parseInt(newY);
        this.currentElement.style.left = `${newX}px`;
        this.currentElement.style.top = `${newY}px`;
        this._mSelection.setCoords(this.currentButton,[newX,newY]);
    },
    
    moveButtonTo: function($el){
        if(!this.moveTo){
            this.moveTo = {
                X: document.getElementById(`coordX`).value,
                Y: document.getElementById(`coordY`).value
            };
            //console.log(this.moveTo.X);
        }else if(!this.moveTo.Sum){
            this.moveTo.Sum = [this.moveTo.X - document.getElementById(`coordX`).value,this.moveTo.Y - document.getElementById(`coordY`).value];
            //console.log(this.moveTo.Sum);
        }else{
            //console.log(parseInt(document.getElementById(`coordX`).value) + this.moveTo.Sum[0]);
            let newX = parseInt(this.moveTo.X) + this.moveTo.Sum[0],
                newY = parseInt(this.moveTo.Y) + this.moveTo.Sum[1];
            //console.log(`${newX} - ${newY}`);
            $el.parentElement.style.left = `${newX}px`;
            $el.parentElement.style.top = `${newY}px`;
            this._mSelection.setCoords(this.currentButton,[newX,newY]);
            this.moveTo = false;
        }
    },
    dragAllowDrop: function(e){
        e.preventDefault();
    },
    selectButton: function($el,$id){
        this.currentButton = this._mSelection.getButtonPerId($id);
        this.currentElement = $el.parentElement;
    
        document.getElementById(`coordX`).value = parseInt(this.currentElement.style.left);
        document.getElementById(`coordY`).value = parseInt(this.currentElement.style.top);
    },
    dragButtonStart: function(e,$el,$id){
        let shadow = $el.cloneNode(true);
        e.dataTransfer.setDragImage(shadow, 0, 0);
        if($id >= 0) this.selectButton($el,$id);
        //this.currentElement = $el.parentElement;
        //e.preventDefault();
        //if($wndId) _wnd = objWND[$wndId];
        //this.startX = parseInt($el.style.left);
        //this.startY = parseInt($el.style.top);
        this.startX = (e.pageX - $el.parentElement.getBoundingClientRect().left);
        this.startY = (e.pageY - $el.parentElement.getBoundingClientRect().top);
    },
    dragButton: function(e,$el){
        this.dragButtonEnd(e,$el);
        this.dragButtonStart(e,$el);
    
        document.getElementById(`coordX`).value = parseInt($el.parentElement.style.left);
        document.getElementById(`coordY`).value = parseInt($el.parentElement.style.top);
    },
    dragButtonEnd: function(e,$el){
        let mouseX = (e.pageX - $el.parentElement.getBoundingClientRect().left) - this.startX,
            newX = parseInt($el.parentElement.style.left) + mouseX,
            mouseY = (e.pageY - $el.parentElement.getBoundingClientRect().top) - this.startY,
            newY = parseInt($el.parentElement.style.top) + mouseY;
        //console.log(`${this.startX} => ${parseInt($el.parentElement.style.left) + mouseX}px - ${parseInt($el.parentElement.style.top) + mouseY}px`);
        //console.log(`${parseInt($el.style.left.replace(`px`,``)) + mouseX} - ${mouseY}`);
        //console.log($el.parentElement.getBoundingClientRect().left);
        //_wnd.move(`${parseInt(_wnd.wnd.style.left) + mouseX}px`,`${parseInt(_wnd.wnd.style.top) + mouseY}px`);
        $el.parentElement.style.top = `${newY}px`;
        $el.parentElement.style.left = `${newX}px`;
        document.getElementById(`coordX`).value = newX;
        document.getElementById(`coordY`).value = newY;
        
        //console.log($el.parentElement.id.split(`_`)[1]);
        //console.log(this.currentButton);
        this._mSelection.setCoords(this.currentButton,[newX,newY]);
        /*
        this.currentButton.Button.editDBR({
            bitmapPositionY: `${newY}`,
            bitmapPositionX:`${newX}`
        });
        this.currentButton.Text.editDBR({
            bitmapPositionY: `${newY}`,
            bitmapPositionX: `${newX}`
        });
        */
        //this.currentButton.Text.__setField();
    },
    
    loadSelectionModule(){
        this._mSelection = new WZ.GrimDawn.Mastery.mSelection(this.Base._tagsClasses);
    },
    
    content_Selection: function(){
        let out_,tempSelection;
    
        if(!this._mSelection) this.loadSelectionModule();
        tempSelection = this._mSelection;
        //this._mSelection = tempSelection;
        out_ = `${tempSelection.genOutput()}`;
    
        setTimeout(() => {
            tempSelection.placeButtons();
        },10);
        
        
        return out_;
    },
    
    setMasteryEnum(){
        // fetch skilltree (malepc01.dbr)
        let PC = wzStorageGD.__get(`records/creatures/pc/malepc01.dbr`),
            file,_file,opt,classTraining,
            aFiles = [];
        
        // loop through each skilltree entry, if entry is set go to the path set
        for(let i = 1; i<=30; i++){
            //aEnums[i] = PC.__getField(`skillTree${i}`) || false;
            if(file = PC.__getField(`skillTree${i}`)){
                try{
                    // check if file exists,
                    fs.accessSync(`${WZ.GrimDawn.tFn.getPaths().Mod}/${file}`);
                    classTraining = wzStorageGD.__get(`${file}`);
                    file = classTraining.__getField(`skillName1`);
                    fs.accessSync(`${WZ.GrimDawn.tFn.getPaths().Mod}/${file}`);
                    // if file exists update field MasteryEnumeration to SkillClassXX
                    _file = wzStorageGD.__get(`${file}`);
                    _file.editDBR({
                        MasteryEnumeration: `SkillClass${i}`
                    });
                    aFiles.push(_file);
                }catch(err){
                    // [if not delete entry]
                }
            }
            
        }
        
        
        for(let $_Enum in aFiles){
            aFiles[$_Enum].saveDBR();
        }
        
        // show success msg
    },
    
    content_Enumeration(){
        let out_;
        
        // content \\
        out_ = ``;
        
        // list/grid to edit enum (skilltree entry order) \\
        // needs skilltree (malepc01.dbr/femalepc01.dbr)
        // needs ui/skills/skills_mastertable
        // needs ui/skills/classselection/skills_classselectiontable.dbr
        
        // button for enum update
        out_ += appData.tpl.Buttons.Default.wzParseTPL([
            {
                "ONCLICK": "_cms.setMasteryEnum();",
                "TEXT": "Set Enum"
            }
        ]);
        
        return out_;
    },
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        let out_ = `Add a new Mastery, change Mastery Tags/Properties and move Buttons around on the Selection Window. More coming soon.`;
        
        if(this.contentType){
            if(this.contentType === `Config`){
                out_ = this.content_Config();
            }else if(this.contentType === `Selection`){
                out_ = this.content_Selection();
            }else if(this.contentType === `Enumeration`){
                out_ = this.content_Enumeration();
            }
        }
        
        return out_;
    },
    
    sidebarBtns_: function(){
        let showSaveSelection = false,
            showEditMastery = false;
        
        if(this.contentType === `Selection`){
            showSaveSelection = {
                "ONCLICK": "_cms.saveCurrentData()",
                "TEXT": "Save Selection"
            };
        }
        if(this.contentType === `Config` && this.curSwitch){
            showEditMastery = {
                "ONCLICK": "wzWND('masteryEdit').refresh();", // _cms.editMastery()
                "TEXT": "Edit Mastery"
            };
        }
        
        return [
            showSaveSelection,
            showEditMastery,
            {
                "ONCLICK": "wzWND('masteryWizard').refresh();",
                "TEXT": "New Mastery"
            },
            {
                "ONCLICK": "_cms.setMasteryEnum();",
                "TEXT": "Set Enum"
            }
        ];
    },
    sidebarList_: function(){
        return {
            'Config':[],
            //'Enumeration': [],
            'Selection': []
        }
    }
    
};
