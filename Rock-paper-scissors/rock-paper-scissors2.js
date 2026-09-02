let score = JSON.parse(localStorage.getItem
      ('score')) || {
        wins: 0,
        losses: 0,
        ties: 0
      };


      updateScoreElement();

      /*
      if (!score) {
        score = {
          wins: 0,
          losses: 0,
          ties: 0
        };
      } */

      
      let isAutoPlaying = false;
      let interValId;
      
      //const autoPlay = () {

      //};

      document.querySelector('.js-auto-play-btn')
      .addEventListener('click', () => {
        autoPlay();
      });

      

    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'a') {
        autoPlay();
      }
    });

    function autoPlay() {
      const autoPlayButton = document.querySelector('.js-auto-play-btn');

      if (!isAutoPlaying) {
        interValId = setInterval(() => {
          const playerMove = pickComputerMove();  
          playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
        
        autoPlayButton.innerHTML = 'Stop Playing';

      } else {
        clearInterval(interValId);
        isAutoPlaying = false;
        
        autoPlayButton.innerHTML = 'Auto Play';
      }  
    }
    
    document.querySelector('.js-rock-btn')
    .addEventListener('click', () => {
      playGame('rock');
    });

    document.querySelector('.js-paper-btn')
    .addEventListener('click', () => {
      playGame('paper');
    });

    document.querySelector('.js-scissors-btn')
    .addEventListener('click', () => {
      playGame('scissors');
    });


    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'r') {
        playGame('rock');
      } else if (event.key === 'p') {
        playGame('paper');
      } else if (event.key === 's') {
        playGame('scissors')
      } else if (event.key === 'Backspace') {
        resetScore();
      }
    });
      
      function playGame(playerMove) {
      
      const computerMove = pickComputerMove();
      let result = '';

      if (playerMove === 'scissors') {
          if (computerMove === 'rock') {
          result = 'You lose'
        } else if (computerMove === 'paper') {
          result = 'You win'
        } else if (computerMove === 'scissors') {
          result = 'Tie'
        }

      } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
        result = 'You win'
      } else if (computerMove === 'paper') {
        result = 'Tie'
      } else if (computerMove === 'scissors') {
        result = 'You lose'
      }
      
      } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
        result = 'Tie'
      } else if (computerMove === 'paper') {
        result = 'You lose'
      } else if (computerMove === 'scissors') {
        result = 'You win'
      }
      }

      if (result === 'You win') {
        score.wins += 1;
      }
      else if (result === 'You lose'){
        score.losses += 1;
      }
      else if (result === 'Tie') {
        score.ties += 1;
      }

      localStorage.setItem('score', JSON.stringify(score));

      updateScoreElement();

      document.querySelector('.js-result')
      .innerHTML = result;

      document.querySelector('.js-moves')
      .innerHTML = `You
          <img class="move-icon" src="images/${playerMove}-emoji.png">
          <img class="move-icon" src="images/${computerMove}-emoji.png">
          Computer`;
      }

    
      function updateResultElement() {
        document.querySelector('.js-result')
          .innerHTML = `You picked ${playerMove}. Computer picked ${computerMove}. ${result}`;
      }


      function resetScore() {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
      updateScoreElement();
      }

      document.querySelector('.js-reset-btn')
      .addEventListener('click', () => {
       showResetConfirmation();
      });

      function showResetConfirmation() {
        document.querySelector('.js-reset-confirmation')
        .innerHTML = `
          Are you sure you want to reset the score?
          <button class="js-reset-confirm-yes reset-confirm-button">
            Yes
          </button>
          <button class="js-reset-confirm-no reset-confirm-button">
            No
          </button>
        `;
        document.querySelector('.js-reset-confirm-yes')
        .addEventListener('click', () => {
        resetScore();
        hideResetConfirmation();
      });

        document.querySelector('.js-reset-confirm-no')
        .addEventListener('click', () => {
        hideResetConfirmation();
      })
      }

      
      function hideResetConfirmation() {
        document.querySelector('.js-reset-confirmation')
        .innerHTML = '';
      }

      function updateScoreElement() {
        document.querySelector('.js-score')
          .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
      }
      function pickComputerMove () {
      
      const randomNumber = (Math.random());
      let computerMove = '';


      if (randomNumber >= 0 && randomNumber < 
      1 / 3) {
        computerMove = 'rock';
      } 
      
      else if (randomNumber >= 1 / 3 && 
      randomNumber < 2 / 3) {
        
        computerMove = 'paper';
      }
      
      else if ( randomNumber >= 2 / 3 && 
      randomNumber < 1){
        computerMove = 'scissors';
      }


      return computerMove;
      }
