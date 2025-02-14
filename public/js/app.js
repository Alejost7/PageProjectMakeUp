const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");
const sliderNone = document.querySelector('.logoImg');
const especial = document.querySelector('.mensajeEspecial');
const menuItem = document.querySelector('.menuItem');

/**Esta función es para mostrar las secciones que necesito, se agrega una animación de opacidad al cargar las secciones */
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('show');
        section.style.display = 'none';
    });

    const sectionToShow = document.getElementById(sectionId);
    sectionToShow.style.display = 'block';
    setTimeout(() => {
        sectionToShow.classList.add('show');
    }, 10);

    const sliderProducts = document.getElementById('sliderProducts');
    if (sectionId == 'home') {
        sliderProducts.style.display = 'none';
    } else {
        sliderProducts.style.display = 'block';
    }
}
/** Esta parte lo que hace es permitir que cuando estemos en una sección el fondo de la sección en específico cambie de color para distinguir en qué sección estamos */
menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        const sectionId = item.getAttribute("data-section-id");

        if (sectionId !== 'home') {
            menuItems.forEach(item => item.classList.remove('active'));
            item.classList.add('active');
        } else {
            menuItems.forEach(item => item.classList.remove('active'));
        }

        showSection(sectionId); 
        wrapper.style.transform = `translateX(${-82.88 * index}vw)`;  // Esto permite que el slider se mueva al dar click en un item del menú
    });
});

const homeLogo = document.querySelector('[data-section-id="home"]');  // Seleccionamos el logo de la página
homeLogo.addEventListener("click", () => {
    menuItems.forEach(item => item.classList.remove('active')); // se quita active de todos los elementos del menú, ara que cuando vayamos a home deje de estar marcado el item del menú en el que estabamos
    showSection('home');
});

showSection('home');

/** Esta función permite cambiar el tamaño de la barra de navegación cuando hacemos scroll */
window.addEventListener("scroll", function(){
    var navBar = document.querySelector("nav");
    navBar.classList.toggle("reduce", window.scrollY > 0);
})

/** Esta función permite obtener y mostrar los productos almacenados en el server, hay que mejorarla para que lo haga por sección de producto*/
fetch('http://localhost:3000/productos')
    .then(response => response.json())
    .then(data => {
        let container = document.querySelector('.containerProducts'); // Asegura que se seleccione el contenedor correcto
        container.innerHTML = ""; // Limpia el contenido previo

        data.forEach(producto => {
            let productoHTML = `
                <div class="productItem">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="productImage">
                    <div class="nameProduct">${producto.nombre}</div>
                    <p class="price">Precio: $${producto.precio}</p>
                </div>`;
            container.innerHTML += productoHTML;
        });
    })
    .catch(error => console.error("Error al cargar los productos:", error));

especial.addEventListener("click", () => {
    alert("Proximamente...");
})




