    // Función para realizar la búsqueda en Pixabay
    function searchPixabay(query) {
        const apiKey = '42648210-67d4fa5f85c6cd764daf21f14'; 
        const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo`;
        
        // Realizar la solicitud GET a la API de Pixabay
        $.get(apiUrl, function(data) {
          // Limpiar el contenedor de imágenes
          $('#image-container').empty();
  
          // Iterar sobre los resultados y agregar las imágenes al contenedor
          data.hits.forEach(function(hit) {
            $('#image-container').append(`<img src="${hit.previewURL}" alt="${hit.tags}" />`);
          });
        });
      }
  
      // Manejar el envío del formulario de búsqueda
      $('#search-form').submit(function(event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto
        
        const query = $('#search-input').val(); // Obtener el valor de búsqueda del campo de entrada
        searchPixabay(query); // Realizar la búsqueda en Pixabay
      });
