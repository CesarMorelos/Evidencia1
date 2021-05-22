var ancho = 1200;
var alto = 800;

var game = new Phaser.Game(ancho, alto, Phaser.AUTO, '');

game.bloque = 0;
game.tema = 0;

game.PhaserWebComponents;
game.nameData = []; // nombres de las armaduras dragonBones
//-------------------Menu------------
game.state.add('Menu', Technotip.Menu);

game.state.add('Preactividad', Technotip.Preactividad);

//---------Actividades-----------------------
game.state.add('basico', Technotip.Basico);
game.state.add('medio', Technotip.Medio);
game.state.add('avanzado', Technotip.Avanzado);
game.state.start('Menu');
