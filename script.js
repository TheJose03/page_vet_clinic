// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Actualizar el año en el footer
  document.getElementById("year").textContent = new Date().getFullYear()

  // Inicializar el formulario
  const contactForm = document.getElementById("contactForm")

  // Validación del formulario
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault()

    // Obtener los valores del formulario
    const nombre = document.getElementById("nombre")
    const email = document.getElementById("email")
    const mensaje = document.getElementById("mensaje")

    // Validar nombre
    if (nombre.value.trim() === "") {
      setInvalid(nombre, "Por favor ingresa tu nombre")
      return
    } else {
      setValid(nombre)
    }

    // Validar email
    if (email.value.trim() === "") {
      setInvalid(email, "Por favor ingresa tu email")
      return
    } else if (!isValidEmail(email.value)) {
      setInvalid(email, "Por favor ingresa un email válido")
      return
    } else {
      setValid(email)
    }

    // Validar mensaje
    if (mensaje.value.trim() === "") {
      setInvalid(mensaje, "Por favor ingresa tu mensaje")
      return
    } else {
      setValid(mensaje)
    }

    // Si todo está validado, mostrar el modal de confirmación
    const confirmationModal = document.getElementById("confirmationModal")
    const modal = new bootstrap.Modal(confirmationModal)
    modal.show()

    // Resetear el formulario
    contactForm.reset()
  })

  // Función para validar email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Función para marcar un campo como inválido
  function setInvalid(field, message) {
    field.classList.add("is-invalid")
    field.classList.remove("is-valid")

    // Buscar el mensaje de feedback
    const feedback = field.nextElementSibling
    if (feedback && feedback.classList.contains("invalid-feedback")) {
      feedback.textContent = message
    }
  }

  // Función para marcar un campo como válido
  function setValid(field) {
    field.classList.remove("is-invalid")
    field.classList.add("is-valid")
  }

  // Limpiar validación al escribir
  const formInputs = document.querySelectorAll(".form-control")
  formInputs.forEach((input) => {
    input.addEventListener("input", function () {
      this.classList.remove("is-invalid")
      this.classList.remove("is-valid")
    })
  })

  // Implementar scroll suave para los enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Cerrar el menú móvil si está abierto
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse.classList.contains("show")) {
          document.querySelector(".navbar-toggler").click()
        }

        // Calcular la posición de desplazamiento
        const navbarHeight = document.querySelector(".navbar").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight

        // Realizar el desplazamiento suave
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
})

