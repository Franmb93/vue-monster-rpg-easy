function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min));
}

const app = Vue.createApp({
  data() {
    return {
      player: { health: 100 },
      monster: { health: 100 },
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyle() {
      if (this.monster.health < 0) {
        return { width: '0%' };
      }
      return { width: this.monster.health + '%' };
    },
    playerBarStyle() {
      if (this.player.health < 0) {
        return { width: '0%' };
      }
      return { width: this.player.health + '%' };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    'player.health'(value) {
      if (value <= 0 && this.monster.health <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'monster';
      }

      this.startGame();
    },
    'monster.health'(value) {
      if (value <= 0 && this.player.health <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'player';
      }
      this.startGame();
    },
  },
  methods: {
    startGame() {
      this.player.health = 100;
      this.monster.health = 100;
      this.currentRound = 0;
      this.winner = null;
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monster.health -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.player.health -= attackValue;
      this.addLogMessage('monster', 'attack', attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;

      const attackValue = getRandomValue(10, 25);
      this.monster.health -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.player.health + healValue > 100) {
        this.player.health = 100;
      } else {
        this.player.health += healValue;
      }
      this.addLogMessage('player', 'heals', attackValue);

      this.attackPlayer();
    },
    surrender() {
      this.winner = 'monster';
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionTyp: what,
        actionValue: value,
      });
    },
  },
});

app.mount('#game');
