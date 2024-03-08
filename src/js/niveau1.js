import * as fct from "/src/js/fonctions.js";

/***********************************************************************/
//VARIABLES GLOBALES 
var player; // désigne le sprite du joueur
var clavier; // pour la gestion du clavier
var groupe_plateformes;
var boutonFeu;
var musique_fond
var pokeball;
var animEnCours;
var groupe_ennemis1;
var groupe_ennemis2;
var lancerpokeball
 

/***********************************************************************/

export default class niveau1 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }


  // définition de la classe "selection"


  /***********************************************************************/
  /** FONCTION PRELOAD 
/***********************************************************************/

  /** La fonction preload est appelée une et une seule fois,
   * lors du chargement de la scene dans le jeu.
   * On y trouve surtout le chargement des assets (images, son ..)
   */
  preload() {
    // tous les assets du jeu sont placés dans le sous-répertoire src/assets/
    this.load.audio("son_pokemon", "src/assets/pokemon.mp3");
    this.load.audio('poke_son', 'src/assets/pokeson.mp3');
    this.load.image("Phaser_tuilesdejeu1", "src/assets/1.jpg");
    this.load.image("Phaser_tuilesdejeu2", "src/assets/7db0e66cb58ed553af069a8d58fc6ef4.jpg");
    this.load.image("Phaser_tuilesdejeu3", "src/assets/3.jpg");
    this.load.image("pokeball", "src/assets/pokeball.png");

    this.load.tilemapTiledJSON("map", "src/assets/map_pokemon[71].tmj");
    this.load.image("img_defaite", "src/assets/gameover.jpg");
    this.load.image("imageBoutonPlay", "src/assets/images_btn.png");
    // chargement de la carte

    this.load.image("img_ciel", "src/assets/sky.png");
    this.load.image("img_arret", "src/assets/pikachu_arret.png", {
      frameWidth: 50,
      frameHeight: 50
    });

    this.load.image("img_plateforme", "src/assets/platform.png");
    // Chargement de la feuille de sprites
    this.load.spritesheet("img_perso", "src/assets/perso.png", {
      frameWidth: 97,
      frameHeight: 130

    });
    this.load.spritesheet("img_pika", "src/assets/pika.png", {
      frameWidth: 41,
      frameHeight: 42
    });

    this.load.spritesheet("img_dracaufeu", "src/assets/dracaufeu.png", {
      frameWidth: 166.5,
      frameHeight: 118
    });

    
    this.load.image("img_coeur", "src/assets/coeur.png");
    this.load.image("img_porte1", "src/assets/door1.png");
    this.load.image("img_porte2", "src/assets/door2.png");
    this.load.image("img_porte3", "src/assets/door3.png");
  }


  /***********************************************************************/
  /** FONCTION CREATE 
/***********************************************************************/

  /* La fonction create est appelée lors du lancement de la scene
   * si on relance la scene, elle sera appelée a nouveau
   * on y trouve toutes les instructions permettant de créer la scene
   * placement des peronnages, des sprites, des platesformes, création des animations
   * ainsi que toutes les instructions permettant de planifier des evenements
   */
  create() {

  
    
          
    this.groupeBullets = this.physics.add.group();
    this.physics.world.on('worldbounds', function (body) {
      if (body.gameObject) {
          body.gameObject.destroy(); // Détruit l'objet (la balle) lorsque ses limites du monde sont atteintes
      }
  }, this);


    musique_fond = this.sound.add("son_pokemon");
    musique_fond.play({
      loop: true // Active la répétition en boucle
    });

    fct.doNothing();
    fct.doAlsoNothing();
    // chargement de la carte

    // chargement de la carte
    const carteDuNiveau = this.add.tilemap("map");

    // chargement du jeu de tuiles
    const tileset1 = carteDuNiveau.addTilesetImage(
      "1",
      "Phaser_tuilesdejeu1"
    );

    const tileset2 = carteDuNiveau.addTilesetImage(
      "7db0e66cb58ed553af069a8d58fc6ef4",
      "Phaser_tuilesdejeu2"
    );

    const tileset3 = carteDuNiveau.addTilesetImage(
      "3",
      "Phaser_tuilesdejeu3"
    );
    // Ajouter chaque ensemble de tuiles à la carte

    // ... Autres configurations ou fonctionnalités de création

    const calque_background = carteDuNiveau.createLayer(
      "Calque1",
      [tileset1, tileset2, tileset3]
    );

    const calque_plateformes = carteDuNiveau.createLayer(
      "calque_plateforme",
      [tileset1, tileset2, tileset3]
    );

    calque_plateformes.setCollisionByProperty({ estSolide: true });
  
 

    groupe_ennemis1 = this.physics.add.group();
    this.physics.add.collider(groupe_ennemis1, calque_plateformes);
    groupe_ennemis2 = this.physics.add.group();


   // extraction des poitns depuis le calque calque_ennemis, stockage dans tab_points
const tab_points1 = carteDuNiveau.getObjectLayer("calque_ennemis1"); 
const tab_points2 = carteDuNiveau.getObjectLayer("calque_ennemis2");  

// on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
tab_points1.objects.forEach(point => {
    if (point.name == "ennemi1") {
      var nouvel_ennemi1 = this.physics.add.sprite(point.x, point.y, "img_pika");
      groupe_ennemis1.add(nouvel_ennemi1);
    }
}); 
tab_points2.objects.forEach(point => {
  if (point.name == "ennemi2") {
    var nouvel_ennemi2 = this.physics.add.sprite(point.x, point.y, "img_dracaufeu");
    groupe_ennemis2.add(nouvel_ennemi2);
  }
}); 



    // extraction des poitns depuis le calque calque_ennemis, stockage dans tab_points
    
    
    // on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
  
    this.physics.world.gravity.y = 0;

    player = this.physics.add.sprite(700, 300, "img_perso");
    player.setScale(0.3, 0.3);
    this.physics.add.collider(player, calque_plateformes);

  

    player.direction = 'right';  

    // redimentionnement du monde avec les dimensions calculées via tiled
    this.physics.world.setBounds(0, 0, 3200, 640);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 3200, 640);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(player);

    //const tab_points = carte.getObjectLayer("calque_ennemis");   
    // extraction des poitns depuis le calque calque_ennemis, stockage dans tab_points


 
    //for (let i = 0; i < vieInitiale; i++) {
    //let coeur = this.add.image(100 + i * 40, 100, 'img_coeur').setScale(0.1)
    //coeursDeVie.push(coeur);
    //}
    //this.cameras.main.startFollow(coeursDeVie);
    //clavier = this.input.keyboard.createCursorKeys();

    // affectation de la touche A à boutonFeu
    //boutonFeu = this.input.keyboard.addKey('A'); 
    /*************************************
     *  CREATION DU MONDE + PLATEFORMES  *
     *************************************/

    // On ajoute une simple image de fond, le ciel, au centre de la zone affichée (400, 300)
    // Par défaut le point d'ancrage d'une image est le centre de cette derniere

    // la création d'un groupes permet de gérer simultanément les éléments d'une meme famille
    //  Le groupe groupe_plateformes contiendra le sol et deux platesformes sur lesquelles sauter
    // notez le mot clé "staticGroup" : le static indique que ces élements sont fixes : pas de gravite,
    // ni de possibilité de les pousser.

    // une fois le groupe créé, on va créer les platesformes , le sol, et les ajouter au groupe groupe_plateformes

    // l'image img_plateforme fait 400x32. On en met 2 à coté pour faire le sol
    // la méthode create permet de créer et d'ajouter automatiquement des objets à un groupe
    // on précise 2 parametres : chaque coordonnées et la texture de l'objet, et "voila!"

    //  on ajoute 3 platesformes flottantes


    /****************************
     *  Ajout des portes   *
     ****************************/

    /****************************
     *  CREATION DU PERSONNAGE  *
     ****************************/

    // On créée un nouveeau personnage : player

    //  propriétées physiqyes de l'objet player :
    // on donne un petit coefficient de rebond
    player.setCollideWorldBounds(true); // le player se cognera contre les bords du monde
    
    /***************************
     *  CREATION DES ANIMATIONS *
     ****************************/
    // dans cette partie, on crée les animations, à partir des spritesheet
    // chaque animation est une succession de frame à vitesse de défilement défini
    // une animation doit avoir un nom. Quand on voudra la jouer sur un sprite, on utilisera la méthode play()
    // creation de l'animation "anim_tourne_gauche" qui sera jouée sur le player lorsque ce dernier tourne à gauche

    this.anims.create({
      key: "anim_tourne_left", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_perso", {
        start: 3,
        end: 5
      }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });

    this.anims.create({
      key: "anim_haut", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_perso", {
        start: 9,
        end: 11
      }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });

    // creation de l'animation "anim_tourne_face" qui sera jouée sur le player lorsque ce dernier n'avance pas.
    animEnCours = player 
    this.anims.create({
      key: "anim_face",
      frames: [{ key: "img_perso", frame: 1 }],
      frameRate: 20
    });
    console.log(animEnCours);

    this.anims.create({
      key: "anim_bas", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_perso", {
        start: 0,
        end: 2
      }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });
    // creation de l'animation "anim_tourne_droite" qui sera jouée sur le player lorsque ce dernier tourne à droite
    this.anims.create({
      key: "anim_tourne_right",
      frames: this.anims.generateFrameNumbers("img_perso", {
        start: 6,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "anim_pika_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_pika", {
        start: 4,
        end: 7
      }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });
    this.anims.create({
      key: "anim_pika_droite", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_pika", {
        start: 0,
        end: 3
      }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });
    this.anims.create({
      key: "anim_dracaufeu_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_dracaufeu", {
        start: 0,
        end: 3
      }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });
    this.anims.create({
      key: "anim_dracaufeu_droite", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_dracaufeu", {
        start: 4,
        end: 7
      }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });

    groupe_ennemis1.children.iterate(function (un_ennemi1) {
      un_ennemi1.setVelocityX(-40);
      un_ennemi1.direction = "gauche";
      un_ennemi1.play("anim_pika_gauche", true);
      un_ennemi1.vie = 1;
    });

    groupe_ennemis2.children.iterate(function (un_ennemi2) {
      un_ennemi2.setVelocityX(-40);
      un_ennemi2.direction = "gauche";
      un_ennemi2.play("anim_dracaufeu_gauche", true);
      un_ennemi2.vie = 3;
      un_ennemi2.setCollideWorldBounds(true);
    });
    
    
 /*****************************************************
   *  ajout du modele de mobilite des ennemis *
   ******************************************************/
  // par défaut, on va a gauche en utilisant la meme animation que le personnage


    /***********************
     *  CREATION DU CLAVIER *
     ************************/

    player.direction = 'droite';
    // ceci permet de creer un clavier et de mapper des touches, connaitre l'état des touches
    clavier = this.input.keyboard.createCursorKeys();
    boutonFeu = this.input.keyboard.addKey('A');
    //pokeball = this.sound.add("coupDeFeu");
    
    //if (clavier.A.isDown) {
     //pokeball.play()
    //}

/*    
// instructions pour les objets surveillés en bord de monde
this.physics.world.on("worldbounds", function(body) {
  // on récupère l'objet surveillé
  var objet = body.gameObject;
  // s'il s'agit d'une balle
  if (this.groupeBullets.contains(objet)) {
      // on le détruit
      objet.destroy();
  }
}, this);
*/



    this.physics.add.overlap(this.groupeBullets, groupe_ennemis1, hitEnnemi1, null,this);
    this.physics.add.overlap(this.groupeBullets, groupe_ennemis2, hitEnnemi2, null,this);
    /******************************************
     ************
     *  GESTION DES INTERATIONS ENTRE  GROUPES ET ELEMENTS *
     ******************************************************/
     this.physics.add.collider(this.groupeBullets, calque_plateformes, toucher, null, this);

     this.physics.add.collider(this.groupeBullets, groupe_ennemis1);
     this.physics.add.collider(this.groupeBullets, groupe_ennemis2);

     //  Collide the player and the groupe_etoiles with the groupe_plateformes
    this.physics.add.collider(player, groupe_plateformes);
    /*   cibles = this.physics.add.group({
         key: 'pikachu',
         repeat: 7,
         setXY: { x: 24, y: 0, stepX: 107 }
     });  
     this.physics.add.collider(cibles, calque_plateformes);  
     }
   */
// instructions pour les objets surveillés en bord de monde
this.physics.add.collider(player, groupe_ennemis1, gameOver, null, this);
this.physics.add.collider(player, groupe_ennemis2, gameOver, null, this);
 // Créer le bouton à partir d'une image
 

}  
  
    /***********************************************************************/
    /** FONCTION UPDATE 
  /***********************************************************************/
  

  update() {
    ///if (clavier.left.isDown || clavier.right.isDown || clavier.up.isDown || clavier.down.isDown) {
       
    if (clavier.left.isDown || clavier.right.isDown) {
      if (clavier.left.isDown) {
        // enregistrement de la direction : gauche
        player.direction = 'gauche';
        player.setVelocityX(-160);
        player.anims.play('anim_tourne_left', true);
      }
      if (clavier.right.isDown) {
        // enregistrement de la direction : droite
        player.direction = 'droite';
        player.setVelocityX(160);
        player.anims.play('anim_tourne_right', true);
      }
    } else {
      player.setVelocityX(0);
      //player.anims.play("anim_face");
    }

    if (clavier.up.isDown || clavier.down.isDown) {
      // Gestion du déplacement vertical
      if (clavier.up.isDown) {
        player.direction = 'haut';
        player.setVelocityY(-100);
        player.anims.play("anim_haut", true);
      }
      if (clavier.down.isDown) {
        player.direction = 'bas'
        player.setVelocityY(100);
        player.anims.play("anim_bas", true);
      }
    } else {
      player.setVelocityY(0);

      // Si aucune touche verticale n'est enfoncée, arrêtez l'animation
      //player.anims.play("anim_face");
    }
  
    player.stopAfterRepeat(0);
  
    //fonction tirer( ), prenant comme paramètre l'auteur du tir
   // vitesse en x et en y
    // déclenchement de la fonction tirer() si appui sur boutonFeu 
    if (Phaser.Input.Keyboard.JustDown(boutonFeu)) {
      tirerh.call(this,player);
      tirerv.call(this,player);
        
    }
 

  

 groupe_ennemis1.children.iterate(function iterateur(un_ennemi1) {
    if (un_ennemi1.direction == "gauche" && un_ennemi1.body.blocked.left) {
        // Si l'ennemi va à gauche et touche le sol, changer de direction vers la droite
        un_ennemi1.setVelocityX(40);
        un_ennemi1.direction = "droite";
        un_ennemi1.play("anim_pika_droite", true);
    }
    
    if (un_ennemi1.direction == "droite" && un_ennemi1.body.blocked.right) {
        // Si l'ennemi va à droite et touche le sol, changer de direction vers la gauche
        un_ennemi1.setVelocityX(-40);
        un_ennemi1.direction = "gauche";
        un_ennemi1.play("anim_pika_gauche", true);
    }
});

groupe_ennemis2.children.iterate(function iterateur(un_ennemi2) {
  if (un_ennemi2.direction == "gauche" && un_ennemi2.body.blocked.left) {
      // Si l'ennemi va à gauche et touche le sol, changer de direction vers la droite
      un_ennemi2.setVelocityX(40);
      un_ennemi2.direction = "droite";
      un_ennemi2.play("anim_dracaufeu_droite", true);
  }
  
  if (un_ennemi2.direction == "droite" && un_ennemi2.body.blocked.right) {
      // Si l'ennemi va à droite et touche le sol, changer de direction vers la gauche
      un_ennemi2.setVelocityX(-40);
      un_ennemi2.direction = "gauche";
      un_ennemi2.play("anim_dracaufeu_gauche", true);
  }
});

// Vérifiez si le groupe_ennemis1 et groupe_ennemis2 sont tous deux vides
if (groupe_ennemis1.getChildren().length === 0 && groupe_ennemis2.getChildren().length === 0) {
  // Si les deux groupes d'ennemis sont vides, vous pouvez arrêter le jeu
  // Vous pouvez ici ajouter du code pour passer à la scène suivante, afficher un message de victoire, etc.
  this.scene.pause();
  musique_fond.pause();
  this.scene.start('Victoire1'); // Assurez-vous de remplacer 'victoireScene' par le nom correct de votre scène de victoire
}
    //coeursDeVie.forEach(coeur => {
    // coeur.x = this.cameras.main.scrollX + 50 + coeursDeVie.indexOf(coeur) * 30;
    //});
    if (Phaser.Input.Keyboard.JustDown(clavier.space) == true) {
      if (this.physics.overlap(player, this.porte1))
        this.scene.switch("niveau1");
      if (this.physics.overlap(player, this.porte2))
        this.scene.switch("niveau2");
      if (this.physics.overlap(player, this.porte3))
        this.scene.switch("niveau3");
    }
  }
  
}
    
  



/***********************************************************************/
/** CONFIGURATION GLOBALE DU JEU ET LANCEMENT 
/***********************************************************************/
function hitEnnemi1(bullet, un_ennemi1) {
  bullet.destroy(); // Détruit la pokeball

  un_ennemi1.vie--;

  if (un_ennemi1.vie === 0) {
    un_ennemi1.destroy(); 
  }
}

function hitEnnemi2(bullet, un_ennemi2) {
  bullet.destroy(); // Détruit la pokeball

  un_ennemi2.vie--;

  if (un_ennemi2.vie === 0) {
    un_ennemi2.destroy(); 
  }
}


function tirerh(player) {
  var coefDir = 1;
  if (player.direction == 'haut') { return; }
  if (player.direction == 'bas') { return; }
  
  if (player.direction == 'gauche') { coefDir = -1; }
  if (player.direction == 'droite') { coefDir = 1; }

  // on crée la balle a coté du joueur
  var bullet = this.groupeBullets.create(player.x + (25 * coefDir), player.y - 4, 'pokeball');
  // parametres physiques de la balle.
 // bullet.setCollideWorldBounds(true);
//  bullet.body.allowGravity = false;
 // bullet.setVelocity(500 * coefDir, 0); // vitesse en x et en y
  bullet.setCollideWorldBounds(true);
  bullet.body.onWorldBounds = true; 
   
  bullet.body.allowGravity = false;
  bullet.setVelocity(500 * coefDir, 0);  
  lancerpokeball = this.sound.add("poke_son");
  lancerpokeball.play()
}

function tirerv(player) {
  if (player.direction == 'gauche') { return; }
  if (player.direction == 'droite') { return; }

  var coefDir=1;
  if (player.direction == 'haut') { coefDir = -1; }
  if (player.direction == 'bas') { coefDir = 1; }
  // on crée la balle a coté du joueur
  var bullet = this.groupeBullets.create(player.x, player.y - 4, 'pokeball');
  // parametres physiques de la balle.
  bullet.setCollideWorldBounds(true);
  bullet.body.allowGravity = false;
  bullet.setVelocity(0, 500 * coefDir); // vitesse en x et en y
  lancerpokeball = this.sound.add("poke_son");
  lancerpokeball.play()

}
function gameOver() {
  this.scene.pause();
  musique_fond.pause();
this.scene.start('gameOver1');
  //this.add.image(420, 335, "img_defaite");
let imgBoutonAccueil = this.add.image(540, 335, 'imageBoutonPlay');

// Rendre l'image cliquable
imgBoutonAccueil.setInteractive({ useHandCursor: true });

// Ajouter un écouteur d'événement sur le 'clic'
imgBoutonAccueil.on('pointerdown', function() {
    // Redémarrer la scène 'selection' lorsqu'on clique sur le bouton
    this.scene.start('selection');
}, this);

}

function toucher (bullet) {
  bullet.destroy(); 
 }

