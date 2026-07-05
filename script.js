// 問題データ
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

// DOM要素
const progressEl = document.getElementById("progress");
const questionTextEl = document.getElementById("question-text");
const choicesAreaEl = document.getElementById("choices-area");

const feedbackEl = document.getElementById("feedback");
const judgeEl = document.getElementById("judge");
const yourAnswerEl = document.getElementById("your-answer");
const correctAnswerEl = document.getElementById("correct-answer");
const explanationEl = document.getElementById("explanation");

const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");

const finalScoreEl = document.getElementById("final-score");

let currentIndex = 0;
let answeredThisQuestion = false;
let score = 0; // 正解数

// 現在の問題を描画
function renderQuestion() {
  const q = questions[currentIndex];

  // 何問目か表示
  progressEl.textContent = `第 ${currentIndex + 1} 問 / 全 ${questions.length} 問`;

  // 問題文
  questionTextEl.textContent = q.text;

  // 選択肢の描画
  choicesAreaEl.innerHTML = "";
  q.choices.forEach((choice, ci) => {
    const label = document.createElement("label");
    label.className = "choice-label";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "currentQuestion";
    radio.value = ci;

    label.appendChild(radio);
    label.append(` ${String.fromCharCode(65 + ci)}. ${choice}`);
    choicesAreaEl.appendChild(label);
  });

  // フィードバックをリセット
  feedbackEl.style.display = "none";
  judgeEl.innerHTML = "";
  yourAnswerEl.textContent = "";
  correctAnswerEl.textContent = "";
  explanationEl.textContent = "";

  // ボタン状態
  submitBtn.disabled = false;
  nextBtn.disabled = true;

  answeredThisQuestion = false;
}

// 採点処理（未回答は不正解扱い）
submitBtn.addEventListener("click", () => {
  if (answeredThisQuestion) {
    return;
  }

  const q = questions[currentIndex];
  const selected = document.querySelector(
    'input[name="currentQuestion"]:checked'
  );

  let selectedIndex;
  let userText;
  let isCorrect;

  if (!selected) {
    // 未回答 
    selectedIndex = -1;
    userText = "未回答";
    isCorrect = false;
  } else {
    selectedIndex = Number(selected.value);
    isCorrect = selectedIndex === q.answerIndex;
    userText = `${String.fromCharCode(65 + selectedIndex)}. ${
      q.choices[selectedIndex]
    }`;
  }

  // 正解ならスコア加算
  if (isCorrect) {
    score++;
  }

  // フィードバック表示
  feedbackEl.style.display = "block";

  judgeEl.innerHTML = isCorrect
    ? '<span class="correct">正解です！</span>'
    : '<span class="incorrect">不正解です。</span>';

  const correctText = `${q.correctChoiceLabel}. ${q.choices[q.answerIndex]}`;

  yourAnswerEl.textContent = `あなたの回答: ${userText}`;
  correctAnswerEl.textContent = `正解: ${correctText}`;
  explanationEl.textContent = `解説: ${q.explanation}`;

  // 次の問題へボタンを有効化
  nextBtn.disabled = false;
  submitBtn.disabled = true;
  answeredThisQuestion = true;
});

// 次の問題へ
nextBtn.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    // 最後の問題が終わったとき
    progressEl.textContent = "全ての問題が終了しました。お疲れさまでした！";
    questionTextEl.textContent = "";
    choicesAreaEl.innerHTML = "";
    feedbackEl.style.display = "none";
    submitBtn.disabled = true;
    nextBtn.disabled = true;

    finalScoreEl.textContent = `最終正解数: ${score} / ${questions.length}`;
  }
});

// 初期表示
renderQuestion();