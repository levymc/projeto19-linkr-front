import Swal from 'sweetalert2';

export const simpleModal = (title, icon) => {
    return Swal.fire({
        title: title,
        icon: icon,
        confirmButtonColor: "#1777F2",
        allowEscapeKey: false,
        allowOutsideClick: false,
    })
}

export const simpleModalButton = (title, textButton, icon) => {
    return Swal.fire({
        title: title,
        icon: icon,
        confirmButtonColor: "#1777F2",
        confirmButtonText: textButton,
        showCloseButton: true,
        showCancelButton: true,
    })
}

export const simpleModalText = (title, text, icon) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonColor: "#1777F2",
        allowEscapeKey: false,
        allowOutsideClick: false,
    })
}

export const simpleModalCancelar = (title, icon) => {
    return Swal.fire({
        title: title,
        icon: icon,
        confirmButtonColor: "#1777F2",
        allowEscapeKey: false,
        allowOutsideClick: false,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        showCloseButton: true,
    })
}