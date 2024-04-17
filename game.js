function startfirst(){
	let cells = document.querySelectorAll('#field td');
	start(cells);
	clearing(cells);
	timestart(cells);
}

function start(cells) {
	let i = 0;
	flag = true;
	for (let cell of cells) {
		cell.addEventListener('click', function step() {
			if(flag){
			this.textContent = ['X', 'O'][i % 2];
			this.removeEventListener('click', step);
			
			if (isVictory(cells) && flag) {
				alert("Победил " + this.textContent);
				flag=false;
				blocked(cells);
			} else if (i == 8 && flag) {
				alert('ничья');
				flag=false;
			}
			
			i++;
		}
		});
	}
}
function blocked(cells){
	for (let cell of cells){
		cell.removeEventListener('click',step);
	}
}

function clearing(cells){
	for (let cell of cells){
		cell.textContent = "";
	}
}

function isVictory(cells) {
	let combs = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let comb of combs) {
		if (
			cells[comb[0]].textContent == cells[comb[1]].textContent &&
			cells[comb[1]].textContent == cells[comb[2]].textContent &&
			cells[comb[0]].textContent != ''
		) {
			return true;
		}
	}
	
	return false;
}

var count = 1;
// запущен таймер или нет

started = false;
// запуск таймера по кнопке
function timestart(cells) {
  // если таймер уже запущен — выходим из функции
  if (started) {return};
  // запоминаем время нажатия
  var start_time = new Date(); 
  // получаем время окончания таймера
  var stop_time = start_time.setMinutes(start_time.getMinutes() + count); 

  // запускаем ежесекундный отсчёт
    var countdown = setInterval(function() {
    // текущее время
    var now = new Date().getTime();
    // сколько времени осталось до конца таймера
    var remain = stop_time - now; 
    // переводим миллисекунды в минуты и секунды
    var min = Math.floor( (remain % (1000 * 60 * 60)) / (1000 * 60) );
    var sec = Math.floor( (remain % (1000 * 60)) / 1000 );
    // если значение текущей секунды меньше 10, добавляем вначале ведущий ноль
    sec = sec < 10 ? "0" + sec : sec;
    // отправляем значение таймера на страницу в нужный раздел
    document.getElementById("timer").innerHTML = min + ":" + sec;
    // если время вышло
    if (remain < 0 || isVictory(cells) || !flag) {
      // останавливаем отсчёт
      clearInterval(countdown);
      // пишем текст вместо цифр
      document.getElementById("timer").innerHTML = "Игра закончена!";
      started = false;
      flag = false;
     }
  }, 1000);
  // помечаем, что таймер уже запущен
  started = true;
}