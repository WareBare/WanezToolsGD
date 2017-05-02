/**
 * Created by WareBare on 4/29/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    forms: {},
    
    genTrainingValues: function($value){
        let newValues = 0;
    
        newValues = wzMathGD.genValues({
            number: $value,
            dec: 6,
            round: `down`
        });
        
        return newValues;
    },
    
    submitForm($el){
        let fieldName = $el.name.split(`::`),
            tempOpt = {};
    
        tempOpt[fieldName[1]] = this.genTrainingValues($el.value);
        
        wzStorageGD.update(this.classTraining,tempOpt);
    },
    
    getFieldValue($fieldName){
        let classTraining = wzStorageGD.__get(this.classTraining),
            newValue = ``,length;
        
        if(classTraining.__getField($fieldName)){
            length = classTraining.__getField($fieldName).length;
            newValue = parseFloat(classTraining.__getField($fieldName)[length - 1]) / length;
        }
        
        return newValue
    },
    
    content_: function(){
        let out_;
        
        
        
        
        //console.log(dbr.dataEnum);
        this.forms.main_form = new WZ.Core.cForm({
            id: 'main_form',
            title: `Mastery Stats Per Level`,
            isWnd: this.wndId,
            fieldSetStyle: `width: 500px;`,
            useContent: this.formData,
            //isStorageClass: this.classTraining,
            onChange: {
                custom: `submitForm(this)`
            },
            items: {
                'Stats (Flat)': { //  (Amount Per Level maxLevel 100)
                    'Step02::characterStrength': {
                        label: `Physique`,
                        type: `number`,
                        step: `any`,
                        value: this.getFieldValue(`characterStrength`)
                    },
                    'Step02::characterDexterity': {
                        label: `Cunning`,
                        type: `number`,
                        step: `any`,
                        value: this.getFieldValue(`characterDexterity`)
                    },
                    'Step02::characterIntelligence': {
                        label: `Spirit`,
                        type: `number`,
                        step: `any`,
                        newLine: true,
                        value: this.getFieldValue(`characterIntelligence`)
                    },
                    'Step02::characterLife': {
                        label: `Health`,
                        type: `number`,
                        step: `any`,
                        value: this.getFieldValue(`characterLife`)
                    },
                    'Step02::characterMana': {
                        label: `Energy`,
                        type: `number`,
                        step: `any`,
                        newLine: true,
                        value: this.getFieldValue(`characterMana`)
                    },
                    'Step02::characterLifeRegen': {
                        label: `Health Regen`,
                        type: `number`,
                        step: `any`,
                        value: this.getFieldValue(`characterLifeRegen`)
                    },
                    'Step02::characterManaRegen': {
                        label: `Energy Regen`,
                        type: `number`,
                        step: `any`,
                        newLine: true,
                        value: this.getFieldValue(`characterManaRegen`)
                    },
                    'Step02::characterDefensiveAbility': {
                        label: `DA`,
                        type: `number`,
                        step: `any`,
                        value: this.getFieldValue(`characterDefensiveAbility`)
                    },
                    'Step02::characterOffensiveAbility': {
                        label: `OA`,
                        type: `number`,
                        step: `any`,
                        value: this.getFieldValue(`characterOffensiveAbility`)
                    }
                },
                'Modifier (%)': {
                    'Step02::characterStrengthModifier': {
                        label: `Physique`,
                        type: `number`,
                        step: `any`,
                        value: this.getFieldValue(`characterStrengthModifier`)
                    },
                    'Step02::characterDexterityModifier': {
                        label: `Cunning`,
                        type: `number`,
                        step: `any`,
                        value: this.getFieldValue(`characterDexterityModifier`)
                    },
                    'Step02::characterIntelligenceModifier': {
                        label: `Spirit`,
                        type: `number`,
                        step: `any`,
                        newLine: true,
                        value: this.getFieldValue(`characterIntelligenceModifier`)
                    },
                    'Step02::characterLifeModifier': {
                        label: `Health`,
                        type: `number`,
                        step: `any`,
                        value: this.getFieldValue(`characterLifeModifier`)
                    },
                    'Step02::characterManaModifier': {
                        label: `Energy`,
                        type: `number`,
                        step: `any`,
                        newLine: true,
                        value: this.getFieldValue(`characterManaModifier`)
                    },
                    'Step02::characterLifeRegenModifier': {
                        label: `Health Regen`,
                        type: `number`,
                        step: `any`,
                        value: this.getFieldValue(`characterLifeRegenModifier`)
                    },
                    'Step02::characterManaRegenModifier': {
                        label: `Energy Regen`,
                        type: `number`,
                        step: `any`,
                        newLine: true,
                        value: this.getFieldValue(`characterManaRegenModifier`)
                    },
                    'Step02::characterRunSpeedModifier': {
                        label: `Mov. Speed`,
                        type: `number`,
                        step: `any`,
                        value: this.getFieldValue(`characterRunSpeedModifier`)
                    },
                    'Step02::characterSpellCastSpeedModifier': {
                        label: `Cast Speed`,
                        type: `number`,
                        step: `any`,
                        value: this.getFieldValue(`characterSpellCastSpeedModifier`)
                    },
                    'Step02::characterAttackSpeedModifier': {
                        label: `Atk. Speed`,
                        type: `number`,
                        step: `any`,
                        newLine: true,
                        value: this.getFieldValue(`characterAttackSpeedModifier`)
                    },
                    'Step02::characterDefensiveAbilityModifier': {
                        label: `DA`,
                        type: `number`,
                        step: `any`,
                        value: this.getFieldValue(`characterDefensiveAbilityModifier`)
                    },
                    'Step02::characterOffensiveAbilityModifier': {
                        label: `OA`,
                        type: `number`,
                        step: `any`,
                        value: this.getFieldValue(`characterOffensiveAbilityModifier`)
                    }
                }
            }
        });
        
        out_ = `${this.forms.main_form.create()}`;
        
        return out_;
    }
    
};
