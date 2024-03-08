import * as fct from "/src/js/fonctions.js";


export default class niveau2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("img_regles", "src/assets/regles.png")
    this.load.image("btn_retour", "src/assets/btnretour.png")
   
  }

  create() {
    fct.doNothing();
    fct.doAlsoNothing();

   

   
      
    this.add.image(400, 300, "img_regles");
   
    let imgBoutonAccueil = this.add.image(750, 50, 'btn_retour');

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

