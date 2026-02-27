const DEFAULT_START = '10:00';
const MEAL_INTERVAL_H = 4;
const WATER_TARGET_ML = 2500;
const SLEEP_GOAL = 7;
const STEPS_GOAL = 7000;

const WEEK_DAYS = ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota', 'Nedelja'];

const HABITS = [
  'Pratila jelovnik (šta + kada sam jela)',
  'Pisala dnevnik',
  'Bila napolju na vazduhu',
  'Popila vitamin D + Mg + vitamin C',
  'Popila psilijum / vlakna',
  'Kafa: samo 1, ne na prazan stomak, pre 12h',
  'Odradila trening snage / jogu',
  'Meditirala 15 min',
  'Sauna 15 min',
  'Pročitala 10 strana knjige',
  'Čišćenje 15 min',
  'Pripremila obroke za sutra',
];

const TRAININGS = {
  t1: {
    title: 'Trening #1',
    items: ['Glute bridge 4x15', 'Bugarski iskorak 4x15', 'Hiperekstenzija za gluteus 4x15', 'Nožna fleksija 3x12', 'Leg press (visoko + široko) 3x15', 'Zanoženje na sajli 3x15–20'],
  },
  t2: {
    title: 'Trening #2',
    items: ['Arnold press 4x15', 'Letenje 4x15', 'Zgibovi neutralni hvat 4x5–7', 'Veslanje u pretklonu bučicama 4x15', 'Face pulls 3x15', 'Biceps pregib na sajli 3x15', 'Sedeća triceps ekstenzija 3x15'],
  },
  t3: {
    title: 'Trening #3',
    items: ['Rumunsko mrtvo dizanje šipkom 4x12', 'Deficit zakorak 4x12', 'Jednonožni hip thrust 1+¼ 4x15', 'Nožna ekstenzija 3x15', 'Zanoženje na sajli 3x15', 'Abdukcija na sajli 3x15'],
  },
  t4: {
    title: 'Trening #4',
    items: ['Rameni potisak 4x15', 'Letenje na kosoj klupi 4x15', 'Zgibovi supinirani hvat 4x5–7', 'Pec deck za zadnje rame 3x15', 'Biceps pregib na sajli 3x15', 'Triceps push down šipkom na sajli 3x15'],
  },
};

const PLAN = {
  Ponedeljak: [
    { name: 'Obrok 1', postWorkout: false, ingredients: [{ item: 'Jaje', qty: 3, unit: 'kom' }, { item: 'Bezglutenski hleb', qty: 3, unit: 'parče' }, { item: 'Ajvar', qty: 60, unit: 'g' }, { item: 'Rukola', qty: 1, unit: 'porcija' }] },
    { name: 'Obrok 2', ingredients: [{ item: 'Piletina / ćuretina / bela riba', qty: 200, unit: 'g' }, { item: 'Batat', qty: 250, unit: 'g' }, { item: 'Tikvica', qty: 100, unit: 'g' }, { item: 'Tahini sos', qty: 20, unit: 'g' }] },
    { name: 'Obrok 3', ingredients: [{ item: 'Grčki jogurt', qty: 150, unit: 'g' }, { item: 'Mleveni lan', qty: 1, unit: 'kašičica' }, { item: 'Puter od badema', qty: 20, unit: 'g' }, { item: 'Borovnice', qty: 50, unit: 'g' }] },
    { name: 'Obrok 4', postWorkout: true, ingredients: [{ item: 'Heljdine pahuljice', qty: 60, unit: 'g' }, { item: 'Whey protein', qty: 1, unit: 'merica' }, { item: 'Borovnice zamrznute', qty: 50, unit: 'g' }, { item: 'Višnje zamrznute', qty: 50, unit: 'g' }] },
  ],
  Utorak: [
    { name: 'Obrok 1', ingredients: [{ item: 'Palenta', qty: 60, unit: 'g' }, { item: 'Grčki jogurt', qty: 150, unit: 'g' }, { item: 'Jaje', qty: 1, unit: 'kom' }] },
    { name: 'Obrok 2', ingredients: [{ item: 'Mlevena junetina', qty: 150, unit: 'g' }, { item: 'Crni luk', qty: 0.5, unit: 'glavica' }, { item: 'Beli luk', qty: 1, unit: 'čen' }, { item: 'Integralna testenina od spelte', qty: 50, unit: 'g' }, { item: 'Pelat', qty: 50, unit: 'g' }, { item: 'Parmezan', qty: 20, unit: 'g' }] },
    { name: 'Obrok 3', ingredients: [{ item: 'Grilovana piletina', qty: 180, unit: 'g' }, { item: 'Cvekla', qty: 150, unit: 'g' }, { item: 'Maslinovo ulje', qty: 1, unit: 'kašika' }] },
    { name: 'Obrok 4', postWorkout: true, ingredients: [{ item: 'Goveđa pečenica', qty: 80, unit: 'g' }, { item: 'Integralni hleb', qty: 3, unit: 'parče' }, { item: 'Ajvar', qty: 50, unit: 'g' }, { item: 'Rukola', qty: 1, unit: 'porcija' }] },
  ],
  Sreda: [
    { name: 'Obrok 1', ingredients: [{ item: 'Whey protein', qty: 1, unit: 'merica' }, { item: 'Brašno od spelte', qty: 60, unit: 'g' }, { item: 'Jaje', qty: 1, unit: 'kom' }, { item: 'Prašak za pecivo', qty: 0.5, unit: 'kašičica' }, { item: 'Grčki jogurt', qty: 50, unit: 'g' }, { item: 'Badem', qty: 20, unit: 'g' }, { item: 'Maline', qty: 60, unit: 'g' }] },
    { name: 'Obrok 2', ingredients: [{ item: 'Boranija', qty: 70, unit: 'g' }, { item: 'Junetina', qty: 100, unit: 'g' }, { item: 'Šargarepa', qty: 1, unit: 'kom' }, { item: 'Luk', qty: 0.5, unit: 'glavica' }, { item: 'Maslinovo ulje', qty: 1, unit: 'kašika' }] },
    { name: 'Obrok 3', ingredients: [{ item: 'Jabuka', qty: 150, unit: 'g' }, { item: 'Puter od badema', qty: 20, unit: 'g' }] },
    { name: 'Obrok 4', postWorkout: true, ingredients: [{ item: 'Pileći / ćureći file', qty: 100, unit: 'g' }, { item: 'Krastavac', qty: 50, unit: 'g' }, { item: 'Iceberg salata', qty: 1, unit: 'porcija' }, { item: 'Šećerac', qty: 25, unit: 'g' }, { item: 'Integralni hleb', qty: 30, unit: 'g' }, { item: 'Čeri', qty: 1, unit: 'porcija' }] },
  ],
  'Četvrtak': [
    { name: 'Obrok 1', ingredients: [{ item: 'Jaja', qty: 3, unit: 'kom' }, { item: 'Goveđa pršuta', qty: 50, unit: 'g' }, { item: 'Humus', qty: 50, unit: 'g' }, { item: 'Integralni tost', qty: 3, unit: 'parče' }, { item: 'Rukola', qty: 1, unit: 'porcija' }] },
    { name: 'Obrok 2', ingredients: [{ item: 'Peršun', qty: 30, unit: 'g' }, { item: 'Kinoa', qty: 40, unit: 'g' }, { item: 'Nar', qty: 20, unit: 'g' }, { item: 'Beli luk', qty: 1, unit: 'čen' }, { item: 'Paradajz', qty: 1, unit: 'kom' }, { item: 'Maslinovo ulje', qty: 10, unit: 'g' }, { item: 'Sok od limuna', qty: 0.5, unit: 'kom' }, { item: 'Losos', qty: 200, unit: 'g' }] },
    { name: 'Obrok 3', ingredients: [{ item: 'Mandarine', qty: 2, unit: 'kom' }, { item: 'Badem', qty: 30, unit: 'g' }] },
    { name: 'Obrok 4', postWorkout: true, ingredients: [{ item: 'Whey protein', qty: 1, unit: 'merica' }, { item: 'Heljdine pahuljice', qty: 50, unit: 'g' }, { item: 'Bobičasto voće', qty: 100, unit: 'g' }] },
  ],
  Petak: [
    { name: 'Obrok 1', ingredients: [{ item: 'Palenta', qty: 60, unit: 'g' }, { item: 'Grčki jogurt', qty: 150, unit: 'g' }, { item: 'Jaje', qty: 1, unit: 'kom' }] },
    { name: 'Obrok 2', ingredients: [{ item: 'Grilovana ćuretina', qty: 200, unit: 'g' }, { item: 'Batat / krompir', qty: 200, unit: 'g' }, { item: 'Tikvica / špargla', qty: 100, unit: 'g' }, { item: 'Tahini sos', qty: 20, unit: 'g' }] },
    { name: 'Obrok 3', ingredients: [{ item: 'Grilovana ćuretina', qty: 200, unit: 'g' }, { item: 'Tortilja', qty: 1, unit: 'kom' }, { item: 'Grčki jogurt', qty: 1, unit: 'kašika' }, { item: 'Salata po izboru', qty: 1, unit: 'porcija' }] },
    { name: 'Obrok 4', postWorkout: true, ingredients: [{ item: 'Whey protein', qty: 1, unit: 'merica' }, { item: 'Heljdine pahuljice', qty: 40, unit: 'g' }, { item: 'Bobičasto voće', qty: 100, unit: 'g' }] },
  ],
  Subota: [
    { name: 'Obrok 1', ingredients: [{ item: 'Whey protein', qty: 1, unit: 'merica' }, { item: 'Brašno od spelte', qty: 50, unit: 'g' }, { item: 'Jaje', qty: 1, unit: 'kom' }, { item: 'Prašak za pecivo', qty: 0.5, unit: 'kašičica' }, { item: 'Džem od borovnice bez šećera', qty: 20, unit: 'g' }] },
    { name: 'Obrok 2', ingredients: [{ item: 'Zelena salata', qty: 1, unit: 'porcija' }, { item: 'Čeri paradajz', qty: 5, unit: 'kom' }, { item: 'Kinoa', qty: 40, unit: 'g' }, { item: 'Nar', qty: 1, unit: 'kašika' }, { item: 'Ćuretina', qty: 200, unit: 'g' }, { item: 'Puter od badema', qty: 20, unit: 'g' }, { item: 'Soja sos', qty: 2, unit: 'kašika' }] },
    { name: 'Obrok 3', ingredients: [{ item: 'Jabuka', qty: 1, unit: 'kom' }, { item: 'Badem', qty: 25, unit: 'g' }] },
    { name: 'Obrok 4', postWorkout: true, ingredients: [{ item: 'Tortilja', qty: 1, unit: 'kom' }, { item: 'Tuna u salamuri', qty: 150, unit: 'g' }, { item: 'Spanać', qty: 1, unit: 'porcija' }, { item: 'Paprika', qty: 50, unit: 'g' }, { item: 'Krastavac', qty: 0.5, unit: 'kom' }, { item: 'Humus', qty: 20, unit: 'g' }] },
  ],
  Nedelja: [
    { name: 'Obrok 1', ingredients: [{ item: 'Jaje', qty: 3, unit: 'kom' }, { item: 'Goveđa pečenica', qty: 60, unit: 'g' }, { item: 'Integralni hleb', qty: 3, unit: 'parče' }, { item: 'Humus', qty: 60, unit: 'g' }, { item: 'Rukola + čeri', qty: 1, unit: 'porcija' }] },
    { name: 'Obrok 2', ingredients: [{ item: 'Mlevena junetina', qty: 180, unit: 'g' }, { item: 'Crni luk', qty: 0.5, unit: 'glavica' }, { item: 'Beli luk', qty: 1, unit: 'čen' }, { item: 'Integralna testenina od spelte', qty: 60, unit: 'g' }, { item: 'Pelat', qty: 50, unit: 'g' }, { item: 'Parmezan', qty: 10, unit: 'g' }] },
    { name: 'Obrok 3', ingredients: [{ item: 'Grčki jogurt', qty: 150, unit: 'g' }, { item: 'Borovnice', qty: 100, unit: 'g' }, { item: 'Whey protein', qty: 1, unit: 'merica' }] },
    { name: 'Obrok 4', postWorkout: true, ingredients: [{ item: 'Losos', qty: 150, unit: 'g' }, { item: 'Pirinač', qty: 40, unit: 'g' }, { item: 'Špargla', qty: 100, unit: 'g' }] },
  ],
};

const dayIndex = (new Date().getDay() + 6) % 7;
const dayName = WEEK_DAYS[dayIndex];
const dateKey = new Date().toISOString().slice(0, 10);
const mealsToday = PLAN[dayName];
const loggedAtKey = `inside.loggedAt.${dateKey}`;
const goalsKey = `inside.goals.${dateKey}`;
const workoutKey = `inside.workouts.${dateKey}`;
const groceriesPrefKey = 'inside.groceryDays';

let selectedMealId = mealsToday[0].name;

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
  const n = ((mins % 1440) + 1440) % 1440;
  return `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;
}
function addHours(hhmm, hrs) {
  return minsToHHMM(toMins(hhmm) + hrs * 60);
}
function nowHHMM() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
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
  mealsToday.forEach((meal, i) => {
    const id = meal.name;
    if (i === 0) schedule[id] = logged[id] || DEFAULT_START;
    else schedule[id] = logged[id] || addHours(schedule[mealsToday[i - 1].name], MEAL_INTERVAL_H);
  });
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

function getWorkoutState() {
  const base = { selectedTraining: 't1', done: false, checks: {} };
  return { ...base, ...(readJSON(workoutKey, {}) || {}) };
}

function countdownText(hhmm) {
  const target = toMins(hhmm);
  const now = new Date();
  let diff = target - (now.getHours() * 60 + now.getMinutes());
  if (diff < 0) diff += 1440;
  return `In ${Math.floor(diff / 60)}h ${diff % 60}m`;
}

function renderTabs() {
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.onclick = () => {
      document.querySelectorAll('.tab').forEach((x) => x.classList.remove('active'));
      document.querySelectorAll('.view').forEach((x) => x.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`[data-view="${tab.dataset.tab}"]`).classList.add('active');
    };
  });
}

function renderToday() {
  document.getElementById('todayDate').textContent = `${dateKey} • ${dayName}`;
  const logged = getLoggedAt();
  const schedule = calculateSchedule();
  const nextMeal = mealsToday.find((m) => !logged[m.name]);

  document.getElementById('nextMealName').textContent = nextMeal ? `${nextMeal.name} (${dayName})` : 'All meals complete ✅';
  document.getElementById('nextMealTime').textContent = nextMeal ? `Scheduled ${schedule[nextMeal.name]}` : 'Done for today';
  document.getElementById('nextMealCountdown').textContent = nextMeal ? countdownText(schedule[nextMeal.name]) : '';

  const mealGrid = document.getElementById('mealGrid');
  mealGrid.innerHTML = '';
  mealsToday.forEach((meal) => {
    const done = Boolean(logged[meal.name]);
    const tile = document.createElement('button');
    tile.className = `meal-tile ${selectedMealId === meal.name ? 'selected' : ''} ${done ? 'done' : ''}`;
    tile.innerHTML = `<strong>${meal.name} ${done ? '✓' : ''}</strong>
      <span>${schedule[meal.name]}</span>
      <span class="muted">${meal.ingredients.slice(0, 2).map((i) => i.item).join(' • ')}</span>
      ${done ? `<span class="muted">Logged at ${logged[meal.name]}</span>` : ''}`;
    tile.onclick = () => {
      selectedMealId = meal.name;
      renderToday();
    };
    mealGrid.appendChild(tile);
  });

  const selected = mealsToday.find((m) => m.name === selectedMealId) || mealsToday[0];
  const detail = document.getElementById('selectedMealContent');
  const workout = getWorkoutState();
  detail.innerHTML = `<div class="headline">${selected.name}</div>
    <div class="muted">Scheduled: ${schedule[selected.name]}</div>
    ${selected.postWorkout ? `<p class="pill">${workout.done ? '✅ Workout done: whey meal reminder active.' : 'Post-workout meal (log after training).'}</p>` : ''}
    <ul class="bullets">${selected.ingredients.map((i) => `<li>${i.item}: ${i.qty} ${i.unit}</li>`).join('')}</ul>
    <div class="inline-actions">
      <input id="logTimeInput" type="time" value="${nowHHMM()}" />
      <button id="logBtn" class="btn">Log meal</button>
      <button id="undoBtn" class="btn subtle">Undo</button>
    </div>`;
  detail.querySelector('#logBtn').onclick = () => {
    setLogged(selected.name, detail.querySelector('#logTimeInput').value || nowHHMM());
    renderToday();
    renderBalance();
  };
  detail.querySelector('#undoBtn').onclick = () => {
    unsetLogged(selected.name);
    renderToday();
    renderBalance();
  };
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
      writeJSON(goalsKey, next);
      renderBalance();
    };
  });

  const habitsList = document.getElementById('habitsList');
  habitsList.innerHTML = '';
  HABITS.forEach((habit) => {
    const row = document.createElement('label');
    row.className = 'habit-item';
    row.innerHTML = `<input type="checkbox" ${goals.habits[habit] ? 'checked' : ''}/> <span>${habit}</span>`;
    row.querySelector('input').onchange = (e) => {
      const next = getTodayGoals();
      next.habits[habit] = e.target.checked;
      writeJSON(goalsKey, next);
      renderBalance();
    };
    habitsList.appendChild(row);
  });

  const mealScore = Object.keys(getLoggedAt()).length / mealsToday.length;
  const sleepDone = Number(goals.sleepHours || 0) >= SLEEP_GOAL;
  const stepsDone = Number(goals.steps || 0) >= STEPS_GOAL;
  const habitDone = HABITS.filter((h) => goals.habits[h]).length;
  const completed = habitDone + (sleepDone ? 1 : 0) + (stepsDone ? 1 : 0) + mealScore;
  const total = HABITS.length + 3;
  const pct = Math.round((completed / total) * 100);
  const label = pct < 35 ? 'Low' : pct < 65 ? 'OK' : pct < 90 ? 'Good' : 'Elite';

  document.getElementById('balanceSummary').textContent = `${Math.round(completed * 10) / 10}/${total}`;
  document.getElementById('optimizedLabel').textContent = `${pct}% • ${label}`;
  document.getElementById('ringPercent').textContent = `${pct}%`;
  document.getElementById('optimizationRing').style.setProperty('--pct', `${pct}%`);
  document.getElementById('balanceProgress').style.width = `${pct}%`;
  const stepCount = Number(goals.steps || 0);
  document.getElementById('stepsHint').textContent = stepCount >= STEPS_GOAL ? 'Koraci cilj ✅' : `${Math.max(STEPS_GOAL - stepCount, 0)} koraka do cilja`;
}

function renderQuickRules() {
  let waterMl = Number(localStorage.getItem('inside.waterMl') || 0);
  const coffeeState = readJSON('inside.coffeeCount', { date: dateKey, count: 0 });
  const coffee = coffeeState.date === dateKey ? coffeeState : { date: dateKey, count: 0 };

  document.getElementById('waterText').textContent = `${waterMl} / ${WATER_TARGET_ML} ml`;
  document.getElementById('coffeeText').textContent = `${coffee.count} / 1 coffee`;
  document.getElementById('coffeeBtn').disabled = coffee.count >= 1;
  document.getElementById('coffeeReminder').textContent = coffee.count > 0 ? 'Popij 2 čaše vode uz kafu.' : '';

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

function renderGroceries() {
  const defaultDays = readJSON(groceriesPrefKey, [dayName]);
  const selected = new Set(defaultDays);
  const picker = document.getElementById('dayPicker');
  picker.innerHTML = '';

  WEEK_DAYS.forEach((day) => {
    const chip = document.createElement('button');
    chip.className = `day-chip ${selected.has(day) ? 'active' : ''}`;
    chip.textContent = day;
    chip.onclick = () => {
      if (selected.has(day)) selected.delete(day);
      else selected.add(day);
      writeJSON(groceriesPrefKey, [...selected]);
      renderGroceries();
    };
    picker.appendChild(chip);
  });

  const doublePrep = document.getElementById('doublePrep');
  doublePrep.checked = Boolean(readJSON('inside.doublePrep', false));
  doublePrep.onchange = () => {
    writeJSON('inside.doublePrep', doublePrep.checked);
    renderGroceries();
  };

  const multiplier = doublePrep.checked ? 2 : 1;
  const totals = new Map();
  [...selected].forEach((day) => {
    (PLAN[day] || []).forEach((meal) => {
      meal.ingredients.forEach((ing) => {
        const key = `${ing.item}|${ing.unit}`;
        const prev = totals.get(key) || 0;
        totals.set(key, prev + ing.qty * multiplier);
      });
    });
  });

  const entries = [...totals.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  document.getElementById('groceryStats').textContent = `${selected.size} selected day(s) • ${entries.length} total items`;
  const groceryList = document.getElementById('groceryList');
  groceryList.innerHTML = '';
  const lines = [];
  entries.forEach(([key, qty]) => {
    const [name, unit] = key.split('|');
    const row = document.createElement('div');
    row.className = 'plan-item';
    row.innerHTML = `<strong>${name}</strong><span class="muted">${Number.isInteger(qty) ? qty : qty.toFixed(1)} ${unit}</span>`;
    groceryList.appendChild(row);
    lines.push(`- ${name}: ${Number.isInteger(qty) ? qty : qty.toFixed(1)} ${unit}`);
  });

  document.getElementById('copyGroceriesBtn').onclick = async () => {
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      document.getElementById('groceryStats').textContent = `Copied ${entries.length} items to clipboard.`;
    } catch {
      document.getElementById('groceryStats').textContent = 'Clipboard not allowed in this browser context.';
    }
  };
}

function renderWorkouts() {
  const state = getWorkoutState();
  const selector = document.getElementById('workoutSelector');
  selector.innerHTML = '';

  Object.entries(TRAININGS).forEach(([id, t]) => {
    const btn = document.createElement('button');
    btn.className = `btn ${state.selectedTraining === id ? '' : 'subtle'}`;
    btn.textContent = t.title;
    btn.onclick = () => {
      writeJSON(workoutKey, { ...state, selectedTraining: id });
      renderWorkouts();
    };
    selector.appendChild(btn);
  });

  const current = TRAININGS[state.selectedTraining];
  const checks = state.checks[state.selectedTraining] || {};
  const doneCount = current.items.filter((_, i) => checks[i]).length;

  const card = document.getElementById('workoutCard');
  card.innerHTML = `<h3>${current.title}</h3>
    <p class="muted">Pauze između serija: 90 sek – 3 min</p>
    <div class="habits-list">${current.items
      .map(
        (item, i) =>
          `<label class="habit-item"><input data-i="${i}" type="checkbox" ${checks[i] ? 'checked' : ''}/> <span>${item}</span></label>`,
      )
      .join('')}</div>
    <div class="inline-actions">
      <button class="btn" id="finishWorkoutBtn">Workout finished</button>
      <button class="btn subtle" id="clearWorkoutBtn">Clear</button>
      <span class="pill">${doneCount}/${current.items.length} exercises checked</span>
    </div>`;

  card.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.onchange = (e) => {
      const i = e.target.dataset.i;
      const next = getWorkoutState();
      next.checks[next.selectedTraining] = { ...(next.checks[next.selectedTraining] || {}), [i]: e.target.checked };
      writeJSON(workoutKey, next);
      renderWorkouts();
    };
  });

  card.querySelector('#finishWorkoutBtn').onclick = () => {
    const next = getWorkoutState();
    next.done = true;
    writeJSON(workoutKey, next);
    renderWorkouts();
    renderToday();
    renderBalance();
  };
  card.querySelector('#clearWorkoutBtn').onclick = () => {
    writeJSON(workoutKey, { selectedTraining: state.selectedTraining, done: false, checks: {} });
    renderWorkouts();
    renderToday();
  };
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
}

renderTabs();
renderToday();
renderBalance();
renderQuickRules();
renderGroceries();
renderWorkouts();

setInterval(renderToday, 30000);
