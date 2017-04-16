/**
 * Created by WareBare on 4/15/2017.
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
        
        this.validSteps.Step02 = false;
        
        if(this.formData.Step02){
            tempStep = this.formData.Step02;
            
            
            if(err_ === ``){
                this.validSteps.Step02 = true;
            }
        }
        
        return `<ul>${err_}</ul>`;
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
            onChange: {
                //custom: `submitForm(this)`
            },
            items: {
                'Stats (Flat)': { //  (Amount Per Level maxLevel 100)
                    'Step02::characterStrength': {
                        label: `Physique`,
                        type: `number`,
                        step: `any`
                    },
                    'Step02::characterDexterity': {
                        label: `Cunning`,
                        type: `number`,
                        step: `any`
                    },
                    'Step02::characterIntelligence': {
                        label: `Spirit`,
                        type: `number`,
                        step: `any`,
                        newLine: true
                    },
                    'Step02::characterLife': {
                        label: `Health`,
                        type: `number`,
                        step: `any`
                    },
                    'Step02::characterMana': {
                        label: `Energy`,
                        type: `number`,
                        step: `any`,
                        newLine: true
                    },
                    'Step02::characterLifeRegen': {
                        label: `Health Regen`,
                        type: `number`,
                        step: `any`
                    },
                    'Step02::characterManaRegen': {
                        label: `Energy Regen`,
                        type: `number`,
                        step: `any`,
                        newLine: true
                    },
                    'Step02::characterDefensiveAbility': {
                        label: `DA`,
                        type: `number`,
                        step: `any`
                    },
                    'Step02::characterOffensiveAbility': {
                        label: `OA`,
                        type: `number`,
                        step: `any`
                    }
                },
                'Modifier (%)': {
                    'Step02::characterStrengthModifier': {
                        label: `Physique`,
                        type: `number`,
                        step: `any`
                    },
                    'Step02::characterDexterityModifier': {
                        label: `Cunning`,
                        type: `number`,
                        step: `any`
                    },
                    'Step02::characterIntelligenceModifier': {
                        label: `Spirit`,
                        type: `number`,
                        step: `any`,
                        newLine: true
                    },
                    'Step02::characterLifeModifier': {
                        label: `Health`,
                        type: `number`,
                        step: `any`
                    },
                    'Step02::characterManaModifier': {
                        label: `Energy`,
                        type: `number`,
                        step: `any`,
                        newLine: true
                    },
                    'Step02::characterLifeRegenModifier': {
                        label: `Health Regen`,
                        type: `number`,
                        step: `any`
                    },
                    'Step02::characterManaRegenModifier': {
                        label: `Energy Regen`,
                        type: `number`,
                        step: `any`,
                        newLine: true
                    },
                    'Step02::characterRunSpeedModifier': {
                        label: `Mov. Speed`,
                        type: `number`,
                        step: `any`
                    },
                    'Step02::characterSpellCastSpeedModifier': {
                        label: `Cast Speed`,
                        type: `number`,
                        step: `any`
                    },
                    'Step02::characterAttackSpeedModifier': {
                        label: `Atk. Speed`,
                        type: `number`,
                        step: `any`,
                        newLine: true
                    },
                    'Step02::characterDefensiveAbilityModifier': {
                        label: `DA`,
                        type: `number`,
                        step: `any`
                    },
                    'Step02::characterOffensiveAbilityModifier': {
                        label: `OA`,
                        type: `number`,
                        step: `any`
                    }
                }
            }
        });
        
        out_ = `${this.forms.main_form.create()}<div class="errorPanel">${this.err_}</div>`;
        
        return out_;
    }
    
};
