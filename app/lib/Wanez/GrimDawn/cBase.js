/**
 * Created by WareBare on 11/2/2016.
 */

class cBase extends libWZ.Core.cBase{
    
    constructor(){
        super();
        
        // DBR for mod folder (DS - DataSet)
        //noinspection JSUnresolvedVariable
        //this._modDBR_DS = wzGD_dataSet;
        //this._configGD = _wzData.Settings.configGD;
        
        //this._tplApp = _wzTPL.AppGD;
        //this.pathMod = this.getPathMod();
        
        //this._dataGD = _wzData.GrimDawn;
        //this._propertiesGD = this._dataGD.Properties;
        
        //this.traitsGD = libWZ.GrimDawn.oTraits;
        this.fn = libWZ.GrimDawn.tFn;
        
        /*
         * LvL | DPS
         *  1 |  50
         * 10 |  80 | 140
         * 25 | 110 | 191
         * 40 | 140 | 244
         * 55 | 165 | 287
         * 70 | 180 | 320
         * 85 | 200 | 345
         *
         * 58 = 0.35
         * 75 = 0.45
         * 103 = 0.62
         * 108 = 0.65
         * 132 = 0.80
         * 141 = 0.85
         * 157 = 0.95
         *
        
        let testLvL = 70,
            minMul = 0.10,
            maxMul = 0.22,
            atkMul = 1.0,
            minDmg = parseInt(this.mathStatValue('offensivePhysicalMin',testLvL,1,minMul)),
            maxDmg = parseInt(this.mathStatValue('offensivePhysicalMax',testLvL,1,maxMul)),
            avgDmg = (minDmg + maxDmg) / 2,
            atkSpeed = ( (1 + this.mathStatValue('characterBaseAttackSpeed',testLvL,1) * atkMul * -0.1) * 1.25).toFixed(2);
        console.log(`${minDmg} - ${maxDmg} (${avgDmg}); Speed ${atkSpeed}; DPS ${ (avgDmg * atkSpeed).toFixed(2)}`);
         */
        //this.mathStatValue('offensivePierceRatioMin',100,1,0.12);
        //console.log(this.getTagAttackSpeed(-0.17));
        //this.mathStatValue('characterManaRegen',4,1);
        /*
        let eq = 0;
        
        for(let i=1; i<=85; i++){
            //eq = (((((i*i*i)^1.16)*32)+((i*i)*300))*0.1)+36;
            //eq = (((((i*i*i)^1.16)*32)+((i*i)*300))*0.1)+36;
            eq = ((((((i*i*i)**1.16)*32)+((i*i)*300))*0.1)+36) - eq;
            console.log(`${i}: ${eq}`);
        }
        */
    }
    
    /*
    getTagValue($tag){
        return this._modDBR_DS.getTags()[$tag];
    }
    
    getPathMod(){
        return this._configGD.getData().Paths.Home+'/'+this._configGD.getData().Paths.Mods[this._configGD.getData().activeMod];
    }
    
    mathStatIndex($level){
        let ret = $level / 10;
        
        if(ret.toString().indexOf('.') != -1){
            //console.log('needs math');
            let tempDown = Math.floor(ret),
                tempUp = Math.ceil(ret),
                tempFraction = ret - tempDown;
            ret = [tempDown,tempUp,tempFraction];
        }
        
        //ret = Math.floor(ret);
        
        return ret;
    }
    
    mathStatValue($fieldName,$level,$dec,$mul){
        let prop = this._propertiesGD.getData().properties,
            settings = this._propertiesGD.getData().settings,
            ret = false;
    
        $fieldName = $fieldName || 'characterLife';
        $level = $level || 10;
        //$dec = $dec || 0;
        $mul = $mul || 1;
    
        let iLevel = $level,
            reqLevel = ($level >= 85) ? 85 : $level,
            mulIndex = this.mathStatIndex($level);
        //useDec = Math.pow(10,$dec);
        //useDec = ($dec == 0) ? 1 : 10 * $dec;
    
        let fieldValue = prop[$fieldName].value,
            fieldMul = (Array.isArray(mulIndex)) ?
                ((settings.scale[prop[$fieldName].scale][mulIndex[1]] - settings.scale[prop[$fieldName].scale][mulIndex[0]]) * mulIndex[2]) + settings.scale[prop[$fieldName].scale][mulIndex[0]]:
                settings.scale[prop[$fieldName].scale][mulIndex];
    
        ret = Math.ceil(fieldValue * fieldMul * $mul).toFixed($dec);
        //ret = fieldValue * fieldMul;
        //console.log(fieldValue);
        //console.log(fieldMul);
        //console.log(useDec);
        //console.log(ret);
        return ret;
    }
    */
}

module.exports = cBase;
