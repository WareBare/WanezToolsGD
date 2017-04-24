/**
 * Created by WareBare on 4/22/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class dbrModule extends libWZ.GrimDawn.cModule{
    
    constructor($json,$dir){
        super();
    
        this.iJSON = $json;
        this.iDir = $dir;
    
        this.aModuleData = [
            this.iniDBR()
        ];
    
        //console.log(this.aModuleData[0]);
    }
    
    iniDBR(){
        let aDBR = [];
        
        for(let $_Index in this.iJSON){
            aDBR.push(this.parser(this.iJSON[$_Index]));
        }
        
        return aDBR;
    }
    
    parser($data){
        $data = wzSetArDef($data,{
            "wzAsset": false,
            "tpl": false,
            "fileExt": "dbr",
            "subDir": "",
            "replace": {},
            "dbr": {},
            "tags": {},
            "luaEvents": {},
            "misc": {},
            "skill": false
        });
        
        if(!$data.tpl) return false;
        if(!$data.wzAsset) return false;
        
        let aClasses = [], tempData, newData = $data,
            aReplace = this.parseReplace($data.replace);
        
        for(let $_Index in aReplace){
            aClasses.push(new libWZ.GrimDawn.Assets.dbrData($data,aReplace[$_Index],`${this.iDir}`));
        }
        
        return aClasses;
    }
    
    parseReplace($curData){
        let aReplace = [],aLoop = [];
        
        for(let $_Name in $curData){
            aLoop.push($_Name);
        }
        
        aReplace = this.loopReplace($curData,aLoop,0);
        
        return aReplace;
    }
    loopReplace($data,$loop,$pos,$curData,$aReplace){
        $curData = $curData || {};
        let aReplace = $aReplace || [],newData = {},tempData;
        
        if($loop.length > $pos){
            for(let $_Index in $data[$loop[$pos]]){
                
                $curData[$loop[$pos]] = $data[$loop[$pos]][$_Index];
                $curData[`${$loop[$pos]}_TAG`] = $data[$loop[$pos]][$_Index];
                if($data[$loop[$pos]][$_Index][2]) $curData[`${$loop[$pos]}_TAG2`] = $data[$loop[$pos]][$_Index][2];
                if(Array.isArray( $data[$loop[$pos]][$_Index] )){
                    $curData[`${$loop[$pos]}`] = $data[$loop[$pos]][$_Index][0];
                    if(!isNaN( $data[$loop[$pos]][$_Index][0] )){
                        $curData[`${$loop[$pos]}_1`] = this.parseIntToString($data[$loop[$pos]][$_Index][0],0);
                        $curData[`${$loop[$pos]}_2`] = this.parseIntToString($data[$loop[$pos]][$_Index][0],1);
                        $curData[`${$loop[$pos]}_3`] = this.parseIntToString($data[$loop[$pos]][$_Index][0],2);
                        $curData[`${$loop[$pos]}_4`] = this.parseIntToString($data[$loop[$pos]][$_Index][0],3);
                    }
                    $curData[`${$loop[$pos]}_TAG`] = $data[$loop[$pos]][$_Index][1];
                    if($data[$loop[$pos]][$_Index][2]) $curData[`${$loop[$pos]}_EQ`] = $data[$loop[$pos]][$_Index][2];
                }else if(!isNaN($data[$loop[$pos]][$_Index])){
                    $curData[`${$loop[$pos]}_1`] = this.parseIntToString($data[$loop[$pos]][$_Index],0);
                    $curData[`${$loop[$pos]}_2`] = this.parseIntToString($data[$loop[$pos]][$_Index],1);
                    $curData[`${$loop[$pos]}_3`] = this.parseIntToString($data[$loop[$pos]][$_Index],2);
                    $curData[`${$loop[$pos]}_4`] = this.parseIntToString($data[$loop[$pos]][$_Index],3);
                }
                
                tempData = this.loopReplace($data,$loop,$pos + 1,$curData,aReplace);
            }
        }else{
            for(let $_Key in $curData){
                newData[$_Key] = $curData[$_Key];
            }
            aReplace.push(newData);
        }
        
        return aReplace;
    }
    
};
