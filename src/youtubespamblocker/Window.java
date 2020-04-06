package youtubespamblocker;

import java.awt.Container;

import javax.swing.JFrame;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;

import youtubespamblocker.clickEvent.ConnectEvent;
import youtubespamblocker.clickEvent.DisconnectEvent;
import youtubespamblocker.clickEvent.HelpEvent;
import youtubespamblocker.clickEvent.HistoryEvent;
import youtubespamblocker.clickEvent.LicenseEvent;
import youtubespamblocker.clickEvent.NgUserEvent;
import youtubespamblocker.clickEvent.NgWordEvent;
import youtubespamblocker.clickEvent.SettingEvent;
import youtubespamblocker.clickEvent.TrustUserEvent;
import youtubespamblocker.clickEvent.UpdateEvent;


public class Window extends JFrame {
	public static JMenuBar menuBar = new JMenuBar();

	public static JMenu connectMenu = new JMenu("接続設定");
	public static JMenuItem connection = new JMenuItem(new ConnectEvent());
	public static JMenuItem disconnect = new JMenuItem(new DisconnectEvent());
	public static JMenuItem setting = new JMenuItem(new SettingEvent());

	public static JMenu spamMenu = new JMenu("スパム設定");
	public static JMenuItem ngWord = new JMenuItem(new NgWordEvent());
	public static JMenuItem ngUser = new JMenuItem(new NgUserEvent());
	public static JMenuItem trustUser = new JMenuItem(new TrustUserEvent());

	public static JMenu helpMenu = new JMenu("ヘルプ");
	public static JMenuItem help = new JMenuItem(new HelpEvent());
	public static JMenuItem history = new JMenuItem(new HistoryEvent());
	public static JMenuItem update = new JMenuItem(new UpdateEvent());
	public static JMenuItem license = new JMenuItem(new LicenseEvent());

	public static void displayWindow() {
		Window frame = new Window("YouTube Spam Blocker");
		frame.setVisible(true);
	}

	Window(String title) {
		setTitle(title);
		setBounds(100, 100, 600, 400);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		//上メニュー
		connectMenu.add(connection);
		connectMenu.add(disconnect);
		connectMenu.add(setting);
		menuBar.add(connectMenu);

		spamMenu.add(ngWord);
		spamMenu.add(ngUser);
		spamMenu.add(trustUser);
		menuBar.add(spamMenu);

		helpMenu.add(help);
		helpMenu.add(update);
		helpMenu.add(history);
		helpMenu.add(license);
		menuBar.add(helpMenu);

		setJMenuBar(menuBar);

		Container contentPane = getContentPane();
		//contentPane.add(menu);
	}
}