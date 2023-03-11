<!-- Implementar la vista de detalle de un libro. Para ello debemos buscar en la base de datos el libro cuyo Id sea igual al que se envia por parametro en la ruta de nuestro endpoint y actualizar la vista bookDetail.ejspara recibir y mostrar estos datos. -->
Busqueda de libros: Desarrollar la funcionalidad de busqueda, para esto utilizaremos el formulario de busqueda que se encuentra en la vista de search.ejs. Debemos escuchar las peticiones POST sobre la ruta /books/searchy con el campo title del cuerpo buscar en la base de datos los libros que tengan un título similar.
<!-- Libros de un autor: implementar la vista de authorBooks.ejsa la cual hicimos clic en un autor, esta vista debera listar todos los libros de un autor determinado en particular, leyendo su Id por parametro. -->
<!-- Edicion de libros: Implementar el formulario de edicion de libros, tener en cuenta que solo un usuario administrador debera tener acceso a esta funcionalidad (ocultar el boton para usuarios comunes). -->
Eliminacion de libros: Implementar el boton de eliminacion en el detalle de libros, tener en cuenta que solo los usuarios administradores pueden realizar esta accion.
Iniciar sesión y cerrar sesión: Implementar la funcionalidad de inicio de sesión. Tener en cuenta:
El email debe estar registrado en la base de datos.
La contraseña debe ser la misma que la que guardamos en la base de datos (recordar que las contraseñas se guardan cifradas asi que deberemos hacer lo mismo para poder compararlas).
Al estar logueado debemos ver un botón de logout en lugar del botón de login que cerrará nuestra sesion.
Usar cookies para recordar al usuario logueado.
Distinguir entre usuarios estándar y administradores cuando corresponda según lo mencionado en puntos anteriores.