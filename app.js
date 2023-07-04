function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min));
}

const app = Vue.createApp({
  data() {
    return {
      player: { health: 100 },
      monster: { health: 100 },
      currentRound: 0,
    };
  },
  computed: {
    monsterBarStyle() {
      return { width: this.monster.health + '%' };
    },
    playerBarStyle() {
      return { width: this.player.health + '%' };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    'player.health'(value) {
      if (value <= 0 && this.monster.health <= 0) {
      } else if (value <= 0) {
      }
    },
    'monster.health'(value) {
      if (value <= 0 && this.player.health <= 0) {
      } else if (value <= 0) {
      }
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monster.health -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.player.health -= attackValue;
    },
    specialAttackMonster() {
      this.currentRound++;

      const attackValue = getRandomValue(10, 25);
      this.monster.health -= attackValue;
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
      this.attackPlayer();
    },
  },
});

app.mount('#game');
