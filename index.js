var five = require("johnny-five"), board, photoresistor, proximity, led;
board = new five.Board();

var NIVEL_LUZ = 0;
var NIVEL_HUMEDAD = 0;
var PROXIMIDAD_CM = 0;
var PROXIMIDAD_PULGADAS = 0;

// Método que se ejecuta una vez al iniciar
board.on("ready", function() {
    // LED configurado en el puerto 8 
    led = new five.Led(8);
    proximity = new five.Proximity({controller: "HCSR05", pin: 7});
    photoresistor = new five.Sensor({
        pin: "A1",  // Objeto del fotoresistor, puerto 1 análogo
        freq: 250
    }); 
    board.repl.inject({
        pot: photoresistor,  //Injectar los controladores a la instancia jhonny five
        led: led,
        prox: proximity
    });
    proximity.on("data", function(){
        PROXIMIDAD_CM = this.cm;
        PROXIMIDAD_PULGADAS = this.in;
        if(PROXIMIDAD_CM < 10){
            led.on();
        }else{
            led.on();
        }
        console.log(PROXIMIDAD_CM); 
    });
    photoresistor.on("data", function() { 
        //valor de la humedad
        var NIVEL_HUMEDAD = this.value;
        // Hay que modificar esta condición porque el sensor no es exacto
        if(NIVEL_HUMEDAD > 1021){
            led.on(); 
        }else{
            led.off();
        }
        Console.log(NIVEL_HUMEDAD);
    });
});        