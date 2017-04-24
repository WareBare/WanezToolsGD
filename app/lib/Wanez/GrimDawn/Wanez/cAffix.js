/**
 * Created by WareBare on 4/23/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cAffix extends libWZ.GrimDawn.Wanez.cItem{
    
    constructor($arrAffixes,$lvl,$affixFile,$tier){
        super('Affix',$arrAffixes,$lvl,$affixFile,$tier);
        
        
    }
    
    
    
    // lootName{SLOT}; lootWeight{SLOT}
    
    // AFFIX: prefix / suffix
    // {AFFIX}TableName{SLOT}; {AFFIX}TableLevelMin{SLOT}; {AFFIX}TableLevelMin{SLOT}; {AFFIX}TableWeight{SLOT}
    
    // brokenTableName1
    
    // AFFIX: Prefix / Suffix
    // rare{AFFIX}TableName{SLOT}; rare{AFFIX}TableLevelMin{SLOT}; rare{AFFIX}TableLevelMin{SLOT}; rare{AFFIX}TableWeight{SLOT}
    
    
    // bothPrefixSuffix; rareBothPrefixSuffix
    // rarePrefixNormalSuffix; normalPrefixRareSuffix
    // noPrefixNoSuffix
    // prefixOnly; suffixOnly
    // rarePrefixOnly; rareSuffixOnly
    // brokenOnly
    
};
