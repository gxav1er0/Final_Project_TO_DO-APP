function alterartema() {
    const tema =localStorage.getItem("tema")
    const body = document.querySelector("body")
    const button = document.querySelector(".tema-button")

    if (tema) {
        let novotema
        if (tema === "light"){
            novotema = "dark"
            button.innerHTML = `<img src="/imagens/sun-icon.png" alt="icone do sol">`
            body.classList.remove("light")
            body.classList.add("dark")
        } else {
            novotema = "light"
            button.innerHTML = `<img src="/imagens/moon-icon.png" alt="icone de Lua">`
            body.classList.remove("dark")
            body.classList.add("light")
        }

        localStorage.setItem("tema", novotema)
        return
    }

localStorage.setItem("tema", "dark")
body.classList.add("dark")
}

function verificarTema(){
    const tema =localStorage.getItem("tema")
    const body = document.querySelector("body")
    const button = document.querySelector(".tema-button")

    if (tema) {
        if (tema === "dark"){
            body.classList.add("dark")
            button.innerHTML = `<img src="/imagens/sun-icon.png" alt="icone do sol">`
        } else {
            body.classList.add("light")
            button.innerHTML = `<img src="/imagens/moon-icon.png" alt="icone de Lua">`
        }
    }
}

verificarTema()