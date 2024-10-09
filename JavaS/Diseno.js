/* Variables */
const uploadButton = document.getElementById('uploadButton');
const uploadImageFront = document.getElementById('uploadImage-front');
const uploadImageBack = document.getElementById('uploadImage-back');
const previewImgFront = document.getElementById('previewImg-front');
const previewFront = document.getElementById('preview-front');
const previewImgBack = document.getElementById('previewImg-back');
const previewBack = document.getElementById('preview-back');
const clearImage = document.getElementById('clearImage');
const buttonAdelante = document.querySelector('.ad');
const buttonAtras = document.querySelector('.at');

/* Subir imagen */
uploadButton.addEventListener('click', function() {
    if (document.getElementById("front-view").classList.contains("design-area-active")) {
        uploadImageFront.click();
    } else {
        uploadImageBack.click();
    }
});

/* Cargar y preparar la imagenes */

function loadImage(file, imgElement) {
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imgElement.src = e.target.result;
            console.log("Imagen cargada:", imgElement.src); 

            imgElement.style.display = 'block';

            imgElement.onload = function() {
                console.log("Imagen procesada:", imgElement.src);
                resetImage(imgElement);
                makeMovableAndResizable(imgElement);
            };
        };
        reader.readAsDataURL(file);
    } else {
        imgElement.src = '';
        imgElement.style.display = 'none';
    }
}

/* Cargar la imagen en la vista delantera */
uploadImageFront.addEventListener('change', function(event) {
    const file = event.target.files[0];
    loadImage(file, previewImgFront);
});

/* Cargar la imagen en la vista trasera */
uploadImageBack.addEventListener('change', function(event) {
    const file = event.target.files[0];
    loadImage(file, previewImgBack);
});

/* Borrar Imagen */
clearImage.addEventListener('click', function() {
    if (document.getElementById("front-view").classList.contains("design-area-active")) {
        previewImgFront.src = '';
        previewImgFront.style.display = 'none';
        uploadImageFront.value = '';
        resetImage(previewImgFront);
    } else {
        previewImgBack.src = '';
        previewImgBack.style.display = 'none';
        uploadImageBack.value = '';
        resetImage(previewImgBack);
    }
});

/* Mostrar la vista delantera */
buttonAdelante.addEventListener('click', function() {
    showFront();
});

/* Mostrar la vista trasera */
buttonAtras.addEventListener('click', function() {
    showBack();
});

function showFront() {
    document.getElementById("front-view").classList.add("design-area-active");
    document.getElementById("front-view").classList.remove("design-area-none");
    document.getElementById("back-view").classList.remove("design-area-active");
    document.getElementById("back-view").classList.add("design-area-none");
}

function showBack() {
    document.getElementById("front-view").classList.remove("design-area-active");
    document.getElementById("front-view").classList.add("design-area-none");
    document.getElementById("back-view").classList.add("design-area-active");
    document.getElementById("back-view").classList.remove("design-area-none");
}

/* Editar y Mover imagen */

function getLimitsBasedOnPage() {
    /* Limites para cada HTML */
    switch (document.title) {
        case 'Crea': 
            return { leftLimit: 0, rightLimit: 304, topLimit: 0, bottomLimit: 364, resizeMaxWidth: 304, resizeMaxHeight: 364 };
        case 'Crea2': 
            return { leftLimit: 0, rightLimit: 263, topLimit: 0, bottomLimit: 295, resizeMaxWidth: 263, resizeMaxHeight: 295 };
        case 'Crea3': 
            return { leftLimit: 0, rightLimit: 304, topLimit: 0, bottomLimit: 364, resizeMaxWidth: 304, resizeMaxHeight: 364 };
    }
}

function makeMovableAndResizable(target) {
    
    const { leftLimit, rightLimit, topLimit, bottomLimit, resizeMaxWidth, resizeMaxHeight } = getLimitsBasedOnPage();

    target.style.position = "absolute"; 
    target.style.transform = `translate(${leftLimit}px, ${topLimit}px)`;
    target.setAttribute('data-x', leftLimit);
    target.setAttribute('data-y', topLimit);
    interact(target)

    /* Mover la Imagen */

        .draggable({
            listeners: {
                move(event) {
                    const target = event.target;
                    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    const newX = Math.min(
                        Math.max(x, leftLimit),                     
                        rightLimit - target.offsetWidth               
                    );

                    const newY = Math.min(
                        Math.max(y, topLimit),                      
                        bottomLimit - target.offsetHeight            
                    );

                    target.style.transform = `translate(${newX}px, ${newY}px)`;
                    target.setAttribute('data-x', newX);
                    target.setAttribute('data-y', newY);
                },
            },
        })

        /* Cambiar tamano de la Imagen */

        .resizable({
            edges: { left: true, right: true, bottom: true, top: true },
            listeners: {
                move(event) {
                    const target = event.target;
                    let { width, height } = event.rect;

                    const currentX = parseFloat(target.getAttribute('data-x')) || 0;
                    const currentY = parseFloat(target.getAttribute('data-y')) || 0;

                    width = Math.min(width, resizeMaxWidth);
                    height = Math.min(height, resizeMaxHeight); 

                    target.style.width = `${Math.max(width, 50)}px`; 
                    target.style.height = `${Math.max(height, 50)}px`; 

                    target.style.transform = `translate(${currentX}px, ${currentY}px)`;
                    target.setAttribute('data-x', currentX);
                    target.setAttribute('data-y', currentY);
                },
            },
            modifiers: [
                interact.modifiers.restrictSize({
                    min: { width: 50, height: 50 },
                    max: { width: resizeMaxWidth, height: resizeMaxHeight }
                }),
            ],
        });
}
makeMovableAndResizable(document.getElementById('movableElement'));

/* Resetear Imagen */

function resetImage(image) {
    const img = new Image();
    img.src = image.src;
    img.onload = function() {
        const box = image.closest('.design-area, .design-area2').querySelector('.box, .box2');
        const boxWidth = box.clientWidth;
        const boxHeight = box.clientHeight;

        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;

        const scale = Math.min(boxWidth / naturalWidth, boxHeight / naturalHeight, 1);

        const displayWidth = naturalWidth * scale;
        const displayHeight = naturalHeight * scale;

        image.style.width = `auto`;
        image.style.height = `auto`;

        image.style.transform = 'translate(0px, 0px)';
        image.setAttribute('data-x', 0);
        image.setAttribute('data-y', 0);

        image.setAttribute('data-aspect-ratio', naturalWidth / naturalHeight);
    };
}