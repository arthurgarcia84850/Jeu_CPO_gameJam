import * as fct from "/src/js/fonctions.js";
var sonvictoire1


export default class Victoire1 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "Victoire1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("img_victoire", "src/assets/victoire.jpg")
    this.load.image("imageBoutonPlay", "src/assets/images_btn.png")
    this.load.audio("victoire_pokemon","src/assets/sonvictoire.mp3")
  }

  create() {
    fct.doNothing();
    fct.doAlsoNothing();

   sonvictoire1 = this.sound.add("victoire_pokemon");
   sonvictoire1.play()

    let imgBoutonAccueil = this.add.image(540, 450, 'imageBoutonPlay');
      
    this.add.image(400, 300, "img_victoire");
   
      
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

