const tarotDeck = [
  { name: "The Fool", ko: "바보", upright: ["새로운 시작", "가능성"], reversed: ["충동", "무계획"] },
  { name: "The Magician", ko: "마법사", upright: ["실행력", "자원 활용"], reversed: ["혼선", "의지 부족"] },
  { name: "The High Priestess", ko: "여사제", upright: ["직관", "내면 탐색"], reversed: ["혼란", "감정 억압"] },
  { name: "The Empress", ko: "여황제", upright: ["풍요", "돌봄"], reversed: ["과보호", "정체"] },
  { name: "The Emperor", ko: "황제", upright: ["안정", "구조화"], reversed: ["통제 과잉", "경직"] },
  { name: "The Hierophant", ko: "교황", upright: ["전통", "학습"], reversed: ["고정관념", "반항"] },
  { name: "The Lovers", ko: "연인", upright: ["선택", "연결"], reversed: ["불일치", "갈등"] },
  { name: "The Chariot", ko: "전차", upright: ["전진", "의지"], reversed: ["방향 상실", "성급함"] },
  { name: "Strength", ko: "힘", upright: ["인내", "자기 통제"], reversed: ["소진", "자신감 저하"] },
  { name: "The Hermit", ko: "은둔자", upright: ["성찰", "거리두기"], reversed: ["고립", "회피"] },
  { name: "Wheel of Fortune", ko: "운명의 수레바퀴", upright: ["전환점", "기회"], reversed: ["지연", "변화 저항"] },
  { name: "Justice", ko: "정의", upright: ["균형", "공정성"], reversed: ["편향", "책임 회피"] },
  { name: "The Hanged Man", ko: "매달린 사람", upright: ["관점 전환", "멈춤"], reversed: ["정체", "희생 피로"] },
  { name: "Death", ko: "죽음", upright: ["종결", "재시작"], reversed: ["미련", "변화 두려움"] },
  { name: "Temperance", ko: "절제", upright: ["조화", "중용"], reversed: ["불균형", "과잉"] },
  { name: "The Devil", ko: "악마", upright: ["집착", "유혹"], reversed: ["해방", "끊어냄"] },
  { name: "The Tower", ko: "탑", upright: ["급변", "각성"], reversed: ["지연된 변화", "불안"] },
  { name: "The Star", ko: "별", upright: ["희망", "회복"], reversed: ["불신", "의욕 저하"] },
  { name: "The Moon", ko: "달", upright: ["무의식", "불확실성"], reversed: ["오해 해소", "현실 자각"] },
  { name: "The Sun", ko: "태양", upright: ["성취", "명확함"], reversed: ["과신", "일시적 지연"] },
  { name: "Judgement", ko: "심판", upright: ["각성", "결단"], reversed: ["망설임", "후회"] },
  { name: "The World", ko: "세계", upright: ["완성", "통합"], reversed: ["미완", "마무리 필요"] },
];

const templates = {
  love: {
    upright: "관계의 흐름이 긍정적으로 열립니다. 솔직한 대화가 핵심입니다.",
    reversed: "감정의 엇갈림이 있을 수 있습니다. 속도를 늦추고 의도를 확인하세요.",
  },
  career: {
    upright: "업무 방향이 분명해질 가능성이 큽니다. 우선순위를 정하면 성과가 납니다.",
    reversed: "일정 지연이나 의사결정 피로가 생길 수 있습니다. 단계를 쪼개 진행하세요.",
  },
  money: {
    upright: "재정 관리의 균형을 잡기 좋은 시기입니다. 계획 소비가 유리합니다.",
    reversed: "지출 통제가 흔들릴 수 있습니다. 큰 결정 전 점검 시간을 두세요.",
  },
  general: {
    upright: "현재 흐름을 신뢰해도 좋습니다. 작은 실행이 다음 기회를 엽니다.",
    reversed: "잠시 멈춰 점검할 타이밍입니다. 무리한 전진보다 정리가 우선입니다.",
  },
};

const questionEl = document.getElementById("question");
const categoryEl = document.getElementById("category");
const drawBtn = document.getElementById("drawBtn");
const resultPanel = document.getElementById("resultPanel");
const resultEl = document.getElementById("result");
const historyEl = document.getElementById("history");

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem("tarot_history") || "[]");
  historyEl.innerHTML = "";

  if (!history.length) {
    const li = document.createElement("li");
    li.textContent = "아직 리딩 기록이 없습니다.";
    historyEl.appendChild(li);
    return;
  }

  history.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.date} · ${item.card} (${item.orientation}) · ${item.category}`;
    historyEl.appendChild(li);
  });
}

function saveHistory(entry) {
  const history = JSON.parse(localStorage.getItem("tarot_history") || "[]");
  history.unshift(entry);
  localStorage.setItem("tarot_history", JSON.stringify(history.slice(0, 10)));
}

function drawCard() {
  const question = questionEl.value.trim();
  const category = categoryEl.value;
  const card = pickRandom(tarotDeck);
  const orientation = Math.random() < 0.5 ? "정방향" : "역방향";
  const key = orientation === "정방향" ? "upright" : "reversed";
  const keywords = card[key];
  const baseMessage = templates[category][key];
  const questionMessage = question
    ? `질문("${question}") 기준으로 보면, 지금은 '${keywords[0]}' 키워드를 중심으로 판단하는 것이 좋습니다.`
    : "질문을 입력하면 다음 리딩에서 더 맥락 있는 해석을 볼 수 있습니다.";

  resultEl.innerHTML = `
    <p class="result-title">${card.ko} (${card.name}) · ${orientation}</p>
    <span class="tag">키워드: ${keywords[0]}</span>
    <span class="tag">키워드: ${keywords[1]}</span>
    <p>${baseMessage}</p>
    <p>${questionMessage}</p>
    <p><strong>안내:</strong> 본 서비스는 자기성찰을 위한 참고용 콘텐츠입니다.</p>
  `;

  resultPanel.hidden = false;

  saveHistory({
    date: new Date().toLocaleString("ko-KR"),
    card: card.ko,
    orientation,
    category,
  });
  renderHistory();
}

drawBtn.addEventListener("click", drawCard);
renderHistory();
