/**
 * Created by WareBare on 11/8/2016.
 */

class cTags extends libWZ.Core.cBase{
    
    constructor(){
        super();
    }
    
    /**
     *
     * @param $fileContents
     */
    parseData($fileContents){
        let parsedData = {},parts,
            fileLines = $fileContents.split('\n');
        
        for( let $_Index in fileLines ){
            parts = fileLines[$_Index].split('=');
            if(parts[1]){
                parsedData[parts[0]] = parts[1];
            }
        }
    
        return parsedData;
    }
    
    /**
     *
     * @param $data
     */
    stringifyData($data){
        let stringifiedData = '',convValue,
            tmpOut = '# modified with WanezToolsGD (https://github.com/WareBare/WanezToolsGD)\n\n{DATA}\n\n# Tool Created by: WareBare';
        
        for( let $_Key in $data ){
            if(stringifiedData != '') stringifiedData += '\n';
            stringifiedData += $_Key+'='+$data[$_Key];
        }
        
        return tmpOut.wzOut({
            "DATA": stringifiedData
        });
    }
}

module.exports = cTags;
