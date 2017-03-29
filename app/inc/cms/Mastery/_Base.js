/**
 * Created by WareBare on 3/25/2017.
 */

module.exports = {
    tplContent: {},
    
    pathGD: false,
    masteryUI: false,
    _mUI: false,
    _tagsSkills: new WZ.GrimDawn.cData(`${WZ.GrimDawn.tFn.getPaths().Source}/text_en/${appConfig.get(`GrimDawn.Mastery.TagsSkills`)}.txt`,new WZ.GrimDawn.Parser.cTags()),
    _tagsClasses: new WZ.GrimDawn.cData(`${WZ.GrimDawn.tFn.getPaths().Source}/text_en/${appConfig.get(`GrimDawn.Mastery.TagsClasses`)}.txt`,new WZ.GrimDawn.Parser.cTags()),
    _mSkill: false,
    aGenderPC01: [
        new WZ.GrimDawn.cData(`${WZ.GrimDawn.tFn.getPaths().Mod}/records/creatures/pc/femalepc01.dbr`),
        new WZ.GrimDawn.cData(`${WZ.GrimDawn.tFn.getPaths().Mod}/records/creatures/pc/malepc01.dbr`)
    ],
    skillsMasterTable: new WZ.GrimDawn.cData(`${WZ.GrimDawn.tFn.getPaths().Mod}/records/ui/skills/skills_mastertable.dbr`),
    
    getMasteries: function(){
        // records/ui/skills
        let aDefault = wzIO.dir_get_contentsSync(`${this.pathGD.Mod}/records/ui/skills`),tempClass,
            aMasteryUI = {},tempMasteryUI = {};
        
        for( let $_Key in aDefault){
            if(aDefault[$_Key]['classtable.dbr']){
                aMasteryUI['records/ui/skills'] = aMasteryUI['records/ui/skills'] || {};
                tempClass = new WZ.GrimDawn.cData(`${aDefault[$_Key]['classtable.dbr']}`);
                aMasteryUI['records/ui/skills'][$_Key] = {
                    'dir': aDefault[$_Key],
                    'tag': this._tagsClasses.getData()[tempClass.getFieldValue(`skillTabTitle`)] || tempClass.getFieldValue(`skillTabTitle`)
                };
            }
        }
        
        //console.log(aMasteryUI);
        return aMasteryUI;
    },
    convSkillSlots: function(){
        let objSlots = {},tempTier,tempCoords,
            slots = appData.tpl_gd.UI.SkillSlots;
        
        for( let $_Line in slots.Y ){
            for( let $_Tier in slots.X ){
                objSlots[$_Line] = objSlots[$_Line] || {};
                tempTier = parseInt($_Tier) + 1;
                objSlots[$_Line][tempTier] = objSlots[$_Line][tempTier] || {};
                objSlots[$_Line][tempTier] = {
                    'X': slots.X[$_Tier],
                    'Y': slots.Y[$_Line]
                };
            }
        }
        
        return JSON.stringify(objSlots);
    },
    /**
     * not actually the method to edit a skill, but to get to the page where you can edit it - if a skill is set to be edited
     */
    goToEditSkill: function(){
        if(this._mSkill){
            wzCMS([`Mastery`,`Skill`]);
            this.loadContent('EditSkill');
        }else{
            wzNotify.err(`You need to pick a skill first`);
        }
    },
    
    ini: function(){
        this.pathGD = WZ.GrimDawn.tFn.getPaths();
        if(!this.masteryUI) this.masteryUI = this.getMasteries();
        
        //console.log(this.convSkillSlots());
    },
    
    content_: function(){
        let out_ = '';
        
        out_ = '';
        
        return out_;
    },
    sidebar_: function(){
        let out_ = '';
        
        return out_;
    }
    
};
