/**
 * Created by Ware on 10/12/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    title: `Settings :: Grim Dawn :: Items`,
    
    forms: {
        gd_settings:false,
        gd_materia: false
    },
    submitForm: function($el){
        console.log(`custom submit: ${$el.value}`);
    },
    
    content_: function(){
        let out_ = ``;
        
        this.forms.gd_settings = new WZ.Core.cForm({
            id: 'gd_settings',
            title: `Generic`,
            isWnd: `Settings`,
            onChange: {
                /*custom: `submitForm(this)`*/
            },
            items: {
                'Tags': {
                    'settings-app::GrimDawn.Items.TagsGear': {
                        label: `Tags - Gear`,
                        type: `listBox`,
                        data: wzIO.dir_get_contentsSync(`${WZ.GrimDawn.tFn.getPaths().Source}/text_en`,true) || [],
                        dataUseValue: true
                    },
                    'settings-app::GrimDawn.Items.TagsMateria': {
                        label: `Tags - Materia`,
                        type: `listBox`,
                        data: wzIO.dir_get_contentsSync(`${WZ.GrimDawn.tFn.getPaths().Source}/text_en`,true) || [],
                        dataUseValue: true
                    }
                }
            }
        });
        out_ += this.forms.gd_settings.create();
    
        this.forms.gd_gear = new WZ.Core.cForm({
            id: 'gd_gear',
            title: `Gear`,
            isWnd: `Settings`,
            onChange: {
                /*custom: `submitForm(this)`*/
            },
            items: {
                'Paths': {
                    'settings-app::GrimDawn.Items.GearCustomPaths': {
                        label: `Directories with Custom Gear`,
                        type: `listAreaLarge`
                    }
                }
            }
        });
        out_ += this.forms.gd_gear.create();
    
        this.forms.gd_materia = new WZ.Core.cForm({
            id: 'gd_materia',
            title: `Materia`,
            isWnd: `Settings`,
            onChange: {
                /*custom: `submitForm(this)`*/
            },
            items: {
                'Paths': {
                    'settings-app::GrimDawn.Items.MateriaCustomPath': {
                        label: `Additional Components Path`,
                        type: `textLarge`
                    }
                },
                'Tags': {
                    'settings-app::GrimDawn.Items.allowTagChangeQualifier': {
                        label: `Should prevent Tag changes for Qualifiers (check if you want to disable that feature and change tags for qualifiers per Hand)`,
                        type: `checkBox`
                    }
                }
            }
        });
        out_ += this.forms.gd_materia.create();
        
        return out_;
    }
    
};
