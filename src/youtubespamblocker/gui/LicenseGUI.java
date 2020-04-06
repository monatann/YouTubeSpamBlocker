package youtubespamblocker.gui;

import java.awt.BorderLayout;
import java.awt.Container;

import javax.swing.JFrame;
import javax.swing.JLabel;

public class LicenseGUI extends JFrame {
	JLabel copylight = new JLabel(
			"<html>　YouTube Spam Blocker"
					+ "<br>　Copyright (c) 2020 monatann All Rights Reserved"

					+ "<br><br>　　[共通規約]"
					+ "<br>　商用/非商用用途における規約を守ること。"
					+ "<br>　自作発言や転載に準ずる行為などをしないこと。"
					+ "<br>　利用規約を守らない場合、場合によっては利用する権利を失うことや、代金の請求などをする可能性があることに同意すること。"
					+ "<br>　このアプリを使ったことにより何かしらの損害が起きたとしても、原因にかかわらず作者は責任を負わないことに同意すること。"
					+ "<br>　これらの規約は場合によっては将来変更されることに同意すること。"

					+ "<br><br>　　[非商用用途]"
					+ "<br>　視聴者など、このツールを利用しても一切お金をもらわないような人は、[共通規約]さえ守ればいいです。"

					+ "<br><br>　　[商用用途]"
					+ "<br>　このアプリを利用して、他人への販売などをしたり、収益化済み配信者、企業が使う場合など、金銭が絡む場合は商用用途とします。"
					+ "<br>　このような場合で使いたい場合は、まず私に連絡をしてください。"
					+ "<br>　[共通規約]も守る必要があります。");

	public static void displayWindow() {
		LicenseGUI frame = new LicenseGUI("YouTube Spam Blocker - 利用規約");
		frame.setVisible(true);
		frame.setResizable(false);
	}

	LicenseGUI(String title) {
		setTitle(title);
		setBounds(150, 150, 800, 350);
		setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

		Container contentPane = getContentPane();
		contentPane.add(copylight, BorderLayout.LINE_START);
	}
}
