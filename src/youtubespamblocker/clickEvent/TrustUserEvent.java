package youtubespamblocker.clickEvent;

import java.awt.event.ActionEvent;

import javax.swing.AbstractAction;

public class TrustUserEvent extends AbstractAction {
    public TrustUserEvent() {
        super("信用ユーザー設定");
    }

	@Override
	public void actionPerformed(ActionEvent e) {
		System.out.println(e.getID());
	}

}
