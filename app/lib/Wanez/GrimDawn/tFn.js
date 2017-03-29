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
    
        objPaths.Core = `${workingFolder}/database`;
        objPaths.Mod = `${workingFolder}/mods/${modFolder}/database`;
        objPaths.Source = `${workingFolder}/mods/${modFolder}/source`;
    
        return objPaths;
    }
};

module.exports = trait;
