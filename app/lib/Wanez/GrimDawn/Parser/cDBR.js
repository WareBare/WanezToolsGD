/**
 * Created by WareBare on 10/31/2016.
 *
 * parse .dbr and convert them to an array
 *
 */

class cDBR extends libWZ.Core.cBase{
    
    constructor(){
        super();
    }
    
    /**
     *
     * @param $fileContents
     */
    parseData($fileContents){
        //return JSON.parse(super.file_get_contents(this.filepath));
        let parsedData = {},
            rows = $fileContents.split('\n'),parts,partValue;
        
        for( let $_index in rows ){
            if(rows[$_index] != ''){
                parts = rows[$_index].split(',');
    
                partValue = parts[1].split(';');
                parsedData[parts[0]] = (partValue.length > 1) ? partValue : parts[1]; // Number(parts[1]) || parts[1]
            }
        }
        
        return parsedData;
        
        //return this.stringifyData(parsedData);
    }
    
    /**
     *
     * @param $data
     */
    stringifyData($data){
        let stringifiedData = '',convValue;
        
        for( let $_Key in $data ){
            if(stringifiedData != '') stringifiedData += '\n';
            convValue = $data[$_Key];
            if(Array.isArray($data[$_Key])){
                convValue = '';
                for( let $_Index in $data[$_Key] ){
                    if(convValue != '') convValue += ';';
                    convValue += $data[$_Key][$_Index];
                }
            }
            stringifiedData += $_Key+','+convValue+',';
        }
        
        return stringifiedData;
    }
}

module.exports = cDBR;

