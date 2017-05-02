/**
 * Created by WareBare on 2/6/2017.
 */

let trait = {
    mathGetMul($mul){
        if(!$mul) return 1;
        if(!Array.isArray($mul)) $mul = [$mul];
        
        let newMul = 1,
            tempMul;
        
        for(let $_Index in $mul){
            tempMul = $mul[$_Index] / 100 + 1;
            newMul = newMul * tempMul;
        }
        
        return newMul;
    },
    mathMulGD($value,$dec = 0,$mul = false){
        if(!Array.isArray($value)) $value = [$value];
        let tempValue,
            newValue = [];
        
        for(let $_Index in $value){
            tempValue = parseInt($value[$_Index]) * this.mathGetMul($mul);
            
            newValue.push(tempValue.toFixed($dec));
        }
        
        return (newValue.length == 1) ? newValue[0] : newValue;
    },
    getPaths(){
        let objPaths = {},
            workingFolder = appConfig.get(`GrimDawn.Paths.Working`),
            modFolder = appConfig.get(`GrimDawn.Paths.Mods.${appConfig.get(`GrimDawn.activeMod`) || 0}`);
    
        objPaths.Install = appConfig.get(`GrimDawn.Paths.Game`);
        objPaths.InstallPFX = `${appConfig.get(`GrimDawn.Paths.Game`)}/source`;
        objPaths.Core = `${workingFolder}/database`;
        objPaths.Mod = `${workingFolder}/mods/${modFolder}/database`;
        objPaths.Source = `${workingFolder}/mods/${modFolder}/source`;
    
        objPaths.objMasteryUI = {
            core: `records/ui/skills`,
            custom: (appConfig.get(`GrimDawn.Mastery.PathUI`) && appConfig.get(`GrimDawn.Mastery.PathUI`) !== ``) ? appConfig.get(`GrimDawn.Mastery.PathUI`) : false
        };
        objPaths.MasteryUI = objPaths.objMasteryUI.custom || objPaths.objMasteryUI.core;
        //objPaths.MasteryUI = appConfig.get(`GrimDawn.Mastery.PathUI`);
        objPaths.objMasterySkills = {
            core: `records/skills`,
            custom: (appConfig.get(`GrimDawn.Mastery.PathSkill`) && appConfig.get(`GrimDawn.Mastery.PathSkill`) !== ``) ? appConfig.get(`GrimDawn.Mastery.PathSkill`) : false
        };
        objPaths.MasterySkills = objPaths.objMasterySkills.custom || objPaths.objMasterySkills.core;
        //objPaths.MasterySkills = appConfig.get(`GrimDawn.Mastery.PathSkill`);
        // icons
        // classselection
        // skillallocation
        objPaths.objMasterySource = {
            core: `ui/skills`,
            custom: (appConfig.get(`GrimDawn.Mastery.PathSource`) && appConfig.get(`GrimDawn.Mastery.PathSource`) !== ``) ? appConfig.get(`GrimDawn.Mastery.PathSource`) : false
        };
        objPaths.MasterySource = objPaths.objMasterySource.custom || objPaths.objMasterySource.core;
        //objPaths.MasterySource = (appConfig.get(`GrimDawn.Mastery.PathSource`) && appConfig.get(`GrimDawn.Mastery.PathSource`) !== ``) ? appConfig.get(`GrimDawn.Mastery.PathSource`) : `ui/skills`;
    
        objPaths.objMasteryIcons = {
            core: `ui/skills/icons`,
            custom: (appConfig.get(`GrimDawn.Mastery.PathIcons`) && appConfig.get(`GrimDawn.Mastery.PathIcons`) !== ``) ? appConfig.get(`GrimDawn.Mastery.PathIcons`) : false
        };
        objPaths.MasteryIcons = objPaths.objMasteryIcons.custom || objPaths.objMasteryIcons.core;
        
        return objPaths;
    }
};

module.exports = trait;
