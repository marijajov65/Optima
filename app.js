const DEFAULT_START = '10:00';
const MEAL_INTERVAL_H = 4;
const WATER_TARGET_ML = 3000;
const SLEEP_GOAL = 7;
const STEPS_GOAL = 10000;

const MEALS = [
  {
    id: 'meal1',
    name: 'Meal 1',
    notes: 'Protein + carbs starter.',
    ingredients: [
      { item: 'Oats', qty: 80, unit: 'g' },
      { item: 'Greek yogurt', qty: 200, unit: 'g' },
      { item: 'Berries', qty: 100, unit: 'g' },
    ],
  },
  {
    id: 'meal2',
    name: 'Meal 2',
    notes: 'High protein + greens.',
    ingredients: [
      { item: 'Chicken breast', qty: 180, unit: 'g' },
      { item: 'Rice', qty: 120, unit: 'g' },
      { item: 'Broccoli', qty: 150, unit: 'g' },
    ],
  },
  {
    id: 'meal3',
    name: 'Meal 3 (Post-workout)',
    postWorkout: true,
    notes: 'Whey-focused recovery meal.',
    ingredients: [
      { item: 'Whey', qty: 35, unit: 'g' },
      { item: 'Banana', qty: 1, unit: 'pc' },
      { item: 'Rice cakes', qty: 3, unit: 'pcs' },
    ],
  },
  {
    id: 'meal4',
    name: 'Meal 4',
    notes: 'Final meal: easy digestion.',
    ingredients: [
      { item: 'Egg whites', qty: 250, unit: 'ml' },
      { item: 'Avocado', qty: 0.5, unit: 'pc' },
      { item: 'Spinach', qty: 100, unit: 'g' },
    ],
  },
];

const HABITS = [
  'Journal entry',
  'Outside / fresh air',
  'Supplements (Vitamin D + Mg + Vitamin C)',
  'Psyllium / fiber',
  'Coffee rule (1 coffee, not empty stomach, before 12)',
  'Strength training / yoga',
  'Meditate 15 min',
  'Sauna 15 min',
  'Read 10 pages',
  'Clean 15 min',
  'Prep meals for tomorrow',
];

const dateKey = new Date().toISOString().slice(0, 10);
const loggedAtKey = `inside.loggedAt.${dateKey}`;
const goalsKey = `inside.goals.${dateKey}`;

let selectedMealId = MEALS[0].id;

function readJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}
function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function toMins(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}
function minsToHHMM(mins) {
  let n = ((mins % 1440) + 1440) % 1440;
  const h = Math.floor(n / 60).toString().padStart(2, '0');
  const m = (n % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
}
function addHours(hhmm, hrs) {
  return minsToHHMM(toMins(hhmm) + hrs * 60);
}
function nowHHMM() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

function getLoggedAt() {
  return readJSON(loggedAtKey, {});
}

function setLogged(mealId, hhmm) {
  const current = getLoggedAt();
  current[mealId] = hhmm;
  writeJSON(loggedAtKey, current);
  const done = readJSON('inside.done', {});
  done[mealId] = true;
  writeJSON('inside.done', done);
}

function unsetLogged(mealId) {
  const current = getLoggedAt();
  delete current[mealId];
  writeJSON(loggedAtKey, current);
  const done = readJSON('inside.done', {});
  done[mealId] = false;
  writeJSON('inside.done', done);
}

function calculateSchedule() {
  const logged = getLoggedAt();
  const schedule = {};
  for (let i = 0; i < MEALS.length; i++) {
    const meal = MEALS[i];
    if (i === 0) {
      schedule[meal.id] = logged[meal.id] || DEFAULT_START;
      continue;
    }
    schedule[meal.id] = logged[meal.id] || addHours(schedule[MEALS[i - 1].id], MEAL_INTERVAL_H);
  }
  return schedule;
}

function getTodayGoals() {
  const base = {
    bedtime: '',
    wakeTime: '',
    sleepHours: '',
    steps: '',
    habits: Object.fromEntries(HABITS.map((h) => [h, false])),
  };
  const current = readJSON(goalsKey, null);
  if (!current) return base;
  return { ...base, ...current, habits: { ...base.habits, ...(current.habits || {}) } };
}

function saveGoals(next) {
  writeJSON(goalsKey, next);
}

function getCoffeeState() {
  const value = readJSON('inside.coffeeCount', { date: dateKey, count: 0 });
  if (value.date !== dateKey) return { date: dateKey, count: 0 };
  return value;
}

function getWorkoutState() {
  const value = readJSON('inside.workoutFlag', { date: dateKey, done: false });
  if (value.date !== dateKey) return { date: dateKey, done: false };
  return value;
}

function render() {
  document.getElementById('todayDate').textContent = dateKey;
  const logged = getLoggedAt();
  const schedule = calculateSchedule();

  const nextMeal = MEALS.find((m) => !logged[m.id]);
  document.getElementById('nextMealName').textContent = nextMeal ? nextMeal.name : 'All meals complete ✅';
  document.getElementById('nextMealTime').textContent = nextMeal ? `Scheduled ${schedule[nextMeal.id]}` : 'You are done for today';
  document.getElementById('nextMealCountdown').textContent = nextMeal ? countdownText(schedule[nextMeal.id]) : '';

  const mealGrid = document.getElementById('mealGrid');
  mealGrid.innerHTML = '';
  MEALS.forEach((meal) => {
    const done = Boolean(logged[meal.id]);
    const tile = document.createElement('button');
    tile.className = `meal-tile ${selectedMealId === meal.id ? 'selected' : ''} ${done ? 'done' : ''}`;
    tile.innerHTML = `
      <strong>${meal.name} ${done ? '✓' : ''}</strong>
      <span>${schedule[meal.id]}</span>
      <span class="muted">${meal.ingredients.slice(0, 2).map((i) => i.item).join(' • ')}</span>
      ${done ? `<span class="muted">Logged at ${logged[meal.id]}</span>` : ''}
    `;
    tile.onclick = () => {
      selectedMealId = meal.id;
      render();
    };
    mealGrid.appendChild(tile);
  });

  const selected = MEALS.find((m) => m.id === selectedMealId) || MEALS[0];
  const detail = document.getElementById('selectedMealContent');
  const selectedLogged = logged[selected.id];
  detail.innerHTML = `
    <div class="headline">${selected.name}</div>
    <div class="muted">Scheduled: ${schedule[selected.id]}</div>
    <ul class="bullets">${selected.ingredients.map((i) => `<li>${i.item}: ${i.qty} ${i.unit}</li>`).join('')}</ul>
    ${selected.notes ? `<p class="muted">${selected.notes}</p>` : ''}
    <div class="inline-actions">
      <input id="logTimeInput" type="time" value="${nowHHMM()}" />
      <button id="logBtn" class="btn">Log meal</button>
      <button id="undoBtn" class="btn subtle">Undo</button>
    </div>
  `;
  detail.querySelector('#logBtn').onclick = () => {
    const hhmm = detail.querySelector('#logTimeInput').value || nowHHMM();
    setLogged(selected.id, hhmm);
    render();
  };
  detail.querySelector('#undoBtn').onclick = () => {
    unsetLogged(selected.id);
    render();
  };

  renderBalance();
  renderWorkout();
  renderQuickRules();
}

function countdownText(hhmm) {
  const target = toMins(hhmm);
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  let diff = target - nowMins;
  if (diff < 0) diff += 1440;
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return `In ${h}h ${m}m`;
}

function renderBalance() {
  const goals = getTodayGoals();
  const bedtime = document.getElementById('bedtime');
  const wakeTime = document.getElementById('wakeTime');
  const sleepHours = document.getElementById('sleepHours');
  const steps = document.getElementById('steps');

  bedtime.value = goals.bedtime;
  wakeTime.value = goals.wakeTime;
  sleepHours.value = goals.sleepHours;
  steps.value = goals.steps;

  [bedtime, wakeTime, sleepHours, steps].forEach((el) => {
    el.onchange = () => {
      const next = getTodayGoals();
      next.bedtime = bedtime.value;
      next.wakeTime = wakeTime.value;
      next.sleepHours = sleepHours.value;
      next.steps = steps.value;
      saveGoals(next);
      renderBalance();
    };
  });

  const habitsList = document.getElementById('habitsList');
  habitsList.innerHTML = '';
  HABITS.forEach((habit) => {
    const row = document.createElement('label');
    row.className = 'habit-item';
    const checked = Boolean(goals.habits[habit]);
    row.innerHTML = `<input type="checkbox" ${checked ? 'checked' : ''}/> <span>${habit}</span>`;
    row.querySelector('input').onchange = (e) => {
      const next = getTodayGoals();
      next.habits[habit] = e.target.checked;
      saveGoals(next);
      renderBalance();
    };
    habitsList.appendChild(row);
  });

  const sleepDone = Number(goals.sleepHours || 0) >= SLEEP_GOAL;
  const stepCount = Number(goals.steps || 0);
  const stepsDone = stepCount >= STEPS_GOAL;
  const habitsDone = HABITS.filter((h) => goals.habits[h]).length;
  const completed = habitsDone + (sleepDone ? 1 : 0) + (stepsDone ? 1 : 0);
  const total = HABITS.length + 2;
  const pct = Math.round((completed / total) * 100);
  const label = pct < 35 ? 'Low' : pct < 65 ? 'OK' : pct < 90 ? 'Good' : 'Elite';

  document.getElementById('balanceSummary').textContent = `${completed}/${total} • ${pct}% • ${label}`;
  document.getElementById('balanceProgress').style.width = `${pct}%`;
  document.getElementById('stepsHint').textContent = stepsDone ? 'Steps goal reached ✅' : `${Math.max(STEPS_GOAL - stepCount, 0)} steps remaining`;
}

function renderWorkout() {
  const workout = getWorkoutState();
  const logged = getLoggedAt();
  const pwMeal = MEALS.find((m) => m.postWorkout);
  const mealState = pwMeal ? `${pwMeal.name}${logged[pwMeal.id] ? ` (logged ${logged[pwMeal.id]})` : ''}` : 'No post-workout meal flagged.';
  document.getElementById('workoutStatus').textContent = workout.done
    ? `Whey meal after training. Today: ${mealState}`
    : 'Workout not marked yet.';

  document.getElementById('workoutDoneBtn').onclick = () => {
    writeJSON('inside.workoutFlag', { date: dateKey, done: true });
    renderWorkout();
  };
  document.getElementById('workoutClearBtn').onclick = () => {
    writeJSON('inside.workoutFlag', { date: dateKey, done: false });
    renderWorkout();
  };
}

function renderQuickRules() {
  let waterMl = Number(localStorage.getItem('inside.waterMl') || 0);
  const coffee = getCoffeeState();
  document.getElementById('waterText').textContent = `${waterMl} / ${WATER_TARGET_ML} ml`;
  document.getElementById('coffeeText').textContent = `${coffee.count} / 1 coffee`;
  document.getElementById('coffeeBtn').disabled = coffee.count >= 1;
  document.getElementById('coffeeReminder').textContent = coffee.count > 0 ? 'Reminder: drink 2 glasses of water.' : '';

  document.getElementById('water250').onclick = () => {
    waterMl += 250;
    localStorage.setItem('inside.waterMl', String(waterMl));
    renderQuickRules();
  };
  document.getElementById('water500').onclick = () => {
    waterMl += 500;
    localStorage.setItem('inside.waterMl', String(waterMl));
    renderQuickRules();
  };
  document.getElementById('coffeeBtn').onclick = () => {
    writeJSON('inside.coffeeCount', { date: dateKey, count: Math.min(1, coffee.count + 1) });
    renderQuickRules();
  };
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
}

render();
setInterval(() => {
  const logged = getLoggedAt();
  const schedule = calculateSchedule();
  const nextMeal = MEALS.find((m) => !logged[m.id]);
  document.getElementById('nextMealCountdown').textContent = nextMeal ? countdownText(schedule[nextMeal.id]) : '';
}, 30000);
