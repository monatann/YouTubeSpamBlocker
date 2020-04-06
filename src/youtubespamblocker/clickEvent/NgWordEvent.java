package youtubespamblocker.clickEvent;

import java.awt.event.ActionEvent;

import javax.swing.AbstractAction;

public class NgWordEvent extends AbstractAction {
    public NgWordEvent() {
        super("NGワード設定");
    }

	@Override
	public void actionPerformed(ActionEvent e) {
		System.out.println(e.getID());
	}

}
