/* Cambio de Colores de todas los modelos */

document.addEventListener('DOMContentLoaded', () => {
    
    const botonesColor = document.querySelectorAll('.botones button');
    const imagenFrontal = document.getElementById('shirtImage'); 
    const imagenTrasera = document.querySelector('#back-view .camisa, #back-view .camisa2, #back-view .camisa3'); 
    const previewFront = document.getElementById('shirtImage2'); 
    const previewBack = document.getElementById('shirtImage3'); 

    botonesColor.forEach(boton => {
        boton.addEventListener('click', () => {
            const nuevaImagenFront = boton.getAttribute('data-imagen-front');
            const nuevaImagenBack = boton.getAttribute('data-imagen-back');
            
            imagenFrontal.src = nuevaImagenFront; 
            imagenTrasera.src = nuevaImagenBack; 
            
            previewFront.src = nuevaImagenFront; 
            previewBack.src = nuevaImagenBack; 
        });
    });
});
