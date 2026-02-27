const MEALS = [
  {
    name: 'Meal 1',
    postWorkout: false,
    ingredients: ['Oats 80 g', 'Greek yogurt 200 g', 'Berries 100 g'],
  },
  {
    name: 'Meal 2',
    postWorkout: false,
    ingredients: ['Chicken breast 180 g', 'Rice 120 g', 'Broccoli 150 g'],
  },
  {
    name: 'Meal 3',
    postWorkout: true,
    ingredients: ['Whey 35 g', 'Banana 1 pc', 'Rice cakes 3 pcs'],
  },
  {
    name: 'Meal 4',
    postWorkout: false,
    ingredients: ['Egg whites 250 ml', 'Avocado 0.5 pc', 'Spinach 100 g'],
  },
];

const list = document.getElementById('planList');
MEALS.forEach((meal) => {
  const div = document.createElement('div');
  div.className = 'plan-item';
  div.innerHTML = `
    <strong>${meal.name}${meal.postWorkout ? ' • post-workout' : ''}</strong>
    <ul class="bullets">${meal.ingredients.map((i) => `<li>${i}</li>`).join('')}</ul>
  `;
  list.appendChild(div);
});
