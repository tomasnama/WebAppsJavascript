var app={
    inicio: function() {
        this.iniciaBotones();
        this.iniciaFastClick();
    },
    
    iniciaBotones: function() {
        var botonClaro = document.querySelector('#claro');
        var botonOscuro = document.querySelector('#oscuro');
        botonClaro.addEventListener('click', app.ponloClaro, false);
        botonOscuro.addEventListener('click', app.ponloOscuro, false);
    },
    
    iniciaFastClick: function() {
        FastClick.attach(document.body);
    },
    
    ponloClaro: function() {
        document.body.className = 'claro';
    },
    
    ponloOscuro: function() {
        document.body.className = 'oscuro';
    }
     
};


if ('addEventLister' in document){
    document.addEventListener('DOMContentLoaded', function() {
        app.inicio();
    }, false);
}

app.inicio();

