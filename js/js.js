//Codigo del menu superior

//Ejecutamos esta funciona cuando se realice la funcion de scroll pasando la referencia del elemento
const onLoadMenuRef = document.getElementsByTagName("nav")[0]
window.onscroll = function() { topMenuFunc(onLoadMenuRef); };

function topMenuFunc(menuRef) {
    //establecemos la altura a la que el menu debe encogerse
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        menuRef.style.height = "calc(var(--menu-height) * 0.5)";
    } else {
        menuRef.style.height = "var(--menu-height)";
    }
}



//Codigo para funciones de pesta;as

//Creamos un array con referencia a todas las pesta;as
const tabs = document.querySelectorAll('.store-tab');

//creamos un array con referencia a todas las instancias de la tienda
const storeRows = document.querySelectorAll('.store-row');

//realizamos operaciones sobre todas las pesta;as
tabs.forEach(tab => {

    //guardamos el id de la pesta;a actual en el loop
    let currentId = tab.id;

    //a;adimos un eventlistener a cada una de las pesta;as
    tab.addEventListener('click', () => {
        //Eliminimaos la clase active-tab de todas las pesta;as
        tabs.forEach(tab => {
            tab.classList.remove('active-tab');
        })

        //activamos la clase active-tab sobre la pesta;a clickada
        document.getElementById(currentId).classList.add('active-tab');

        //cambiamos la clase de todos los containers de tienda a la clase por defecto, oculta
        storeRows.forEach(store => { store.classList.remove('store-active') })

        //a;adimos la clase store-active sobre el id de la pesta;a seleccionada (las id tienen que formatearse como store- + el id de la pesta;a)
        document.getElementById('store-' + currentId).classList.add('store-active');
    });
})






//Codigo LightBox Galeria

//ref a la imagen del lb
const lbImg = document.getElementById('lbImg');


//crea la funcion de volver al clickar en el fondo.
document.getElementById('galleryLightbox').addEventListener('click', (e) => {
    if (!e.target.matches('#lbImg') && !e.target.matches('#lbPrev') && !e.target.matches('#lbNext')) {
        document.getElementById('galleryLightbox').style.display = 'none';
        document.documentElement.style.overflow = 'auto';
    }
})


//Array con todas las sources de las imagenes
const galleryImgSrc = []

//Metemos todas las sources de las imagenes en el array y les a;adimos en event listener
document.querySelectorAll('.galeriaImg').forEach(img => {
    galleryImgSrc.push(img.src);
    //a;adimos un click listener a todas las imagenes
    //Nota, event parece que esta deprecado asi que tenemos que pasar el parametro dentro de una funcion
    img.addEventListener('click', (e) => galleryLB(e));
})

//a;adimos event listener a las flechas pasando valor falso para previo y true para next
document.getElementById('lbPrev').addEventListener('click', () => changeImg(false));
document.getElementById('lbNext').addEventListener('click', () => changeImg(true));

//referencia al index actual
var currentLightboxIndex = 0;



function galleryLB(e) {
    //muestra el modal de lightbox
    document.getElementById('galleryLightbox').style.display = 'block';
    //previene el scrolling en la pagina
    document.documentElement.style.overflow = 'hidden';
    //Mostramos la imagen en pantalla
    lbImg.src(e.currentTarget.src);
    //Almacenamos el indice de la imagen
    currentLightboxIndex = galleryImgSrc.indexOf(e.currentTarget.src);
}


//Funcion para cambiar de imagen
function changeImg(current) {
    //si el parametro es true significa que hemos pulsado next
    if (current) {
        //Aumentamos el valor del indice en uno
        currentLightboxIndex++;
        //Comprobamos que el indice no sobrepasa la longitud del array de imagenes, en caso de hacerlo lo reseteamos a 0
        if (currentLightboxIndex >= galleryImgSrc.length) {
            currentLightboxIndex = 0;
        }
    } else {
        //Aumentamos el valor del indice en uno
        currentLightboxIndex--;
        //Comprobamos que el indice no es inferior a 0, en caso contraro le asignamos el indice correspondiente a la lojngitud del array -1 porque los arrays comienza en 0
        if (currentLightboxIndex < 0) {
            currentLightboxIndex = galleryImgSrc.length - 1;
        }
    }
    //finalmente aplicamos la imagen basada en el indice que hemos procesado
    lbImg.src = galleryImgSrc[currentLightboxIndex];
}



//Codigo Modal de Contacto

//Referencia a los elementos del modal
const contactMod = document.getElementById('modalContacto');
const contactModTitle = document.getElementById('modalContactoTitulo');
const contactModMsg = document.getElementById('modalContactoMensaje');
//Referencia a los elementos del formulario
const formName = document.getElementById("formName");
const formMail = document.getElementById("formMail");
const formText = document.getElementById("formText");

//Muestra el modal  de contacto
function showFormModal() {
    contactMod.style.display = 'block';
    //previene el scrolling en la pagina
    document.documentElement.style.overflow = 'hidden';
    //Inicia la validacion
    formCheck();

}

//Realiza validacion de datos
function formCheck() {
    if (!formName.checkValidity()) {
        formatFormModal(true, 'Nombre incorrecto');
        return;
    } else if (!formMail.checkValidity()) {
        formatFormModal(true, 'Mail incorrecto');
        return;
    } else if (!formText.checkValidity()) {
        formatFormModal(true, 'Mensaje incorrecto');
        return;
    } else {
        //En caso de superar las pruebas se ejecuta el codigo de confirmarcion
        formatFormModal(false, '');
    }
}

//Formateo del modal del formulario teniendo en cuenta la validacion de datos.
function formatFormModal(error, msg) {
    if (error) {
        contactModTitle.innerHTML = 'Error';
        contactModMsg.innerHTML = msg;
    } else {
        contactModTitle.innerHTML = 'Mensaje Recibido';
        contactModMsg.innerHTML = 'Gracias ' + formName.value + ' en breve nos pondremos en contacto a traves de la direccion : ' + formMail.value;
    }
}

//Oculta el modal  de contacto
function closeFormModal() {
    contactMod.style.display = 'none';
    //reactiva el scrolling en la pagina
    document.documentElement.style.overflow = 'auto';
    //resetea los valores del formulario
    formName.value = '';
    formMail.value = '';
    formText.value = '';
}





//Funcion especial de automatizacion de etiquetas de aos
//Codigos de automatizacion de AOS
//creamos un contador para multiplicar el delay de la carga de imagenes
let offsetCounter = 1;
//Seleccionamos todas las imagenes y por cada una a;adimos los atributos para que automaticamente asigne un valor diferente a cada imagen
document.querySelectorAll('.galeriaImg').forEach(img => {
    img.setAttribute('data-aos', 'fade-up');
    img.setAttribute('data-aos-delay', 50 * offsetCounter);
    //incrementamos el contador para la siguiente imagen
    offsetCounter++;
});