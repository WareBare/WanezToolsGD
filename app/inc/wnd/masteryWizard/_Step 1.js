/**
 * Created by WareBare on 4/13/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    forms: {},
    
    validation: function(){
        let err_ = ``,tempStep;
    
        this.validSteps.Step01 = false;
        
        if(this.formData.Step01){
            tempStep = this.formData.Step01;
            
            // \\
            if(!tempStep.MasteryDirectory || tempStep.MasteryDirectory === ``){
                err_ += `<li>Field "Mastery Directory" cannot be empty!</li>`;
            }
            // \\
            if(!tempStep.Enum || tempStep.Enum === `0`){
                err_ += `<li>You need to pick a "Mastery Enumeration"!</li>`;
            }
            // \\
            if(!tempStep.classImage || tempStep.classImage === ``) tempStep.classImage = `${WZ.GrimDawn.tFn.getPaths().MasterySource}/skillallocation/skills_classimage{ENUM}.tex`;
            if(!tempStep.classImage || !tempStep.classImage.includes(`.tex`)){
                err_ += `<li>"Class Image - Skill Allocation" cannot be empty and has to be a *.tex!</li>`;
            }
            // \\
            if(!tempStep.classSkillBitmap || tempStep.classSkillBitmap === ``) tempStep.classSkillBitmap = `${WZ.GrimDawn.tFn.getPaths().MasterySource}/skillallocation/skills_class{ENUM}trainingbutton{TYPE}.tex`;
            if(!tempStep.classSkillBitmap || !tempStep.classSkillBitmap.includes(`.tex`) || !tempStep.classSkillBitmap.includes(`{TYPE}`)){
                err_ += `<li>"Skill Bitmap" cannot be empty, has to be a *.tex and include {TYPE}!</li>`;
            }
            // \\
            if(!tempStep.classTrainingBar || tempStep.classTrainingBar === ``) tempStep.classTrainingBar = `${WZ.GrimDawn.tFn.getPaths().MasterySource}/skillallocation/skills_class{ENUM}trainingbar.tex`;
            if(!tempStep.classTrainingBar || !tempStep.classTrainingBar.includes(`.tex`)){
                err_ += `<li>"Class Training - Bar" cannot be empty and has to be a *.tex!</li>`;
            }
            // \\
            if(!tempStep.classSelectionButtonDBR || tempStep.classSelectionButtonDBR === ``) tempStep.classSelectionButtonDBR = `skills_classselectionbutton{ENUM}.dbr`;
            if(!tempStep.classSelectionButtonDBR || !tempStep.classSelectionButtonDBR.includes(`.dbr`) || !tempStep.classSelectionButtonDBR.includes(`{ENUM}`)){
                err_ += `<li>"Class Selection - Button (DBR)" cannot be empty, has to be a *.dbr and include {ENUM}!</li>`;
            }
            // \\
            if(!tempStep.classSelectionButtonImage || tempStep.classSelectionButtonImage === ``) tempStep.classSelectionButtonImage = `ui/skills/classselection/skills_buttonclassselection{TYPE}01.tex`;
            if(!tempStep.classSelectionButtonImage || !tempStep.classSelectionButtonImage.includes(`.tex`) || !tempStep.classSelectionButtonImage.includes(`{TYPE}`)){
                err_ += `<li>"Class Selection - Button (Image)" cannot be empty, has to be a *.tex and include {TYPE}!</li>`;
            }
            // \\
            if(!tempStep.classSelectionButtonTextX || tempStep.classSelectionButtonTextX === ``) tempStep.classSelectionButtonTextX = `275`;
            if(!tempStep.classSelectionButtonTextX){
                err_ += `<li>"Class Selection - Button (Text) SizeX" cannot be empty!</li>`;
            }
            // \\
            if(!tempStep.classSelectionButtonTextY || tempStep.classSelectionButtonTextY === ``) tempStep.classSelectionButtonTextY = `69`;
            if(!tempStep.classSelectionButtonTextY){
                err_ += `<li>"Class Selection - Button (Text) SizeY" cannot be empty!</li>`;
            }
    
            if(err_ === ``){
                this.validSteps.Step01 = true;
            }
        }
        
        return `<ul>${err_}</ul>`;
    },
    
    loadDBR: function(){
        let tempClass,freeEnum = [],tempField;
    
        this.dbr.masterTable = new WZ.GrimDawn.cData(`/records/ui/skills/skills_mastertable.dbr`);
        this.dbr.classSelectionTable = new WZ.GrimDawn.cData(`/records/ui/skills/classselection/skills_classselectiontable.dbr`);
        //this.dbr.femalepc01 = new WZ.GrimDawn.cData(`/records/creatures/pc/femalepc01.dbr`);
        //this.dbr.malepc01 = new WZ.GrimDawn.cData(`/records/creatures/pc/malepc01.dbr`);
        freeEnum.push(`Pick Enum`);
        for(let i=1; i<=40; i++){
            tempField = this.dbr.malepc01.__getField(`skillTree${i}`) || false;
            //freeEnum[i] = !(tempField && tempField.includes(`.dbr`)); //  ? true : false
            if(tempField && tempField.includes(`.dbr`)) {}else{
                freeEnum[i] = `${i}`;
            }
        }
        
        return {
            dataEnum: freeEnum
        };
    },
    
    content_: function(){
        let out_, dbr = this.loadDBR();
        //console.log(WZ.GrimDawn.tFn.getPaths());
        this.forms.main_form = new WZ.Core.cForm({
            id: 'main_form',
            //style: `width: 1000px;`,
            //title: `Skill UI`,
            isWnd: this.wndId,
            useContent: this.formData,
            onChange: {
                //custom: `submitForm(this)`
            },
            items: {
                'Basics (see the wiki for {ENUM} and {TYPE})': {
                    'Step01::MasteryDirectory': {
                        label: `Mastery Directory`,
                        type: `text`,
                        required: true
                    },
                    'Step01::Enum': {
                        label: `Enumeration`,
                        type: `comboBox`,
                        data: dbr.dataEnum
                    },
                    'Step01::classImage': {
                        label: `Class Image - Skill Allocation`,
                        type: `textLargeX`,
                        value: `${WZ.GrimDawn.tFn.getPaths().MasterySource}/skillallocation/skills_classimage{ENUM}.tex`
                    },
                    'Step01::classSkillBitmap': {
                        label: `Skill Bitmap`,
                        type: `textLargeX`,
                        value: `${WZ.GrimDawn.tFn.getPaths().MasterySource}/skillallocation/skills_class{ENUM}trainingbutton{TYPE}.tex`
                    },
                    'Step01::classTrainingBar': {
                        label: `Class Training - Bar`,
                        type: `textLargeX`,
                        value: `${WZ.GrimDawn.tFn.getPaths().MasterySource}/skillallocation/skills_class{ENUM}trainingbar.tex`
                    },
                    'Step01::classSelectionButtonDBR': {
                        label: `Class Selection - Button (DBR Filename)`,
                        type: `textLargeX`,
                        value: `skills_classselectionbutton{ENUM}.dbr`
                    },
                    'Step01::classSelectionButtonImage': {
                        label: `Class Selection - Button (Image)`,
                        type: `textLargeX`,
                        value: `ui/skills/classselection/skills_buttonclassselection{TYPE}01.tex`
                    },
                    'Step01::classSelectionButtonTextX': {
                        label: `Class Selection - Button (Text) SizeX`,
                        type: `number`,
                        value: `275`
                    },
                    'Step01::classSelectionButtonTextY': {
                        label: `Class Selection - Button (Text) SizeY`,
                        type: `number`,
                        value: `69`
                    }
                }
            }
        });
        
        out_ = `${this.forms.main_form.create()}<div class="errorPanel">${this.err_}</div>`;
        
        return out_;
    }
    
};
