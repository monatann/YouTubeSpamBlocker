package youtubespamblocker.clickEvent;

import java.awt.event.ActionEvent;

import javax.swing.AbstractAction;

public class NgUserEvent extends AbstractAction {
    public NgUserEvent() {
        super("NGユーザー設定");
    }

	@Override
	public void actionPerformed(ActionEvent e) {
		System.out.println(e.getID());
	}

}
