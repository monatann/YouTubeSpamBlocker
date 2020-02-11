// ==UserScript==
// @name         YouTube Spam Blocker
// @namespace    https://monatann.azurewebsites.net/
// @version      1.0
// @description  Block spam (on VTuber chat)
// @author       monatann
// @match        https://www.youtube.com/watch*
// @require      https://monatann.azurewebsites.net/files/nicoaddon/script/jquery-3.2.1.js
// @grant        none
// ==/UserScript==

(function() {
    var nameLimit = 15;
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

                if(nameArray.length > 200){
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
                        jQuery(comment1).remove();
                        if(debug){
                        console.log("Spam user: " + temp + " :" + comment1text);
                        }
                    }
                    if(temp == comment2name){
                        jQuery(comment2).remove();
                        if(debug){
                            console.log("Spam user: " + temp + " :" + comment2text);
                        }
                    }
                    if(temp == comment3name){
                        jQuery(comment3).remove();
                        if(debug){
                            console.log("Spam user: " + temp + " :" + comment3text);
                        }
                    }
                    if(temp == comment4name){
                        jQuery(comment4).remove();
                        if(debug){
                            console.log("Spam user: " + temp + " :" + comment4text);
                        }
                    }
                    if(temp == comment5name){
                        jQuery(comment5).remove();
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


})();