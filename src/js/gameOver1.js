import * as fct from "/src/js/fonctions.js";
var sondeath


export default class gameOver1 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "gameOver1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("img_defaite", "src/assets/gameover.jpg")
    this.load.image("imageBoutonPlay", "src/assets/images_btn.png")
    this.load.audio("mort_pokemon","src/assets/mortpoke.mp3")
  }

  create() {
    fct.doNothing();
    fct.doAlsoNothing();

   sondeath = this.sound.add("mort_pokemon");
   sondeath.play()

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

