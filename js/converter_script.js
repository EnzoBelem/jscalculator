const convertionType = document.body.dataset.convertionType
let internalExchangeRates = {}
let conv 
const url = 'https://v6.exchangerate-api.com/v6/2ca809d970b148ccbac1abff/latest/USD'

const getErrorMessage = errorType => ({
    'unsupported-code': 'Código de moeda fornecido não é suportado.',
    'malformed-request': 'Método de request possui algum erro estrutural.',
    'invalid-key': 'Chave da API utilizada não é válida.',
    'inactive-account': 'Email relacionado a chave da API não foi validado.',
    'quota-reached': 'Numero de requisições do plano atual atingidas.'
})[errorType] || 'Não foi possivel obter as informações de erro.'

const fecthExchangeRates = async () => {
    try {
        const response = await fetch(url)

        /*  if (!response.ok) {
             throw new Error('Sua conexão falhou. Não foi possivel estabelecer uma conexão com os servidores.')
         } */
        const exchangeRates = await response.json()

        if (exchangeRates.result === 'error') {
            throw new Error(getErrorMessage(exchangeRates['error-type']))
        }
        return exchangeRates
    } catch (error) {
        alert(error)
    }
}

const select_init = async () => {

    let selectMedidaEl = document.querySelectorAll(".select_med")

    const options = {
        'moeda': (selectedCurrency) => {
            let opt = `<option> </option>`
            if (internalExchangeRates.result === 'success') {
                opt = Object.keys(internalExchangeRates.conversion_rates)
                .map(currency => `<option ${currency === selectedCurrency?'selected':''}>${currency}</option>`).join('')
            }
            return opt
        },
        'volume': () => {
            return `<option>Mililitros</option>
            <option>Centímetros cúbicos</option>
            <option>Litros</option>
            <option>Metros cúbicos</option>
            <option>Polegadas cúbicas</option>
            <option>Pés cúbicos</option>
            <option>Jardas cúbicas</option>`
        },
        'comprimento': () => {
            return `<option>Nanômetros</option>
            <option>Mícrons</option>
            <option>Milímetros</option>
            <option>Centímetros</option>
            <option>Metros</option>
            <option>Quilômetros</option>
            <option>Polegadas</option>
            <option>Pés</option>
            <option>Jardas</option>
            <option>Milhas</option>`
        }
    }

    if (convertionType === 'moeda') {
        let exchangeRateData = await fecthExchangeRates()
        internalExchangeRates = { ...exchangeRateData }

        let getOptions = options[convertionType]
        selectMedidaEl[0].innerHTML = getOptions('BRL')
        selectMedidaEl[1].innerHTML = getOptions('USD')
    }else{
        let option = options[convertionType]()
        selectMedidaEl[0].innerHTML = option
        selectMedidaEl[1].innerHTML = option
    }
}

const initialization= async ()=>{
    await select_init()
    
    conv= new Converter()

    let selectMedidaEl = document.querySelectorAll(".select_med")
    selectMedidaEl[0].addEventListener('click', () => {
        conv.convert()
    })
    selectMedidaEl[1].addEventListener('click', () => {
        conv.convert()
    })

    btn_values_init()
}

initialization()

function Converter(){

    let entrada = document.getElementById("value_display")
    let saida = document.getElementById("visor_op")

    let selectMedidaEl = document.querySelectorAll(".select_med")

    let option_input= selectMedidaEl[0].options[selectMedidaEl[0].selectedIndex].value
    let option_output= selectMedidaEl[1].options[selectMedidaEl[1].selectedIndex].value

    const vol_converter = {
        'Mililitros': () => {
            const Conversions = {
                'Mililitros': (val_in) => { return val_in },
                'Centímetros cúbicos': (val_in) => { return val_in },
                'Litros': (val_in) => { return val_in / 1000 },
                'Metros cúbicos': (val_in) => { return val_in / 1e+6 },
                'Polegadas cúbicas': (val_in) => { return val_in / 16.387 },
                'Pés cúbicos': (val_in) => { return val_in / 28317 },
                'Jardas cúbicas': (val_in) => { return val_in / 764555 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'Centímetros cúbicos': () => {
            const Conversions = {
                'Mililitros': (val_in) => { return val_in },
                'Centímetros cúbicos': (val_in) => { return val_in },
                'Litros': (val_in) => { return val_in / 1000 },
                'Metros cúbicos': (val_in) => { return val_in / 1e+6 },
                'Polegadas cúbicas': (val_in) => { return val_in / 16.387 },
                'Pés cúbicos': (val_in) => { return val_in / 28317 },
                'Jardas cúbicas': (val_in) => { return val_in / 764555 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'Litros': () => {
            const Conversions = {
                'Mililitros': (val_in) => { return val_in * 1000 },
                'Centímetros cúbicos': (val_in) => { return val_in * 1000 },
                'Litros': (val_in) => { return val_in },
                'Metros cúbicos': (val_in) => { return val_in / 1000 },
                'Polegadas cúbicas': (val_in) => { return val_in * 61.024 },
                'Pés cúbicos': (val_in) => { return val_in / 28.317 },
                'Jardas cúbicas': (val_in) => { return val_in / 765 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'Metros cúbicos': () => {
            const Conversions = {
                'Mililitros': (val_in) => { return val_in * 1e+6 },
                'Centímetros cúbicos': (val_in) => { return val_in * 1e+6 },
                'Litros': (val_in) => { return val_in * 1000 },
                'Metros cúbicos': (val_in) => { return val_in },
                'Polegadas cúbicas': (val_in) => { return val_in * 61024 },
                'Pés cúbicos': (val_in) => { return val_in / 35.315 },
                'Jardas cúbicas': (val_in) => { return val_in / 1.308 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'Polegadas cúbicas': () => {
            const Conversions = {
                'Mililitros': (val_in) => { return val_in * 16.387 },
                'Centímetros cúbicos': (val_in) => { return val_in * 16.387 },
                'Litros': (val_in) => { return val_in / 61.024 },
                'Metros cúbicos': (val_in) => { return val_in / 61024 },
                'Polegadas cúbicas': (val_in) => { return val_in },
                'Pés cúbicos': (val_in) => { return val_in / 1728 },
                'Jardas cúbicas': (val_in) => { return val_in / 46656 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'Pés cúbicos': () => {
            const Conversions = {
                'Mililitros': (val_in) => { return val_in * 28317 },
                'Centímetros cúbicos': (val_in) => { return val_in * 28317 },
                'Litros': (val_in) => { return val_in * 28.317 },
                'Metros cúbicos': (val_in) => { return val_in / 35.315 },
                'Polegadas cúbicas': (val_in) => { return val_in * 1728 },
                'Pés cúbicos': (val_in) => { return val_in },
                'Jardas cúbicas': (val_in) => { return val_in / 27 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'Jardas cúbicas': () => {
            const Conversions = {
                'Mililitros': (val_in) => { return val_in * 764555 },
                'Centímetros cúbicos': (val_in) => { return val_in * 764555 },
                'Litros': (val_in) => { return val_in * 765 },
                'Metros cúbicos': (val_in) => { return val_in / 1.308 },
                'Polegadas cúbicas': (val_in) => { return val_in * 46656 },
                'Pés cúbicos': (val_in) => { return val_in * 27 },
                'Jardas cúbicas': (val_in) => { return val_in }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        }
    }

    const len_converter = {
        'Nanômetros': () => {
            const Conversions = {
                'Nanômetros': (val_in) => { return val_in },
                'Mícrons': (val_in) => { return val_in / 1000 },
                'Milímetros': (val_in) => { return val_in / 1e+6 },
                'Centímetros': (val_in) => { return val_in / 1e+7 },
                'Metros': (val_in) => { return val_in / 1e+9 },
                'Quilômetros': (val_in) => { return val_in / 1e+12 },
                'Polegadas': (val_in) => { return val_in / 2.54e+7 },
                'Pés': (val_in) => { return val_in / 3.2808e+9 },
                'Jardas': (val_in) => { return val_in / 9.144e+8 },
                'Milhas': (val_in) => { return val_in / 1.609e+12 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'Mícrons': () => {
            const Conversions = {
                'Nanômetros': (val_in) => { return val_in * 1000 },
                'Mícrons': (val_in) => { return val_in },
                'Milímetros': (val_in) => { return val_in / 1000 },
                'Centímetros': (val_in) => { return val_in / 10000 },
                'Metros': (val_in) => { return val_in / 1e+6 },
                'Quilômetros': (val_in) => { return val_in / 1e+9 },
                'Polegadas': (val_in) => { return val_in / 25400 },
                'Pés': (val_in) => { return val_in / 304800 },
                'Jardas': (val_in) => { return val_in / 914400 },
                'Milhas': (val_in) => { return val_in / 1.609e+9 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'Milímetros': () => {
            const Conversions = {
                'Nanômetros': (val_in) => { return val_in * 1e+6 },
                'Mícrons': (val_in) => { return val_in * 1000 },
                'Milímetros': (val_in) => { return val_in },
                'Centímetros': (val_in) => { return val_in / 10 },
                'Metros': (val_in) => { return val_in / 1000 },
                'Quilômetros': (val_in) => { return val_in / 1e+6 },
                'Polegadas': (val_in) => { return val_in / 25.4 },
                'Pés': (val_in) => { return val_in / 305 },
                'Jardas': (val_in) => { return val_in / 914 },
                'Milhas': (val_in) => { return val_in / 1.609e+6 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'Centímetros': () => {
            const Conversions = {
                'Nanômetros': (val_in) => { return val_in * 1e+7 },
                'Mícrons': (val_in) => { return val_in * 10000 },
                'Milímetros': (val_in) => { return val_in * 10 },
                'Centímetros': (val_in) => { return val_in },
                'Metros': (val_in) => { return val_in / 100 },
                'Quilômetros': (val_in) => { return val_in / 100000 },
                'Polegadas': (val_in) => { return val_in / 2.54 },
                'Pés': (val_in) => { return val_in / 30.48 },
                'Jardas': (val_in) => { return val_in / 91.44 },
                'Milhas': (val_in) => { return val_in / 160934 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'Metros': () => {
            const Conversions = {
                'Nanômetros': (val_in) => { return val_in * 1e+9 },
                'Mícrons': (val_in) => { return val_in * 1e+6 },
                'Milímetros': (val_in) => { return val_in * 1000 },
                'Centímetros': (val_in) => { return val_in * 100 },
                'Metros': (val_in) => { return val_in },
                'Quilômetros': (val_in) => { return val_in / 1000 },
                'Polegadas': (val_in) => { return val_in * 39.37 },
                'Pés': (val_in) => { return val_in * 3.281 },
                'Jardas': (val_in) => { return val_in * 1.094 },
                'Milhas': (val_in) => { return val_in / 1609 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'Quilômetros': () => {
            const Conversions = {
                'Nanômetros': (val_in) => { return val_in * 1e+12 },
                'Mícrons': (val_in) => { return val_in * 1e+9 },
                'Milímetros': (val_in) => { return val_in * 1e+6 },
                'Centímetros': (val_in) => { return val_in * 100000 },
                'Metros': (val_in) => { return val_in * 1000 },
                'Quilômetros': (val_in) => { return val_in },
                'Polegadas': (val_in) => { return val_in * 39370 },
                'Pés': (val_in) => { return val_in * 3281 },
                'Jardas': (val_in) => { return val_in * 1094 },
                'Milhas': (val_in) => { return val_in / 1, 609 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'Polegadas': () => {
            const Conversions = {
                'Nanômetros': (val_in) => { return val_in * 2.54e+7 },
                'Mícrons': (val_in) => { return val_in * 25400 },
                'Milímetros': (val_in) => { return val_in * 25.4 },
                'Centímetros': (val_in) => { return val_in * 2.54 },
                'Metros': (val_in) => { return val_in * 39.37 },
                'Quilômetros': (val_in) => { return val_in / 39370 },
                'Polegadas': (val_in) => { return val_in },
                'Pés': (val_in) => { return val_in / 12 },
                'Jardas': (val_in) => { return val_in / 36 },
                'Milhas': (val_in) => { return val_in / 63360 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'Pés': () => {
            const Conversions = {
                'Nanômetros': (val_in) => { return val_in * 3.048e+8 },
                'Mícrons': (val_in) => { return val_in * 304800 },
                'Milímetros': (val_in) => { return val_in * 305 },
                'Centímetros': (val_in) => { return val_in * 30.48 },
                'Metros': (val_in) => { return val_in / 3.281 },
                'Quilômetros': (val_in) => { return val_in / 3281 },
                'Polegadas': (val_in) => { return val_in * 12 },
                'Pés': (val_in) => { return val_in },
                'Jardas': (val_in) => { return val_in / 3 },
                'Milhas': (val_in) => { return val_in / 5280 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'Jardas': () => {
            const Conversions = {
                'Nanômetros': (val_in) => { return val_in * 9.144e+8 },
                'Mícrons': (val_in) => { return val_in * 914400 },
                'Milímetros': (val_in) => { return val_in * 914 },
                'Centímetros': (val_in) => { return val_in * 91.44 },
                'Metros': (val_in) => { return val_in / 1.094 },
                'Quilômetros': (val_in) => { return val_in / 1094 },
                'Polegadas': (val_in) => { return val_in * 36 },
                'Pés': (val_in) => { return val_in / 12 },
                'Jardas': (val_in) => { return val_in },
                'Milhas': (val_in) => { return val_in / 1760 }
            }
            let conversions = Conversions[option_output]
            saida.setAttribute("value", conversions(entrada.value))
        },
        'Milhas': () => {
            const Conversions = {
                'Nanômetros': (val_in) => { return val_in * 1.609e+12 },
                'Mícrons': (val_in) => { return val_in * 1.609e+9 },
                'Milímetros': (val_in) => { return val_in * 1.609e+6 },
                'Centímetros': (val_in) => { return val_in * 160934 },
                'Metros': (val_in) => { return val_in * 1609 },
                'Quilômetros': (val_in) => { return val_in * 1.609 },
                'Polegadas': (val_in) => { return val_in * 63360 },
                'Pés': (val_in) => { return val_in * 5280 },
                'Jardas': (val_in) => { return val_in * 1760 },
                'Milhas': (val_in) => { return val_in }
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
        switch (convertionType) {
            case 'moeda':

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

    this.remove = () => {
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

    this.atualizar_sel = () => {
        selectMedidaEl = document.querySelectorAll(".select_med")
        option_input = selectMedidaEl[0].options[selectMedidaEl[0].selectedIndex].value
        option_output = selectMedidaEl[1].options[selectMedidaEl[1].selectedIndex].value
    }
} 

//metodos inputs externos a funcao de conversoes
function btn_values_init() {
    let btn_val = document.querySelectorAll('[data-btn]')
    for (i = 0; i < btn_val.length; i++) {
        btn_val[i].addEventListener("click", event => {
            conv.addToEntrada(event.target.dataset.btn)
        })
    }
}

function btn_ops(operation) {
    const conv_operations = {
        'del': () => { conv.remove() },
        'ce': () => { conv.clearEntry() },
        '.': () => { conv.floatingPoint() },
        '=': () => { conv.convert() }
    }
    let operacao = conv_operations[operation]
    operacao()
} 

//DROPDOWN MENU
function DropDown() {
    document.getElementById("menuDD").classList.toggle("show")
}

function DropDownAbout() {
    document.getElementById("aboutDD").classList.toggle("showA")
}