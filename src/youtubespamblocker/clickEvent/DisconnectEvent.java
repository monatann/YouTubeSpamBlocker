package youtubespamblocker.clickEvent;

import java.awt.event.ActionEvent;

import javax.swing.AbstractAction;

public class DisconnectEvent extends AbstractAction {
    public DisconnectEvent() {
        super("切断");
    }

	@Override
	public void actionPerformed(ActionEvent e) {
		System.out.println(e.getID());
	}
}
