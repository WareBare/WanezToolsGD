/**
 * Created by WareBare on 3/25/2017.
 */

module.exports = class cUI extends libWZ.GrimDawn.cBase{
    
    constructor($masterySlot,$pathClassTable){
        super();
        
        this.aMastery = {
            "Slot": $masterySlot,
            "Paths":{
                "UI": $pathClassTable.substring(0, $pathClassTable.lastIndexOf("/"))
            },
            "_ClassTable": this._modDBR_DS.getDataPath($pathClassTable)
        };
        this.iniSkills = true;
    }
    
    reParseData(){
        for( let $_Index in this.aMastery.Skills ){
            for( let $_Key in this.aMastery.Skills[$_Index] ){
                if(this.aMastery.Skills[$_Index][$_Key]._UI) this.aMastery.Skills[$_Index][$_Key]._UI.reload();
                if(this.aMastery.Skills[$_Index][$_Key]._Data) this.aMastery.Skills[$_Index][$_Key]._UI.reload();
            }
        }
        console.log('reparsed Mastery Data');
    }
    
    exists(){
        return this.aMastery._ClassTable;
    }
    
    getMasteryName(){
        // ToDo: get name from tag files
        return this.getTagValue(this.aMastery._ClassTable.getData().skillTabTitle);
        //return this.aMastery.Paths.UI;
    }
    
    /**
     *
     * @return {[Used&FreeSlots,Unused]}
     */
    getMasterySkills(){
        if(/*this.iniSkills || */!this.aMastery.Skills) {
            this.aMastery.Skills = this.loadSkills();
            //this.iniSkills = false;
        }
        return this.aMastery.Skills;
    }
    
    /**
     * loop through skills until it doesnt have a buffSkillName/petSkillName parameter
     * @param $_skillDBR
     */
    loopBuff($_skillDBR){
        let actualSkill = false,temp;
        if(wzIsData($_skillDBR)){ // check if it even exist
            actualSkill = $_skillDBR; // set var with skill data
            
            // temp var with either buff or pet info - wont return true if neither exist
            temp = actualSkill.getData().buffSkillName || actualSkill.getData().petSkillName;
            if(temp) actualSkill = this.loopBuff(this._modDBR_DS.getDataPath(temp)); // check if temp is true and use the new path to get the actual data (or again buff/pet info and loop in again - lets hope this is never going to be endless, ofc it would require files linking each other...)
        }
        return actualSkill;
    }
    
    loadSkills(){
        // this._tmpApp.UI.SkillSlots.X
        // this._tmpApp.UI.SkillSlots.Y
        let aSkills = {},skillTier,unusedSkills = [],fileUI,fileData,skillCoords_,aConnector = [];
        
        // generate Layout
        for( let $_Line in this._tplApp.UI.SkillSlots.Y ){
            for( let $_Tier in this._tplApp.UI.SkillSlots.X ){
                skillTier = parseInt($_Tier) + 1;
                skillCoords_ = this._tplApp.UI.SkillSlots.X[$_Tier] + ',' + this._tplApp.UI.SkillSlots.Y[$_Line];
                aSkills[skillCoords_] = {
                    "isUsed": false,
                    "Tier": skillTier,
                    "Line": $_Line,
                    "Connected": false,
                    "Parent": false
                }
            }
        }
        
        // ToDo: add ui/skills/button.dbr info (TPL: database/templates/ingameui/skillbutton.tpl)
        
        const pathUI = this._modDBR_DS.getDataPath(this.aMastery.Paths.UI);
        
        for( let $_Index in pathUI ){
            fileUI = pathUI[$_Index];
            //console.log($_Index);
            if(wzIsData(fileUI)){
                if(fileUI.getTemplate() && fileUI.getTemplate() == 'database/templates/ingameui/skillbutton.tpl' && $_Index != 'classtraining.dbr'){
                    let coords = fileUI.getData().bitmapPositionX+','+fileUI.getData().bitmapPositionY;
                    
                    fileData = this.loopBuff(this._modDBR_DS.getDataPath(fileUI.getData().skillName));
                    
                    
                    if(aSkills[coords]){
                        if(fileData.getData().skillConnectionOn && fileData.getData().skillConnectionOn != ''){
                            let conCoords = {};
                            for( let i = 1; i <= fileData.getData().skillConnectionOn.length; i++ ){
                                // ToDo: type of connection (fileData.getData().skillConnectionOn[i])
                                conCoords[this._tplApp.UI.SkillSlots.X[(aSkills[coords].Tier + i)-2] + ',' + this._tplApp.UI.SkillSlots.Y[aSkills[coords].Line]] = 'app/img/'+fileData.getData().skillConnectionOn[i-1].replace(/^.*[\\\/]/, '').replace(/\.tex/,'.png');
                                //conCoords.push();
                            }
                            aConnector.push([
                                fileData,
                                conCoords
                            ]);
                        }
                        aSkills[coords].isUsed = true;
                        aSkills[coords]._UI = fileUI;
                        aSkills[coords]._Data = fileData;
                        aSkills[coords].Icon = fileData.getSkillIcon(wzGD_dataSet.PathsDS.Mod.Source);
                    }else{
                        //console.log('Unused Skill');
                        unusedSkills.push({
                            "_UI": fileUI,
                            "_Data": fileData,
                            "Icon": ""
                        });
                    }
                    
                }
            }
        }
        
        console.log(aConnector);
        for( let $_Index in aConnector ){
            for( let $_CoordKey in aConnector[$_Index][1] ){
                aSkills[$_CoordKey].Connected = aConnector[$_Index][1][$_CoordKey];
                if(aSkills[$_CoordKey].isUsed) aSkills[$_CoordKey].Parent = aConnector[$_Index][0];
            }
        }
        /* // skillUpBitmapName
         var tga = new TGA();
         tga.open( "C:/Users/WareBare/WebstormProjects/GDModdingEditor/app/img/target.tga", function(){
         document.body.appendChild( tga.getCanvas() );
         console.log(tga.getCanvas());
         });
         */
        
        // ToDo: add skills/.dbr info
        //this.aMastery.Skills = aSkills;
        return [aSkills,unusedSkills];
    }
    
};
