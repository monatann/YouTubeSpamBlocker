// ==UserScript==
// @name         YouTube Spam Blocker
// @namespace    https://monatann.azurewebsites.net/
// @version      2.2
// @description  VTuberのコメント欄のスパムを自動ブロック
// @author       monatann
// @match        https://www.youtube.com/*
// @require      https://monatann.azurewebsites.net/files/nicoaddon/script/jquery-3.2.1.js
// @require      https://monatann.azurewebsites.net/files/nicoaddon/GM_config.js
// @require      https://monatann.azurewebsites.net/files/nicoaddon/script/vegas.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        none
// ==/UserScript==

/* --------------- 参考サイト -------------------
https://gist.github.com/yuta0801/2e3cd3581f078d4a0f68ff3e3953c513
https://developers.google.com/youtube/v3/docs?hl=ja
https://developers.google.com/youtube/v3/live/docs
------------------------------------------------*/

/* --------------- 開発環境 -------------------
Windows10 64bit Home
Google Chrome最新版
Tampermonkey拡張機能
他の環境で動くかは保証できません。
---------------------------------------------*/

/* --------------------- GM Config設定 ---------------------*/
let settingComment = `この拡張スクリプトの利用によっていかなる損失やトラブルが起こりましても私モナたんは一切の責任を負いません。
各自の自己責任でお願いします。
また、転載や自作発言などはやめてください。
webサイトのHTMLに依存しているため、YouTubeのアップデートにより使えなくなることが予測されます。
更新するかは気紛れですのでもし動かなかった場合諦めてください。

配信者の方へ
認証が必要なAPI(BAN行為)は実装が面倒で、需要もあるのか全く分からないので作っていません。
まずは連絡をください。

隠しオプション: F12(ノートPCの場合多くはFn + F12)でconsoleを見ると・・・
`
let settingCSS = `
#MyConfig_field_update3{ width:500px;border: none !important;background:none;border: none !important;  }
#MyConfig_field_announce3 {width:1000px; height:150px;background:none; border: none !important; }
#MyConfig_field_url1 { border: none !important;background:none; }
#MyConfig_field_url2 { border: none !important;background:none; }
#MyConfig_field_url3 { border: none !important;background:none; }
#MyConfig_field_kaihatusha{ width: 600px;}
#MyConfig_field_update3{ width: 600px;}
#Myconfig{background-color:transparent;}

input
:not(#MyConfig_field_picture)
:not(#MyConfig_field_auto_gasitu)
:not(#MyConfig_field_bg1)
:not(#MyConfig_field_bg2)
:not(#MyConfig_field_bg3)
:not(#MyConfig_field_bg4)
:not(#MyConfig_field_bg5)
:not(#MyConfig_field_kaihatusha)
:not(#MyConfig_field_update3)
:not(#MyConfig_field_menu0)
:not(#MyConfig_field_menu1)
:not(#MyConfig_field_menu2)
:not(#MyConfig_field_menu3)
:not(#MyConfig_field_live_forceUnBan)
:not(#MyConfig_field_live_forceBanName)
:not(#MyConfig_field_live_apiKeyList1)
:not(#MyConfig_field_live_apiKeyList2)
:not(#MyConfig_field_live_apiKeyList3)
:not(#MyConfig_field_live_apiKeyList4)
:not(#MyConfig_field_live_apiKeyList5)
:not(#MyConfig_field_live_apiKeyList6)
:not(#MyConfig_field_live_apiKeyList7)
:not(#MyConfig_field_live_apiKeyList8)
:not(#MyConfig_field_live_apiKeyList9)
:not(#MyConfig_field_live_apiKeyList10)
:not(#MyConfig_field_live_live_banWord)
:not(#MyConfig_field_live_live_settingBg)
{
width: 600px;background-color:#f0ffffa6;
}

#MyConfig_field_bg1{width: 1000px; !important;}
#MyConfig_field_bg2{width: 1000px; !important;}
#MyConfig_field_bg3{width: 1000px; !important;}
#MyConfig_field_bg4{width: 1000px; !important;}
#MyConfig_field_bg5{width: 1000px; !important;}
#MyConfig_field_settingBg{width: 1000px; !important;}

#MyConfig_field_kaihatusha { width: 300px; border: none !important;background:none; border: none !important;  }
#MyConfig_field_blank1 { border: none !important;background:none; }
#MyConfig_field_blank2 { border: none !important;background:none; }
#MyConfig_field_blank3 { border: none !important;background:none; }
#MyConfig_field_auto_gasitu{background-color:#f0ffffa6;}
#MyConfig_field_picture { border: none !important;background:none; border: none !important;width:450px;  }

#MyConfig_field_menu0 { width: 800px; border: none !important;background:none; border: none !important;  }
#MyConfig_field_menu1 { width: 800px; border: none !important;background:none; border: none !important;  }
#MyConfig_field_menu2 { width: 800px; border: none !important;background:none; border: none !important;  }
#MyConfig_field_menu3 { width: 800px; border: none !important;background:none; border: none !important;  }

#MyConfig_field_live_forceUnBan { width: 1000px; !important;  }
#MyConfig_field_live_forceBanName { width: 1000px; !important;  }
#MyConfig_field_live_apiKeyList1 { width: 1000px; !important;  }
#MyConfig_field_live_apiKeyList2 { width: 1000px; !important;  }
#MyConfig_field_live_apiKeyList3 { width: 1000px; !important;  }
#MyConfig_field_live_apiKeyList4 { width: 1000px; !important;  }
#MyConfig_field_live_apiKeyList5 { width: 1000px; !important;  }
#MyConfig_field_live_apiKeyList6 { width: 1000px; !important;  }
#MyConfig_field_live_apiKeyList7 { width: 1000px; !important;  }
#MyConfig_field_live_apiKeyList8 { width: 1000px; !important;  }
#MyConfig_field_live_apiKeyList9 { width: 1000px; !important;  }
#MyConfig_field_live_apiKeyList10 { width: 1000px; !important;  }
#MyConfig_field_live_banWord { width: 1000px; !important;  }
`
GM_config.init(
    {
        'id': 'MyConfig', // The id used for this instance of GM_config
        'title': 'YouTube拡張機能 設定', // Panel Title
        'fields': // Fields object
        {
            'menu0': // This is the id of the field
            {
                'label': '------------------- スパムブロック設定 -------------------', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'live_nameLimit': // This is the id of the field
            {
                'label': 'BANする名前の文字数(以上)', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '6' // Default value if user doesn't change it
            },
            'live_keepComment': // This is the id of the field
            {
                'label': 'コメント保持数', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '300' // Default value if user doesn't change it
            },
            'live_forceUnBan': // This is the id of the field
            {
                'label': '信頼ユーザー名(複数可)', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'live_forceBanName': // This is the id of the field
            {
                'label': '強制BAN名(複数可)', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'live_apiKeyList1': // This is the id of the field
            {
                'label': 'YouTube API Key 1', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'live_apiKeyList2': // This is the id of the field
            {
                'label': 'YouTube API Key 2', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'live_apiKeyList3': // This is the id of the field
            {
                'label': 'YouTube API Key 3', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'live_apiKeyList4': // This is the id of the field
            {
                'label': 'YouTube API Key 4', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'live_apiKeyList5': // This is the id of the field
            {
                'label': 'YouTube API Key 5', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'live_apiKeyList6': // This is the id of the field
            {
                'label': 'YouTube API Key 6', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'live_apiKeyList7': // This is the id of the field
            {
                'label': 'YouTube API Key 7', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'live_apiKeyList8': // This is the id of the field
            {
                'label': 'YouTube API Key 8', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'live_apiKeyList9': // This is the id of the field
            {
                'label': 'YouTube API Key 9', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'live_apiKeyList10': // This is the id of the field
            {
                'label': 'YouTube API Key 10', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'live_banWord': // This is the id of the field
            {
                'label': 'bit.lyの宛先URL NGワード(複数可)', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': 'girl,chat,click,SUBID,key' // Default value if user doesn't change it
            },
            'live_debug': // This is the id of the field
            {
                'label': 'デバック true=有効', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': 'false' // Default value if user doesn't change it
            },
            'menu1': // This is the id of the field
            {
                'label': '------------------- 背景色設定 -------------------', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'allow_change_bg_color': // This is the id of the field
            {
                'label': '背景色変更許可 true=有効', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': 'false' // Default value if user doesn't change it
            },
            'bgcolor1': // This is the id of the field
            {
                'label': '背景色　上', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '#f0ffffa6' // Default value if user doesn't change it
            },
            'bgcolor2': // This is the id of the field
            {
                'label': '背景色　左メニュー', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '#f0ffffa6' // Default value if user doesn't change it
            },
            'bgcolor3': // This is the id of the field
            {
                'label': '基本背景色', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': 'rgba(240, 255, 255, 0.3)' // Default value if user doesn't change it
            },
            'bgcolor4': // This is the id of the field
            {
                'label': 'ポップアップ背景色', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '#f0ffffa6' // Default value if user doesn't change it
            },
            'bgcolor5': // This is the id of the field
            {
                'label': '生放送チャット欄背景色', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '#ffffff00' // Default value if user doesn't change it
            },
            'menu2': // This is the id of the field
            {
                'label': '------------------- 背景画像設定 -------------------', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'bgallow': // This is the id of the field
            {
                'label': '背景画像変更の許可 true=有効', // Appears next to field
                'type': 'text',
                'default': 'false' // Default value if user doesn't change it
            },
            'bgdelay': // This is the id of the field
            {
                'label': '1つの壁紙の表示秒数(s)', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '7' // Default value if user doesn't change it
            },
            'bg1': // This is the id of the field
            {
                'label': '壁紙1 URL', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'bg2': // This is the id of the field
            {
                'label': '壁紙2 URL', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'bg3': // This is the id of the field
            {
                'label': '壁紙3 URL', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'bg4': // This is the id of the field
            {
                'label': '壁紙4 URL', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'bg5': // This is the id of the field
            {
                'label': '壁紙5 URL', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'settingBg': // This is the id of the field
            {
                'label': '設定画面背景 URL', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'menu3': // This is the id of the field
            {
                'label': '------------------- 開発者 -------------------', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '' // Default value if user doesn't change it
            },
            'kaihatusha': // This is the id of the field
            {
                'label': '開発者: モナたん', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': 'monatannzunzun@gmail.com' // Default value if user doesn't change it
            },
            'update3': // This is the id of the field
            {
                'label': '更新/要望/BUG報告/苦情先: ', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': 'https://github.com/monatann/YouTubeSpamBlocker' // Default value if user doesn't change it
            },
            'picture': // This is the id of the field
            {
                'label': 'デフォルト背景絵: ', // Appears next to field
                'type': 'text', // Makes this setting a text field
                'default': '募集中(背景スライド5枚 + 設定画面1枚)' // Default value if user doesn't change it
            },
            'announce3': // This is the id of the field
            {
                'label': '重要なお知らせ', // Appears next to field
                'type': 'textarea', // Makes this setting a text field
                'default': settingComment
            },
        },
        'css': settingCSS
    }
);

/******************************
* 設定用変数
*******************************/
//BANする名前の長さ
let nameLimit = Number(GM_config.get('live_nameLimit'));
//コメント履歴の数
let keepCommentLimit = Number(GM_config.get('live_keepComment'));
//自動BAN解除の名前
let getForceUnBanName = GM_config.get('live_forceUnBan');
let forceUnBanNameArray = [];
//強制BANの名前
let getForceBanName = GM_config.get('live_forceBanName');
let forceBanNameArray = [];
//デバック
let debug = GM_config.get('live_debug');
//YouTube APIキー　https://console.developers.google.com/apis/dashboard
let apiKeyList = [];
let getBanWord = GM_config.get('live_banWord');
let banWord = [];

/************************************
* スクリプト用変数
************************************/
//YouTube拡張機能
//背景画像URL(～.jpg / ～.png / ～.gif ...etc アスペクト比は元素材を編集してください。)　imgur等の画像投稿サイトを使うといいでしょう
//文字が見にくくなると思うので元画像に少し白を透明に混ぜるといい感じになるでしょう ←元のHTMLの色を変えてそのままでも大丈夫に
//背景画像のスライドの数を増やしたい場合、//～ 背景画像挿入 ～の部分を同じように変えればok
let allow_change_bg_picture = GM_config.get('bgallow');
let delay_time = GM_config.get('bgdelay')  * 1000;
let background_picture1 = GM_config.get('bg1');
let background_picture2 = GM_config.get('bg2');
let background_picture3 = GM_config.get('bg3');
let background_picture4 = GM_config.get('bg4');
let background_picture5 = GM_config.get('bg5');
let settingBg = GM_config.get('settingBg');
//背景色
let changeColor = GM_config.get('allow_change_bg_color');
let bgcolor1 = GM_config.get('bgcolor1');
let bgcolor2 = GM_config.get('bgcolor2');
let bgcolor3 = GM_config.get('bgcolor3');
let bgcolor4 = GM_config.get('bgcolor4');
let bgcolor5 = GM_config.get('bgcolor5');
//コメント取得関係
let iframe;
let comment;
let checkComment;
let rawCommentName;
let commentName;
let commentHTML;
let commentText;
let commentTextNoEmoji;
let commentTextIsEmoji;
let index;
let nameArray = [];
let textArray = [];
let boolArray = [];
let warningArray = [];
let banArray = [];
let unBanTempArray = [];
let tempArray = [];
//API関係
let work = true;
let apiKey;
let idStop = "";
let liveURL;
let liveChatId = "";
let liveNameArray = [];
let liveCommentArray = [];
let liveIdArray = [];
let banCheckNameArray = [];
let banCheckDataArray = [];
let ranges = [
    '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
    '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
    '\ud83d[\ude80-\udeff]' // U+1F680 to U+1F6FF
];
let regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;


jQuery(document).ready(function(){
    function banCheck() {
        //Channel ID取得
        checkLiveId();

        //コメント取得, 処理
        if(liveChatId != "" && liveChatId != null){
            jQuery.ajax({
                url:'https://www.googleapis.com/youtube/v3/liveChat/messages',
                type:'GET',
                data:{
                    'liveChatId':liveChatId,
                    'part':"authorDetails,snippet",
                    'hl':"ja",
                    'maxResults':2000,
                    'key':apiKey
                }
            })
                .done( (rawdata) => {
                banCheckDataArray.push(rawdata);
            })
                .fail( (data) => {
                log(data);
                reloadAPI(data);
                return;
            })
        }

    }

    //スパム疑いのチャンネル精査
    function channelCheck(channelId, banName){
        if(channelId != ""){
            jQuery.ajax({
                url: 'https://www.youtube.com/channel/' + channelId + '/about',
                timeout : 1000, // 1000 ms
                cache: false, //キャッシュを保存するかの指定
                success: function(html){

                    if(jQuery(html).text().indexOf("bit.ly%2F") != -1){
                        let link = jQuery(html).text().split("bit.ly%2F");
                        link = link[1].split('"');
                        jQuery.ajax({
                            //https://monatann.azurewebsites.net/crossdomain.phpにリクエスト
                            url: 'https://monatann.azurewebsites.net/crossdomain.php',
                            data: {
                                //送信するデータの設定(今回はtextが欲しいURL)
                                "crossdomain_url": 'https://bit.ly/' + link[0] + '+'
                            },
                            //textで受け取る
                            dataType: 'text',
                            //クロスドメインを行う
                            crossDomain: 'true',
                            //POSTを行う
                            type: 'POST'
                            //成功したら
                        }).done(function (html) {
                            //NGワードがあるか
                            if(findWord(banWord, html)){
                                log("Spamサイト認定, BAN行き: " + banName);
                                forceBanNameArray.push(banName);
                            }else{
                                forceUnBanNameArray.push(banName);
                                log("Spamサイトではない, 確認済ユーザー行き: " + banName);
                            }
                        }).fail(function (jqXHR, textStatus) {
                            log('失敗', jqXHR, textStatus);
                        });
                    }else{
                        forceUnBanNameArray.push(banName);
                        log("bit.lyではない, 確認済ユーザー行き: " + banName);
                    }
                }
            });
        }
    }

    //Live IDチェック
    function checkLiveId() {
        //URLの変化を検知
        let reId = false;
        if(liveURL != parent.location.href.replace("https://www.youtube.com/watch?v=", "")){
            liveURL = parent.location.href.replace("https://www.youtube.com/watch?v=", "");
            reId = true;
            log(liveURL);
        }
        if(liveURL.indexOf("?") != -1){
            liveURL = liveURL.split("?")[0];
        }

        //URL変化していたらLive ID入手
        if(reId || liveChatId == null){
            jQuery.ajax({
                url:'https://www.googleapis.com/youtube/v3/videos',
                type:'GET',
                data:{
                    'part':'liveStreamingDetails',
                    'id':liveURL,
                    'key':apiKey,
                    'Access-Control-Allow-Credentials': true
                }
            })
                .done( (data) => {
                if(data.items[0].liveStreamingDetails.activeLiveChatId != "" || data.items[0].liveStreamingDetails.activeLiveChatId != null){
                    liveChatId = data.items[0].liveStreamingDetails.activeLiveChatId;
                    if(liveChatId == null){
                        reloadAPI(data);
                        return;
                    }
                    log(liveChatId);
                }else{
                    return;}
            })
                .fail( (data) => {
                log(data);
                reloadAPI(data);
                return;
            })
        }
    }

    //メイン
    let time = 0;
    var mainFunc = function() {
        if(work){
            //HTML取得
            iframe = jQuery('#chatframe').contents();

            //各コメントごとに別関数呼び出し
            let id;
            jQuery(jQuery('#item-offset > #items > .style-scope.yt-live-chat-item-list-renderer').get().reverse()).each(function(index, element){
                if(element.id != null){
                    if(id == null){
                        id = element.id;
                    }
                    if(idStop == element.id){
                        idStop = id;
                        return false;
                    }
                    checkComment = jQuery(element);
                    spamCheck(index, checkComment);
                }
            })
            if(idStop == ""){
                idStop = id;
            }

            if(banCheckNameArray.length != 0 && time > 100){
                log(banCheckNameArray.length);
                banCheck();

                if(banCheckDataArray .length > 5){
                    banCheckDataArray.shift();
                }

                for(let num = 0; num < banCheckDataArray.length; num++){
                    let data = banCheckDataArray[num];
                    for (let i = 0; i < data.items.length; i++) {
                        let item = data.items[i];

                        let temp = item.authorDetails.displayName;
                        let index = findIndex(banCheckNameArray, temp);
                        if(index != -1){
                            channelCheck(item.authorDetails.channelId, item.authorDetails.displayName);
                            banCheckNameArray.splice(index, 1);
                        }
                    }
                }
                time = 0;
            }
            time++;
        }
    }

    setTimeout(function(){
        firstSetting();
        //YouTube拡張機能 読み込み
        youtubeExtension();

        if(apiKey == null){
            if(apiKeyList.length > 0){
                apiKey = apiKeyList[0];
                setInterval(mainFunc, 100);
            }
        }
    },2000);

    function spamCheck(num, comment){
        //コメント情報
        if(comment == null){
            return;
        }
        commentName = comment.find("#author-name").text();
        commentHTML = comment.find("#message");
        commentText = commentHTML.text().toLowerCase();
        commentTextNoEmoji = removeEmojis();
        commentTextIsEmoji = isEmoji();

        //名前による強制BAN
        if(find(forceBanNameArray, commentName)){
            jQuery(checkComment).css("display", "none");
            log("BAN済ユーザー #" + num + " Force ban " + commentName + ": " + commentText);
            addComment ();
            return;
        }

        if(find(forceUnBanNameArray, commentName)){
            addComment ();
            log("確認済みユーザー #" + num + " " + commentName + " | " + commentText + " | " + commentTextIsEmoji);
            return;
        }

        index = findIndex(textArray, commentTextNoEmoji);
        let url;
        //コメントが同じ
        if(index != -1){
            //同じ人ではない
            if(nameArray[index] != commentName){
                //絵文字が2回ともある - BAN行き
                if(commentTextIsEmoji){
                    if(commentName.length > nameLimit){
                        jQuery(checkComment).css("display", "none");
                        log("絵文字有, コメント非表示, 要BAN確認コメント #" + num + " " + commentName + " | " + commentText + " | " + commentTextIsEmoji);
                        if(!find(banCheckDataArray, commentName)){
                            banCheckNameArray.push(commentName);
                        }
                    }
                }else{//絵文字がない
                    if(commentName.length > nameLimit){
                        log("絵文字無, 要BAN確認コメント #" + num + " " + commentName + " | " + commentText + " | " + commentTextIsEmoji);
                        if(!find(banCheckDataArray, commentName)){
                            banCheckNameArray.push(commentName);
                        }
                    }
                }
            }else{//同じ人
            }
        }else{//コメントが違う
            //履歴追加
            log("通常コメント #" + num + " " + commentName + " | " + commentText + " | " + commentTextIsEmoji);
        }
        addComment ();
    }

    function reloadAPI(errorLog){
        index = findIndex(apiKeyList, apiKey);
        if(index + 1 < apiKeyList.length){
            log("YouTubeAPI制限 or 生放送ではない, APIキーを" + apiKey + " -> " + apiKeyList[index + 1] + " に変更");
            apiKey = apiKeyList[index + 1];
            banCheck();
        }else{
            log("YouTubeAPI制限 or 生放送ではない, 動作停止");
            work = false;
        }
    }

    //絵文字か判断
    function isEmoji() {
        if(checkComment.find(".emoji").length){
            return true;
        }
        if (commentText.match(ranges.join('|'))) {
            return true;
        } else {
            return false;
        }
    }

    //絵文字除去
    function removeEmojis () {
        if(commentText == "" || commentText == null){
            return commentText;
        }
        return commentText.replace(regex, '').replace(/\s+/g, "").replace(" ", "");
    }

    //配列内に存在
    function find(array, str){
        for(let i = 0; i < array.length; i++){
            if(array[i] == str){
                return true;
            }
        }
        return false;
    }

    //配列内に存在 - 位置を返す
    function findIndex(array, str){
        for(let i = 0; i < array.length; i++){
            if(array[i] == str){
                return i;
            }
        }
        return -1;
    }

    //文字に配列内の文字を含む
    function findWord(array, str){
        for(let i = 0; i < array.length; i++){
            if(str.indexOf(array[i]) != -1){
                return true;
            }
        }
        return false;
    }

    //コメント追加
    function addComment () {
        if(nameArray.length > keepCommentLimit){
            nameArray.shift();
            textArray.shift();
            boolArray.shift();
        }
        nameArray.push(commentName);
        textArray.push(commentTextNoEmoji);
        boolArray.push(commentTextIsEmoji);
    }

    //ログ出力
    function log(text){
        if(debug){
            console.log(text);
        }
    }

    function firstSetting(){
        forceUnBanNameArray = makeArray(getForceUnBanName);
        forceBanNameArray = makeArray(getForceBanName);
        banWord = makeArray(getBanWord);

        if(GM_config.get('live_apiKeyList1') != ""){
            apiKeyList.push(GM_config.get('live_apiKeyList1'));
        }
        if(GM_config.get('live_apiKeyList2') != ""){
            apiKeyList.push(GM_config.get('live_apiKeyList2'));
        }
        if(GM_config.get('live_apiKeyList3') != ""){
            apiKeyList.push(GM_config.get('live_apiKeyList3'));
        }
        if(GM_config.get('live_apiKeyList4') != ""){
            apiKeyList.push(GM_config.get('live_apiKeyList4'));
        }
        if(GM_config.get('live_apiKeyList5') != ""){
            apiKeyList.push(GM_config.get('live_apiKeyList5'));
        }
        if(GM_config.get('live_apiKeyList6') != ""){
            apiKeyList.push(GM_config.get('live_apiKeyList6'));
        }
        if(GM_config.get('live_apiKeyList7') != ""){
            apiKeyList.push(GM_config.get('live_apiKeyList7'));
        }
        if(GM_config.get('live_apiKeyList8') != ""){
            apiKeyList.push(GM_config.get('live_apiKeyList8'));
        }
        if(GM_config.get('live_apiKeyList9') != ""){
            apiKeyList.push(GM_config.get('live_apiKeyList9'));
        }
        if(GM_config.get('live_apiKeyList10') != ""){
            apiKeyList.push(GM_config.get('live_apiKeyList10'));
        }
    }

    function makeArray(str){
        let temp;
        let tempArray = [];
        if(str == ""){
            return tempArray;
        }
        temp = str.split(",");
        for(let i=0;i<temp.length;i++){
            tempArray.push(temp[i]);
        }
        return tempArray;
    }
    /* --------------- YouTube拡張機能 本体 ---------------------*/
    //背景色CSS変更
    function CssBg(id, value){
        jQuery(id).css("background-color", value);
    };

    //要素追加 - 後ろ
    function Before(id, value){
        jQuery(id).before(value);
    };

    //ポップアップ要素適用
    function ApplyPopup(){
        CssBg("body > ytd-app > ytd-popup-container > iron-dropdown > #contentWrapper > ytd-multi-page-menu-renderer", bgcolor4);
        CssBg("body > ytd-app > ytd-popup-container > iron-dropdown > #contentWrapper > ytd-multi-page-menu-renderer > #header > ytd-active-account-header-renderer","hsla(0, 100%, 50%, 0)");
    };

    //中央メイン要素適用
    function ApplyMainALL(){
        if(changeColor == "true"){
            //透明化
            CssBg("#guide-content,#contentContainer,#columns,#channel-container,#channel-header,#secondary,#header > ytd-simple-menu-header-renderer,#tabs-container,#tabs-inner-container,#channel-header,#channel-header-container,#tabs-inner-container","transparent");

            //上部
            CssBg("#masthead", bgcolor1);

            //左側#guide-content
            CssBg("#guide-content", bgcolor2);

            //中央
            CssBg("body > ytd-app, #page-manager > ytd-browse,#page-manager > ytd-browse:nth-child(3),#page-manager > ytd-watch-flexy,#page-manager > ytd-browse:nth-child(3)", bgcolor3);

            //Live
            CssBg("yt-live-chat-app > #contents > yt-live-chat-renderer", bgcolor5);
        }
    };

    function youtubeExtension (){
        if(jQuery("#guide").attr("class") == "style-scope ytd-app"){
            //設定
            jQuery(document).on("click", "#open_config", function(){
                if(jQuery('#MyConfig').length){
                    var result = confirm("保存されていない設定は消えます。本当に閉じますか？");
                    if(result) {
                        GM_config.close();
                    } else {
                        return false;
                    }
                }else{
                    GM_config.open();
                    if(settingBg != ""){
                        jQuery("#MyConfig").css({"background-image":"url('" + settingBg + "'","background-size":"cover"});
                    }else{
                        jQuery("#MyConfig").css({"background-color":"azure"});
                    }
                }
            });

            //設定ボタン追加
            Before("#end",'<a id = "open_config" class="btn logout" style="background-color: rgba(240, 255, 255, 0); color: black;cursor: pointer;"><img src="https://monatann.azurewebsites.net/img/settingicon.png"></a>　　');

            ApplyMainALL();

            jQuery(document).on("click", "a", function(){
                ApplyMainALL();
            });

            jQuery(document).on("click", "#avatar-btn,#buttons > ytd-topbar-menu-button-renderer", function(){
                ApplyPopup();
            });

            if(allow_change_bg_picture){
                jQuery("head").append('<link rel="stylesheet" href="https://monatann.azurewebsites.net/files/nicoaddon/script/vegas.min.css">');
                jQuery(function(){jQuery('body').vegas({delay: delay_time,slides:[{ src:background_picture1},{src:background_picture2},{src:background_picture3},{src: background_picture4},{src:background_picture5}]});});
            }
        }
    };


    //フブキを推していけ~~!
    if(location.href.indexOf("live_chat") == -1){
        console.log("狐じゃい!");
        console.log("                                            `  ..");
        console.log("                                  `     `         `       `     `    `     `       `");
        console.log("                        .                             .");
        console.log("                        `   `.                        .                `");
        console.log("                        .  .   ~`                   ~` `         _``  `");
        console.log("                           JNJ~         ` . ___`_.__. ! .     `    .((y  `         `");
        console.log("                         ` .@HN.    `_.-_.              `` -_``    +@@%");
        console.log("                          ` HM/!   -_`_`                  .` `..` .4@#");
        console.log("                          _`?b!_  .` -`  `     `  `         `  <  ~JM% .");
        console.log("                      `     .% ._``                            `~(`.@              `");
        console.log("                           _.~ _!   `  `  `   `     ```         ._`.:_~");
        console.log("                            _--~`        `    `.`  `     `   _   .~ .");
        console.log("                           .~`(`    _ `   .`   -      .   `  _   ` ((_        `    `");
        console.log("                              ~ `   _   ` >.    _`   .!.   . ( ` ` __");
        console.log("                      `      .__` `  `    :_`        ._.  `  .   ``__");
        console.log("                             . .`   -`  `._```  `    ~-__  `    _ `_>");
        console.log("                            ...`    -    .___        (__~` ``._ __ _~._");
        console.log("                            `><_    1   _. _:   ` . _~_ !<   (~  _ _~         `    `");
        console.log("                     `    ._((~  ` ~_ .J(----`   ~.__-(J(..(_(` _.~(.`_");
        console.log("                           _ ...    (wY~.WdU/!_    `.<&(dU;?4<_~.~_~(~ .");
        console.log("                          .`-___  ` --`.v?=<2 `_.._ ! C?=?C` __.-_ :.  _");
        console.log("                          _ _~>_    .<``.~(? ```(_ ```.<(?_``_( ?~-:.__");
        console.log("                      `   !  ((_  `` >``.`.```` ~ `` ```.`.`.~-~`(<~.-  .     `    `");
        console.log("                          `. (~:     +_`````````` ````````` <-  _<.~.~  `");
        console.log("                          ``.1_(     (<.`````` ``` ````````,<>`_ `__._._.");
        console.log("                           _((<:_ ` _.;<-.````` `` ` ````.<__:`~_-<__.__`");
        console.log("                      `     .(>_i   (.;:;_(-.` `````` ..~~;<:! _ ._!~_-_           `");
        console.log("                           _ _1_(_  .-<:;<~(><.  ``.,1<<~_><+ __ (~~_`-.      `");
        console.log("                           _`_(: q,  1(<;:::dg+<<(<+jm;<:(<+<` `(~_(`._");
        console.log("                            _ !_ ,N._JpQggMNM##p~~j##MNNgzgNF   ~_(~._");
        console.log("                      `     .` `` WN ,MdHHMHHH##pj##HHMNMdMM\  ( _(__");
        console.log("                          . ``  ` .Mh_HNHM#HHHHMY7HHHHHMWH@#  ._`_!   `.      `    `");
        console.log("                          ` ````   (HNdMNMM#MB>...._7HM@@HHF -~_ _``` .`");
        console.log("                           _`.    ` W@@HMHHL ``   ` `.W@MHM~J! _ !`._` .");
        console.log("                      `    _```.    .M@@@@@H;```````.H@MHHbJ` `_--`````~");
        console.log("                         ..;```` _.` ,H@@@M@N,`````.W@MHHMY  .(_ ``````_      `");
        console.log("                       .HMM!``` ` _1+._7YMHHMN-(gm.dMMHMB:.zI<_````````-           `");
        console.log("                       .M@#```` _   ?<~::~-?THMMYWMM9=-(_~_z<`  `. ` ``");
        console.log("                      ?M@MD`````.!`.~`_<_?71vGJ>;;+zz<<~_~``_` .( ````` _");
        console.log("                        TM%```` -   ~    `  _?O&+zJ>       `~    !.`````_");
        console.log("                          ~```.~`   _         JCdvc-   `    __    .~````_     `");
        console.log("                         ._...-{    > `    ` (Z<w%j+~  ` `  ._    (~-..-_.         `");
        console.log("                    ` .      ` ~    <  ` `  :zC(w1_ux_.     .:  ` -   `");
        console.log("                   - `          `  <      _(z<(z(l_O+_-`  `._    `       `  .`");
        console.log("                   dM|      `   ~   G.  ` __?>~<1(<_(1:~~   (!   .           JH+");
        console.log("                   _TN,   `      -.  `   _~(+<(<_ ~<~<1~~~      .<     `  ``.MY`.");
        console.log("                     (= ` ......._~.,._ _~_><~(_`` (_~<_~~(~_(J___.   `   ` D.`");
        console.log("                      .c~_! _!<?`:._d}`.~~(+<~: _ . <~(<~~~_.W;  <+-.......,!");
        console.log("                  ..+j}          :.?^! <~~(<(<_  (  (_~<~~~~<~?- (.  _~?<~?jI-.");
        console.log("                ~(J<JC .        .>`-   _~~_(<<  `    <::~~:~<   (__        .O&?1-.");
        console.log("               _(v~(?!          ::     ._(+<;!    (. (x:~~~(~ ``..~_        .<C_?1__.");
        console.log("             `_(I~(:  ```       _:.     <>;;<``  `_`  1<~~~( _  ..__-     `  _~<~~?-~~");
        console.log("             .(!<_!.  `   ` `  _(+   `  (;;<:`  ` ` ` (z<_~!  __. `..   `       _~~(<~~");
        console.log("             !  /` _     `   ` ~(!      .<><` `  _`    <;<(    (( ..`` `         ~~~<~_~");
        console.log("                      `    `  __`    ``` <>: `  ,:     (;;: ``` ?.`````    `   .  __(  !_");
        console.log("                       `  ` ` .-    `    .< `   _~      ~_ ` ``  (.```` _          .<.");
        console.log("                  .``   ` ``` -   `            ___       `   ``   < ` `` _`    ``    !");
        console.log("                   ``   ` `   .   `    `    ` .`` _`           `` _.    `    `");
        console.log("                 _`   `` `    .`              ~```_   ` `          ~ ``  `` `    `");
        console.log("                 `    ```   ` .``   ` `  `   .``.` _      `         _      ``");
        console.log("                `   ````  `   ``   `         _`.. `_        `    ``` .     ```");
        console.log("               .  `  `   ` ` _   ``    `  ` .`` (_`     `          ``_  `  ````    -");
        console.log("              ( `  ```  `   _`` ``    `  `  _`` (```_      `  `     ``_     ````   ..");
        console.log("             . `  ``       .`` ``            ``` ```(               `` .     ````  ` -");
        console.log("            __ ` ``    `  .```     `. `   `_```````` _   ` .   `  `  ``        ```    _");
        console.log("         `.`_`  `     `    ``          `   ``````````~     .  `   `   ``_     ` ```    _");
        console.log("         .``````         ``` ` `   .      .``````````       _   `  ` ` ``_  `    ```  `  .");
        console.log("        .`````      `   ````  `  ` _ `    _`` ` ````` .        `  `  `  ``_.    ````` ``");
        console.log("       _````    `    ``.```  `    .    `  _  ``````` ._  ` ` .`    `   ` ``..      ``  .. `");
        console.log("      `          `    .```` ` `` `_      (g+JJJJJ(J(((, `   `_  ``  ` `````` .      ``   `");
        console.log("     `       ``  ` ``. ````  `  ` ~  `   M#HMHHMHHWMMMN`` `  .   ```````````` _      ` `      ~");
        console.log("    <-  ` ``  ` `    _``````     .`   ` .MNM@H@@M@@@@@M.`  `  _    ` `   ` ``.  `      `   ` _`");
        console.log("     _~  `  `  `      _```` ```  ~      (#H@@MMMM@H8@HM|  `  `_        `` ` -     `         ._");
        console.log("  .    ~- ` ``  ` ` `  -````    ._  `   MHH@@@@@MMMMHMM] `  `  _      ```` `         `  `` (~   `");
        console.log("   _  ` `~-.`  `   `   Hm.``  ` _      .MHH@H@@@M@@H@HHb   ` ` _  `     .x     `        .-_`   `");
        console.log("    `      ~_~~-....  .HHMe     o.   . d#MM@@H@H@H@@@HHN. ` `  ..   ` .dMM;      ` ` .__`");
        console.log("      `  ` ` ``  ````_W@@MMN,  .MM$_-..M#M#NMMM@HMM##H##; ..(r~d[ ..gMMMHMN.   ..._~~``   ._:");
        console.log("      ._~..      `   .H@@@@MMNaJM@~~H@@MM##H#H#M[ M#HHHHMHMM@D~JMHMM@@@HHH@N```        .__. !");
        console.log("     .--<~~(<___`  ..HHH@@@@@@M@M>__H@@@@@MHHHHH].HHHHHHM@@@@b_(M@@@@@@@HMH@b        ~__<_`_`");
        console.log("    _._~~~(~_  ~   _?M@H@@@@@@@@D~` @@@@@@@@MHHHN(HHHHM@@@@@@@. d@@@@@@@HWMHM!~          1.");
        console.log("   .` ___~_~<`.   -` ~?H@@@@@@@H>_`.@@@@@@@@@HHHMdH@HH@@@@@@@#``(@@@@@@@@@MY~..~        `-~`");
        console.log(" ``  ._<_`.__.`  .`.-_~!_?TH@@@#_ `.@@@@@@H@@@@HHMHHHH@@@@@@@#`` H@@@@@HH9~``...~");
        console.log('   .____  _`     _.._ -.._   ?T"S...M@@@@@@MW9"!~ 7YMMM@@@@@@@` .dH#9=!(~__````. _');
        console.log("                -.` _...(    ~.``  -7??!`   ``..~    _.<?TYYY97?`````` <~::_.```  _");
        console.log("                _.`  `_.~      ````````````````__    .```````````````` ~~__~_`````..");
        console.log("               _.``. `___     _`````````````````_    _```````` ```````._..._~_`...`(");
        console.log("               `.`` . __`     _ `````` ` `` ````.    _`````` `` ` ````(..~_.-_.``..`~");
        console.log("              .`__`_` ._      .,.`````` ````` ..x    -_ ````` ``````.J%.._~_....`..  .");
        console.log("             `_ _. -  _.      .M#MHmmgggggQW@@@#D    MNm&-.......(gHMM~..._~.._ .`..`");
        console.log('                `` _  _        _~?""YYYWYWY""^~ (    M@@@@@@@@@@@@@@@@..`......_ ... `_');
        console.log("                ``__  _         _```````````````.    M@@@@@@@@@@@@@@Mt...`.-...__ ...  .");
        console.log("               .   _    _       ~```````` `````` .   H@@@@@@@@@@@@@@M~....`._..._  ...`_");
        console.log("            _  `  _   ._         ` ` ` `` ` ``  .   @@@@@@@@@@@@@@@F....`......__`` .`..");
        console.log("            . ``_  .  _(        _```` ```` `` ```   H@@@@@@@@@@@@@M}....`( .._._~ ` 1 (-");
        console.log("             .  ``  _   ..       _`` ``` ```` ```.   H@@@@@H@@@@@@H#_.....`h..(-_:_``(h,N.");
        console.log("             .      -    _        _`` ``` ` `````_   W@@@@@@@@@@@@M]`......(M,.W_~~`` HH@[");
        console.log("             -` .    .   _.       ~ `` ``` `` ` `_   W@@@@@@@@@@@@M!....``..MHL(b_ , `d@@N");
        console.log("               ._    _    _        .``` `````` ``_   H@@@@@@@@@@@@@ ~ ....``HHHhdL`W(`(HUH-");
        console.log("               ._     _    ~       :```` ` ` ````.   H@@@@@@@@@@@M%  . ...`.W@H@@M,JH,.@rH]");
        console.log("             `_ _     ~.    `      .  ``` ``` ```-   H@@@@@@@@@@@#`  _```..`WHHH@@N(@b Hb(b");
        console.log("              _ _      _.           !` ```` ``` `_   H@@@@@@@@@@MF    .`````dH@HHHHRMH-HN W");
        console.log("               ._       _.          . ` `````````    H@@@@@@@@@MM!    _````.dH@@H@HHM#Ld@-(_");
        console.log('               _`         .          :```````````.   W@@@@@@@@@M#      ., ..JHH@HH@HH#NJ@[.}');
        console.log("                .                    j-``````````    d@@@@@@@@M#]      _/e,.(H@HH@HHH##d@] }");
        console.log("                 _                   ,._`````````.   d@@@@@@@@M#b       .?Hx(M@H@HH@H##M@P }");
        console.log("                 _                   ~~~_.```````_   (@@@@@@@M#H#|      __ZHJHHH@HHMHHHM@b {");
        console.log("                  _                 _~~~~:.``.``.    .M@@@@HM#HHHN.      . WNMHHH@#MMH#M@b :");
        console.log("                   _                ~~.~~~:_ ` ._     HM@HHM#HHHHHL      _..MHHH@m(1xu##@b");
        console.log("                    -              _.~~.~~.~~~~_!     d##HHHHHH@@HN.      _ (H@HHMOgHadN@b");
        console.log("                     -       `    .~....~...~.~_      ,HHHHHH@M@@@Hb      _  ZH@@@H@HHH#@F");
        console.log("                      `           _.~..~.~~..~._      .MHHH@HH@@@@MN.     (   MH@H@@HHH#M]");
        console.log("                        `        .~..~.......~_`       HHH@HH@@@@@@H]      .  -HH@HH@HH#@%");
        console.log("                                 _~...~.......~        d@H@H@@@@@@@MN      _   WH@H@HHHHM{");
        console.log("                             `   _..~.........~        ,@@@@@@@@@@@@H;     `   ,HH@HHHHHM`");
        console.log("                                ...~........._         .@@@@@@@@@@@@Mb          XHH@HHHH#");
        console.log("                                _~..........._          W@@@@@@@@@@@MN.         ,MHH@HHHF");
        console.log("                          `    ~...........-~          J@@@@@@@@@@@@H_          WHHHHHH}");
        console.log("                               ._.~..........           ,@@@@@@@@@@@@H}          ,H@HHH#");
        console.log("                               .......`.`.`._        `   H@@@@@@@@@@@H}          ,HHHHHF");
        console.log("                      `        .....``.`.`. !     `      d@@@@@@@@@@@H:          JHHHHM!");
        console.log("                               ......`..`..-`            J@@@@@@@@@@@H!          W@HHH@");
        console.log("                           `   ....`..`..``-             .@@@@@@@@@@@M`         .H@HHH>");
        console.log("                               -...``.``..._              H@@@@@@@@@@N          .H@HHF");
        console.log("                               _..`.....`..~              d@@@@@@@@@@#          d@HHM!");
        console.log("                      `        (...`..`..`-~              ,@@@@@@@@@@#         .@@HHF");
        console.log("                               .....`..`.._`      `       .H@@@@@@@@@b         d@HH#");
        console.log("                           `   ..........._                W@@@@g@@@@F        .H@@M'");
        console.log("                               ..........._                d@@@@@@@@@]        d@H@%");
        console.log("                      `         ~....`...._          `     J@@@@@@@@M%       .H@@t");
        console.log("                                ~.........!                ,@@@@@@@@@}      .HHMt");
        console.log("                                _.........~       `        .@@@@@@@@@!      dHM%");
        console.log("                           `    <..~....._`                .H@@HHH@HM`     .HM^");
        console.log("                      `         :~~.~~~.~_                  HH@@@@H@N     .H#!");
        console.log("                            .JMMP_~~~~~~~(m,            ..gMMH@HH@HHMNa...HD");
        console.log("                          .MMNNM@:~~~.~~~JMNMm.       .HMMNMMHH@HH@MM##NN@P");
        console.log("                          ,MHMMN#:<~~~~~~JNMM#         HMNNM#HHH@HHHMNNMHM@");
        console.log("                      `   ,NMHHHMaJ.~~~(JdMHM#         HMMNNMHHHHHH#MNMHHM`");
        console.log("                          ,NNMMHHHM#p:<dMHHM#N         dNM@MM#HHHMMMM@HHH@");
        console.log("                          JH####N##NNmdN#MH#HH[        J##MMNNN#MM@@HH@@HN,");
        console.log("                         .HHHHH##H###NM#HM@M#HN.      .HH#MMNNNN##M@H@@@HHM,       `");
        console.log("                      `  dHHHHHHH###M7MHHHMMHHHb     (HH@HMM#NM###M@MHHHHHHM,");
        console.log("                        J@@@HHHHM###>:?HMNM@MH@%     (H@HHH##MNM##MM@@MHHHHY");
        console.log("                         ?M@HHHMN##N:~(MN#FW@H#       ?HH@M#HMNM#NNMM@@@@#^");
        console.log("                           ?M@MMM#HM<_dNNM~.MM'        (H#~M#NM#NNMMH@M#^");
        console.log("                      `      (HXWMH@b(MMUW_ ,^             WWNMMBIdpWHN]           `");
        console.log("                             .MmXfvTM#3?zWL               .XIT3+lwfWMNN[");
        console.log("                             ,NNMHkzdN+uM##               (HHNxuQQMN#NN[");
        console.log("                             JNNNN#M###NNNb              .#MH@MMMNNNNNN[           `");
        console.log("                      `      dNN########N#N          `  .W@@@H@@HM#####]      `");
        console.log("                             MN####HHHHHHHM_            ,H@H@@H@@HHH###]");
        console.log("                            .###H#HHHHHHHHH|           .M@H@H@HH@@M#HH#]");
        console.log("                            .##H#HHHHHHHHHHb           dHH@@@H@HHHH###N]");
        console.log("                      `     ,#HHHHHHHHHHHHHN      `   .HHH@HH@H@HH#H#N#\           `");
        console.log("                            ,##HHHH@H@H@HHHM-        .MMMHHHHHHM####MNM`");
        console.log("                            .NNHHH@HHH@HH@H#)      .HH@@@@@@@@@HHH##M#@       `");
        console.log("                      `      HN#HHHHHHHHHH##\     .M@@@H@@@@@@HM##HMMY");
        console.log("                             .TNN#HHHHHHH##M!     HM@@@@H@HH@MH###NF");
        console.log("                               .TM##H###MNMF      M#MH@H@@HMM#N##MF                `");
        console.log('                                   7"WHH9^        (WMHMMMMNNNNMH"!            `');
        console.log("                      `                                ??777!");
    }
});
