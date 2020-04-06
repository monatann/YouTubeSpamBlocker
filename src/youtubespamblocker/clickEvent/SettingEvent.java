package youtubespamblocker.clickEvent;

import java.awt.event.ActionEvent;

import javax.swing.AbstractAction;

public class SettingEvent extends AbstractAction {
    public SettingEvent() {
        super("設定");
    }

	@Override
	public void actionPerformed(ActionEvent e) {
		System.out.println(e.getID());
	}
}
