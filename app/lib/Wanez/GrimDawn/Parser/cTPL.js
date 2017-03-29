/**
 * Created by WareBare on 11/5/2016.
 *
 * Parse Templates ignoring Groups (for now)
 */

class cTPL extends libWZ.Core.cBase{
    
    constructor(){
        super();
    }
    
    parseGroup($parsedContents){
        let parsedData = [],value,aTemp = false,tempSplit,tempPath,grp=false;
        
        for( let $_Index in $parsedContents ){
            value = $parsedContents[$_Index];
            
            if(value == 'Group') grp = false;
            if(!grp){
                tempSplit = value.split('=');
                if(tempSplit[1]){
                    if(tempSplit[0].trim() == 'name') grp = tempSplit[1].trim().replace(/"/g,'');
                }
            }
            
            // declare aTemp (obj)
            if(value == 'Variable') aTemp = {};
            
            // add fields to aTemp (obj)
            if(aTemp){
                tempSplit = value.split('=');
                if(tempSplit[1]){
                    aTemp[tempSplit[0].trim()] = tempSplit[1].trim().replace(/"/g,'');
                }
            }
            
            // close aTemp and add it to the parsedData array
            if(aTemp && value == '}') {
                aTemp['group'] = grp;
                if(aTemp['type'] == 'include'){
                    tempPath = aTemp['defaultValue'].replace(/\\/g,'/').toLowerCase();
                    //console.log(tempPath);
                    //console.log(wzGD_tpl.getDataPath(tempPath).getData());
                    parsedData = parsedData.concat(wzGD_tpl.getDataPath(tempPath).getData());
                }else{
                    parsedData.push(aTemp);
                }
                aTemp = false;
            }
        }
        
        return parsedData;
    }
    
    parseContents($fileContents){
        let parsedContents = [],aLines;
    
        aLines = $fileContents.split('\n');
        for( let $_Index in aLines ){
            parsedContents.push(aLines[$_Index].trim());
        }
        
        return parsedContents;
    }
    
    /**
     *
     * @param $fileContents
     */
    parseData($fileContents){
        let parsedData = [],parsedContents;
    
        parsedContents = this.parseContents($fileContents);
        
        parsedData = this.parseGroup(parsedContents);
        //console.info('Parsed a Template (Grim Dawn)');
        
        return parsedData;
    }
    
    /**
     *
     * @param $data
     */
    stringifyData($data){
        let stringifiedData = '';
        
        return false;
        //return stringifiedData;
    }
    
}

module.exports = cTPL;
