/**
 * Created by WareBare on 4/13/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    contentType: `Step 1`,
    title: `Mastery Wizard`,
    wndId: `masteryWizard`,
    Settings: {
        height: `1000px`,
        width: `750px`,
    },
    formData: {},
    validSteps: {},
    err_: ``,
    dbr: {},
    
    genTrainingValues: function(){
        let objValues = {};
        
        for(let $_Field in this.formData.Step02){
            if(this.formData.Step02[$_Field] > 0){
                objValues[$_Field] = wzMathGD.genValues({
                    number: this.formData.Step02[$_Field],
                    dec: 6,
                    round: `down`
                });
            }
        }
        
        return objValues;
    },
    
    saveDBR: function(){
        
        for(let $_DBR in this.dbr){
            this.dbr[$_DBR].saveDBR();
        }
        
    },
    
    /**
     * create files - button onClick
     * @return {boolean}
     */
    create: function(){
        if(!this.validation()) return false;
        //console.log(this.formData);
        let enum_ = (`0${this.formData.Step01.Enum}`).slice(-2);
        //console.log(enum_);
        // records/skills/[FOLDER]/_classtraining_class01.dbr => database/templates/skill_mastery.tpl
        // skillBaseDescription,tagClass02SkillDescription00A,
        // skillDisplayName,tagClass02SkillName00A,
        // skillMaxLevel,50,
        // MasteryEnumeration,SkillClass02,
        //console.log(wzMathGD.genValues({number: 3.5,dec: 6,round: `down`}));
        // _CLASS_TRAINING \\
        this.dbr._classTraining = new WZ.GrimDawn.cData();
        this.dbr._classTraining.changeFilePath(`/${WZ.GrimDawn.tFn.getPaths().MasterySkills}/${this.formData.Step01.MasteryDirectory}/_classtraining_class${enum_}.dbr`);
        this.dbr._classTraining.fetchTemplate(`database/templates/skill_mastery.tpl`);
        this.dbr._classTraining.editDBR({
            skillBaseDescription: `tagClass${enum_}SkillDescription00`,
            skillDisplayName: `tagClass${enum_}SkillName00`,
            skillMaxLevel: `50`,
            skillTier: ``,
            MasteryEnumeration: `SkillClass${enum_}`,
            skillDownBitmapName: this.formData.Step01.classSkillBitmap.wzOut({TYPE: `down`,ENUM: enum_}),
            skillUpBitmapName: this.formData.Step01.classSkillBitmap.wzOut({TYPE: `up`,ENUM: enum_})
        });
        this.dbr._classTraining.editDBR(this.genTrainingValues());
        
        // records/skills/[FOLDER]/_classtree_class01.dbr => database/templates/skilltree.tpl
        // _CLASS_TRAINING \\
        this.dbr._classTree = new WZ.GrimDawn.cData();
        this.dbr._classTree.changeFilePath(`/${WZ.GrimDawn.tFn.getPaths().MasterySkills}/${this.formData.Step01.MasteryDirectory}/_classtree_class${enum_}.dbr`);
        this.dbr._classTree.fetchTemplate(`database/templates/skilltree.tpl`);
        this.dbr._classTree.editDBR({
            skillName1: `${WZ.GrimDawn.tFn.getPaths().MasterySkills}/${this.formData.Step01.MasteryDirectory}/_classtraining_class${enum_}.dbr`,
            skillLevel1: `0`
        });
        
        // CLASS_IMAGE \\
        this.dbr.classImage = new WZ.GrimDawn.cData();
        this.dbr.classImage.changeFilePath(`/${WZ.GrimDawn.tFn.getPaths().MasteryUI}/${this.formData.Step01.MasteryDirectory}/classimage.dbr`);
        this.dbr.classImage.fetchTemplate(`database/templates/ingameui/bitmapsingle.tpl`);
        this.dbr.classImage.editDBR({
            bitmapPositionX: `20`,
            bitmapPositionY: `20`,
            bitmapName: this.formData.Step01.classImage.wzOut({ENUM: enum_})
        });
        // CLASS_PANEL_BACKGROUND_IMAGE \\
        this.dbr.classPanelBackgroundImage = new WZ.GrimDawn.cData();
        this.dbr.classPanelBackgroundImage.changeFilePath(`/${WZ.GrimDawn.tFn.getPaths().MasteryUI}/${this.formData.Step01.MasteryDirectory}/classpanelbackgroundimage.dbr`);
        this.dbr.classPanelBackgroundImage.fetchTemplate(`database/templates/ingameui/bitmapsingle.tpl`);
        this.dbr.classPanelBackgroundImage.editDBR({
            bitmapName: `ui/skills/skills_classbackgroundimage.tex`,
            bitmapPositionX: `0`,
            bitmapPositionY: `0`
        });
        // CLASS_PANEL_REALLOCATION_IMAGE \\
        this.dbr.classPanelReallocationImage = new WZ.GrimDawn.cData();
        this.dbr.classPanelReallocationImage.changeFilePath(`/${WZ.GrimDawn.tFn.getPaths().MasteryUI}/${this.formData.Step01.MasteryDirectory}/classpanelreallocationimage.dbr`);
        this.dbr.classPanelReallocationImage.fetchTemplate(`database/templates/ingameui/bitmapsingle.tpl`);
        this.dbr.classPanelReallocationImage.editDBR({
            bitmapName: `ui/skills/skills_classreallocationbackgroundimage.tex`,
            bitmapPositionX: `0`,
            bitmapPositionY: `0`
        });
        // CLASS_TABLE \\
        this.dbr.classTable = new WZ.GrimDawn.cData();
        this.dbr.classTable.changeFilePath(`/${WZ.GrimDawn.tFn.getPaths().MasteryUI}/${this.formData.Step01.MasteryDirectory}/classtable.dbr`);
        this.dbr.classTable.fetchTemplate(`database/templates/ingameui/skillpanectrl.tpl`);
        this.dbr.classTable.editDBR({
            BasePane: `records/ui/skills/classcommon/skills_classpanelconfiguration.dbr`,
            tabSkillButtons: `${WZ.GrimDawn.tFn.getPaths().MasteryUI}/${this.formData.Step01.MasteryDirectory}/classtraining.dbr`,
            peekThroughColorBlue: `0.800000`,
            peekThroughColorGreen: `0.600000`,
            peekThroughColorRed: `0.200000`,
            peekThroughNextTierSound: `records/sounds/ui/spak_craftingpartcomplete.dbr`,
            skillPaneBaseBitmap: `${WZ.GrimDawn.tFn.getPaths().MasteryUI}/${this.formData.Step01.MasteryDirectory}/classpanelbackgroundimage.dbr`,
            skillPaneBaseReallocationBitmap: `${WZ.GrimDawn.tFn.getPaths().MasteryUI}/${this.formData.Step01.MasteryDirectory}/classpanelreallocationimage.dbr`,
            skillPaneMasteryBitmap: `${WZ.GrimDawn.tFn.getPaths().MasteryUI}/${this.formData.Step01.MasteryDirectory}/classimage.dbr`,
            skillTabTitle: `tagSkillClassName${enum_}`,
            skillPaneDescriptionTag: `tagSkillClassDescription${enum_}`,
        });
        // CLASS_TRAINING \\
        this.dbr.classTraining = new WZ.GrimDawn.cData();
        this.dbr.classTraining.changeFilePath(`/${WZ.GrimDawn.tFn.getPaths().MasteryUI}/${this.formData.Step01.MasteryDirectory}/classtraining.dbr`);
        this.dbr.classTraining.fetchTemplate(`database/templates/ingameui/skillbutton.tpl`);
        this.dbr.classTraining.editDBR({
            skillName: `${WZ.GrimDawn.tFn.getPaths().MasterySkills}/${this.formData.Step01.MasteryDirectory}/_classtraining_class${enum_}.dbr`,
            soundNameDown: `records/sounds/ui/spak_buttonskillmasteryincrement.dbr`,
            isCircular: `1`,
            bitmapPositionX: `157`,
            bitmapPositionY: `502`
        });
        // CLASS_TRAINING_BAR \\
        this.dbr.classTrainingBar = new WZ.GrimDawn.cData();
        this.dbr.classTrainingBar.changeFilePath(`/${WZ.GrimDawn.tFn.getPaths().MasteryUI}/${this.formData.Step01.MasteryDirectory}/classtrainingbar.dbr`);
        this.dbr.classTrainingBar.fetchTemplate(`database/templates/ingameui/bargraph.tpl`);
        this.dbr.classTrainingBar.editDBR({
            bitmapFullName: this.formData.Step01.classTrainingBar.wzOut({ENUM: enum_}),
            bitmapPositionX: `187`,
            bitmapPositionY: `514`
        });
        // CLASS_SELECTION_BUTTON \\
        this.dbr.classSelectionButton = new WZ.GrimDawn.cData();
        this.dbr.classSelectionButton.changeFilePath(`/${WZ.GrimDawn.tFn.getPaths().MasteryUI}/classselection/skills_classselectionbutton${enum_}.dbr`);
        this.dbr.classSelectionButton.fetchTemplate(`database/templates/ingameui/buttonstatic.tpl`);
        this.dbr.classSelectionButton.editDBR({
            bitmapNameDisabled: this.formData.Step01.classSelectionButtonImage.wzOut({TYPE: `disabled`,ENUM: enum_}),
            bitmapNameDown: this.formData.Step01.classSelectionButtonImage.wzOut({TYPE: `down`,ENUM: enum_}),
            bitmapNameInFocus: this.formData.Step01.classSelectionButtonImage.wzOut({TYPE: `over`,ENUM: enum_}),
            bitmapNameUp: this.formData.Step01.classSelectionButtonImage.wzOut({TYPE: `up`,ENUM: enum_}),
            bitmapPositionX: `0`,
            bitmapPositionY: `0`,
            soundNameDown: `records/sounds/ui/spak_buttonclickgenericlarge.dbr`
        });
        // CLASS_SELECTION_TEXT \\
        this.dbr.classSelectionText = new WZ.GrimDawn.cData();
        this.dbr.classSelectionText.changeFilePath(`/${WZ.GrimDawn.tFn.getPaths().MasteryUI}/classselection/skills_classselectiontext${enum_}.dbr`);
        this.dbr.classSelectionText.fetchTemplate(`database/templates/ingameui/textstaticstring.tpl`);
        this.dbr.classSelectionText.editDBR({
            style: `records/ui/styles/text/style_special_skillnames.dbr`,
            textAlignmentX: `Center`,
            textAlignmentY: `Center`,
            textBoxXSize: this.formData.Step01.classSelectionButtonTextX,
            textBoxYSize: this.formData.Step01.classSelectionButtonTextY,
            textBoxX: `0`,
            textBoxY: `0`,
            textTag: `tagSkillClassName${enum_}`
        });
    
        let tempOpt = {};
        tempOpt[`skillTree${this.formData.Step01.Enum}`] = `${WZ.GrimDawn.tFn.getPaths().MasterySkills}/${this.formData.Step01.MasteryDirectory}/_classtree_class${enum_}.dbr`;
        this.dbr.femalepc01.editDBR(tempOpt);
        this.dbr.malepc01.editDBR(tempOpt);
        tempOpt = {};
        tempOpt[`skillCtrlPane${this.formData.Step01.Enum}`] = `${WZ.GrimDawn.tFn.getPaths().MasteryUI}/${this.formData.Step01.MasteryDirectory}/classtable.dbr`;
        this.dbr.masterTable.editDBR(tempOpt);
        
        let aButtons = this.dbr.classSelectionTable.__getField(`masteryMasteryButtons`),
            aTexts = this.dbr.classSelectionTable.__getField(`masteryMasteryText`),
            aBitmaps = this.dbr.classSelectionTable.__getField(`masteryMasterySelectedBitmapNames`),
            aTags = this.dbr.classSelectionTable.__getField(`masteryMasterySelectedDescriptionTags`);
    
        //this.formData.Step01.Enum - 1
        for(let i=0; i<30; i++){
            if(this.formData.Step01.Enum - 1 === i){
                aButtons[i] = `${WZ.GrimDawn.tFn.getPaths().MasteryUI}/classselection/skills_classselectionbutton${enum_}.dbr`;
                aTexts[i] = `${WZ.GrimDawn.tFn.getPaths().MasteryUI}/classselection/skills_classselectiontext${enum_}.dbr`;
                aBitmaps[i] = `ingameui/customui/gamepanels/playerclass${enum_}_roundicon.tex`;
                aTags[i] = `tagSkillClassDescription${enum_}`;
            }else{
                aButtons[i] = aButtons[i] || `placeholder_${i + 1}`;
                aTexts[i] = aTexts[i] || `placeholder_${i + 1}`;
                aBitmaps[i] = aBitmaps[i] || `placeholder_${i + 1}`;
                aTags[i] = aTags[i] || `placeholder_${i + 1}`;
            }
            
        }
        
        this.dbr.classSelectionTable.editDBR({
            masteryMasteryButtons: aButtons,
            masteryMasteryText: aTexts,
            masteryMasterySelectedBitmapNames: aBitmaps,
            masteryMasterySelectedDescriptionTags: aTags
        });
        // this.formData.Step01.classSelectionButton.wzOut({TYPE: `down`,ENUM: enum_})
        
        //this.dbr.classImage = tempClass;
        console.log(this.dbr);
        this.saveDBR();
    },
    
    
    nav_: function(){
        this.dbr.femalepc01 = _cms.Base.aGenderPC01[0];
        this.dbr.malepc01 = _cms.Base.aGenderPC01[1];
        
        this.err_ = this.validation();
        
        return [
            `Step 1`,
            `${(this.validSteps.Step01) ? `` : `.`}Step 2`,
            `${(this.validSteps.Step02) ? `` : `.`}Step 3`
        ];
    }
    
};
