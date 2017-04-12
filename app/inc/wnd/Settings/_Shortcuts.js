/**
 * Created by WareBare on 4/12/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    content_: function(){
        let out_ = `Not changeable at this time`;
        
        out_ += `<table>`;
        out_ += `<thead>`;
        out_ += `<tr><td>Action</td><td>Modifier</td><td>Key</td></tr>`;
        out_ += `</thead><tbody>`;
        out_ += `<tr><td>Set Connector (Zenith) Up [ip]</td><td>Alt</td><td>X</td></tr>`;
        out_ += `<tr><td>Set Connector (Zenith) Down</td><td>Alt</td><td>Z</td></tr>`;
        out_ += `<tr><td>Set Connector Default</td><td>Alt</td><td>C</td></tr>`;
        out_ += ``;
        out_ += `</tbody>`;
        out_ += `</table>`;
        
        return out_;
    }
    
};
