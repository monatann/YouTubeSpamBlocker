package youtubespamblocker.clickEvent;

import java.awt.event.ActionEvent;

import javax.swing.AbstractAction;

public class HelpEvent extends AbstractAction {
    public HelpEvent() {
        super("利用方法");
    }

	@Override
	public void actionPerformed(ActionEvent e) {
		System.out.println(e.getID());
	}

}
