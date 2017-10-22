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
        gd_settings:false
    },
    submitForm: function($el){
        console.log(`custom submit: ${$el.value}`);
    },
    
    content_: function(){
        let out_ = ``;
        
        this.forms.gd_settings = new WZ.Core.cForm({
            id: 'gd_settings',
            title: `Items Settings`,
            isWnd: `Settings`,
            onChange: {
                /*custom: `submitForm(this)`*/
            },
            items: {
                'Materia': {
                    'settings-app::GrimDawn.Items.TagsMateria': {
                        label: `Tags - Materia`,
                        type: `listBox`,
                        data: wzIO.dir_get_contentsSync(`${WZ.GrimDawn.tFn.getPaths().Source}/text_en`,true) || [],
                        dataUseValue: true
                    },
                    'settings-app::GrimDawn.Items.allowTagChangeQualifier': {
                        label: `Should prevent Tag changes for Qualifiers (check if you want to disable that feature and change tags for qualifiers per Hand)`,
                        type: `checkBox`
                    }
                }
            }
        });
        out_ = this.forms.gd_settings.create();
        
        return out_;
    }
    
};
