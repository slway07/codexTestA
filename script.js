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

const spreadMeta = {
  one: {
    drawCount: 1,
    slots: ["현재 메시지"],
    guide: "원카드 리딩: 한 장에 집중해 오늘의 핵심 조언을 확인하세요.",
  },
  three: {
    drawCount: 3,
    slots: ["과거", "현재", "미래"],
    guide: "3카드 리딩: 과거·현재·미래 흐름으로 상황 변화를 읽습니다.",
  },
};

const spreadPicker = document.getElementById("spreadPicker");
const categoryPicker = document.getElementById("categoryPicker");
const shuffleBtn = document.getElementById("shuffleBtn");
const instructionEl = document.getElementById("instruction");
const tablePanel = document.getElementById("tablePanel");
const spreadSlotsEl = document.getElementById("spreadSlots");
const deckAreaEl = document.getElementById("deckArea");
const resultPanel = document.getElementById("resultPanel");
const resultEl = document.getElementById("result");
const historyEl = document.getElementById("history");

let selectedSpread = "one";
let selectedCategory = "general";
let drawTarget = 1;
let drawnCards = [];
let currentDeck = [];

function shuffle(array) {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
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
    li.textContent = `${item.date} · ${item.spread} · ${item.cards} · ${item.category}`;
    historyEl.appendChild(li);
  });
}

function saveHistory(entry) {
  const history = JSON.parse(localStorage.getItem("tarot_history") || "[]");
  history.unshift(entry);
  localStorage.setItem("tarot_history", JSON.stringify(history.slice(0, 10)));
}

function renderSlots() {
  const slotNames = spreadMeta[selectedSpread].slots;
  spreadSlotsEl.innerHTML = "";

  slotNames.forEach((label, idx) => {
    const slot = document.createElement("div");
    slot.className = "slot";

    const card = drawnCards[idx];
    if (card) {
      slot.classList.add("revealed");
      slot.innerHTML = `
        <strong>${label}</strong>
        <div>${card.ko} (${card.name})</div>
        <small>${card.orientation}</small>
      `;
    } else {
      slot.innerHTML = `<strong>${label}</strong>카드를 선택해 이 자리를 채우세요.`;
    }

    spreadSlotsEl.appendChild(slot);
  });
}

function renderDeck() {
  deckAreaEl.innerHTML = "";

  currentDeck.forEach((card, index) => {
    const button = document.createElement("button");
    button.className = `deck-card${card.picked ? " picked" : ""}`;
    button.innerHTML = card.picked ? "선택됨" : "✦";
    button.setAttribute("aria-label", `덱 카드 ${index + 1}`);

    button.addEventListener("click", () => pickCard(index));
    deckAreaEl.appendChild(button);
  });
}

function buildResult() {
  const slotNames = spreadMeta[selectedSpread].slots;
  const cardBlocks = drawnCards
    .map((card, idx) => {
      const key = card.orientation === "정방향" ? "upright" : "reversed";
      const keywords = card[key];
      const baseMessage = templates[selectedCategory][key];

      return `
        <article>
          <p class="result-title">${slotNames[idx]} · ${card.ko} (${card.name}) · ${card.orientation}</p>
          <span class="tag">키워드: ${keywords[0]}</span>
          <span class="tag">키워드: ${keywords[1]}</span>
          <p>${baseMessage}</p>
        </article>
      `;
    })
    .join("");

  resultEl.innerHTML = `
    <p><strong>스프레드:</strong> ${selectedSpread === "one" ? "원카드" : "3카드 (과거·현재·미래)"}</p>
    ${cardBlocks}
    <p><strong>안내:</strong> 본 서비스는 자기성찰을 위한 참고용 콘텐츠입니다.</p>
  `;
  resultPanel.hidden = false;

  const cardSummary = drawnCards.map((card) => `${card.ko}(${card.orientation})`).join(", ");
  saveHistory({
    date: new Date().toLocaleString("ko-KR"),
    spread: selectedSpread === "one" ? "원카드" : "3카드",
    cards: cardSummary,
    category: selectedCategory,
  });
  renderHistory();
}

function pickCard(index) {
  const target = currentDeck[index];
  if (!target || target.picked || drawnCards.length >= drawTarget) return;

  target.picked = true;
  const orientation = Math.random() < 0.5 ? "정방향" : "역방향";
  drawnCards.push({ ...target, orientation });

  renderDeck();
  renderSlots();

  if (drawnCards.length === drawTarget) {
    instructionEl.textContent = "카드 선택 완료! 아래에서 리딩 결과를 확인하세요.";
    buildResult();
  } else {
    instructionEl.textContent = `좋아요. 카드 ${drawTarget - drawnCards.length}장을 더 선택하세요.`;
  }
}

function startReading() {
  drawTarget = spreadMeta[selectedSpread].drawCount;
  drawnCards = [];
  currentDeck = shuffle(tarotDeck).map((card) => ({ ...card, picked: false }));

  resultPanel.hidden = true;
  tablePanel.hidden = false;
  instructionEl.textContent = `${spreadMeta[selectedSpread].guide} 덱에서 ${drawTarget}장을 직접 선택하세요.`;

  renderSlots();
  renderDeck();
}

spreadPicker.addEventListener("click", (e) => {
  const target = e.target.closest("button[data-spread]");
  if (!target) return;

  selectedSpread = target.dataset.spread;
  spreadPicker.querySelectorAll("button").forEach((btn) => btn.classList.remove("active"));
  target.classList.add("active");
  instructionEl.textContent = `${spreadMeta[selectedSpread].guide} 카드를 섞어 시작하세요.`;
});

categoryPicker.addEventListener("click", (e) => {
  const target = e.target.closest("button[data-category]");
  if (!target) return;

  selectedCategory = target.dataset.category;
  categoryPicker.querySelectorAll("button").forEach((btn) => btn.classList.remove("active"));
  target.classList.add("active");
});

shuffleBtn.addEventListener("click", startReading);
renderHistory();
