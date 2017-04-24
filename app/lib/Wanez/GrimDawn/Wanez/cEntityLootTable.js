/**
 * Created by WareBare on 4/24/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cEntityLootTable extends libWZ.GrimDawn.cData{
    
    constructor($data,$name,$aDifficulty,$path){
        
        //super(wzAssets.newContainer.LootTable,new libWZ.GrimDawn.Parser.cDBR());
        super();
    
        this.aData = new libWZ.GrimDawn.Assets.aContainer_LootTable().getData();
        
        this.iName = $name;
        //this.iFilePath = `${$path}/${$name}.dbr`;
        this.iDifficulty = $aDifficulty;
        this.iData = $data;
        this.iSettings = $data.items[$name].settings;
        this.iItems = $data.items[$name].items;
        this.iScales = $data.scales;
        
        this.iniLootTable();
        
        this.changeFilePath(`${this.fn.getPaths().Mod}/${$path}/${$name}.dbr`);
    }
    
    iniLootTable(){
        let tplDBR = ['loot{0}Chance','loot{0}Name{1}','loot{0}Weight{1}'],
            tplEq = `numSpawn{0}Equation`,
            tempCountLoot,tempCountWeight,tempWeightMul,tempEqMin,tempEqMax,tempEqName,tempEq,
            tempDBR = {};
        
        // spawn equations \\
        for(let $_Type in this.iSettings.spawnEquations){
            tempEq = [];
            for(let $_Index in this.iSettings.spawnEquations[$_Type].values){
                tempWeightMul = (this.iSettings.spawnEquations[$_Type].values[$_Index][1] === 0) ? false : [this.iSettings.spawnEquations[$_Type].values[$_Index][1],this.iSettings.dga.difficulties[this.iDifficulty.difficultyId],this.iSettings.dga.modes[this.iDifficulty.modeId]];
                
                tempEqMin = this.fn.mathMulGD(this.iSettings.spawnEquations[$_Type].values[$_Index][0],1,tempWeightMul);
                tempEq.push(tempEqMin);
            }
            
            tempDBR[tplEq.wzOut([$_Type])] = this.iSettings.spawnEquations[$_Type].tpl.wzOut(tempEq);
        }
        
        
        
        for(let $_CountLoot in this.iItems){
            tempCountLoot = parseInt($_CountLoot) + 1;
            
            // Loot Chance \\
            tempDBR[tplDBR[0].wzOut([tempCountLoot])] = this.fn.mathMulGD(this.iScales[this.iSettings.scale.ID][$_CountLoot],6,this.iSettings.scale.mul[parseInt($_CountLoot)]);
            
            // ,this.iSettings.dga.difficulties[this.iDifficulty],this.iSettings.dga.modes[]
            //console.log(this.iScales[this.iSettings.scale.ID][$_CountLoot]);
            for(let $_CountWeight in this.iItems[$_CountLoot]){
                tempCountWeight = parseInt($_CountWeight) + 1;
                
                // Loot Name (dbr) \\
                tempDBR[tplDBR[1].wzOut([tempCountLoot,tempCountWeight])] = this.iItems[$_CountLoot][$_CountWeight][0];
                
                // Loot Weight \\
                tempWeightMul = (this.iItems[$_CountLoot][$_CountWeight][1][1] === 0) ? false : [this.iItems[$_CountLoot][$_CountWeight][1][1],this.iSettings.dga.difficulties[this.iDifficulty.difficultyId],this.iSettings.dga.modes[this.iDifficulty.modeId]];
                tempDBR[tplDBR[2].wzOut([tempCountLoot,tempCountWeight])] = this.fn.mathMulGD(this.iItems[$_CountLoot][$_CountWeight][1][0],0,tempWeightMul);
            }
        }
        console.log(tempDBR);
        this.editDBR(tempDBR);
        
    }
    
    genPath(){
    
    }
    
};
