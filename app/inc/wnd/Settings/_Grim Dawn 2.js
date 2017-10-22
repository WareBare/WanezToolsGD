/**
 * Created by WareBare on 4/14/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    title: `Settings :: Grim Dawn`,
    
    forms: {
        gd_settings:false
    },
    submitForm: function($el){
        console.log(`custom submit: ${$el.value}`);
    },
    
    content_: function(){
        let out_ = `Grim Dawn - Settings`;
        
        this.forms.gd_settings = new WZ.Core.cForm({
            id: 'gd_settings',
            title: `Additional Paths, leave empty if using the defaults`,
            isWnd: `Settings`,
            onChange: {
                /*custom: `submitForm(this)`*/
            },
            items: {
                'Items': {
                    'settings-app::GrimDawn.Items.Directories': {
                        label: `Item Directories [optional] - Relative Path from /database/ (separate with new line) [e.g. records/items] - this is mainly to reduce loading times, if this field is empty it will check every folder`,
                        type: `listArea`
                    }
                }
            }
        });
        out_ = this.forms.gd_settings.create();
        
        //console.log(wzWND('Settings').__getContent().contentType);
        
        return out_;
    }
    
};
