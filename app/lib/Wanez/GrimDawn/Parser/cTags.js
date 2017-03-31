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
            fileLines = $fileContents.split('\r\n');
        
        for( let $_Index in fileLines ){
            parts = fileLines[$_Index].split('=');
    
            if(parts[1]){
                parsedData[parts[0]] = parts[1];
            }
        }
        //console.log(parsedData);
        return parsedData;
    }
    
    /**
     *
     * @param $data
     */
    stringifyData($data){
        let stringifiedData = '',convValue,
            tmpOut = '# modified with WanezToolsGD (https://github.com/WareBare/WanezToolsGD)\r\n\r\n{DATA}\r\n\r\n# Tool Created by: WareBare - Contents of the file have been made by the modder using the tool';
        
        for( let $_Key in $data ){
            if(stringifiedData != '') stringifiedData += '\r\n';
            stringifiedData += $_Key+'='+$data[$_Key];
        }
        
        return tmpOut.wzOut({
            "DATA": stringifiedData
        });
    }
}

module.exports = cTags;
