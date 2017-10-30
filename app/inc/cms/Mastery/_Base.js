/**
 * Created by WareBare on 3/25/2017.
 */

module.exports = {
    tplContent: {},
    
    pathGD: false,
    masteryUI: false,
    _mUI: false,
    _tagsSkills: false,
    _tagsClasses: false,
    _mSkill: false,
    
    aGenderPC01: [
        //new WZ.GrimDawn.cData(`${WZ.GrimDawn.tFn.getPaths().Mod}/records/creatures/pc/femalepc01.dbr`),
        //new WZ.GrimDawn.cData(`${WZ.GrimDawn.tFn.getPaths().Mod}/records/creatures/pc/malepc01.dbr`)
        wzStorageGD.load(`records/creatures/pc/femalepc01.dbr`),
        wzStorageGD.load(`records/creatures/pc/malepc01.dbr`)
    ],
    skillsMasterTable: new WZ.GrimDawn.cData(`${WZ.GrimDawn.tFn.getPaths().Mod}/records/ui/skills/skills_mastertable.dbr`),
    
    getMasteries: function(){
        // records/ui/skills
        let aDefault = wzIO.dir_get_contentsSync(`${this.pathGD.Mod}/records/ui/skills`),
            aCustom = (`${this.pathGD.Mod}/records/ui/skills` !== `${this.pathGD.Mod}/${WZ.GrimDawn.tFn.getPaths().MasteryUI}`) ? wzIO.dir_get_contentsSync(`${this.pathGD.Mod}/${WZ.GrimDawn.tFn.getPaths().MasteryUI}`) : {},
            tempClass,
            aMasteryUI = {},tempMasteryUI = {};
        
        for( let $_Key in aDefault){
            if(aDefault[$_Key]['classtable.dbr']){
                aMasteryUI['records/ui/skills'] = aMasteryUI['records/ui/skills'] || {};
                tempClass = new WZ.GrimDawn.cData(`${aDefault[$_Key]['classtable.dbr']}`);
                aMasteryUI['records/ui/skills'][$_Key] = {
                    'dir': aDefault[$_Key],
                    'tag': this._tagsClasses.getData()[tempClass.getFieldValue(`skillTabTitle`)] || tempClass.getFieldValue(`skillTabTitle`)
                };
            }
        }
        for( let $_Key in aCustom){
            if(aCustom[$_Key]['classtable.dbr']){
                aMasteryUI[`${WZ.GrimDawn.tFn.getPaths().MasteryUI}`] = aMasteryUI[`${WZ.GrimDawn.tFn.getPaths().MasteryUI}`] || {};
                tempClass = new WZ.GrimDawn.cData(`${aCustom[$_Key]['classtable.dbr']}`);
                aMasteryUI[`${WZ.GrimDawn.tFn.getPaths().MasteryUI}`][$_Key] = {
                    'dir': aCustom[$_Key],
                    'tag': this._tagsClasses.getData()[tempClass.getFieldValue(`skillTabTitle`)] || tempClass.getFieldValue(`skillTabTitle`)
                };
            }
        }
        
        //console.log(aMasteryUI);
        return aMasteryUI;
    },
    
    createSkill: function(){
        if(this._mUI){
            this._mUI.createSkillUI();
    
            setTimeout(() => {
                wzCMS(appConfig.get('cms'));
            },10);
        }else{
            wzNotify.warn(`You need to select a Mastery first.`);
        }
    },
    
    convSkillSlots: function(){
        let objSlots = {},tempTier,tempCoords,
            slots = appData.tpl_gd.UI.SkillSlots;
        
        for( let $_Line in slots.Y ){
            for( let $_Tier in slots.X ){
                objSlots[$_Line] = objSlots[$_Line] || {};
                tempTier = parseInt($_Tier) + 1;
                objSlots[$_Line][tempTier] = objSlots[$_Line][tempTier] || {};
                objSlots[$_Line][tempTier] = {
                    'X': slots.X[$_Tier],
                    'Y': slots.Y[$_Line]
                };
            }
        }
        
        return JSON.stringify(objSlots);
    },
    /**
     * not actually the method to edit a skill, but to get to the page where you can edit it - if a skill is set to be edited
     */
    goToEditSkill: function(){
        if(this._mSkill){
            //wzCMS([`Mastery`,`Skill`]);
            //this.loadContent('EditSkill');
            let wnd = wzWND('skillEdit',{height:'1000px',width:'750px'});
            //wnd.__getContent()._mSkill = this._mSkill;
            wnd.refresh();
        }else{
            wzNotify.warn(`You need to select a Skill first.`);
        }
    },
    goToEditMastery:function(){
        wzNotify.info(`Development is still in progress!`);
    },
    loadTags: function(){
        let pathSkills = ``,
            pathClasses= ``;
    
        //this._tagsSkills = new WZ.GrimDawn.cData(`${WZ.GrimDawn.tFn.getPaths().Source}/text_en/${appConfig.get(`GrimDawn.Mastery.TagsSkills`)}`,new WZ.GrimDawn.Parser.cTags());
        this._tagsSkills = wzStorageGD.__get(`text_en/${appConfig.get(`GrimDawn.Mastery.TagsSkills`)}`,`Tags`);
        //this._tagsClasses = (appConfig.get(`GrimDawn.Mastery.TagsClasses`) === appConfig.get(`GrimDawn.Mastery.TagsSkills`)) ? this._tagsSkills : new WZ.GrimDawn.cData(`${WZ.GrimDawn.tFn.getPaths().Source}/text_en/${appConfig.get(`GrimDawn.Mastery.TagsClasses`)}`,new WZ.GrimDawn.Parser.cTags());
        this._tagsClasses = (appConfig.get(`GrimDawn.Mastery.TagsClasses`) === appConfig.get(`GrimDawn.Mastery.TagsSkills`)) ? this._tagsSkills : wzStorageGD.__get(`text_en/${appConfig.get(`GrimDawn.Mastery.TagsClasses`)}`,`Tags`);
        
        if(this._tagsSkills){
            //this._tagsSkills.reload();
            //this._tagsClasses.reload();
            //wzCMS(appConfig.get('cms'));
        }else{
        
        }
        
    },
    
    ini: function(){
        this.pathGD = WZ.GrimDawn.tFn.getPaths();
        //if(!this._tagsSkills) this.loadTags();
        this.loadTags();
        if(!this.masteryUI) this.masteryUI = this.getMasteries();
    
        if(appConfig.get(`GrimDawn.Mastery.PSSource`) && appConfig.get(`GrimDawn.Mastery.PSTarget`) && appConfig.get(`GrimDawn.Mastery.PSSource`).length === appConfig.get(`GrimDawn.Mastery.PSTarget`).length && !_watcherPS){
            //Log(`_watcherPS`);
            //console.log(WZ.GrimDawn.tFn.getPaths());
            let aWatcherPaths = [],
                mWatcherReplacements = {},
                BasePathSourcePFX = `${appConfig.get(`GrimDawn.Paths.Working`)}/source/`;
            for(let iRelPath in appConfig.get(`GrimDawn.Mastery.PSSource`)){
                aWatcherPaths.push(`${BasePathSourcePFX}${appConfig.get(`GrimDawn.Mastery.PSSource`)[iRelPath]}`);
                mWatcherReplacements[appConfig.get(`GrimDawn.Mastery.PSSource`)[iRelPath]] = appConfig.get(`GrimDawn.Mastery.PSTarget`)[iRelPath];
            }
    
            _watcherPS = chokidar.watch(aWatcherPaths, {
                ignored: /(^|[\/\\])\../,
                //ignored: /^[^.]+$|\.(?!(txt|md)$)([^.]+$)/,
                persistent: true,
                disableGlobbing: true
            });
            _watcherPS
                .on('add', (InPath, InStats) => {
                    let RelPathToPFX = InPath.wzNormalizePath().replace(BasePathSourcePFX.wzNormalizePath(), ``),
                        bUpdatePFX = false;
    
                    for(let kSource in mWatcherReplacements){
                        if(RelPathToPFX.startsWith(`${kSource.wzNormalizePath()}`)){
                            RelPathToPFX = RelPathToPFX.replace(kSource.wzNormalizePath(), mWatcherReplacements[kSource].wzNormalizePath());
                            RelPathToPFX = `${WZ.GrimDawn.tFn.getPaths().Source}/${RelPathToPFX}`;
                        }
                    }
                    try{
                        //fs.accessSync(`${RelPathToPFX}`); // check if file exists
                        let stats = fs.statSync(`${RelPathToPFX}`);
                        //console.log(stats.mtime.getTime());
                        //Log(InStats.mtime.getTime());
                        if(stats.mtime.getTime() < InStats.mtime.getTime()){
                            bUpdatePFX = true;
                        }
                    }catch (err){
                        bUpdatePFX = true;
                    }
                    
                    if(bUpdatePFX){
                        try{
                            fs.copySync(`${InPath}`, `${RelPathToPFX}`);
                            wzNotify.info(`Particle System updated at: ${RelPathToPFX}`,`PFX Updated`);
                        }catch(err){
                            Log(err);
                        }
                    }
                    
                    //Log(InPath);
                })
                .on('change', InPath => {
                    let RelPathToPFX = InPath.wzNormalizePath().replace(BasePathSourcePFX.wzNormalizePath(), ``);
                    for(let kSource in mWatcherReplacements){
                        if(RelPathToPFX.startsWith(`${kSource.wzNormalizePath()}`)){
                            RelPathToPFX = RelPathToPFX.replace(kSource.wzNormalizePath(), mWatcherReplacements[kSource].wzNormalizePath());
                            RelPathToPFX = `${WZ.GrimDawn.tFn.getPaths().Source}/${RelPathToPFX}`;
                        }
                    }
                    try{
                        fs.copySync(`${InPath}`, `${RelPathToPFX}`);
                        wzNotify.info(`Particle System updated at: ${RelPathToPFX}`,`PFX Updated`);
                    }catch(err){
                        Log(err);
                    }
                })
                .on('unlink', InPath => {
                    
                    if(!appConfig.get(`GrimDawn.AutoSync.BlockDeletion`)){
                        let RelPathToPFX = InPath.wzNormalizePath().replace(BasePathSourcePFX.wzNormalizePath(), ``);
    
                        for(let kSource in mWatcherReplacements){
                            if(RelPathToPFX.startsWith(`${kSource.wzNormalizePath()}`)){
                                RelPathToPFX = RelPathToPFX.replace(kSource.wzNormalizePath(), mWatcherReplacements[kSource].wzNormalizePath());
                                RelPathToPFX = `${WZ.GrimDawn.tFn.getPaths().Source}/${RelPathToPFX}`;
                            }
                        }
    
                        try{
                            fs.removeSync(`${RelPathToPFX}`);
                            wzNotify.info(`Particle System removed at: ${RelPathToPFX}`,`PFX Removed`);
                        }catch(err){
                            Log(err);
                        }
                    }
                    
                })
                .on('ready', () => {
                    wzNotify.info(`Filewatcher is done finding all files for "Particle Systems (PFX)"`,`Auto Sync is ready`);
                });
        }
        
        
        /*
        let aStats = [15.0,22.0,29.0,36.0,44.0,52.0,61.0,70.0,79.0,88.0,97.0,106.0,116.0,126.0,136.0,148.0,159.0,170.0,181.0,192.0,203.0,215.0,227.0,242.0,257.0,280.0],
            aStats4 = wzMathGD.genValues({
                dec: 0,
                mul: 1.046,
                max: 26,
                start: 15,
                number: 5
            }),
            aStats2 = [20.0,27.5,35.75],
            aStats3 = [30.0,36.3,43.23],
            curStats = aStats4,
            v1 = curStats[20] - curStats[19],
            v2 = curStats[21] - curStats[20],
            dif = v2 - v1,
            perc = dif / v1 + 1,
            p1 = ((v1 + curStats[0] - curStats[0] * perc) % 1) * 10;
        p1 = (p1) ? p1 : v1;
        */
        /*
        console.log(`${v1} - ${v2} = ${dif} (${perc}) -> ${p1}`);
        console.log(`start value: ${curStats[0]} | increment: ${p1} | %: ${perc}`);
        console.log(`${aStats}`);
        console.log(`${wzMathGD.genValues({
            dec: 0,
            mul: 1.02,
            max: 26,
            start: 20,
            number: 8
        })}`);
        */
        //console.log(this.convSkillSlots());
    },
    
    content_: function(){
        let out_ = '';
        
        out_ = '';
        
        return out_;
    },
    sidebar_: function(){
        let out_ = '';
        
        return out_;
    }
    
};
