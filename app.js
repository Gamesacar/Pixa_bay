let currentPage = 1; // Página actual
const imagesPerPage = 20; // Número de imágenes por página

$(document).ready(function() {
  // Función para agregar una imagen al contenedor de imágenes
  function addImageToGallery(imageUrl, altText) {
    $('#image-container').append(
      `<a href="#" class="gallery-link">
         <img src="${imageUrl}" alt="${altText}">
       </a>`
    );
  }

  // Función para realizar una búsqueda en Pixabay y mostrar las imágenes resultantes
  function searchPixabay(query, page) {
    const apiKey = "42648210-67d4fa5f85c6cd764daf21f14";
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&page=${page}&per_page=${imagesPerPage}`;

    $.get(apiUrl, function (data) {
      $("#image-container").empty(); // Vaciar el contenedor de imágenes

      data.hits.forEach(function (hit) {
        addImageToGallery(hit.largeImageURL, hit.tags); // Agregar cada imagen al contenedor
      });
    });
  }

  // Función para mostrar imágenes predeterminadas al cargar la página
  function showDefaultImages() {
    const defaultQueries = ["nature", "city", "technology"]; // Lista de consultas predeterminadas
    defaultQueries.forEach(function (query) {
      searchPixabay(query, currentPage); // Realizar búsqueda para cada consulta predeterminada
    });
  }

  // Llamar a la función para mostrar imágenes predeterminadas al cargar la página
  showDefaultImages();

  // Manejar el envío del formulario de búsqueda
  $("#search-form").submit(function (event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    const query = $("#search-input").val(); // Obtener el valor de búsqueda del campo de entrada
    currentPage = 1; // Reiniciar la página actual al realizar una nueva búsqueda
    searchPixabay(query, currentPage); // Realizar la búsqueda en Pixabay
  });

  // Manejar el clic en el botón de página anterior
  $('#prev-page').on('click', function() {
    if (currentPage > 1) {
      currentPage--;
      const query = $("#search-input").val(); // Obtener el valor de búsqueda del campo de entrada
      searchPixabay(query, currentPage); // Realizar búsqueda para la página anterior
    }
  });

  // Manejar el clic en el botón de página siguiente
  $('#next-page').on('click', function() {
    currentPage++;
    const query = $("#search-input").val(); // Obtener el valor de búsqueda del campo de entrada
    searchPixabay(query, currentPage); // Realizar búsqueda para la página siguiente
  });

  $(document).on('click', '.gallery-link', function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

    // Obtener la URL de la imagen 
    const imageUrl = $(this).find('img').attr('src');

    // Establecer la URL de la imagen en el modal
    $('#modal-image').attr('src', imageUrl);

    // Mostrar el modal
    $('.modal-container').addClass('open');

    // Ocultar las demás imágenes en la galería
    $('.gallery-link').not(this).css('opacity', 0.5);

    // Mostrar la capa de fondo
    $('.overlay').addClass('visible');
  });

  // Cerrar el modal al hacer clic en el botón de cerrar o en la capa de fondo
  $('.close, .overlay, .modal-close-button').on('click', function() {
    $('.modal-container').removeClass('open');
    $('.gallery-link').css('opacity', 1); // Restaurar la opacidad de las demás imágenes
    $('.overlay').removeClass('visible'); // Ocultar la capa de fondo
  });
});
