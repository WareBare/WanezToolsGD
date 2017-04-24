/**
 * Created by WareBare on 4/23/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aLootTdyn extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            bellSlope: [`400.0`,`300.0`,`250.0`,`200.0`,`150.0`,`100.0`,`50.0`,`20.0`],
            bothPrefixSuffix: `1250`,
            brokenOnly: `0`,
            //brokenTableName1: ``,
            maxItemLevelEquation: `500`,
            minItemLevelEquation: `1`,
            noPrefixNoSuffix: `0`,
            normalPrefixRareSuffix: `1000`,
            prefixOnly: `0`,
            suffixOnly: `0`,
            rareBothPrefixSuffix: `750`,
            rarePrefixNormalSuffix: `1000`,
            rarePrefixOnly: `500`,
            rareSuffixOnly: `500`,
            targetLevelEquation: `(parentLevel*1)-2`
        };
        
        this.fetchTemplate(`database/templates/lootitemtable_dynweighted_dynaffix.tpl`);
        this.editDBR(this.opt);
    }
    
};
