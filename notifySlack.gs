// フォーム受付時に実行する関数
function onFormSubmit(e){
  var mailaddress = e.response.getRespondentEmail() // 投稿者のメールアドレス
  var itemResponses = e.response.getItemResponses(); // 送信された各回答と対応する質問名が格納されます。
  
// itemResponses[i]にはフォームの上から順番に質問と回答のセットが格納されています。
// itemResponses[0]は一番はじめの質問である「お名前」とその回答に関する情報が入っています。
  var members = itemResponses[0].getResponse(); // メンバー
  var fileId = itemResponses[1].getResponse(); // アップロードされたエントリーフォームのID
  var comment = itemResponses[2].getResponse(); // コメント
  var fileURI = "https://drive.google.com/open?id=" + fileId;
  
  sendToSlack( responseMessage(mailaddress, fileURI, comment) );
 
}

//Slackに送信
function sendToSlack( messages ){
  var url        = 'https://slack.com/api/chat.postMessage';
  var token      = 'xoxp-2334628001-6550917015-416816837618-dae18df61e0ad28d51f8fc01d5422bb2'; //取得したtoken
  var channel    = '#willseed'; //　メッセージ投稿先のチャネル名
  var botname   = 'WILLSEED'; //BOTの名前
  var parse      = 'full';
  var icon_emoji = ':willseed1:'; // Botのアイコンを指定
  // 指定できるiconは　こちら（http://www.webpagefx.com/tools/emoji-cheat-sheet/）に載っています。
 
  var method     = 'post';
 
  var payload = {
      'token'      : token,
      'channel'    : channel,
      'text'       : messages,
      'username'   : botname,
      'parse'      : parse,
      'icon_emoji' : icon_emoji
  };
 
  var params = {
      'method' : method,
      'payload' : payload
  };
 
  //slackにポスト
  var response = UrlFetchApp.fetch(url, params);
}
 
 
// slackにメッセージとして送信したいテキストを作成する
function responseMessage(email, fileURI, comment){
  var message = "@channel: \n" +"新しい応募がありました(ﾟ∀ﾟ)!!\n" + "応募者：" + email + "\n" + "エントリーシート：" + fileURI + "\n" + "コメント： " + comment;
  return message;
}
