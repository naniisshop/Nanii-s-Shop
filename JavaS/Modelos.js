/* Tarjetas Giratorias con un botones. */

document.addEventListener('DOMContentLoaded', () => {
    const tarjetas = document.querySelectorAll('.tarjeta');

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener('mouseenter', () => {
            tarjeta.classList.add('active');
        });

        tarjeta.addEventListener('mouseleave', () => {
            tarjeta.classList.remove('active');
        });
    });
});