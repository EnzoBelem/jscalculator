btn_values()
select_init()
var conv = new ConverterF()

function ConverterF() {
    let entrada = document.getElementById("value_display")
    let saida = document.getElementById("visor_op")
    let med_input = document.querySelectorAll(".select_med")
    let option_input = med_input[0].options[med_input[0].selectedIndex].value
    let option_output = med_input[1].options[med_input[1].selectedIndex].value

    const vol_converter = {
        'mililitros': () => {
            const Conversions = {
                'mililitros': (val_in) => { return val_in },
                'centCubicos': (val_in) => { return val_in },
                'litros': (val_in) => { return val_in / 1000 },
                'metCubicos': (val_in) => { return val_in / 1e+6 },
                'polCubicos': (val_in) => { return val_in / 16.387 },
                'pesCubicos': (val_in) => { return val_in / 28317 },
                'jarCubicos': (val_in) => { return val_in / 764555 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'centCubicos': () => {
            const Conversions = {
                'mililitros': (val_in) => { return val_in },
                'centCubicos': (val_in) => { return val_in },
                'litros': (val_in) => { return val_in / 1000 },
                'metCubicos': (val_in) => { return val_in / 1e+6 },
                'polCubicos': (val_in) => { return val_in / 16.387 },
                'pesCubicos': (val_in) => { return val_in / 28317 },
                'jarCubicos': (val_in) => { return val_in / 764555 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'litros': () => {
            const Conversions = {
                'mililitros': (val_in) => { return val_in * 1000 },
                'centCubicos': (val_in) => { return val_in * 1000 },
                'litros': (val_in) => { return val_in },
                'metCubicos': (val_in) => { return val_in / 1000 },
                'polCubicos': (val_in) => { return val_in * 61.024 },
                'pesCubicos': (val_in) => { return val_in / 28.317 },
                'jarCubicos': (val_in) => { return val_in / 765 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'metCubicos': () => {
            const Conversions = {
                'mililitros': (val_in) => { return val_in * 1e+6 },
                'centCubicos': (val_in) => { return val_in * 1e+6 },
                'litros': (val_in) => { return val_in * 1000 },
                'metCubicos': (val_in) => { return val_in },
                'polCubicos': (val_in) => { return val_in * 61024 },
                'pesCubicos': (val_in) => { return val_in / 35.315 },
                'jarCubicos': (val_in) => { return val_in / 1.308 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'polCubicos': () => {
            const Conversions = {
                'mililitros': (val_in) => { return val_in * 16.387 },
                'centCubicos': (val_in) => { return val_in * 16.387 },
                'litros': (val_in) => { return val_in / 61.024 },
                'metCubicos': (val_in) => { return val_in / 61024 },
                'polCubicos': (val_in) => { return val_in },
                'pesCubicos': (val_in) => { return val_in / 1728 },
                'jarCubicos': (val_in) => { return val_in / 46656 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'pesCubicos': () => {
            const Conversions = {
                'mililitros': (val_in) => { return val_in * 28317 },
                'centCubicos': (val_in) => { return val_in * 28317 },
                'litros': (val_in) => { return val_in * 28.317 },
                'metCubicos': (val_in) => { return val_in / 35.315 },
                'polCubicos': (val_in) => { return val_in * 1728 },
                'pesCubicos': (val_in) => { return val_in },
                'jarCubicos': (val_in) => { return val_in / 27 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'jarCubicos': () => {
            const Conversions = {
                'mililitros': (val_in) => { return val_in * 764555 },
                'centCubicos': (val_in) => { return val_in * 764555 },
                'litros': (val_in) => { return val_in * 765 },
                'metCubicos': (val_in) => { return val_in / 1.308 },
                'polCubicos': (val_in) => { return val_in * 46656 },
                'pesCubicos': (val_in) => { return val_in * 27 },
                'jarCubicos': (val_in) => { return val_in }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        }
    }

    const len_converter={
        'nanometros': () => {
            const Conversions = {
                'nanometros': (val_in) => {return val_in},
                'microns': (val_in) => {return val_in/1000},
                'milimetros': (val_in) => {return val_in/1e+6},
                'centimetros': (val_in) => {return val_in/1e+7},
                'metros': (val_in) => {return val_in/1e+9},
                'quilometros': (val_in) => {return val_in/1e+12},
                'polegadas': (val_in) => {return val_in/2.54e+7},
                'pes': (val_in) => {return val_in/3.2808e+9},
                'jardas': (val_in) => {return val_in/ 9.144e+8},
                'milhas': (val_in) => {return val_in/ 1.609e+12}
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'microns': () => {
            const Conversions = {
                'nanometros': (val_in) => {return val_in*1000},
                'microns': (val_in) => {return val_in},
                'milimetros': (val_in) => {return val_in/1000},
                'centimetros': (val_in) => {return val_in/10000},
                'metros': (val_in) => {return val_in/1e+6},
                'quilometros': (val_in) => {return val_in/1e+9},
                'polegadas': (val_in) => {return val_in/25400},
                'pes': (val_in) => {return val_in/304800},
                'jardas': (val_in) => {return val_in/914400},
                'milhas': (val_in) => {return val_in/1.609e+9}
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'milimetros': () => {
            const Conversions = {
                'nanometros': (val_in) => {return val_in*1e+6},
                'microns': (val_in) => {return val_in*1000},
                'milimetros': (val_in) => {return val_in},
                'centimetros': (val_in) => {return val_in/10},
                'metros': (val_in) => {return val_in/1000},
                'quilometros': (val_in) => {return val_in/1e+6},
                'polegadas': (val_in) => {return val_in/25.4},
                'pes': (val_in) => {return val_in/305},
                'jardas': (val_in) => {return val_in/914},
                'milhas': (val_in) => {return val_in/1.609e+6}
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'centimetros': () => {
            const Conversions = {
                'nanometros': (val_in) => {return val_in},
                'microns': (val_in) => {return val_in},
                'milimetros': (val_in) => {return val_in},
                'centimetros': (val_in) => {return val_in},
                'metros': (val_in) => {return val_in},
                'quilometros': (val_in) => {return val_in},
                'polegadas': (val_in) => {return val_in},
                'pes': (val_in) => {return val_in},
                'jardas': (val_in) => {return val_in},
                'milhas': (val_in) => {return val_in}
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'metros': () => {
            const Conversions = {
                'nanometros': (val_in) => {return val_in},
                'microns': (val_in) => {return val_in},
                'milimetros': (val_in) => {return val_in},
                'centimetros': (val_in) => {return val_in},
                'metros': (val_in) => {return val_in},
                'quilometros': (val_in) => {return val_in},
                'polegadas': (val_in) => {return val_in},
                'pes': (val_in) => {return val_in},
                'jardas': (val_in) => {return val_in},
                'milhas': (val_in) => {return val_in}
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'quilometros': () => {
            const Conversions = {
                'nanometros': (val_in) => {return val_in},
                'microns': (val_in) => {return val_in},
                'milimetros': (val_in) => {return val_in},
                'centimetros': (val_in) => {return val_in},
                'metros': (val_in) => {return val_in},
                'quilometros': (val_in) => {return val_in},
                'polegadas': (val_in) => {return val_in},
                'pes': (val_in) => {return val_in},
                'jardas': (val_in) => {return val_in},
                'milhas': (val_in) => {return val_in}
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'polegadas': () => {
            const Conversions = {
                'nanometros': (val_in) => {return val_in},
                'microns': (val_in) => {return val_in},
                'milimetros': (val_in) => {return val_in},
                'centimetros': (val_in) => {return val_in},
                'metros': (val_in) => {return val_in},
                'quilometros': (val_in) => {return val_in},
                'polegadas': (val_in) => {return val_in},
                'pes': (val_in) => {return val_in},
                'jardas': (val_in) => {return val_in},
                'milhas': (val_in) => {return val_in}
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'pes': () => {
            const Conversions = {
                'nanometros': (val_in) => {return val_in},
                'microns': (val_in) => {return val_in},
                'milimetros': (val_in) => {return val_in},
                'centimetros': (val_in) => {return val_in},
                'metros': (val_in) => {return val_in},
                'quilometros': (val_in) => {return val_in},
                'polegadas': (val_in) => {return val_in},
                'pes': (val_in) => {return val_in},
                'jardas': (val_in) => {return val_in},
                'milhas': (val_in) => {return val_in}
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'jardas': () => {
            const Conversions = {
                'nanometros': (val_in) => {return val_in},
                'microns': (val_in) => {return val_in},
                'milimetros': (val_in) => {return val_in},
                'centimetros': (val_in) => {return val_in},
                'metros': (val_in) => {return val_in},
                'quilometros': (val_in) => {return val_in},
                'polegadas': (val_in) => {return val_in},
                'pes': (val_in) => {return val_in},
                'jardas': (val_in) => {return val_in},
                'milhas': (val_in) => {return val_in}
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'milhas': () => {
            const Conversions = {
                'nanometros': (val_in) => {return val_in},
                'microns': (val_in) => {return val_in},
                'milimetros': (val_in) => {return val_in},
                'centimetros': (val_in) => {return val_in},
                'metros': (val_in) => {return val_in},
                'quilometros': (val_in) => {return val_in},
                'polegadas': (val_in) => {return val_in},
                'pes': (val_in) => {return val_in},
                'jardas': (val_in) => {return val_in},
                'milhas': (val_in) => {return val_in}
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
    }

    var estado = 'inicial'
    this.addToEntrada = (val) => {
        switch (estado) {
            case 'reinicio':
                entrada.setAttribute("value", val)
                saida.setAttribute("value", '0')
                break
            case 'inicial':
                entrada.setAttribute("value", val)
                break
            case 'setando':
                entrada.setAttribute("value", entrada.value + val)
                break
        }
        estado = 'setando'
    }

    this.convert = () => {  
        this.atualizar_sel()
        let tipo = document.querySelector("[data-medida]").dataset.medida
        switch(tipo){
            case 'dinheiro':

                break
            case 'volume':
                vol_converter[option_input]()
                break
            case 'comprimento':
                len_converter[option_input]()
                break
        }
        estado = 'reinicio'
    }

    this.floatingPoint = () => {
        if (!isNaN(entrada.value) && entrada.value.match(/[.]/) == null) {
            entrada.setAttribute("value", `${entrada.value}.`)
        }
    }

    this.clearEntry = () => {
        entrada.setAttribute("value", '0')
        estado = 'inicial'
    }

    this.delete = () => {
        if (entrada.value.length > 1) {
            if (isNaN(entrada.value)) {
                entrada.setAttribute("value", entrada.value.split(/[^0-9]/).join(''))
            } else {
                entrada.setAttribute("value", entrada.value.slice(0, -1))
            }
            estado = 'setando'
        } else {
            this.clearEntry()
        }
    }

    this.atualizar_sel=()=>{
        med_input = document.querySelectorAll(".select_med")
        option_input = med_input[0].options[med_input[0].selectedIndex].value
        option_output = med_input[1].options[med_input[1].selectedIndex].value
    }
}

function btn_values() {
    let btn_val = document.querySelectorAll('[data-btn]')
    for (i = 0; i < btn_val.length; i++) {
        btn_val[i].addEventListener("click", event => {
            conv.addToEntrada(event.target.dataset.btn)
        })
    }
}

function btn_ops(operation) {
    const conv_operations = {
        'del': () => { conv.delete() },
        'ce': () => { conv.clearEntry() },
        '.': () => { conv.floatingPoint() },
        '=': () => { conv.convert() }
    }
    let operacao = conv_operations[operation]
    operacao()
}

function select_init() {
    let med_input = document.querySelectorAll(".select_med")
    let med_tipo = document.querySelector("[data-medida]")
    const options = {
        'dinheiro': () => {

        },
        'volume': () => {
            const opt = `<option value="mililitros">Mililitros</option>
            <option value="centCubicos">Centímetros cúbicos</option>
            <option value="litros">Litros</option>
            <option value="metCubicos">Metros cúbicos</option>
            <option value="polCubicos">Polegadas cúbicas</option>
            <option value="pesCubicos">Pés cúbicos</option>
            <option value="jarCubicos">Jardas cúbicas</option>`
            return opt
        },
        'comprimento': () => {
            const opt = `<option value="nanometros">Nanômetros</option>
            <option value="microns">Mícrons</option>
            <option value="milimetros">Milímetros</option>
            <option value="centimetros">Centímetros</option>
            <option value="metros">Metros</option>
            <option value="quilometros">Quilômetros</option>
            <option value="polegadas">Polegadas</option>
            <option value="pes">Pés</option>
            <option value="jardas">Jardas</option>
            <option value="milhas">Milhas</option>`
            return opt
        }
    }
    let option = options[med_tipo.dataset.medida]
    med_input[0].innerHTML = option()
    med_input[1].innerHTML = option()
}

//DROPDOWN MENU
function DropDown() {
    document.getElementById("menuDD").classList.toggle("show")
}

function DropDownAbout() {
    document.getElementById("aboutDD").classList.toggle("showA")
}