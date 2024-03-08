import * as fct from "/src/js/fonctions.js";
var sondeath1


export default class gameOver2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "gameOver2" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("img_defaite", "src/assets/gameover.jpg")
    this.load.image("imageBoutonPlay", "src/assets/images_btn.png")
    this.load.audio("mort_mario","src/assets/mortmario.mp3")
  }

  create() {
    fct.doNothing();
    fct.doAlsoNothing();

   sondeath1 = this.sound.add("mort_mario");
   sondeath1.play()

    let imgBoutonAccueil = this.add.image(540, 450, 'imageBoutonPlay');
      
    this.add.image(400, 300, "img_defaite");
   
      
      // Rendre l'image cliquable
      imgBoutonAccueil.setInteractive({ useHandCursor: true });
      
      // Ajouter un écouteur d'événement sur le 'clic'
      imgBoutonAccueil.on('pointerdown', function() {
          // Redémarrer la scène 'selection' lorsqu'on clique sur le bouton
          window.location.reload();
      }, this);
      
      }  
 
    


  update() {
    

  }
}

