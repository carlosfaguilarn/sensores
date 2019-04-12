var five = require("johnny-five"), board, photoresistor;
board = new five.Board();

var NIVEL_LUZ;
var NIVEL_HUMEDAD;

// Método que se ejecuta una vez al iniciar
board.on("ready", function() {
    // LED configurado en el puerto 8 
    var led = new five.Led(8);

    photoresistor = new five.Sensor({
        pin: "A1",  // Objeto del fotoresistor, puerto 1 análogo
        freq: 250
    });

    board.repl.inject({
        pot: photoresistor,  // Injectar los controladores a la instancia jhonny five
        led: led
    });

    photoresistor.on("data", function() { 
        //valor de la humedad
        var NIVEL_HUMEDAD = this.value;

        // Hay que modificar esta condición porque el sensor no es exacto
        if(this.value > 1021){
            led.on(); 
        }else{
            led.off();
        }
    });
});        