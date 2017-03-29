/**
 * Created by WareBare on 11/8/2016.
 */

class cLua extends libWZ.Core.cBase{
    
    constructor($tableName){
        super();
        
        this.tableName = $tableName;
    }
    
    /**
     *
     * @param $fileContents
     */
    parseData($fileContents){
        let parsedData = ($fileContents.replace(this.tableName+'={','{')).replace(
            new RegExp('\\[\'', 'g'),'"').replace(
            new RegExp('\'\\]=', 'g'),'":').replace(
            new RegExp('{\'', 'g'),'["').replace(
            new RegExp('\'}', 'g'),'"]').replace(
            new RegExp(':{([0-9])', 'g'),':[$1').replace(
            new RegExp('(,|\\[)([0-9]+)},', 'g'),'$1$2],').replace(
            new RegExp('{{', 'g'),'[{').replace(
            new RegExp('"\]}},', 'g'),'\']}],').replace(
            new RegExp('\'}},', 'g'),'\'}],').replace(
            new RegExp('\'', 'g'),'"');
        
        try{
            JSON.parse(parsedData)
        }catch(err){
            console.log(parsedData)
        }
        
        return JSON.parse(parsedData);
    }
    
    /**
     *
     * @param $data
     */
    stringifyData($data){
        let stringifiedData = JSON.stringify($data).replace(
            new RegExp('\\[','g'),'{').replace(
            new RegExp('\\]','g'),'}').replace(
            new RegExp('"([0-9A-Za-z_]+)":','g'),'\n[\'$1\']=').replace(
            new RegExp('"','g'),'\'').replace(
            new RegExp('^{','g'),this.tableName+'={');
        
        
        return stringifiedData;
    }
}

module.exports = cLua;
