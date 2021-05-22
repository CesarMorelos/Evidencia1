/* global game */

Technotip.Basico = function (game) {
	//-------variables template------
	var navegacion_grupo;
	var datosSeccionAnterior;
	//-----template audios-----
	var correctFx;

	var tadaFx;

	this.words = [
		'tiempo',
		'windows',
		'proyecto',
		'escala',
		'película',
		'media',
		'guión',
		'reproductor',
	];

	this.letters = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'É',
		'F',
		'G',
		'H',
		'I',
		'Í',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'Ó',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z',
	];

	this.puzzle = null;
	this.solution = null;

	this.wordList = {};

	this.puzzleWidth = -1;
	this.puzzleHeight = -1;

	this.tileWidth = 100;
	this.tileHeight = 100;

	this.drawLineColor = 0xff0033;
	this.drawLineAlpha = 0.6;
	this.drawLineThickness = 26;

	this.highlightTint = 0xff6666;

	this.drawLine = null;

	this.isSelecting = false;
	this.firstLetter = null;
	this.endLetter = null;
	this.foundWords = [];
};

Technotip.Basico.prototype = {
	init: function (datosLink) {
		this.datosSeccionAnterior = datosLink;
	},
	preload: function () {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		//this.load.script('wordfind', 'libs/wordfind.js');

		var rutaAssets = 'assets/images/secciones/actividades/b4l21a2/';
		//----------------------

		game.load.image('nivel', 'img/nivel1.png');
		game.load.image('felicidades', 'img/felicidades.png');
		game.load.audio('tada', 'assets/audios/tada.mp3');
		game.load.image('fondo', 'img/diccionario_image_00007.bmp');
		game.load.image('esquina', 'img/esquina.png');
		game.load.image('fon', 'img/nivel1.png');
		//game.load.atlasJSONHash('images',rutaAssets+'b4l21a2.png',rutaAssets+'b4l21a2.json');
		//imagenes de la retroalimentacion

		//----------------------
		this.load.path = 'img/';

		//this.load.bitmapFont('azo');

		var _this = this;

		this.letters.forEach(function (letter) {
			_this.load.spritesheet(
				letter.toLowerCase(),
				letter + '.png',
				_this.tileWidth,
				_this.tileHeight
			);
		});
	},
	create: function () {
		console.log(this.letters);
		/*Colocar fondo blanco*/
		this.game.stage.backgroundColor = '#ffffff';

		/*Codigo para el fondo*/
		fondo = game.add.sprite(0, 0, 'fondo');
		this.generaFondo(fondo);
		fondo.alpha = 0.1;

		txtInstrucion = game.add.text(150, 10, 'Encuentra las palabras en la sopa de letras.', {
			fontSize: '20pt',
			fill: '#303030',
		});
		txtInstrucion.setShadow(10, 10, 'rgba(0,0,0,0.3)', 15);

		esquina = game.add.image(140, 575, 'esquina');
		esquina.scale.setTo(1.4);

		fon = game.add.image(84, -15, 'fon');
		fon.scale.setTo(1.1, 1.1);

		var lienzo3 = game.add.graphics(0, 0);
		lienzo3.beginFill(0x33ccff);
		lienzo3.drawRect(0, 0, 1300, 70);
		lienzo3.endFill();
		lienzo3.alpha = 0.2;

		// var coloresFondo=['#9ACD32','#FFA500','#1E90FF','#DC143C','#20B2AA','#8FBC8F','#663399','#BA55D3','#F4A460','#FF4500','#6A5ACD','#ADFF2F','#228B22'];
		// this.game.stage.backgroundColor = coloresFondo[Math.floor((Math.random() * coloresFondo.length) )];//"#051efa";
		// fondo = game.add.sprite(0,0,'nivel');
		// this.generaFondo(fondo);

		//  Generate a new Word Search puzzle, and store the size of it.

		if (this.puzzleWidth !== -1) {
			this.puzzle = wordfind.newPuzzle(this.words, { width: 14, height: 14 }, 14);
		} else {
			this.puzzle = wordfind.newPuzzle(this.words, { width: 14, height: 14 }, 14);
			this.puzzleWidth = this.puzzle[0].length;
			this.puzzleHeight = this.puzzle.length;
		}

		var solution = wordfind.solve(this.puzzle, this.words);

		this.solution = solution.found;

		var x = 0;
		var y = 0;
		var _this = this;

		this.grid = this.add.group();
		this.grid.inputEnableChildren = true;

		this.puzzle.forEach(function (row) {
			row.forEach(function (letter) {
				var tile = _this.grid.create(x, y, letter, 0);

				tile.data.row = x / _this.tileWidth;
				tile.data.column = y / _this.tileHeight;
				tile.data.words = {};
				tile.data.letter = letter;
				tile.data.startWord = false;

				tile.events.onInputDown.add(_this.startLetterSelect, _this);
				tile.events.onInputUp.add(_this.stopLetterSelect, _this);
				tile.events.onInputOver.add(_this.overLetter, _this);
				tile.events.onInputOut.add(_this.outLetter, _this);

				x += _this.tileWidth;
			});

			x = 0;
			y += _this.tileHeight;
		});

		//  Flag all of the starting letters in the grid
		this.solution.forEach(function (entry) {
			//  Based on the grid position we can get the tile index
			var index = entry.y * _this.puzzleWidth + entry.x;

			var tile = _this.grid.getChildAt(index);

			tile.data.startWord = true;
			tile.data.words[entry.word] = {
				orientation: entry.orientation,
				length: entry.word.length,
			};
		});

		this.grid.x = game.world.centerX - 470; //50;
		this.grid.y = game.world.centerY - 300; //50;
		this.grid.width = 600;
		this.grid.height = 580;

		y = this.grid.y + 100; //10;
		var posXwordInList = this.grid.x + this.grid.width + 300;

		this.solution.forEach(function (entry) {
			_this.wordList[entry.word] = _this.add.text(500, y, entry.word, 28);
			_this.wordList[entry.word].right = posXwordInList; //780;
			y += 28;
		});

		this.drawLine = this.add.graphics(0, 0);

		this.input.addMoveCallback(this.updateDrawLine, this);

		//------template Audios----------------

		this.tadaFx = this.add.audio('tada', 1, false);
		//----------cierra Template audios-------------
		//  fondo = game.add.sprite(0,0,'fondo');
		//this.generaFondo(fondo);
		this.puntosAcumulados = 0;
		//this.dibujaPantalla();
	},

	updateDrawLine: function (pointer, x, y) {
		if (!this.isSelecting) {
			return;
		}

		this.drawLine.clear();

		this.drawLine.lineStyle(this.drawLineThickness, this.drawLineColor, this.drawLineAlpha);

		var tw = (this.tileWidth * this.firstLetter.worldScale.x) / 2;
		var th = (this.tileHeight * this.firstLetter.worldScale.y) / 2;

		this.drawLine.moveTo(
			this.firstLetter.worldPosition.x + tw,
			this.firstLetter.worldPosition.y + th
		);

		this.drawLine.lineTo(x, y);
	},

	/**
	 * Called when the mouse is pressed down on any of the letter tiles.
	 */
	startLetterSelect: function (letter) {
		this.isSelecting = true;

		this.firstLetter = letter;
	},

	/**
	 * Called when the mouse is released from any of the letter tiles.
	 * This performs all of the core checks in terms of if they've selected
	 * a full word, won the game, etc.
	 */
	stopLetterSelect: function (letter) {
		this.isSelecting = false;

		//  Let's check to see if they selected an actual word :)
		if (
			this.firstLetter &&
			this.endLetter &&
			this.firstLetter !== this.endLetter &&
			(this.firstLetter.data.startWord || this.endLetter.data.startWord) &&
			this.checkLetterAlignment(this.endLetter)
		) {
			var result = this.checkSelectedLetters();

			if (result) {
				this.highlightCorrectWord(result);
				this.foundWords.push(result.word);
				//this.correctFx.play();
			}

			//  Check word list, game won?
			if (this.foundWords.length === this.solution.length) {
				this.gameWon();
			}
		}

		this.grid.setAll('frame', 0);

		this.clearLine();
	},

	/**
	 * Clears the selection line, and resets the first and last letters.
	 */
	clearLine: function () {
		this.firstLetter = false;
		this.endLetter = null;

		this.drawLine.clear();
	},

	/**
	 * Called from within stopLetterSelect and both tints the BitmapText word
	 * on the right-hand side, and also tints each tile that was matched.
	 *
	 * If you're going to use a different kind of effect, then you probably want
	 * to edit or skip most of this function.
	 */
	highlightCorrectWord: function (result) {
		var _this = this;

		//  result contains the sprites of the letters, the word, etc.
		//this.wordList[result.word].tint = this.highlightTint;
		this.wordList[result.word].alpha = 0.3;
		result.letters.forEach(function (letter) {
			letter.tint = _this.highlightTint;
		});
	},

	/**
	 * Called by the letter tile input handler when it is moused over.
	 * In short, it checks if it should swap frame or not.
	 */
	overLetter: function (letter) {
		if (this.isSelecting) {
			if (this.checkLetterAlignment(letter)) {
				this.endLetter = letter;

				//  Highlight the tiles below the line (if any)
				var selection = this.getSelectedLetters();

				if (selection && selection.letters.length > 0) {
					this.grid.setAll('frame', 0);

					selection.letters.forEach(function (sprite) {
						sprite.frame = 1;
					});
				}
			}
		} else {
			letter.frame = 1;
		}
	},

	/**
	 * Swaps the letter frame back, if not in selecting mode.
	 */
	outLetter: function (letter) {
		if (!this.isSelecting) {
			letter.frame = 0;
		}
	},

	/**
	 * Called once all words have been found.
	 */
	gameWon: function () {
		//  They've matched every word!
		this.lanzaEstrella();
	},

	//  From this point on, all of the functions deal with checking the letters,
	//  getting selected letters, and checking for word matching. There is no
	//  display related code in any of the following, it's all game logic.

	checkLetterAlignment: function (letter) {
		var startRow = this.firstLetter.data.row;
		var startColumn = this.firstLetter.data.column;
		var endRow = letter.data.row;
		var endColumn = letter.data.column;

		return (
			startColumn === endColumn ||
			startRow === endRow ||
			Math.abs(endColumn - startColumn) === Math.abs(endRow - startRow)
		);
	},

	getLetterAt: function (row, column) {
		var index = column * this.puzzleWidth + row;

		return this.grid.getChildAt(index);
	},

	getSelectedLetters: function () {
		if (!this.firstLetter || !this.endLetter || this.endLetter === this.firstLetter) {
			return false;
		}

		var first = this.firstLetter.data;
		var last = this.endLetter.data;
		var tile;
		var letters = [];
		var selectedWord = '';
		var x, y, top, bottom, left, right;

		//  Let's get all the letters between the first and end letters

		if (first.row === last.row) {
			//  Vertical grab

			top = Math.min(first.column, last.column);
			bottom = Math.max(first.column, last.column);

			for (y = top; y <= bottom; y++) {
				tile = this.getLetterAt(first.row, y);
				letters.push(tile);
				selectedWord = selectedWord.concat(tile.data.letter);
			}
		} else if (first.column === last.column) {
			//  Horizontal grab

			left = Math.min(first.row, last.row);
			right = Math.max(first.row, last.row);

			for (x = left; x <= right; x++) {
				tile = this.getLetterAt(x, first.column);
				letters.push(tile);
				selectedWord = selectedWord.concat(tile.data.letter);
			}
		} else {
			top = Math.min(first.column, last.column);
			bottom = Math.max(first.column, last.column);
			left = Math.min(first.row, last.row);
			right = Math.max(first.row, last.row);

			if (first.column > last.column && first.row < last.row) {
				//  Diagonal NE grab (up and from left to right)
				y = bottom;

				for (x = left; x <= right; x++) {
					tile = this.getLetterAt(x, y);
					letters.push(tile);
					selectedWord = selectedWord.concat(tile.data.letter);
					y--;
				}
			} else if (first.column < last.column && first.row < last.row) {
				//  Diagonal SE grab (down and from left to right)
				y = top;

				for (x = left; x <= right; x++) {
					tile = this.getLetterAt(x, y);
					letters.push(tile);
					selectedWord = selectedWord.concat(tile.data.letter);
					y++;
				}
			} else if (first.column < last.column && first.row > last.row) {
				//  Diagonal SW grab (down and from right to left)
				y = top;

				for (x = right; x >= left; x--) {
					tile = this.getLetterAt(x, y);
					letters.push(tile);
					selectedWord = selectedWord.concat(tile.data.letter);
					y++;
				}
			} else if (first.column > last.column && first.row > last.row) {
				//  Diagonal NW grab (up and from right to left)
				y = bottom;

				for (x = right; x >= left; x--) {
					tile = this.getLetterAt(x, y);
					letters.push(tile);
					selectedWord = selectedWord.concat(tile.data.letter);
					y--;
				}
			} else {
				return false;
			}
		}

		return {
			word: selectedWord,
			inverse: Phaser.Utils.reverseString(selectedWord),
			letters: letters,
		};
	},

	checkSelectedLetters: function () {
		var selection = this.getSelectedLetters();

		if (selection) {
			//  It's possible that a single letter could start multiple words in different directions:
			//
			//  cow..
			//  a....
			//  r....

			var starter = this.firstLetter.data.startWord
				? this.firstLetter.data
				: this.endLetter.data;

			for (var word in starter.words) {
				if (word === selection.word || word === selection.inverse) {
					return { word: word, letters: selection.letters };
				}
			}
		}

		return false;
	},

	//------------------

	generaFondo: function (imagen) {
		//imagen = game.add.sprite(0,0,'fondo');
		imagen.height = game.height + 100;
		imagen.width = game.width + 100;
		imagen.anchor.x = 0.5;
		imagen.anchor.y = 0.5;
		imagen.x = game.width * 0.5;
		imagen.y = game.height * 0.5;
	},
	onClickRegresar: function () {
		//game.bloque=1;
		//this.state.start('Menu');

		this.game.state.start('Menu');
	},
	onClicReiniciar: function () {
		this.cancelaUpdate = false;
		this.state.start('b4l23a1', true, false, this.datosSeccionAnterior);
	},
	/*onClickInicio:function(){
        this.cancelaUpdate=false;
        game.bloque=0;
        this.state.start('Menu');
    },*/
	agregaGrupoNavegacion: function () {
		// ----------UNO----- Abre CODIGO para quitar flecha atras---SOLO EN MENU JUEGOS-----
		if (this.datosSeccionAnterior == null) {
			console.log('solo juegos');
		} else {
			regresar = game.add.sprite(
				game.width - regresar.width,
				game.height - regresar.height * 0.5,
				'regresar'
			);
			this.ajustaImagen(regresar);
			regresar.inputEnabled = true;
			regresar.input.useHandCursor = true;
			regresar.events.onInputDown.add(this.onClickRegresar, this);
		}
		// ----------UNO----- CIERRA CODIGO para quitar flecha atras---SOLO EN MENU JUEGOS-----

		inicio = game.add.sprite(regresar.x - (regresar.width + 20), regresar.y, 'inicio');
		this.ajustaImagen(inicio);
		inicio.inputEnabled = true;
		inicio.input.useHandCursor = true;
		inicio.events.onInputDown.add(this.onClickInicio, this);

		reiniciar = game.add.sprite(inicio.x - (inicio.width + 20), inicio.y, 'reiniciar');
		this.ajustaImagen(reiniciar);
		reiniciar.inputEnabled = true;
		reiniciar.input.useHandCursor = true;
		reiniciar.events.onInputDown.add(this.onClicReiniciar, this);

		this.navegacion_grupo = game.add.group();
		this.navegacion_grupo.add(regresar);
		this.navegacion_grupo.add(inicio);
		this.navegacion_grupo.add(reiniciar);
		this.navegacion_grupo.add(reiniciar);
	},
	ajustaImagen: function (imagen) {
		imagen.width = imagen.width * 3;
		imagen.heiht = imagen.height * 3;
		imagen.scale.setTo(1, 1);
		imagen.anchor.setTo(0.5, 0.5); // anchor x y;
	},
	lanzaEstrella: function () {
		var delay = 500;
		this.estrella = game.add.sprite(game.width * 0.5, game.height * 0.5, 'felicidades');
		this.ajustaImagen(this.estrella);
		this.estrella.scale.setTo(0, 0);
		this.estrella.x = game.width * 0.5;
		this.estrella.y = game.height * 0.5;
		var miTween = game.add
			.tween(this.estrella.scale)
			.to({ x: 1.5, y: 1.5 }, 1000, Phaser.Easing.Bounce.Out, true, delay);
		miTween.onStart.add(this.onStart, this);
		setTimeout(this.onClickRegresar, 5000);
	},
	onStart: function () {
		this.tadaFx.play();
	},
};
