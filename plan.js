const GUIDANCE = [
  'Whey obrok koristi nakon treninga.',
  'Obroke možeš rotirati i ponavljati kroz nedelju.',
  'Jedan obrok možeš spremiti za dva dana (dupla količina).',
  'Meri hranu pre termičke obrade.',
  'Jedna kafa dnevno, bez šećera, ne na prazan stomak + 2 čaše vode.',
  'Hidratacija minimum 2l dnevno.',
  'Šetnja minimum 7k koraka dnevno.',
  'Meso: GI puter / kokosovo ulje / svinjska mast. Biljna ulja za salatu.',
];

const DAY_OVERVIEW = {
  Ponedeljak: ['Jaja + bezglutenski hleb + ajvar', 'Piletina/ćuretina/riba + batat + tikvica', 'Grčki jogurt + lan + badem puter + borovnice', 'Heljdine pahuljice + whey + bobičasto'],
  Utorak: ['Palenta + grčki + jaje', 'Mlevena junetina + spelta pasta + pelat', 'Piletina + cvekla + maslinovo', 'Pečenica + hleb + ajvar'],
  Sreda: ['Proteinske palačinke', 'Boranija + junetina čorbica', 'Jabuka + badem puter', 'Pileći file/tuna + salata + hleb'],
  'Četvrtak': ['Jaja + pršuta + humus + tost', 'Tabbouleh + losos', 'Mandarine + badem', 'Whey šejk + heljdine + bobičasto'],
  Petak: ['Palenta + grčki + jaje', 'Ćuretina + batat + tikvica', 'Ćuretina tortilja + salata', 'Whey + heljdine + bobičasto'],
  Subota: ['Proteinske palačinke + džem bez šećera', 'Salata + ćuretina + badem dressing', 'Jabuka + badem', 'Tortilja + tuna + humus'],
  Nedelja: ['Jaja + pečenica + hleb + humus', 'Junetina + spelta pasta + pelat', 'Grčki + borovnice + whey', 'Losos + pirinač + špargla'],
};

const guidance = document.getElementById('guidance');
GUIDANCE.forEach((line) => {
  const li = document.createElement('li');
  li.textContent = line;
  guidance.appendChild(li);
});

const list = document.getElementById('planList');
Object.entries(DAY_OVERVIEW).forEach(([day, meals]) => {
  const div = document.createElement('div');
  div.className = 'plan-item';
  div.innerHTML = `<strong>${day}</strong><span class="muted">${meals.join(' • ')}</span>`;
  list.appendChild(div);
});
