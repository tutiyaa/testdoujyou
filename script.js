const questions = [
  {
    text: "問1: 情報セキュリティの代表的な3つの要素として、最も適切なものはどれか。",
    choices: [
      "可用性・効率性・信頼性",
      "機密性・完全性・可用性",
      "機密性・安全性・保守性",
      "完全性・拡張性・保守性"
    ],
    answerIndex: 1,
    explanation:
      "情報セキュリティの3要素は、機密性・完全性・可用性です。機密性は許可された人だけが情報にアクセスできること、完全性は情報が改ざんされていないこと、可用性は必要なときに利用できることを意味します。",
    correctChoiceLabel: "B"
  },
  {
    text: "問2: OSI基本参照モデルの各層で中継する装置を，物理層で中継する装置，データリンク層で中継する装置，ネットワーク層で中継する装置の順に並べたものはどれか。",
    choices: [
      "ブリッジ，リピータ，ルータ",
      "ブリッジ，ルータ，リピータ",
      "リピータ，ブリッジ，ルータ",
      "リピータ，ルータ，ブリッジ"
    ],
    answerIndex: 2,
    explanation:
      "物理層で動作する中継装置はリピータ、データリンク層はブリッジ、ネットワーク層はルータです。したがって「リピータ／ブリッジ／ルータ」の順に並べるのが正解です。",
    correctChoiceLabel: "C"
  },
  {
    text: "問3: IPv6アドレスの特徴として，最も適切なものはどれか。",
    choices: [
      "32ビット長で，10進数をドットで区切って表記する",
      "32ビット長で，16進数を4文字ずつコロンで区切って表記する",
      "128ビット長で，10進数をドットで区切って表記する",
      "128ビット長で，16進数を4文字ずつコロンで区切って表記する"
    ],
    answerIndex: 3,
    explanation:
      "IPv6アドレスは128ビット長で、16進数を4文字ずつコロン区切りで表記します。例：「2001:db8::1」などの形式です。",
    correctChoiceLabel: "D"
  },
  {
    text: "問4: インターネットにおける電子メールの規約で，ヘッダフィールドの拡張を行い，テキストだけでなく，音声，画像なども扱えるようにしたものはどれか。",
    choices: ["HTML", "MIME", "SMTP", "POP3"],
    answerIndex: 1,
    explanation:
      "MIMEは電子メールの拡張規格で、文字だけでなく画像・音声・動画などを扱えるようにしたものです。SMTPは送信プロトコル、POP3は受信プロトコルです。",
    correctChoiceLabel: "B"
  },
  {
    text: "問5: IPネットワークにおいて，ICMPのエコー要求，エコー応答，到達不能メッセージなどによって，通信相手との接続性を確認するコマンドはどれか。",
    choices: ["arp", "ipconfig", "ping", "netstat"],
    answerIndex: 2,
    explanation:
      "pingはICMPのエコー要求・応答を使ってネットワーク疎通を確認するコマンドです。arpはIPとMACの対応確認、ipconfigはIP設定表示、netstatは接続・ポート状態の確認に用います。",
    correctChoiceLabel: "C"
  }
];

const quizDiv = document.getElementById("quiz");
const resultDiv = document.getElementById("result");
const submitBtn = document.getElementById("submitBtn");
const explanationsDiv = document.getElementById("explanations");

// 画面に問題を描画
questions.forEach((q, qi) => {
  const block = document.createElement("div");
  block.className = "question-block";

  const qText = document.createElement("p");
  qText.className = "question-text";
  qText.textContent = q.text;
  block.appendChild(qText);

  q.choices.forEach((choice, ci) => {
    const label = document.createElement("label");
    label.className = "choice-label";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `q${qi}`;
    radio.value = ci;

    label.appendChild(radio);
    label.append(` ${String.fromCharCode(65 + ci)}. ${choice}`);
    block.appendChild(label);
  });

  quizDiv.appendChild(block);
});

submitBtn.addEventListener("click", () => {
  let score = 0;
  const userAnswers = [];

  // 採点
  questions.forEach((q, qi) => {
    const selected = document.querySelector(
      `input[name="q${qi}"]:checked`
    );
    if (selected) {
      const selectedIndex = Number(selected.value);
      userAnswers.push(selectedIndex);
      if (selectedIndex === q.answerIndex) {
        score++;
      }
    } else {
      // 未回答の場合は -1 を入れておく
      userAnswers.push(-1);
    }
  });

  // 結果表示
  resultDiv.textContent = `正解数: ${score} / ${questions.length}`;

  // 解説エリアをクリア
  explanationsDiv.innerHTML = "";

  // 各問題の回答＋正解＋解説を表示
  questions.forEach((q, qi) => {
    const expBlock = document.createElement("div");
    expBlock.className = "explanation-block";

    const header = document.createElement("div");
    header.className = "explanation-header";

    const userIndex = userAnswers[qi];

    let userText;
    if (userIndex === -1) {
      userText = "未回答";
    } else {
      userText = `${String.fromCharCode(65 + userIndex)}. ${
        q.choices[userIndex]
      }`;
    }

    const correctText = `${q.correctChoiceLabel}. ${
      q.choices[q.answerIndex]
    }`;

    const isCorrect = userIndex === q.answerIndex;

    header.innerHTML = `問${qi + 1} ${
      isCorrect ? "<span class=\"correct\">正解</span>"
                : "<span class=\"incorrect\">不正解</span>"
    }`;

    const userP = document.createElement("p");
    userP.textContent = `あなたの回答: ${userText}`;

    const correctP = document.createElement("p");
    correctP.textContent = `正解: ${correctText}`;

    const expP = document.createElement("p");
    expP.textContent = `解説: ${q.explanation}`;

    expBlock.appendChild(header);
    expBlock.appendChild(userP);
    expBlock.appendChild(correctP);
    expBlock.appendChild(expP);

    explanationsDiv.appendChild(expBlock);
  });
});