// ==UserScript==
// @name         YouTube Spam Blocker
// @namespace    https://monatann.azurewebsites.net/
// @version      1.7
// @description  Block spam (on VTuber chat)
// @author       monatann
// @match        https://www.youtube.com/*
// @require      https://monatann.azurewebsites.net/files/nicoaddon/script/jquery-3.2.1.js
// @grant        none
// ==/UserScript==

/******************************
* 設定用変数
*******************************/
//BANする名前の長さ デフォ: 8文字以上
var nameLimit = 8;
//コメント履歴の数　デフォ: 300コメント
var keepCommentLimit = 300;
//コメントを同時にいくつ監視するか デフォ: 5コメント
var seeSize = 5;
//BAN解除システムを許可 デフォ: true
var unBan = true;
//自動BAN解除システムを許可 デフォ: true
var autoUnBan = true;
//自動BAN解除の名前
var forceUnBanNameArray = [];
//強制BANシステムを許可 デフォ: true
var forceBan = true;
//強制BANの名前
var forceBanNameArray = [
    "watch",
    "video",
    "vide0",
    "v!de0",
    "vid30",
    "chat",
    "withme",
    "ღ",
    "l0v3",
    "ph0t0",
    "s3x",
    "ŚĔЖ",
    "ŤĂР",
    "РĤŐŤŐ",
    "L!VE",
    "live",
    "sex",
    "click",
    "here",
    "ʟɪᴠᴇ",
    "sᴇx",
    "ᴄʟɪᴄᴋ",
    "ʜᴇʀᴇ",
    "ι",
    "ѕeх",
    "тap",
    "pнoтo"
];
//デバックする - デフォ: false
var debug = true;

/************************************
* スクリプト用変数
************************************/
var iframe;
var comment;
var checkComment;
var rawCommentName;
var commentName;
var commentHTML;
var commentText;
var commentTextNoEmoji;
var commentTextIsEmoji;
var index;

let idArray = [];
let nameArray = ["YouTube Spam Blocker"];
let textArray = ["YouTube Spam Blocker"];
let boolArray = [false];
let warningArray = ["YouTube Spam Blocker"];
let banArray = ["YouTube Spam Blocker"];
let unBanTempArray = [];

var a = function() {
    //HTML取得
    iframe = jQuery('#chatframe').contents();

    //コメント履歴制限 消す
    if(nameArray.length > keepCommentLimit){
        for(var i1=0;i1<seeSize;i1++){
            nameArray.shift();
            textArray.shift();
            boolArray.shift();
        }
    }

    //各コメントごとに別関数呼び出し
    for(var i2=1;i2<seeSize+1;i2++){
        checkComment = iframe.find("#item-offset > #items > .style-scope.yt-live-chat-item-list-renderer:nth-last-child(" + i2 + ")");

        var id = checkComment.attr("id");
        if(find(idArray, id) || id == null){
            return;
        }
        if(idArray.length > 7){
            idArray.shift();
        }
        idArray.push(id);

        spamCheck(i2, checkComment);
    }
}
setInterval(a, 100);

function spamCheck(num, comment){
    //コメント情報
    rawCommentName = comment.find("#author-name").text();

    commentName = rawCommentName.toLowerCase();
    commentHTML = comment.find("#message");
    commentText = commentHTML.text().toLowerCase();
    commentTextNoEmoji = removeEmojis();
    commentTextIsEmoji = isEmoji();

    if(autoUnBan){
        if(find(forceUnBanNameArray, commentName)){
            addComment ();
            if(debug){
                console.log("UnBanUser #" + num + " " + commentName + " | " + commentText + " | " + commentTextIsEmoji);
            }
            return;
        }
    }

    //ぬるぽ防止
    if(commentName != null && commentText != null){
        //BANされた人の処理
        index = findIndex(banArray, commentName);
        //BANされた人の名前と一致
        if(index != -1){
            if(find(textArray, commentTextNoEmoji)){//コメントが同じ
                jQuery(checkComment).css("display", "none");
                if(debug){
                    console.log("#" + num + " Spam user: " + commentName + " :" + commentText);
                }
                addComment ();
                return;
            }else{//ではない
                //BAN解除
                if(unBan){
                    if(find(unBanTempArray, commentName)){
                        banArray.splice(index, 1);
                        if(debug){
                            console.log("UnBan #" + num + " " + commentName + " | " + commentText + " | " + commentTextIsEmoji);
                        }
                        if(autoUnBan){
                            forceUnBanNameArray.push(commentName);
                            if(debug){
                                console.log("ForceUnBan #" + num + " " + commentName + " | " + commentText + " | " + commentTextIsEmoji);
                            }
                        }
                    }else{
                        unBanTempArray.push(commentName);
                    }
                }
            }
        }
    }


    if(forceBan){
        //名前による強制BAN
        if(find(forceBanNameArray, commentName)){
            jQuery(checkComment).css("display", "none");
            if(debug){
                console.log("#" + num + " Force ban " + commentName + ": " + commentText);
            }
            addComment ();
            return;
        }
    }

    index = findIndex(textArray, commentTextNoEmoji);
    var url;
    //コメントが同じ
    if(index != -1){
        //同じ人ではない
        if(nameArray[index] != commentName){
            //絵文字が2回ともある - BAN行き
            if(boolArray[index] && commentTextIsEmoji){
                if(commentName.length > nameLimit){
                    if(commentName.length > nameLimit){
                        if(debug){
                            console.log("Ban #" + num + " " + commentName + " | " + commentText + " | " + commentTextIsEmoji);
                        }
                        ban();
                    }
                }
            }else{//絵文字がない
                //既に警告されていない - 警告
                if(!find(warningArray, commentName)){
                    if(commentName.length > nameLimit){
                        if(debug){
                            console.log("Warning #" + num + " " + commentName + " | " + commentText + " | " + commentTextIsEmoji);
                        }
                        //jQuery(checkComment).css("display", "none");
                        warningArray.push(commentName);
                    }
                }else{//既に警告されている名前ならBAN
                    if(commentName.length > nameLimit){
                        if(debug){
                            console.log("Ban #" + num + " " + commentName + " | " + commentText + " | " + commentTextIsEmoji);
                        }
                        ban();
                    }
                }
            }
        }else{//同じ人

        }
    }else{//コメントが違う
        //警告されている人なら解除
        var idx = findIndex(warningArray, commentName);
        if(idx != -1){
            warningArray.splice(idx, 1);
            if(debug){
                console.log("UnWarning " + commentName + " | " + commentText + " | " + commentTextIsEmoji);
            }
        }

        //履歴追加
        if(debug){
            console.log("#" + num + " " + commentName + " | " + commentText + " | " + commentTextIsEmoji);
        }
    }
    addComment ();
}

//絵文字か判断
function isEmoji() {
    if(commentHTML.find(".emoji").length){
        return true;
    }
    var ranges = [
        '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
        '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
        '\ud83d[\ude80-\udeff]' // U+1F680 to U+1F6FF
    ];
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
    var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return commentText.replace(regex, '').replace(/\s+/g, "").replace(" ", "");
}

function find(array, str){
    for(var i = 0; i < array.length; i++){
        if(array[i] == str){
            return true;
        }
    }
    return false;
}

function findIndex(array, str){
    for(var i = 0; i < array.length; i++){
        if(array[i] == str){
            return i;
        }
    }
    return -1;
}

//BAN
function ban () {
    jQuery(checkComment).css("display", "none");
    banArray.push(commentName);
}

//BAN
function addComment () {
    nameArray.push(commentName);
    textArray.push(commentTextNoEmoji);
    boolArray.push(commentTextIsEmoji);
}

//フブキを推していけ~~!
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