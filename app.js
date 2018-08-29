new Vue({
  el: '#app',
  data: {
    imgYou: 'img/you/0.png',
    imgMonster: 'img/monster/0.png',
    helthYou: 100,
    helthMonster: 100,
    gameIsRanning: false,
    turns: []
  },
  computed: {
    changeImg() {
        if(this.helthYou < 100 & this.helthYou > 70) {
          this.imgYou = 'img/you/2.png'
        } else if(this.helthYou < 70 & this.helthYou > 40) {
          this.imgYou = 'img/you/3.png'
        } else if(this.helthYou < 40 & this.helthYou > 0) {
          this.imgYou = 'img/you/4.png'
        } else if(this.helthYou <= 0) {
          this.imgYou = 'img/you/5.png'
        };

        if(this.helthMonster < 100 & this.helthMonster > 70) {
          this.imgMonster = 'img/monster/2.png'
        } else if(this.helthMonster < 70 & this.helthMonster > 40) {
          this.imgMonster = 'img/monster/3.png'
        } else if(this.helthMonster < 40 & this.helthMonster > 0) {
          this.imgMonster = 'img/monster/4.png'
        } else if(this.helthMonster <= 0) {
          this.imgMonster = 'img/monster/5.png'
        }
    }
  },
  methods: {
    startGame() {
      this.gameIsRanning = true;
      this.helthYou = 100;
      this.helthMonster = 100;
      this.imgYou = 'img/you/1.png';
      this.imgMonster = 'img/monster/1.png';
      this.turns = [];
    },
    attack() {
      var damage = this.calculateDamage(5, 12);
      this.helthMonster -= damage; 
      this.turns.unshift({
        isYou: true,
        text: 'You hit Monster for ' + damage
      });      
      if(this.checkWin()) {
        return;
      };                
      this.monsterAttack();      
    },
    specialAttack() {
      var damage = this.calculateDamage(6, 16);
      this.helthMonster -= damage;
      this.turns.unshift({
        isYou: true,
        text: 'You hit Monster hard for ' + damage
      }); 
      if(this.checkWin()) {
        return;
      };        
      this.monsterAttack();
    },
    heal() {
      if(this.helthYou <= 90) {
        this.helthYou += 10;
      } else{
        this.helthYou = 100;
      };    
      this.turns.unshift({
        isYou: true,
        text: 'You heal for 10 points'
      });     
      this.monsterAttack();
    },
    giveUp() {
      this.gameIsRanning = false;
    },
    calculateDamage(min, max) {
      return Math.max(Math.floor((Math.random() * max) + 1), min);
    },    
    monsterAttack() {
      if(Math.random() > 0.5) {
        this.criticalMonster();
      } else {
        this.monsterUsuallyAttack();
      }
    },
    monsterUsuallyAttack() {
      var damage = this.calculateDamage(3, 10);
      this.helthYou -= damage;      
      this.turns.unshift({
        isYou: false,
        text: 'Monster hits You for ' + damage
      });
      this.checkWin();
    },
    criticalMonster() {
      var damage = this.calculateDamage(5, 30);
      this.helthYou -= damage;      
      this.turns.unshift({
        isYou: false,
        text: 'BABAAH!!!! Monster critical hits You for ' + damage
      });
      this.checkWin();      
    },
    checkWin() {
      if(this.helthMonster <= 0) {    
        if (confirm('You won! New Game?')) {          
          this.startGame();
        }else {
          this.gameIsRanning = false;
        };
        return true;
      } else if(this.helthYou <= 0) {
        if (confirm('You lost! New Game?')) {
          this.startGame();
        }else {
          this.gameIsRanning = false;
        };
        return true;
      };
      return false;
    },    
  }
})