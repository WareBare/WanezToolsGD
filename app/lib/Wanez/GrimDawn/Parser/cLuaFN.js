/**
 * Created by WareBare on 11/8/2016.
 */

class cLuaFN extends libWZ.Core.cBase{
    
    constructor(){
        super();
    }
    
    /**
     *
     * @param $fileContents
     */
    parseData($fileContents){
        let parsedData = {},parts,tempStr,
            fileLines = $fileContents.split('\n');
        
        for( let $_Index in fileLines ){
            parts = fileLines[$_Index].split(' ');
            parsedData[parts[1]] = parts[2];
            //parts = fileLines[$_Index].substr(9,fileLines[$_Index].indexOf('()')-9);
            //if(parts){
                //parsedData[parts] = fileLines[$_Index];
            //}
        }
        //this.stringifyData(parsedData);
        return parsedData;
    }
    
    /**
     *
     * @param $data
     */
    stringifyData($data){
        let stringifiedData = '';
        
        for( let $_Key in $data ){
            if(stringifiedData != '') stringifiedData += '\n';
            stringifiedData += `function ${$_Key} ${$data[$_Key]} end;`;
        }
        //console.log(stringifiedData);
        return stringifiedData;
    }
    
    /**
     *
     * @param $fileContents
     */
    parseData_old($fileContents){
        let parsedData = {},parts,tempStr,
            fileLines = $fileContents.split('\n');
        
        for( let $_Index in fileLines ){
            parts = fileLines[$_Index].substr(9,fileLines[$_Index].indexOf('()')-9);
            if(parts){
                parsedData[parts] = fileLines[$_Index];
            }
        }
        
        return parsedData;
    }
    
    /**
     *
     * @param $data
     */
    stringifyData_old($data){
        let stringifiedData = '';
        
        for( let $_Key in $data ){
            if(stringifiedData != '') stringifiedData += '\n';
            stringifiedData += $data[$_Key];
        }
        
        return stringifiedData;
    }
}

module.exports = cLuaFN;
