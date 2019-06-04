var scores, roundScore, activePlayer, btnRoll, btnHold, btnNewGame, counterOfSix, winRate;

btnRoll = document.querySelector('.btn-roll');
btnHold = document.querySelector('.btn-hold');
btnNewGame = document.querySelector('.btn-new');
btnChangeWinRate = document.querySelector('.btn-setvalue');

init();


//Сменить игрока и обнулить текущие очки (НЕ ГЛОБАЛЬНЫЕ)

var changePlayer = function () {
    roundScore = 0;
    counterOfSix = 0;
    var currentScorePlace = document.querySelector('#current-' + activePlayer);
    var image = document.querySelector('.dice');
    var imageSecond = document.querySelector('.dice-2');
    currentScorePlace.textContent = roundScore;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    image.style.display = 'none';
    imageSecond.style.display = 'none';

};

// Сменить игрока и обнулить текущие и ГЛОБАЛЬНЫЕ очки
var resetAllScore = function () {
    scores[activePlayer] = 0;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    changePlayer();
};


// Событие которое считывает с инпута число, и устанавливает как значение для выигрыша
btnChangeWinRate.addEventListener('click', function() {
    var input = document.querySelector('.win-value').value;

    if (input) {
        winRate = document.querySelector('.win-value').value;
        document.querySelector('.win-value').value = '';
    } else {
        alert('Недопустимое значение для поля, вин-рейту присвоено значение по-умолчанию (100)');
        winRate = 100;
    }
});

// Событие при нажатии на кнопку Roll Dice
btnRoll.addEventListener('click', function () {
    var currentScorePlace = document.querySelector('#current-' + activePlayer);
    var dice = Math.floor(Math.random() * 6) + 1;
    var diceSecond = Math.floor(Math.random() * 6) + 1;
    var duplicateDice = dice;
    var image = document.querySelector('.dice');
    var imageSecond = document.querySelector('.dice-2');
    image.style.display = 'block';
    imageSecond.style.display = 'block';
    image.src = 'dice-' + dice + '.png';
    imageSecond.src = 'dice-' + diceSecond + '.png';

    if (dice !== 1  && diceSecond !== 1) {
        duplicateDice === 6 ? counterOfSix++ : counterOfSix = 0; // проверяем в отдельной переменной, выпала ли шестёрка, и накапливаем счётчик выпавших шестёрок
        roundScore += dice + diceSecond;
        currentScorePlace.textContent = roundScore;

        // Если выпадает вторая шестёрка подряд, то запускаем ресет очков и меняем игрока
        if (counterOfSix === 2) {
            alert('Второй раз подряд выпадает ШЕСТЁРКА!');
            resetAllScore();

        };
        
    } else if (dice === 1 || diceSecond === 1) {
        alert('На одном из кубиков выпало число 1! Вы пропускаете ход!');
        changePlayer();
        
    }
});


// Событие при нажатии на кнопку Hold
btnHold.addEventListener('click', function () {
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    // Проверка, выиграл ли игрок
    if (scores[activePlayer] >= winRate) {
        document.querySelector('#name-' + activePlayer).textContent = 'Победитель!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice-2').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('winner');
        btnRoll.style.display = 'none';
        btnHold.style.display = 'none';
        btnChangeWinRate.style.display = 'none';
        document.querySelector('.win-value').style.display = 'none';
    } else {
        changePlayer();
    };

});

// Событие при нажатии на кнопку New Game
btnNewGame.addEventListener('click', init);

function init () {
    scores = [0, 0];
    roundScore = 0;
    winRate = 100;
    activePlayer = 0; // 0 это первый игрок,  1 это второй игрок
    counterOfSix = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';

    // обнуляем статистику и возвращаем первого игрока 
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    btnRoll.style.display = 'block';
    btnHold.style.display = 'block';
    btnChangeWinRate.style.display = 'block';
    document.querySelector('.win-value').style.display = 'block';


};