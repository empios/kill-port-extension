const st = imports.gi.St;
const main = imports.ui.main;
const GObject = imports.gi.GObject;
const Gio = imports.gi.Gio;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const me = imports.misc.extensionUtils.getCurrentExtension();
const GLib = imports.gi.GLib;

let myPopup;
let panelButton, panelButtonText;

const MyPopup = GObject.registerClass(
	class MyPopup extends PanelMenu.Button {
		_init() {
			super._init(0);
			panelButton = new st.Button({
				style_class: "panel-button"
			});
			panelButtonText = new st.Label({
				style_class: "panelText",
				text: "Kill Port"
			});

			panelButton.set_child(panelButtonText);
			this.add_child(panelButton);

			let menuItem = new PopupMenu.PopupMenuItem(' ', {reactive: false});
			let entry = new st.Entry({
				text: '80'
			})
			menuItem.add_child(entry);

			let menuItem2 = new PopupMenu.PopupMenuItem('Kill processes on that port');
			menuItem2.connect('activate', () => {
				var [ok, out, err, exit] = GLib.spawn_command_line_sync('fuser -k '+entry.get_text()+'/tcp');
				main.notify(_("Killing processes Done!"))
			})

			this.menu.addMenuItem(menuItem);
			this.menu.addMenuItem(menuItem2);
			

		}

	}
)



function init() {

}


function enable() {
	myPopup = new MyPopup();
	main.panel.addToStatusArea('myPopup', myPopup, 1);
}


function disable() {
	myPopup.destroy();
}