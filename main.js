//Service worker
if('serviceWorker' in navigator){
    console.log('Puedes usar los serviceWorker del navegador');

    navigator.serviceWorker.register('./sw.js')
                            .then(res => console.log('serviceWorker cargado correctamente', res))
                            .catch(err => console.log('serviceWorker no se ha podido registrar', err))
} else {
    console.log('NO Puedes usar los serviceWorker del navegador');
}

// scroll suavizado
$(document).ready(function(){
    $("#menu a").click(function(e){
        //Cancela el vento si este se cancelable
        e.preventDefault();
        //animate es un metodo de instancia crea una nueva animacion
        $("html, body").animate({
            //establece el numero de pixeles que el contenido 
            scrollTop: $($(this).attr('href')).offset().top
        });
        return false;
    });
});