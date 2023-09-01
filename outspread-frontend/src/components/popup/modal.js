import Swal from "sweetalert2"


export default function ModalDialog(title, yes, param) {
  Swal.fire({
    title: title,
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Да',
    denyButtonText: `Не`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      yes(param)
      // Swal.fire('Saved!', '', 'success')
    } else if (result.isDenied) {
      // Swal.fire('Changes are not saved', '', 'info')
    }
  })
}
