/**
 * Created by WareBare on 4/8/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    //title: `Settings :: Grim Dawn`,
    titlePage: `UI`,
    
    mQualifiers: {
        Sword: `swords`,
        Axe: `axes`,
        Mace: `maces`,
        Dagger: `daggers`,
        Scepter: `scepters`,
        Axe2h: `two-handed axes`,
        Sword2h: `two-handed swords`,
        Mace2h: `two-handed maces`,
        Spear: `spears`,
        Staff: `staves`,
        Magical: `magical`,
        Shield: `shields`,
        Offhand: `focus`,
        Ranged1h: `one-handed ranged weapon`,
        Ranged2h: `two-handed ranged weapon`,
        dualWieldOnly: `^o[This is a melee dual-wielding technique. Also enables the ability to dual wield melee weapons.]`,
        dualRangedOnly: `^o[This is a ranged dual-wielding technique. Also enables the ability to dual wield ranged weapons.]`,
        dualRangedOrAllRangedOnly: `^o[This is a ranged technique. Also enables the ability to dual wield ranged weapons.]`,
        dualRangedOrRanged2hOnly: `^o[This is a ranged technique. Also enables the ability to dual wield ranged weapons.] (Does not work with Shields)`,
        shieldNoRanged: `^o[This is a melee technique using shields.]`,
        unarmedOnly: `unarmed`
    },
    mQualifierGroups: {
        '^n^o[Requires a weapon]': [`Sword`, `Axe`, `Mace`, `Dagger`, `Scepter`, `Axe2h`, `Sword2h`, `Mace2h`, `Spear`, `Staff`, `Ranged1h`, `Ranged2h`],
        '^n^o[Requires a melee weapon]': [`Sword`, `Axe`, `Mace`, `Dagger`, `Axe2h`, `Sword2h`, `Mace2h`, `Spear`],
        '^n^o[Requires a one-handed melee weapon]': [`Sword`, `Axe`, `Mace`, `Dagger`, `Spear`],
        '^n^o[Requires a two-handed melee weapon]': [`Axe2h`, `Sword2h`, `Mace2h`],
        '^n^o[Requires a ranged weapon]': [`Ranged1h`, `Ranged2h`],
        '^n^o[Requires a caster weapon]': [`Scepter`, `Staff`]
    },
    
    forms: {
        main_form:false
    },
    
    ApplyMondifierChange: function(el){
        let TempOpt = {};
        
        if(el.checked){
            TempOpt[el.value] = 1;
        }else{
            TempOpt[el.value] = 0;
        }
        
        this._mSkill.setField(`logic`,TempOpt);
    },
    
    UpdateQualifierTags: function(){
        let bFoundMatch = false, TempQualifiers, mUsedQualifiers = {}, mMatches = {},
            _Tags = wzStorageGD.__get(`text_en/${appConfig.get(`GrimDawn.Mastery.TagsSkills`)}`,`Tags`),
            skillBaseDescription = this._mSkill.getField(`logic`, `skillBaseDescription`),
            QualifierTagItems_ = ``,
            QualifierTag_ = ``;
        
        for(let kGroupText in this.mQualifierGroups){
            bFoundMatch = true;
            TempQualifiers = {};
            for(let kIndex in this.mQualifierGroups[kGroupText]){
                if(bFoundMatch && this._mSkill.getField(`logic`, parseInt(this.mQualifierGroups[kGroupText][kIndex])) ){
                    TempQualifiers[ this.mQualifierGroups[kGroupText][kIndex] ] = true;
                }else{
                    bFoundMatch = false;
                }
            }
            if(kGroupText === `^n^o[Requires a melee weapon]`){
                if(mMatches[`^n^o[Requires a weapon]`]){
                    bFoundMatch = false;
                }
            }else if(kGroupText === `^n^o[Requires a one-handed melee weapon]` || kGroupText === `^n^o[Requires a two-handed melee weapon]`){
                if(mMatches[`^n^o[Requires a weapon]`] || mMatches[`^n^o[Requires a melee weapon]`]){
                    bFoundMatch = false;
                }
            }else if(kGroupText === `^n^o[Requires a ranged weapon]`){
                if(mMatches[`^n^o[Requires a weapon]`]){
                    bFoundMatch = false;
                }
            }else if(kGroupText === `^n^o[Requires a caster weapon]`){
                if(mMatches[`^n^o[Requires a weapon]`]){
                    bFoundMatch = false;
                }
            }
            if(bFoundMatch){
                mMatches[kGroupText] = TempQualifiers;
                mUsedQualifiers = Object.assign(mUsedQualifiers, JSON.parse(JSON.stringify( TempQualifiers )));
            }
        }
        
        for(let kFieldName in this.mQualifiers){
            if( parseInt(this._mSkill.getField(`logic`, kFieldName)) && !mUsedQualifiers[kFieldName] ){
                mMatches[ this.mQualifiers[kFieldName] ] = true;
            }
            
        }
        
        for(let kOutput_ in mMatches){
            //QualifierTagItems_ += `^n- ${kOutput_}`;
            //QualifierTagItems_ += `^n${kOutput_}`;
            if(kOutput_.startsWith(`^`)){
                QualifierTagItems_ += `^n${kOutput_}`;
            }else{
                QualifierTagItems_ += `^nRequires ${kOutput_}`;
            }
        }
        if(parseInt(this._mSkill.getField(`logic`, `dualWieldOnly`))){
            //QualifierTagItems_ += `^n^o[This is a melee dual-wielding technique. Also enables the ability to dual wield melee weapons.]`;
        }
        if(parseInt(this._mSkill.getField(`logic`, `dualRangedOnly`))){
            //QualifierTagItems_ += `^n^o[This is a ranged dual-wielding technique. Also enables the ability to dual wield ranged weapons.]`;
        }
        if(parseInt(this._mSkill.getField(`logic`, `dualRangedOrRanged2hOnly`))){
            //QualifierTagItems_ += `^n^o[This is a ranged technique. Also enables the ability to dual wield ranged weapons.] (Does not work with Shields)`;
        }
        if(parseInt(this._mSkill.getField(`logic`, `dualRangedOrAllRangedOnly`))){
            //QualifierTagItems_ += `^n^o[This is a ranged technique. Also enables the ability to dual wield ranged weapons.]`;
        }
        if(parseInt(this._mSkill.getField(`logic`, `shieldNoRanged`))){
            //QualifierTagItems_ += `^n^o[This is a melee technique using shields.]`;
        }
    
        //QualifierTag_ = `{^fRequires the use of one of these:${QualifierTagItems_}}`;
        QualifierTag_ = `{^f${QualifierTagItems_}}`;
    
        if(_Tags.__getField(skillBaseDescription)){
            _Tags.__setField(skillBaseDescription, `${_Tags.__getField(skillBaseDescription).replace(/{\^f.*}/g, QualifierTag_)}`);
            _Tags.saveData();
        }
        
    },
    
    content_: function(){
        let out_;
        
        this.forms.main_form = new WZ.Core.cForm({
            id: 'main_form',
            //title: `Skill UI`,
            isWnd: this.wndId,
            isModule: this._mSkill,
            _tags: this._tagsSkills,
            onChange: {
                //custom: `submitForm(this)`
            },
            items: {
                'Skill File': {
                    /*
                    'logic::skillMasteryLevelRequired': {
                        label: `skillMasteryLevelRequired`,
                        type: `number`
                    },
                    */
                    'logic::skillMaxLevel': {
                        label: `skillMaxLevel`,
                        type: `number`
                    },
                    'logic::skillUltimateLevel': {
                        label: `skillUltimateLevel`,
                        type: `number`
                    },
                    'logic::skillDisplayName': {
                        label: `skillDisplayName (tag)`,
                        type: `textLargeX`
                    },
                    'logic::skillBaseDescription': {
                        label: `skillBaseDescription (tag)`,
                        type: `textLargeX`
                    },
                    'logic::skillDownBitmapName': {
                        label: `skillDownBitmapName (.tex)`,
                        type: `textLargeX`
                    },
                    'logic::skillUpBitmapName': {
                        label: `skillUpBitmapName (.tex)`,
                        type: `textLargeX`
                    }
                }
            }
        });
        
        let tplQualifiers = `<div>{BUTTONS}<div class="wndMasterySkillEdit">{FIELDSET}</div></div>`,
            tplQualifierButtons = `<span class="formBTN" onclick="wzWND('${this.wndId}').__getContent().UpdateQualifierTags();">Save Tags</span>`,
            tplQualifierFrame = `<fieldset><legend>Qualifying Weapons</legend>{ITEMS}</fieldset>`,
            tplQualifierItem = `<label><input type="checkbox" value="{TEXT}" onchange="wzWND('${this.wndId}').__getContent().ApplyMondifierChange(this);"{CHECKED} /><span>{TEXT}</span></label>`,
            Qualifiers_, QualifiersFrame_, QualifierItems_ = ``;
    
        for(let kFieldName in this.mQualifiers){
            QualifierItems_ += tplQualifierItem.wzReplace({
                TEXT: kFieldName,
                CHECKED: (parseInt(this._mSkill.getField(`logic`, kFieldName))) ? ` checked` : ``
            });
        }
        
        QualifiersFrame_ = tplQualifierFrame.wzReplace({
            ITEMS: QualifierItems_
        });
        
        Qualifiers_ = tplQualifiers.wzReplace({
            BUTTONS: tplQualifierButtons.wzReplace({
            
            }),
            FIELDSET: QualifiersFrame_
        });
        
        out_ = this.forms.main_form.create() + Qualifiers_;
        
        return out_;
    }
    
};
