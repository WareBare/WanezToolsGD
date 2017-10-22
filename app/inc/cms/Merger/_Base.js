/**
 * Created by Ware on 7/28/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 * aModsSource - source folders for mods to merge
 *
 */

module.exports = {
    tplContent: {},
    
    tagsVanilla: {
        // Single
        tagSkillClassName01: `Soldier`,
        tagSkillClassName02: `Demolitionist`,
        tagSkillClassName03: `Occultist`,
        tagSkillClassName04: `Nightblade`,
        tagSkillClassName05: `Arcanist`,
        tagSkillClassName06: `Shaman`,
        tagSkillClassName07: `Inquisitor`,
        tagSkillClassName08: `Necromancer`,
        // Combo
        tagSkillClassName0102: `Commando`,
        tagSkillClassName0103: `Witchblade`,
        tagSkillClassName0104: `Blademaster`,
        tagSkillClassName0105: `Battlemage`,
        tagSkillClassName0106: `Warder`,
        tagSkillClassName0107: `Tactician`,
        tagSkillClassName0108: `Death Knight`,
        tagSkillClassName0203: `Pyromancer`,
        tagSkillClassName0204: `Saboteur`,
        tagSkillClassName0205: `[ms]Sorcerer[fs]Sorceress`,
        tagSkillClassName0206: `Elementalist`,
        tagSkillClassName0207: `Purifier`,
        tagSkillClassName0208: `Defiler`,
        tagSkillClassName0304: `Witch Hunter`,
        tagSkillClassName0305: `Warlock`,
        tagSkillClassName0306: `Conjurer`,
        tagSkillClassName0307: `Deceiver`,
        tagSkillClassName0308: `Cabalist`,
        tagSkillClassName0405: `Spellbreaker`,
        tagSkillClassName0406: `Trickster`,
        tagSkillClassName0407: `Infiltrator`,
        tagSkillClassName0408: `Reaper`,
        tagSkillClassName0506: `Druid`,
        tagSkillClassName0507: `Mage Hunter`,
        tagSkillClassName0508: `Spellbinder`,
        tagSkillClassName0607: `Vindicator`,
        tagSkillClassName0608: `Ritualist`,
        tagSkillClassName0708: `Apostate`
    },
    
    MergerConfig: new eConfig({name: `settings-merger`}),
    
    CheckProjectName: function(InNewProjectName){
        
        let mProjects = this.MergerConfig.get(`Projects.${InNewProjectName}`),
            IsValidProjectName = InNewProjectName;
        if(mProjects){
            IsValidProjectName = false;
        }
        return IsValidProjectName;
        
        //return this.MergerConfig.get(`Projects.${InNewProjectName}`);
    },
    
    SaveProject: function(InProjectName){
        let ProjectName = InProjectName || `New Project`,
            iCounter = 1;
        
        while(!this.CheckProjectName(ProjectName)){
            ProjectName = this.CheckProjectName(ProjectName) || `${InProjectName || `New Project`} ${iCounter}`;
            iCounter++;
        }
        
        this.MergerConfig.set(`Projects.${ProjectName}`,{});
    
        wzReloadCMS(10);
        
    },
    
    /**
     * Gets Mods' Source folders in an array
     *
     * @return {Array}
     * @constructor
     */
    GetModsSource: function(){
        let MergerPath = appConfig.get(`Merger.Paths.Sources`),
            aModsSource = [];
        
        if(MergerPath){
            let folders = fs.readdirSync(`${MergerPath}`);
            for(let $_Index in folders){
                if(fs.lstatSync(`${MergerPath}/${folders[$_Index]}`).isDirectory()){
                    aModsSource.push(folders[$_Index]);
                }
            }
        }
        return aModsSource;
    },
    
    GetModsRecordsFiles: function(InPath, InModName){
        let folders = fs.readdirSync(`${InPath}`),
            aData = {};
        for(let $_Index in folders){
            if(fs.lstatSync(`${InPath}/${folders[$_Index]}`).isDirectory()){
                if(folders[$_Index].toLowerCase() !== `templates`){
                    //aData[folders[$_Index].toLowerCase()] = this.GetModsRecordsFiles(`${InPath}/${folders[$_Index]}`);
                    aData = this.GetModsRecordsFiles(`${InPath}/${folders[$_Index]}`, InModName);
                }
            }else{
                if(!folders[$_Index].toLowerCase().endsWith(`.arz`)){
                    stats = fs.statSync(`${InPath}/${folders[$_Index]}`);
                    //aData[`${(`${InPath.toLowerCase()}/${folders[$_Index].toLowerCase()}`).split(`/database/`)[1]}`] = aData[`${(`${InPath.toLowerCase()}/${folders[$_Index].toLowerCase()}`).split(`/database/`)[1]}`] || {};
                    
                    //aData[`${(`${InPath.toLowerCase()}/${folders[$_Index].toLowerCase()}`).split(`/database/`)[1]}`][InModName] = stats.mtime.getTime();
    
                    let tempFile = `${(`${InPath.toLowerCase()}/${folders[$_Index].toLowerCase()}`).split(`/database/`)[1]}`;
                    this.mModsRecords[tempFile] = this.mModsRecords[tempFile] || [{
                            bIgnore: false,
                            Timestamp: stats.mtime.getTime(),
                            bToUpdate: true,
                            bIsNew: true,
                            mModIds: {}
                        }];
                    this.mModsRecords[tempFile].push({
                        Mod: InModName/*,
                        Timestamp: stats.mtime.getTime(),
                        Fields: []*/
                    });
                    this.mModsRecords[tempFile][0].mModIds[InModName] = this.mModsRecords[tempFile].length - 1;
                    this.mModsRecords[tempFile][0].Timestamp = (this.mModsRecords[tempFile][0].Timestamp < stats.mtime.getTime()) ? stats.mtime.getTime() : this.mModsRecords[tempFile][0].Timestamp;
                }
            }
        }
        return aData;
    },
    GetModsRecords: function(InModName){
        let MergerPath = appConfig.get(`Merger.Paths.Sources`),
            aModsRecords = this.GetModsRecordsFiles(`${MergerPath}/${InModName}/database`, InModName);
        
        return aModsRecords;
    },
    
    SaveProjectConfig: function(){
        this.MergerConfig.set(`Projects.${this.ProjectName}`,this.ProjectData);
    
        wzNotify.save(`The Tool data was successfully saved.`,`Merger Data Saved!`);
    }
    /*
    iniNodeEditor($opt){
        //return new WZ.Core.NodeEditor.cMain($opt);
    },
    
    Generate(){
        //_cms._mNodeEditor.generateNodes();
    },
    
    ini(){}
    content_: function(){
        let out_ = '';
        
        out_ = '';
        
        
        
        return out_;
    },
    sidebar_: function(){
        let out_ = '';
        
        return out_;
    }
    */
};
