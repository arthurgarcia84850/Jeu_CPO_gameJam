// chargement des librairies
import selection from "/src/js/selection.js";
import niveau1 from "/src/js/niveau1.js";
import niveau2 from "/src/js/niveau2.js";
import niveau3 from "/src/js/niveau3.js";
import gameOver1 from "/src/js/gameOver1.js";
import gameOver2 from "/src/js/gameOver2.js";
import Victoire1 from "/src/js/Victoire1.js";
import Victoire2 from "/src/js/Victoire2.js";
// configuration générale du jeu
var config = {
  type: Phaser.AUTO,
  width: 800, // largeur en pixels
  height: 600, // hauteur en pixels
   scale: {
        // Or set parent divId here
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
   },
  physics: {
    // définition des parametres physiques
    default: "arcade", // mode arcade : le plus simple : des rectangles pour gérer les collisions. Pas de pentes
    arcade: {
      // parametres du mode arcade
      gravity: {
        y: 300// gravité verticale : acceleration ddes corps en pixels par seconde
      },
      debug: true// permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
    }
  },
  scene: [selection, gameOver1, gameOver2, niveau1, niveau2, niveau3, Victoire1, Victoire2]
};

// création et lancement du jeu
var game = new Phaser.Game(config);
game.scene.start("selection");
