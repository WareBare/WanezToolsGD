/**
 * Created by Ware on 7/28/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent: {
        Content: {
            Frame: `<div><form onsubmit="return false;"><fieldset><legend>General</legend>{PROJECT_NAME}{PROJECT_PRIMARYMOD}</fieldset><fieldset><legend>Mods</legend>{MOD_LIST}</fieldset></form></div>`
        },
        Project: {
            Frame: ``,
            NameItem: `<label>Project Name<input type="text" onkeydown="wzOnFormEnter(event);" onblur="_cms.OnChangeProjectName(this);" value="{VALUE}" /></label>`,
            PrimaryModItem: `<label>Primary Mod<select onchange="_cms.OnChangePrimaryMod(this);">{RENDER_OPTIONS}</select></label>`
        },
        ModList: {
            Frame: `<div>{ITEMS}</div>`,
            Item: `<label><input type="checkbox" onchange="_cms.OnChangeModStatus(this);" value="{LABEL}"{CHECKED} />{LABEL}</label><br />`
        }
    },
    
    // contentType == ProjectName
    
    CreateNewProject: function(){
        let ProjectName = `New Project`;
        
        this.Base.SaveProject(ProjectName);
    
        wzNotify.info(`New Project has been crated!`);
    },
    
    OnChangePrimaryMod: function(el){
        this.Base.ProjectData.PrimaryMod = el.value;
        this.Base.SaveProjectConfig();
    },
    
    OnChangeProjectName: function(el){
        let NewProjectName = el.value,
            iCounter = 1;
        
        // Change Name in config
        while(!this.Base.CheckProjectName(NewProjectName)){
            NewProjectName = this.Base.CheckProjectName(NewProjectName) || `${el.value || `New Project`} ${iCounter}`;
            iCounter++;
        }
        this.Base.MergerConfig.set(`Projects.${NewProjectName}`,this.Base.MergerConfig.get(`Projects.${this.Base.ProjectName}`));
        this.Base.MergerConfig.delete(`Projects.${this.Base.ProjectName}`);
    
        // update name
        this.Base.ProjectName = NewProjectName;
        
        // reload cms
        wzReloadCMS(10);
    },
    OnChangeModStatus: function(el){
        //console.log(el.checked);
        this.Base.ProjectData.Mods = this.Base.ProjectData.Mods || {};
        if(el.checked){
            this.Base.ProjectData.Mods[el.value] = {};
        }else{
            delete this.Base.ProjectData.Mods[el.value];
        }
        
        this.Base.SaveProjectConfig();
    
        this.Base.ProjectName = false;
        this.Base.mModsRecords = {};
        wzReloadCMS(10);
        //this.content_Project(true);
    },
    
    content_Project: function(bInLoadRecords){
        let out_ = ``;
        
        //console.log(this.Base.ProjectData);
        this.Base.aModsSource = this.Base.GetModsSource();
        
        // PROJECT \\
        let ProjectName_ = this.tplContent.Project.NameItem.wzReplace({
            VALUE: this.Base.ProjectName
        });
        let ProjectPrimaryMod_ = this.tplContent.Project.PrimaryModItem.wzReplace({
            VALUE: (this.Base.ProjectData.PrimaryMod) ? this.Base.ProjectData.PrimaryMod : `None`
        });
        
        // MOD_LIST \\
        let ModListItems_ = ``, ModName;
        for(let kIndex in this.Base.aModsSource){
            ModName = this.Base.aModsSource[kIndex];
            ModListItems_ += this.tplContent.ModList.Item.wzReplace({
                CHECKED: (this.Base.ProjectData.Mods && this.Base.ProjectData.Mods[ModName]) ? ` checked="checked"` : ``,
                LABEL: ModName
            });
            
            if(this.Base.ProjectData.Mods && this.Base.ProjectData.Mods[ModName] && bInLoadRecords){
                //this.Base.mModsRecords[ModName] = this.Base.GetModsRecords(ModName);
                this.Base.GetModsRecords(ModName);
            }
        }
        
        let ModList_ = this.tplContent.ModList.Frame.wzReplace({
            ITEMS: ModListItems_
        });
        
        // CONTENT \\
        out_ = this.tplContent.Content.Frame.wzReplace({
            PROJECT_NAME: ProjectName_,
            PROJECT_PRIMARYMOD: ProjectPrimaryMod_,
            MOD_LIST: ModList_
        });
        
        //console.log(this.Base.mModsRecords);
        
        return out_;
    },
    
    content_: function(InContentType){
        this.contentType = this.Base.ProjectName || this.contentType;
        this.contentType = InContentType || this.contentType;
        
        //let out_ = `Merger Tools (Preview 1)`;
        let out_ = `Loading...`, bLoadRecords = false;
        if(this.contentType){
            if(this.Base.ProjectName !== this.contentType) {
                bLoadRecords = true;
                this.Base.mModsRecords = {};
            }
            this.Base.ProjectName = this.contentType;
            this.Base.ProjectData = this.Base.MergerConfig.store.Projects[this.contentType];
            
            let RenderOptions_ = ``,
                RenderOptionsItem = `<option value="{VALUE}"{SELECTED}>{TEXT}</option>`,
                iCounter = 1;
            RenderOptions_ += RenderOptionsItem.wzReplace({
                VALUE: `None`,
                TEXT: `None`
            });
            if(this.Base.ProjectData.Mods){
                for(let kIndex in this.Base.ProjectData.Mods){
                    RenderOptions_ += RenderOptionsItem.wzReplace({
                        VALUE: kIndex,
                        TEXT: kIndex,
                        SELECTED: (this.Base.ProjectData.PrimaryMod === kIndex) ? ` selected` : ``
                    });
                }
            }
    
            this.tplContent.Project.PrimaryModItem = this.tplContent.Project.PrimaryModItem.wzReplace({
                RENDER_OPTIONS: RenderOptions_
            });
            
            out_ = this.content_Project(bLoadRecords);
        }else{
            out_ = marked(fs.readFileSync(`${dirBase}/docs/ReadMe.md`, 'utf8'));
    
            setTimeout(() => {
                document.getElementById(`md_changelog`).innerHTML = out_;
                document.location.href = `#4`;
            },10);
            out_ = `<div id="md_changelog" class="md">${out_}</div>`;
        }
        
        return out_;
    },
    
    sidebarBtns_: function(){
        return [
            {
                "ONCLICK": `_cms.CreateNewProject()`,
                "TEXT": "New Project"
            }
        ];
    },
    sidebarList_: function(){
        let mList = {},
            mProjects = this.Base.MergerConfig.get(`Projects`);
        
        if(mProjects){
            for(let kProjectName in mProjects) {
                mList[kProjectName] = {};
            }
        }
        
        return mList;
    }
    
};
