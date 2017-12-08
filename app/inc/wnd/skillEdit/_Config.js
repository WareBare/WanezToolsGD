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
        Ranged1h: `pistols`,
        Ranged2h: `shotguns`,
        dualWieldOnly: `dual wield`,
        dualRangedOnly: `dual guns`,
        dualRangedOrRanged2hOnly: `dual guns and two-handed guns`,
        shieldNoRanged: `shield with melee weapon`,
        unarmedOnly: `unarmed`
    },
    mQualifierGroups: {
        'all weapons': [`Sword`, `Axe`, `Mace`, `Dagger`, `Scepter`, `Axe2h`, `Sword2h`, `Mace2h`, `Spear`, `Staff`, `Ranged1h`, `Ranged2h`],
        'all melee weapons': [`Sword`, `Axe`, `Mace`, `Dagger`, `Axe2h`, `Sword2h`, `Mace2h`, `Spear`],
        'all one-handed melee weapons': [`Sword`, `Axe`, `Mace`, `Dagger`, `Spear`],
        'all two-handed melee weapons': [`Axe2h`, `Sword2h`, `Mace2h`]/*,
        'all guns': [`Ranged1h`, `Ranged2h`],
        'all caster weapons': [`Scepter`, `Staff`]*/
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
            if(kGroupText === `all melee weapons`){
                if(mMatches[`all weapons`]){
                    bFoundMatch = false;
                }
            }else if(kGroupText === `all one-handed melee weapons` || kGroupText === `all two-handed melee weapons`){
                if(mMatches[`all weapons`] || mMatches[`all melee weapons`]){
                    bFoundMatch = false;
                }
            }else if(kGroupText === `all guns`){
                if(mMatches[`all weapons`]){
                    bFoundMatch = false;
                }
            }else if(kGroupText === `all caster weapons`){
                if(mMatches[`all weapons`]){
                    bFoundMatch = false;
                }
            }
            if(bFoundMatch){
                mMatches[kGroupText] = TempQualifiers;
                mUsedQualifiers = Object.assign(mUsedQualifiers, JSON.parse(JSON.stringify( TempQualifiers )));
            }
        }
        Log(mUsedQualifiers);
        for(let kFieldName in this.mQualifiers){
            if( parseInt(this._mSkill.getField(`logic`, kFieldName)) && !mUsedQualifiers[kFieldName] ){
                mMatches[ this.mQualifiers[kFieldName] ] = true;
            }
            
        }
        
        for(let kOutput_ in mMatches){
            QualifierTagItems_ += `^n- ${kOutput_}`;
        }
        if(parseInt(this._mSkill.getField(`logic`, `dualWieldOnly`))){
            QualifierTagItems_ += `^nEnables to dual-wield melee weapons, also requires you to dual-wield.`;
        }
        if(parseInt(this._mSkill.getField(`logic`, `dualRangedOnly`))){
            QualifierTagItems_ += `^nEnables to dual-wield pistols, also requires you to dual-wield guns.`;
        }
        if(parseInt(this._mSkill.getField(`logic`, `dualRangedOrRanged2hOnly`))){
            QualifierTagItems_ += `^nEnables to dual-wield pistols, also requires you to dual-wield pistols or using shotgun.`;
        }
        if(parseInt(this._mSkill.getField(`logic`, `dualRangedOrAllRangedOnly`))){
            QualifierTagItems_ += `^nEnables to dual-wield pistols.`;
        }
        if(parseInt(this._mSkill.getField(`logic`, `shieldNoRanged`))){
            QualifierTagItems_ += `^nRequires a shield, but you cannot use guns.`;
        }
    
        QualifierTag_ = `{^fRequires the use of one of these:${QualifierTagItems_}}`;
    
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
