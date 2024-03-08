class MenuScene extends Phaser.Scene {
  constructor() {
      super({ key: 'MenuScene' });
  }

  preload() {
      // Chargez ici les ressources nécessaires (images, boutons, etc.)
  }

  create() {
      // Ajoutez le fond, les boutons, le texte, etc.
      let fondMenu = this.add.image(400, 300, 'fondMenu');
      let boutonRegles = this.add.sprite(200, 400, 'boutonRegles').setInteractive({ useHandCursor: true });
      let boutonJouer = this.add.sprite(600, 400, 'boutonJouer').setInteractive({ useHandCursor: true });

      // Ajoutez des événements de clic aux boutons
      boutonRegles.on('pointerdown', function () {
          // Code à exécuter lorsque le bouton "Règles" est cliqué
          this.scene.start('ReglesScene');
      }, this);

      boutonJouer.on('pointerdown', function () {
          // Code à exécuter lorsque le bouton "Jouer" est cliqué
          this.scene.start('selection');
      }, this);
  }
}
// Configurez votre jeu
var config = {
    // ...
    scene: [MenuScene, ReglesScene, JeuScene], // Ajoutez vos autres scènes ici
    // ...
};

var game = new Phaser.Game(config);
