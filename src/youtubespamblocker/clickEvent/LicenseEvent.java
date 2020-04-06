package youtubespamblocker.clickEvent;

import java.awt.event.ActionEvent;

import javax.swing.AbstractAction;

import youtubespamblocker.gui.LicenseGUI;

public class LicenseEvent extends AbstractAction {
    public LicenseEvent() {
        super("利用規約");
    }

	@Override
	public void actionPerformed(ActionEvent e) {
		LicenseGUI.displayWindow();
	}

}
