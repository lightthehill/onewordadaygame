const STORAGE_KEY = 'ONE_WORD_STAIR_FINAL_V9';

function getRandomPastelBg() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 80%, 90%)`;
}

const nowDate = new Date();
const realYear = nowDate.getFullYear();
const realMonth = nowDate.getMonth() + 1;
const realDay = nowDate.getDate();
const realYM = `${realYear}-${String(realMonth).padStart(2, '0')}`;

let state = {
  activeYearMonth: realYM,
  months: [realYM],
  monthData: {
    [realYM]: {
      year: realYear,
      month: realMonth,
      completedDays: {} 
    }
  },
  currentDraftWords: []
};

const cheerMessages = [
  "오늘도 멋진 하루예요! ✨",
  "한 걸음씩 성장 중! 🐾",
  "좋은 단어네요! 💛",
  "힘내세요, 응원해요! 🌱",
  "꾸준함이 최고예요! 🚀"
];

function handleCharacterTouch(event) {
  event.stopPropagation();
  const target = event.currentTarget;
  
  const svgContainer = target.querySelector('.char-svg-box');
  if (svgContainer) {
    svgContainer.classList.add('bounce-anim');
    setTimeout(() => {
      svgContainer.classList.remove('bounce-anim');
    }, 600);
  }

  const existingBubble = target.querySelector('.speech-bubble');
  if (existingBubble) existingBubble.remove();

  const bubble = document.createElement('div');
  bubble.className = 'speech-bubble';
  bubble.innerText = cheerMessages[Math.floor(Math.random() * cheerMessages.length)];
  target.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, 2000);
}

function getCharacterSVG(level = 1) {
  let svgContent = '';
  if (level <= 1) {
    svgContent = `
      <svg width="22" height="24" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="14" rx="6" ry="8" stroke="black" stroke-width="1.5" fill="white"/>
        <circle cx="10" cy="13" r="0.9" fill="black"/>
        <circle cx="14" cy="13" r="0.9" fill="black"/>
      </svg>
    `;
  } else if (level === 2) {
    svgContent = `
      <svg width="22" height="34" viewBox="0 0 24 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="10" r="5" stroke="black" stroke-width="1.5" fill="white"/>
        <circle cx="10.2" cy="9.5" r="0.8" fill="black"/>
        <circle cx="13.8" cy="9.5" r="0.8" fill="black"/>
        <circle cx="12" cy="24" r="8" stroke="black" stroke-width="1.5" fill="white"/>
      </svg>
    `;
  } else if (level === 3) {
    svgContent = `
      <svg width="24" height="38" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="9" r="5" stroke="black" stroke-width="1.5" fill="white"/>
        <circle cx="12.2" cy="8.5" r="0.8" fill="black"/>
        <circle cx="15.8" cy="8.5" r="0.8" fill="black"/>
        <ellipse cx="14" cy="22" rx="5.5" ry="7.5" stroke="black" stroke-width="1.5" fill="white"/>
        <line x1="8.5" y1="18" x2="4" y2="25" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="19.5" y1="18" x2="24" y2="25" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="11.5" y1="29.5" x2="11.5" y2="39" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="16.5" y1="29.5" x2="16.5" y2="39" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `;
  } else {
    svgContent = `
      <svg width="26" height="42" viewBox="0 0 32 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="10" r="5.5" stroke="black" stroke-width="1.5" fill="white"/>
        <circle cx="14" cy="9" r="0.8" fill="black"/>
        <circle cx="18" cy="9" r="0.8" fill="black"/>
        <path d="M 13.8 12 Q 16 14.5 18.2 12" stroke="black" stroke-width="1.2" fill="none" stroke-linecap="round"/>
        <ellipse cx="16" cy="24" rx="6" ry="8" stroke="black" stroke-width="1.5" fill="white"/>
        <line x1="10" y1="20" x2="5" y2="27" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="4" cy="28.5" r="1.6" stroke="black" stroke-width="1.3" fill="white"/>
        <line x1="22" y1="20" x2="27" y2="27" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="28" cy="28.5" r="1.6" stroke="black" stroke-width="1.3" fill="white"/>
        <line x1="13" y1="32" x2="13" y2="42" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="19" y1="32" x2="19" y2="42" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
        <ellipse cx="11.5" cy="43.5" rx="3" ry="1.5" stroke="black" stroke-width="1.3" fill="white"/>
        <ellipse cx="20.5" cy="43.5" rx="3" ry="1.5" stroke="black" stroke-width="1.3" fill="white"/>
      </svg>
    `;
  }

  return `
    <div class="absolute -top-9 left-2 transition-all duration-300 z-30 cursor-pointer flex flex-col items-center p-1" onclick="handleCharacterTouch(event)" ontouchend="handleCharacterTouch(event)">
      <div class="char-svg-box flex flex-col items-center">${svgContent}</div>
    </div>
  `;
}

function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ffb3ba', '#bae1ff', '#baffc9', '#ffffba', '#ffdfba']
    });
  }
}

function init() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try { 
      state = JSON.parse(saved); 
      if (!state.monthData[realYM]) {
        if (!state.months.includes(realYM)) {
          state.months.push(realYM);
          state.months.sort();
        }
        state.monthData[realYM] = {
          year: realYear,
          month: realMonth,
          completedDays: {}
        };
      }
      state.activeYearMonth = realYM;
    } catch (e) { 
      console.error(e); 
    }
  } else {
    state.activeYearMonth = realYM;
    state.months = [realYM];
    state.monthData = {
      [realYM]: {
        year: realYear,
        month: realMonth,
        completedDays: {}
      }
    };
    state.currentDraftWords = [];
  }

  const curMonthData = state.monthData[realYM];
  if (curMonthData && curMonthData.completedDays[realDay]) {
    state.currentDraftWords = [...curMonthData.completedDays[realDay].filter(w => !w.isDateInput)];
  } else {
    state.currentDraftWords = [];
  }

  renderMonthList();
  renderStairs();
  checkInputStatus();
  focusInput();
  initSwipeGesture();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderMonthList() {
  const container = document.getElementById('monthListContainer');
  container.innerHTML = '';

  state.months.forEach(ym => {
    const btn = document.createElement('div');
    btn.className = `month-btn ${ym === state.activeYearMonth ? 'active' : ''}`;
    btn.innerText = ym;
    btn.onclick = (e) => {
      e.stopPropagation();
      selectMonth(ym);
    };
    container.appendChild(btn);
  });
}

function selectMonth(ym) {
  state.activeYearMonth = ym;
  renderMonthList();
  renderStairs();
  checkInputStatus();
  focusInput();
}

function focusInput() {
  const input = document.getElementById('wordInput');
  if (input) {
    input.focus();
  }
}

function checkInputStatus() {
  const statusText = document.getElementById('todayStatusText');
  statusText.innerText = `${realMonth}/${realDay} (${state.currentDraftWords.length}/10)`;
}

function addNormalWord(wordText) {
  const val = wordText !== undefined ? wordText : document.getElementById('wordInput').value.trim();
  if (!val) return;

  if (state.activeYearMonth !== realYM) {
    alert('오늘 날짜 외의 과거 월에서는 조회 모드입니다.');
    document.getElementById('wordInput').value = '';
    return;
  }

  if (state.currentDraftWords.length < 10) {
    const newWordObj = {
      text: val,
      bg: getRandomPastelBg(),
      isDateInput: false
    };
    state.currentDraftWords.push(newWordObj);
    document.getElementById('wordInput').value = '';

    const curData = state.monthData[realYM];
    if (!curData.completedDays[realDay]) {
      curData.completedDays[realDay] = [];
    }
    const dateInputWords = curData.completedDays[realDay].filter(w => w.isDateInput);
    curData.completedDays[realDay] = [...dateInputWords, ...state.currentDraftWords];

    const totalDaysCount = Object.keys(curData.completedDays).length;
    if (totalDaysCount > 0 && totalDaysCount % 7 === 0 && state.currentDraftWords.length === 1) {
      triggerConfetti();
    }

    saveState();
    checkInputStatus();
    renderStairs();
  } else {
    alert('하루에 최대 10개의 단어까지만 작성할 수 있습니다!');
    document.getElementById('wordInput').value = '';
  }
  focusInput();
}

function tryProcessDateInput() {
  const input = document.getElementById('wordInput');
  const val = input.value.trim();
  if (!val) return false;

  const fullDateRegex = /^(\d{4})[-\.](\d{1,2})[-\.](\d{1,2})([^\s].*)$/;
  const shortDateRegex = /^(\d{1,2})[-\.](\d{1,2})([^\s].*)$/;

  let match = val.match(fullDateRegex);
  let targetYear = realYear;
  let targetMonth = realMonth;
  let targetDay = realDay;
  let actualWord = '';

  if (match) {
    targetYear = parseInt(match[1]);
    targetMonth = parseInt(match[2]);
    targetDay = parseInt(match[3]);
    actualWord = match[4].trim();
  } else {
    match = val.match(shortDateRegex);
    if (match) {
      targetMonth = parseInt(match[1]);
      targetDay = parseInt(match[2]);
      actualWord = match[3].trim();
    }
  }

  if (match && actualWord) {
    const ym = `${targetYear}-${String(targetMonth).padStart(2, '0')}`;
    if (!state.months.includes(ym)) {
      state.months.push(ym);
      state.months.sort();
    }
    if (!state.monthData[ym]) {
      state.monthData[ym] = {
        year: targetYear,
        month: targetMonth,
        completedDays: {}
      };
    }
    if (!state.monthData[ym].completedDays[targetDay]) {
      state.monthData[ym].completedDays[targetDay] = [];
    }
    const targetDayWords = state.monthData[ym].completedDays[targetDay];
    if (targetDayWords.length < 10) {
      targetDayWords.push({
        text: actualWord,
        bg: getRandomPastelBg(),
        isDateInput: true
      });
      if (ym === realYM && targetDay === realDay) {
        state.currentDraftWords = [...state.monthData[realYM].completedDays[realDay].filter(w => !w.isDateInput)];
      }
      saveState();
      checkInputStatus();
      renderStairs();
      input.value = '';
      return true;
    } else {
      alert(`해당 날짜(${targetMonth}/${targetDay})에 이미 최대 10개의 단어가 있습니다!`);
      input.value = '';
      return true;
    }
  }
  return false;
}

function touchCompleteDay() {
  const input = document.getElementById('wordInput');
  const val = input.value.trim();
  if (!val) return;

  if (tryProcessDateInput()) {
    // 날짜 입력 성공
  } else {
    addNormalWord(val);
  }
  focusInput();
}

function handleKeyDown(e) {
  const input = document.getElementById('wordInput');
  const val = input.value.trim();

  if (e.key === ' ' || e.code === 'Space') {
    e.preventDefault();
    addNormalWord();
  } 
  else if (e.key === 'Enter') {
    e.preventDefault();
    if (tryProcessDateInput()) {
      input.value = '';
    } else {
      addNormalWord();
    }
  }
  else if (e.key === 'Backspace' && input.value === '' && state.currentDraftWords.length > 0) {
    state.currentDraftWords.pop();
    const curData = state.monthData[realYM];
    if (curData && curData.completedDays[realDay]) {
      const dateInputWords = curData.completedDays[realDay].filter(w => w.isDateInput);
      if (state.currentDraftWords.length === 0 && dateInputWords.length === 0) {
        delete curData.completedDays[realDay];
      } else {
        curData.completedDays[realDay] = [...dateInputWords, ...state.currentDraftWords];
      }
    }
    saveState();
    checkInputStatus();
    renderStairs();
  }
}

function handleInput(e) {
  const input = document.getElementById('wordInput');
  const val = input.value;
  
  if (val.includes(' ')) {
    const parts = val.split(' ');
    const firstPart = parts[0].trim();
    if (firstPart.length > 0) {
      input.value = parts.slice(1).join(' ');
      addNormalWord(firstPart);
    } else {
      input.value = val.trim();
    }
  } else {
    renderStairs();
  }
}

function initSwipeGesture() {
  const canvasArea = document.getElementById('canvasArea');
  let touchStartX = 0;
  let touchEndX = 0;

  canvasArea.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  canvasArea.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 60;
    const currentIndex = state.months.indexOf(state.activeYearMonth);
    
    if (touchEndX < touchStartX - threshold) {
      if (currentIndex < state.months.length - 1) {
        selectMonth(state.months[currentIndex + 1]);
      }
    }
    if (touchEndX > touchStartX + threshold) {
      if (currentIndex > 0) {
        selectMonth(state.months[currentIndex - 1]);
      }
    }
  }
}

function renderStairs() {
  const container = document.getElementById('stairsContainer');
  const wrapper = document.getElementById('stairsWrapper');
  const canvasArea = document.getElementById('canvasArea');
  container.innerHTML = '';

  const viewMonthData = state.monthData[state.activeYearMonth];
  if (!viewMonthData) return;

  const sortedDays = Object.keys(viewMonthData.completedDays)
    .map(d => ({ day: parseInt(d), words: viewMonthData.completedDays[d] }))
    .sort((a, b) => a.day - b.day);

  const isCurrentDayView = (state.activeYearMonth === realYM);

  if (isCurrentDayView) {
    const liveVal = document.getElementById('wordInput') ? document.getElementById('wordInput').value.trim() : '';
    const liveWords = [...state.currentDraftWords];
    if (liveVal && !liveVal.match(/^\d{4}-\d{2}-\d{2}/) && !liveVal.match(/^\d{1,2}-\d{1,2}/)) {
      liveWords.push({
        text: liveVal + '│',
        bg: '#f3f4f6',
        isLiveType: true
      });
    }

    const existingIdx = sortedDays.findIndex(d => d.day === realDay);
    if (existingIdx >= 0) {
      const dateInputWords = sortedDays[existingIdx].words.filter(w => w.isDateInput);
      sortedDays[existingIdx].words = [...dateInputWords, ...liveWords];
      sortedDays[existingIdx].isDraft = true;
    } else if (liveWords.length > 0) {
      sortedDays.push({
        day: realDay,
        words: liveWords,
        isDraft: true
      });
    }
  }

  if (sortedDays.length === 0) {
    wrapper.style.height = '100%';
    wrapper.style.width = '100%';
    return;
  }

  let cumulativeX = 0;
  let lastRowTopY = 0;
  let totalWidthRequired = 0;

  const totalDaysCount = Object.keys(viewMonthData.completedDays).length;
  const characterLevel = Math.min(4, Math.floor(totalDaysCount / 7) + 1);

  let characterTargetRowElement = null;

  sortedDays.forEach((dayData, index) => {
    const dayRow = document.createElement('div');
    dayRow.className = 'absolute flex items-center transition-all duration-200';
    
    const currentYBottom = index * 34;
    dayRow.style.bottom = `${currentYBottom}px`;
    dayRow.style.left = `${cumulativeX}px`;

    let firstBoxWidth = 0;

    dayData.words.forEach((wordObj, wIdx) => {
      const box = document.createElement('div');
      box.className = 'word-box';

      const textStr = typeof wordObj === 'string' ? wordObj : wordObj.text;
      const bgStr = typeof wordObj === 'object' ? wordObj.bg : '#e5e7eb';

      box.style.backgroundColor = bgStr;

      if (!wordObj.isLiveType && !wordObj.isDateInput) {
        box.classList.add('deletable');
        box.title = '터치하여 단어 삭제';
        box.onclick = (e) => {
          e.stopPropagation();
          const draftIdx = state.currentDraftWords.findIndex(w => w.text === textStr);
          if (draftIdx >= 0) {
            state.currentDraftWords.splice(draftIdx, 1);
          } else {
            const targetArr = dayData.words;
            const idx = targetArr.findIndex(w => w === wordObj);
            if (idx >= 0) targetArr.splice(idx, 1);
          }

          const ym = state.activeYearMonth;
          const curMonthData = state.monthData[ym];
          const dateInputWords = curMonthData.completedDays[dayData.day] ? curMonthData.completedDays[dayData.day].filter(w => w.isDateInput) : [];
          
          if (state.currentDraftWords.length === 0 && dateInputWords.length === 0) {
            delete curMonthData.completedDays[dayData.day];
          } else {
            curMonthData.completedDays[dayData.day] = [...dateInputWords, ...state.currentDraftWords];
          }

          saveState();
          checkInputStatus();
          renderStairs();
          focusInput();
        };
      }

      if (wIdx === 0) {
        box.innerHTML = `<span class="day-num">${dayData.day}</span>${textStr}`;
      } else {
        box.innerText = textStr;
      }

      dayRow.appendChild(box);
    });

    container.appendChild(dayRow);

    const rowChildren = dayRow.children;
    if (rowChildren.length > 0) {
      firstBoxWidth = rowChildren[0].offsetWidth || 45;
    } else {
      firstBoxWidth = 40;
    }

    if (rowChildren.length > 0) {
      characterTargetRowElement = dayRow;
      lastRowTopY = currentYBottom;
    }

    cumulativeX += firstBoxWidth;
    totalWidthRequired = cumulativeX + 200;
  });

  if (characterTargetRowElement) {
    const charContainer = document.createElement('div');
    charContainer.innerHTML = getCharacterSVG(characterLevel);
    characterTargetRowElement.appendChild(charContainer.firstElementChild);
  }

  const requiredHeight = lastRowTopY + 250;
  wrapper.style.height = `${Math.max(canvasArea.clientHeight, requiredHeight)}px`;
  wrapper.style.width = `${Math.max(canvasArea.clientWidth, totalWidthRequired)}px`;
  container.style.bottom = '30px';

  setTimeout(() => {
    const targetScrollTop = wrapper.scrollHeight - canvasArea.clientHeight - lastRowTopY + 100;
    canvasArea.scrollTo({
      top: Math.max(0, targetScrollTop),
      left: Math.max(0, cumulativeX - canvasArea.clientWidth / 2),
      behavior: 'smooth'
    });
  }, 50);
}

window.addEventListener('resize', renderStairs);
window.onload = init;