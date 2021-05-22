const remote = require('electron').remote || undefined;

  function minimizaApp() {
       var window = remote.getCurrentWindow();
       window.minimize(); 
  };

   function maximizaApp() {
       var window = remote.getCurrentWindow();
       if (!window.isMaximized()) {
           window.maximize();          
       } else {
           window.unmaximize();
       }
  };

 function cierraApp() {
       var window = remote.getCurrentWindow();
       window.close();
  };

  function isElectron() { return (typeof process !== "undefined") && process.versions && (process.versions.electron !== undefined); };

  function muestraBotonCerrar(){
    console.log("HOLAAAA")
    if(!isElectron ()|| remote==undefined){
      var miBoton = document.getElementById("cerrarApp");
      miBoton.style.display = "none";
    }
  } 