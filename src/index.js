async function sendPostHandler() {
  let sendData = getSendData();

  validateFrom(sendData);

  const result = await postBlog(sendData);
  return result;
}

function getSendData() {
  const inputTitle = getUserInputTitle(); // ユーザーからの入力を取得（副作用）
  const inputBody = getUserInputBody(); // ユーザーからの入力を取得（副作用）
  // POST送信する際のデータを定義
  return (sendData = {
    title: inputTitle,
    body: inputBody
  });
}

function validateFrom(sendData) {
  // 入力値のチェック（副作用でない）
  if (!validateTitle(sendData.title)) return false;
  if (!validateBody(sendData.body)) return false;
  return true;
}

async function postBlog(sendData) {
  // サーバーへのリクエスト（副作用）
  const response = await fetch("/blog-post", {
    method: "POST",
    body: JSON.stringify(sendData)
  });

  return (result = await response.json());
}
