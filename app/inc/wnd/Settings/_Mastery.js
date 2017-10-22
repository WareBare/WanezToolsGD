/**
 * Created by Ware on 10/12/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    title: `Settings :: Grim Dawn :: Mastery`,
    
    forms: {
        gd_settings:false,
        gd_settings2:false
    },
    submitForm: function($el){
        console.log(`custom submit: ${$el.value}`);
    },
    
    content_: function(){
        let out_ = ``;
    
        this.forms.gd_settings = new WZ.Core.cForm({
            id: 'gd_settings',
            title: `Mastery Settings`,
            isWnd: `Settings`,
            onChange: {
                /*custom: `submitForm(this)`*/
            },
            items: {
                'Tags': {
                    'settings-app::GrimDawn.Mastery.TagsSkills': {
                        label: `Tags - Skills`,
                        type: `listBox`,
                        data: wzIO.dir_get_contentsSync(`${WZ.GrimDawn.tFn.getPaths().Source}/text_en`,true) || [],
                        dataUseValue: true
                    },
                    'settings-app::GrimDawn.Mastery.TagsClasses': {
                        label: `Tags - Classes`,
                        type: `listBox`,
                        data: wzIO.dir_get_contentsSync(`${WZ.GrimDawn.tFn.getPaths().Source}/text_en`,true) || [],
                        dataUseValue: true
                    }
                },
                'PFX [optional]': {
                    'settings-app::GrimDawn.Mastery.SourcePFX': {
                        label: `Source Directory`,
                        type: `text`,
                        ph: `dev`
                    },
                    'settings-app::GrimDawn.Mastery.PathPFX': {
                        label: `Target Directory [optional]`,
                        type: `textLarge`,
                        ph: `fx/particlesystems`
                    }
                }
            }
        });
    
        this.forms.gd_settings2 = new WZ.Core.cForm({
            id: 'gd_settings2',
            title: `Mastery Settings - Custom Paths [optional]`,
            isWnd: `Settings`,
            onChange: {
                /*custom: `submitForm(this)`*/
            },
            items: {
                'Mastery': {
                    'settings-app::GrimDawn.Mastery.PathUI': {
                        label: `Path to Additional UI Files [optional]`,
                        type: `textLargeX`,
                        ph: `records/ui/skills`
                    },
                    'settings-app::GrimDawn.Mastery.PathSkill': {
                        label: `Path to Additional Skill Files [optional]`,
                        type: `textLargeX`,
                        ph: `records/skills`
                    }
                },
                'Quick Creation (used in Mastery/Skill Wizard for default paths, if empty core paths are used)': {
                    'settings-app::GrimDawn.Mastery.PathSource': {
                        label: `Path to Additional Source UI Files [optional]`,
                        type: `textLargeX`,
                        ph: `ui/skills`,
                        newLine: true
                    },
                    'settings-app::GrimDawn.Mastery.PathIcons': {
                        label: `Path to Additional Icon Source Files [optional] - used for skill creation default icon path`,
                        type: `textLargeX`,
                        ph: `ui/skills/icons`,
                        newLine: true
                    }
                }
            }
        });
        out_ = `${this.forms.gd_settings.create()}${this.forms.gd_settings2.create()}`;
        
        return out_;
    }
    
};
