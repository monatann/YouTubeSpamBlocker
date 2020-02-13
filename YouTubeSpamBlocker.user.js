// ==UserScript==
// @name         YouTube Spam Blocker
// @namespace    https://monatann.azurewebsites.net/
// @version      1.3
// @description  Block spam (on VTuber chat)
// @author       monatann
// @match        https://www.youtube.com/*
// @require      https://monatann.azurewebsites.net/files/nicoaddon/script/jquery-3.2.1.js
// @grant        none
// ==/UserScript==

(function() {
    var nameLimit = 10;
    var keepCommentLimit = 500;
    var forceBanName = [
        "watch",
        "video",
        "vide0"
    ];
    var debug = false;


    var iframe;
    var comment1;
    var comment2;
    var comment3;
    var comment4;
    var comment5;
    var comment1name;
    var comment2name;
    var comment3name;
    var comment4name;
    var comment5name;
    var comment1html;
    var comment2html;
    var comment3html;
    var comment4html;
    var comment5html;
    var comment1text;
    var comment2text;
    var comment3text;
    var comment4text;
    var comment5text;
    var nameArray = ["YouTube Spam Blocker"];
    var textArray = ["YouTube Spam Blocker"];
    var boolArray = [false];
    var warningArray = ["YouTube Spam Blocker"];
    var banArray = ["YouTube Spam Blocker"];
    var a = function() {
        iframe = $('#chatframe').contents();
        comment1 = iframe.find("#item-offset > #items > .style-scope.yt-live-chat-item-list-renderer:last-child");
        comment2 = comment1.prev();
        comment3 = comment2.prev();
        comment4 = comment3.prev();
        comment5 = comment4.prev();

        comment1name = jQuery(comment1).find("#author-name").text();
        comment2name = jQuery(comment2).find("#author-name").text();
        comment3name = jQuery(comment3).find("#author-name").text();
        comment4name = jQuery(comment4).find("#author-name").text();
        comment5name = jQuery(comment5).find("#author-name").text();

        comment1html = jQuery(comment1).find("#message").html();
        comment2html = jQuery(comment2).find("#message").html();
        comment3html = jQuery(comment3).find("#message").html();
        comment4html = jQuery(comment4).find("#message").html();
        comment5html = jQuery(comment5).find("#message").html();

        comment1text = jQuery(comment1).find("#message").text();
        comment2text = jQuery(comment2).find("#message").text();
        comment3text = jQuery(comment3).find("#message").text();
        comment4text = jQuery(comment4).find("#message").text();
        comment5text = jQuery(comment5).find("#message").text();

        if(comment1html != null && comment2html != null && comment3html != null && comment4html != null && comment5html != null && comment1name != ""){
            if(comment1html.length > 0 && comment2html.length > 0 && comment3html.length > 0 && comment4html.length > 0 && comment5html.length > 0){

                if(nameArray.length > keepCommentLimit){
                    for(var i2=0;i2<5;i2++){
                        nameArray.shift();
                        textArray.shift();
                        boolArray.shift();
                    }
                }

                var temp;
                for(var i=0;i<banArray.length;i++){
                    temp = banArray[i];
                    if(temp == comment1name){
                        jQuery(comment1).hide();
                        if(debug){
                        console.log("Spam user: " + temp + " :" + comment1text);
                        }
                    }
                    if(temp == comment2name){
                        jQuery(comment2).hide();
                        if(debug){
                            console.log("Spam user: " + temp + " :" + comment2text);
                        }
                    }
                    if(temp == comment3name){
                        jQuery(comment3).hide();
                        if(debug){
                            console.log("Spam user: " + temp + " :" + comment3text);
                        }
                    }
                    if(temp == comment4name){
                        jQuery(comment4).hide();
                        if(debug){
                            console.log("Spam user: " + temp + " :" + comment4text);
                        }
                    }
                    if(temp == comment5name){
                        jQuery(comment5).hide();
                        if(debug){
                            console.log("Spam user: " + temp + " :" + comment5text);
                        }
                    }
                }

                var index1 = textArray.indexOf(removeEmojis(comment1text));
                var url;
                if(index1 != -1){
                   if(nameArray[index1] != comment1name){
                       if(boolArray[index1]){
                           if(comment1name.length > nameLimit){
                              banArray.push(comment1name);
                           }
                       }else{
                           if(warningArray.indexOf(comment1name) == -1){
                               warningArray.push(comment1name);
                           }else{
                              if(comment1name.length > nameLimit){
                                  banArray.push(comment1name);
                              }
                           }
                       }
                   }
                }else{
                    nameArray.push(comment1name);
                    textArray.push(removeEmojis(comment1text));
                    boolArray.push(isEmoji(comment1text));
                    if(debug){
                        console.log("#1 " + comment1name + " | " + comment1text + " | " + isEmoji(comment1html));
                    }
                }

                var index2 = textArray.indexOf(removeEmojis(comment2text));
                if(index2 != -1){
                   if(nameArray[index2] != comment2name){
                       if(boolArray[index2]){
                           if(comment2name.length > nameLimit){
                              banArray.push(comment2name);
                           }
                       }else{
                           if(warningArray.indexOf(comment2name) == -1){
                               warningArray.push(comment2name);
                           }else{
                               if(comment2name.length > nameLimit){
                                   banArray.push(comment2name);
                               }
                           }
                       }
                   }
                }else{
                    nameArray.push(comment2name);
                    textArray.push(removeEmojis(comment2text));
                    boolArray.push(isEmoji(comment2text));
                    if(debug){
                        console.log("#2 " + comment2name + " | " + comment2text + " | " + isEmoji(comment2html));
                    }
                }

                var index3 = textArray.indexOf(removeEmojis(comment3text));
                if(index3 != -1){
                   if(nameArray[index3] != comment3name){
                      if(boolArray[index3]){
                           if(comment3name.length > nameLimit){
                              banArray.push(comment3name);
                           }
                       }else{
                           if(warningArray.indexOf(comment3name) == -1){
                               warningArray.push(comment3name);
                           }else{
                               if(comment3name.length > nameLimit){
                                   banArray.push(comment3name);
                               }
                           }
                       }
                   }
                }else{
                    nameArray.push(comment3name);
                    textArray.push(removeEmojis(comment3text));
                    boolArray.push(isEmoji(comment3text));
                    if(debug){
                        console.log("#3 " + comment3name + " | " + comment3text + " | " + isEmoji(comment3html));
                    }
                }

                var index4 = textArray.indexOf(removeEmojis(comment4text));
                if(index4 != -1){
                   if(nameArray[index4] != comment4name){
                       if(boolArray[index4]){
                           if(comment4name.length > nameLimit){
                              banArray.push(comment4name);
                           }
                       }else{
                           if(warningArray.indexOf(comment4name) == -1){
                               warningArray.push(comment4name);
                           }else{
                               if(comment4name.length > nameLimit){
                                   banArray.push(comment4name);
                               }
                           }
                       }
                   }
                }else{
                    nameArray.push(comment4name);
                    textArray.push(removeEmojis(comment4text));
                    boolArray.push(isEmoji(comment4text));
                    if(debug){
                        console.log("#4 " + comment4name + " | " + comment4text + " | " + isEmoji(comment4html));
                    }
                }

                var index5 = textArray.indexOf(removeEmojis(comment5text));
                if(index5 != -1){
                   if(nameArray[index5] != comment5name){
                       if(boolArray[index5]){
                           if(comment5name.length > nameLimit){
                               banArray.push(comment5name);
                           }
                       }else{
                           if(warningArray.indexOf(comment5name) == -1){
                               warningArray.push(comment5name);
                           }else{
                               if(comment5name.length > nameLimit){
                                   banArray.push(comment5name);
                               }
                           }
                       }
                   }
                }else{
                    nameArray.push(comment5name);
                    textArray.push(removeEmojis(comment5.text()));
                    boolArray.push(isEmoji(comment5.text()));
                    if(debug){
                        console.log("#5 " + comment5name + " | " + comment5text + " | " + isEmoji(comment5html));
                    }
                }
            }
        }
    };
    setInterval(a, 300);

function isEmoji(str) {
    var ranges = [
        '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
        '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
        '\ud83d[\ude80-\udeff]' // U+1F680 to U+1F6FF
    ];
    if (str.match(ranges.join('|'))) {
        return true;
    } else {
        return false;
    }
}

function removeEmojis (string) {
  var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  return string.replace(regex, '').replace(/\s+/g, "");
}

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

})();