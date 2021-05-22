/* global game */

var Technotip = {};

Technotip.Menu = function (game) {
	var floor;
	let lienzo;

	let archivoFX;
	let paintFX;
	let accesoriosFX;
	let herramientasFx;
};

Technotip.Menu.prototype = {
	init: function (datosLink) {},
	preload: function () {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;

		game.load.audio('instrucciones', 'audio/publicaciones.mp3');

		game.load.audio('sonGuion', 'audio/GUIÓN.mp3');
		game.load.audio('sonEscala', 'audio/ESCALA DE TIEMPO.mp3');
		game.load.audio('sonProyecto', 'audio/PROYECTO.mp3');
		game.load.audio('sonPelícula', 'audio/PELÍCULA.mp3');
		game.load.audio('sonMedia', 'audio/REPRODUCTOR DE WINDOWS MEDIA.mp3');

		game.load.image('fondo', 'img/diccionario_image_00007.bmp');
		game.load.image('esquina', 'img/esquina.png');
		game.load.image('botonSiguiente', 'img/botonSiguiente.png');
		game.load.image('letras', 'img/letras.png');
		game.load.image('niña', 'img/niña.png');
		game.load.image('niño', 'img/niño.png');
		game.load.image('bocina', 'img/bocina.png');
	},
	create: function () {
		this.instruFx = this.add.audio('instru', 1, false);
		this.archivoFX = this.add.audio('sonGuion', 1, false);
		this.paintFX = this.add.audio('sonEscala', 1, false);
		this.accesoriosFX = this.add.audio('sonProyecto', 1, false);
		this.herramientasFx = this.add.audio('sonPelícula', 1, false);
		this.mediaFx = this.add.audio('sonMedia', 1, false);

		/*Colocar fondo blanco*/
		this.game.stage.backgroundColor = '#ffffff';

		/*Codigo para el fondo*/
		fondo = game.add.sprite(0, 0, 'fondo');
		this.generaFondo(fondo);
		fondo.alpha = 0.1;

		esquina = game.add.image(140, 575, 'esquina');
		esquina.scale.setTo(1.4);

		niño = game.add.image(400, 645, 'niño');
		niño.anchor.setTo(0.5);

		niña = game.add.image(1020, 645, 'niña');
		niña.anchor.setTo(0.5);

		bocina = game.add.image(320, 700, 'bocina');
		bocina.anchor.setTo(2);
		bocina.scale.setTo(1.5);

		letras = game.add.image(150, 75, 'letras');
		letras.anchor.setTo(0.5);
		letras.scale.setTo(1.4);

		var lienzo2 = game.add.graphics(0, 0);
		lienzo2.beginFill(0x33ccff);
		lienzo2.drawRect(0, 0, 300, 800);
		lienzo2.endFill();
		lienzo2.alpha = 0.2;

		botonSiguiente = game.add.image(150, 650, 'botonSiguiente');
		botonSiguiente.anchor.setTo(0.5);
		botonSiguiente.scale.setTo(1.5);
		botonSiguiente.inputEnabled = true;
		botonSiguiente.events.onInputOver.add(over, this);
		botonSiguiente.events.onInputOut.add(out, this);
		botonSiguiente.events.onInputDown.add(this.termianr, this);

		archivo = game.add.text(150, 200, 'Guión', { fontSize: '17pt', fill: '#202020' });
		archivo.anchor.setTo(0.5);
		archivo.inputEnabled = true;
		archivo.events.onInputOver.add(over2, this);
		archivo.events.onInputOut.add(out2, this);
		archivo.key = 'fila';
		archivo.events.onInputDown.add(this.clickPalabras, this);

		paint = game.add.text(150, 250, 'Escala de tiempo', { fontSize: '17pt', fill: '#202020' });
		paint.anchor.setTo(0.5);
		paint.inputEnabled = true;
		paint.events.onInputOver.add(over2, this);
		paint.events.onInputOut.add(out2, this);
		paint.key = 'columnas';
		paint.events.onInputDown.add(this.clickPalabras, this);

		accesorios = game.add.text(150, 310, 'Proyecto', { fontSize: '17pt', fill: '#202020' });
		accesorios.anchor.setTo(0.5);
		accesorios.inputEnabled = true;
		accesorios.events.onInputOver.add(over2, this);
		accesorios.events.onInputOut.add(out2, this);
		accesorios.key = 'celdas';
		accesorios.events.onInputDown.add(this.clickPalabras, this);

		herramientas = game.add.text(150, 370, 'Película', { fontSize: '17pt', fill: '#202020' });
		herramientas.anchor.setTo(0.5);
		herramientas.inputEnabled = true;
		herramientas.events.onInputOver.add(over2, this);
		herramientas.events.onInputOut.add(out2, this);
		herramientas.key = 'datos';
		herramientas.events.onInputDown.add(this.clickPalabras, this);

		media = game.add.text(150, 430, 'Reproductor de\n Windows Media', {
			fontSize: '16pt',
			fill: '#202020',
		});
		media.anchor.setTo(0.5);
		media.inputEnabled = true;
		media.events.onInputOver.add(over2, this);
		media.events.onInputOut.add(out2, this);
		media.key = 'media';
		media.events.onInputDown.add(this.clickPalabras, this);

		function over(imagen) {
			imagen.scale.setTo(1.55, 1.55);

			//console.log(imagen.frameName+' | valor: '+imagen.valor);
			this.estoySobre = imagen;
		}
		function out(imagen) {
			//console.log(imagen.frameName);
			imagen.scale.setTo(1.5, 1.5);
			// this.estoySobre=null;
		}

		function over2(imagen) {
			imagen.scale.setTo(1.05, 1.05);
			imagen.setShadow(10, 10, 'rgba(255,0,0,1)', 15);
			//console.log(imagen.frameName+' | valor: '+imagen.valor);
			this.estoySobre = imagen;
		}
		function out2(imagen) {
			//console.log(imagen.frameName);
			imagen.scale.setTo(1, 1);
			imagen.setShadow(5, 5, 'rgba(0,0,0,0)', 15);
			// this.estoySobre=null;
		}

		lienzo = game.add.graphics(0, 0);
		lienzo.beginFill(0x00ffff);
		lienzo.drawRect(400, 130, 280, 70);
		lienzo.endFill();
		lienzo.alpha = 0;

		txtArchivo = game.add.text(420, 130, 'Guión', { fontSize: '40pt', fill: '#ffffff' });
		txtArchivo.setShadow(10, 10, 'rgba(0,0,0,0.3)', 15);
		txtArchivo.alpha = 0;

		txtDefinicion = game.add.text(
			400,
			230,
			'Texto útil para exponer los detalles necesarios para realizar un filme o \nprograma de radio televisión. ',
			{ fontSize: '15pt', fill: '#000000' }
		);
		txtDefinicion.setShadow(10, 10, 'rgba(0,0,0,0.3)', 15);
		txtDefinicion.alpha = 0;
	},
	/*Metodo update*/
	update: function () {},
	clickIconoBocina: function () {
		this.instruFx.play();
	},

	render: function () {},

	clickPalabras: function (n) {
		lienzo.kill();
		txtArchivo.kill();
		txtDefinicion.kill();

		if (n.key == 'fila') {
			lienzo = game.add.graphics(0, 0);
			lienzo.beginFill(0x00cccc);
			lienzo.drawRect(400, 130, 210, 70);
			lienzo.endFill();
			txtArchivo = game.add.text(420, 130, 'Guión', { fontSize: '40pt', fill: '#ffffff' });
			txtArchivo.setShadow(10, 10, 'rgba(0,0,0,0.3)', 15);

			this.archivoFX.play();
			this.accesoriosFX.stop();
			this.herramientasFx.stop();
			this.mediaFx.stop();
			this.paintFX.stop();

			txtDefinicion = game.add.text(
				400,
				230,
				'Texto útil para exponer los detalles necesarios para realizar un filme o \nprograma de radio televisión. ',
				{ fontSize: '15pt', fill: '#000000' }
			);
			txtDefinicion.setShadow(10, 10, 'rgba(0,0,0,0.3)', 15);
		} else if (n.key == 'columnas') {
			lienzo = game.add.graphics(0, 0);
			lienzo.beginFill(0x00cccc);
			lienzo.drawRect(400, 130, 490, 70);
			lienzo.endFill();

			txtArchivo = game.add.text(420, 130, 'Escala de tiempo', {
				fontSize: '40pt',
				fill: '#ffffff',
			});
			txtArchivo.setShadow(10, 10, 'rgba(0,0,0,0.3)', 15);

			this.archivoFX.stop();
			this.accesoriosFX.stop();
			this.herramientasFx.stop();
			this.mediaFx.stop();

			this.paintFX.play();

			txtDefinicion = game.add.text(
				400,
				230,
				'Muestra una vista más detallada del proyecto de \npelícula y permite realizar ediciones: recortar clips, ajustar  \nla duración de las transiciones entre clip y ver la pista de audio.',
				{ fontSize: '15pt', fill: '#000000' }
			);
			txtDefinicion.setShadow(10, 10, 'rgba(0,0,0,0.3)', 15);
		} else if (n.key == 'celdas') {
			lienzo = game.add.graphics(0, 0);
			lienzo.beginFill(0x00cccc);
			lienzo.drawRect(400, 130, 270, 55);
			lienzo.endFill();

			txtArchivo = game.add.text(420, 130, 'Proyecto', { fontSize: '40pt', fill: '#ffffff' });
			txtArchivo.setShadow(10, 10, 'rgba(0,0,0,0.3)', 15);

			this.archivoFX.stop();
			this.accesoriosFX.play();
			this.herramientasFx.stop();
			this.mediaFx.stop();
			this.paintFX.stop();

			txtDefinicion = game.add.text(
				400,
				230,
				'Cuando guardas un video como proyecto puedes abrirlo \ny hacerle cambios.\nLa extensión del archivo es .mswmm.',
				{ fontSize: '15pt', fill: '#000000' }
			);
			txtDefinicion.setShadow(10, 10, 'rgba(0,0,0,0.3)', 15);
		} else if (n.key == 'datos') {
			lienzo = game.add.graphics(0, 0);
			lienzo.beginFill(0x00cccc);
			lienzo.drawRect(400, 130, 250, 70);
			lienzo.endFill();

			txtArchivo = game.add.text(420, 130, 'Película', { fontSize: '40pt', fill: '#ffffff' });
			txtArchivo.setShadow(10, 10, 'rgba(0,0,0,0.3)', 15);

			this.archivoFX.stop();
			this.accesoriosFX.stop();
			this.herramientasFx.play();
			this.mediaFx.stop();
			this.paintFX.stop();

			txtDefinicion = game.add.text(
				400,
				230,
				'Cuando guardas un vídeo como película se podrá proyectar en cualquier\nequipo y ya no se puede volver a editar.\nLa extensión del archivo es .wmv. ',
				{ fontSize: '15pt', fill: '#000000' }
			);
			txtDefinicion.setShadow(10, 10, 'rgba(0,0,0,0.3)', 15);
		} else if (n.key == 'media') {
			lienzo = game.add.graphics(0, 0);
			lienzo.beginFill(0x00cccc);
			lienzo.drawRect(400, 130, 650, 70);
			lienzo.endFill();

			txtArchivo = game.add.text(420, 130, 'Reproductor de Windows Media', {
				fontSize: '30pt',
				fill: '#ffffff',
			});
			txtArchivo.setShadow(10, 10, 'rgba(0,0,0,0.3)', 15);

			this.archivoFX.stop();
			this.accesoriosFX.stop();
			this.herramientasFx.stop();
			this.mediaFx.play();
			this.paintFX.stop();

			txtDefinicion = game.add.text(
				400,
				230,
				'Es un reproductor multimedia creado por la empresa Microsoft para el \nsistema operativo Microsoft Windows está incluido en Windows Vista y 7.\nPermite reproducir diversos formatos digitales.',
				{ fontSize: '15pt', fill: '#000000' }
			);
			txtDefinicion.setShadow(10, 10, 'rgba(0,0,0,0.3)', 15);
		}
	},

	numeroAleatorio: function (min, max) {
		return Math.round(Math.random() * (max - min) + min);
	},
	generaFondo: function (imagen) {
		//imagen = game.add.sprite(0,0,'fondo');
		imagen.height = game.height;
		imagen.width = game.width;
		imagen.anchor.x = 0.5;
		imagen.anchor.y = 0.5;
		imagen.x = game.width * 0.5;
		imagen.y = game.height * 0.5;
	},
	numeroAleatorio3: function (de) {
		return Math.floor(Math.random() * de);
	},

	onStart: function () {
		let numero = this.numeroAleatorio3(3);

		if (numero == 0) {
			this.bueno1FX.play();
		}
		if (numero == 1) {
			this.bueno2FX.play();
		}
		if (numero == 2) {
			this.bueno3FX.play();
		}
		if (numero == 3) {
			this.bueno4FX.play();
		}
	},

	termianr: function () {
		this.archivoFX.stop();
		this.accesoriosFX.stop();
		this.herramientasFx.stop();
		this.mediaFx.stop();
		this.paintFX.stop();

		game.state.start('basico', true, false, this.datosSeccionAnterior);
	},
};
