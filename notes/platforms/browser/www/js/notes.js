var app = {
    
    model: { 
        "notas": [{"titulo": "Comprar pan", "contenido": "Oferta en la panaderia de la esquina"}]
    },

    inicio: function () {
        this.iniciaFastClick();
        this.iniciaBotones();
        this.refrescarLista();
    },

    iniciaFastClick: function () {
        FastClick.attach(document.body);
    },

    iniciaBotones: function () {
        var salvar = document.querySelector('#salvar');
        var anadir = document.querySelector('#anadir');

        anadir.addEventListener('click', this.mostrarEditor, false);
        salvar.addEventListener('click', this.salvarNota, false);
    },
    
    mostrarEditor: function () {
        document.getElementById('titulo').value = "";
        document.getElementById('comentario').value = "";
        document.getElementById("note-editor").style.display = "block";
        document.getElementById('titulo').focus();
    },

    salvarNota: function () {
        app.construirNota();
        app.ocultarEditor();
        app.refrescarLista();
        app.grabarDatos();
    },
    
    construirNota: function () {
        var notas = app.model.notas;
        notas.push({"titulo": app.extraerTitulo(), "contenido": app.extraerComentario()});
    },

    extraerTitulo: function () {
        return document.getElementById('titulo').value;
    },

    extraerComentario: function () {
        return document.getElementById('comentario').value;
    },

    ocultarEditor: function () {
        document.getElementById("note-editor").style.display = "none";
    },

    refrescarLista: function () {
        var div = document.getElementById('notes-list');
        div.innerHTML = this.anadirNotasALista();
    },

    anadirNotasALista: function () {
        var notas = this.model.notas;
        var notasDivs = '';
        for (var i in notas) {
            var titulo = notas[i].titulo;
            notasDivs = notasDivs + this.anadirNota(i, titulo);
        }
        return notasDivs;
    },

    anadirNota: function (id, titulo) {
        return "<div class='note-item' id='notas[" + id + "]'>" + titulo + "</div>";
    },

    grabarDatos: function () {
        console.log("grabarDatos");
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, this.gotFS, this.fail);
    },
    
    gotFS: function (fileSystem) {
        fileSystem.getFile("files/" + "model.json", {create: true, exclusive: false}, app.gotFileEntry, app.fail);
    },
    
    gotFileEntry: function (fileEntry) {
        fileEntry.createWriter(app.gotFileWriter, app.fail);
    },
    
    gotFileWriter: function (writer) {
        writer.onwriteend = function (evt) {
            console.log("datos grabados en externalApplicationStorageDirectory");
        };
        writer.write(JSON.stringify(app.model));
    }, 

    leerDatos: function () { 
        console.log("leerDatos");
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, this.obtenerFS, this.fail);
    },

    obtenerFS: function (fileSystem) {
        fileSystem.getFile("files/" + "model.json", null, app.obtenerFileEntry, app.noFile);
    },

    obtenerFileEntry: function (fileEntry) {
        fileEntry.file(app.leerFile, app.fail);
    },

    leerFile: function (file) {
        var reader = new FileReader();
        reader.onloadend = function (evt) {
            var data = evt.target.result;
            app.inicio();
        };
        reader.readAsText(file);
    },

    noFile: function (error) {
        console.log("Error code: "+error.code);
        app.inicio();
    },

    fail: function (error) {
        console.log("Error code: "+error.code);
    }

}

if ('addEventListener' in document) {
    document.addEventListener("deviceready", function () {
        app.leerDatos();
    }, false);
}
;