btn_values()
btn_basic_ops()
var calc = new CalculadoraF()

function CalculadoraF() {
    var valor = document.getElementById("value_display")
    var formated_expressao = document.getElementById("visor_op")
    var internal_expressao = []
    var memoria = []

    //MANIPULACOES NA MEMORIA

    this.memClear = () => {
        memoria = []
        writeMemory()
    }

    this.memRemove = (index) => {
        memoria.splice(index, 1)
    }

    this.memRecall = () => {
        this.clear()
        if (memoria.length > 0) {
            valor.setAttribute("value", memoria.concat().pop())
        }
        writeMemory()
    }

    this.memSave = () => {
        //elementos salvos na mem sao convertidos de string em float antes de salvar na memoria
        memoria.push(parseFloat(valor.value))
        writeMemory()
    }

    //OPERACOES NA MEMORIA
    //valor.value vem como string do elemento html, convercao valor.value para float -> operacao na memoria -> toFixed -> conversao para float

    //OPERACOES DE ADICAO NA MEMORIA
    this.memAdd = () => {
        let op_pacial= parseFloat(parseFloat(memoria[memoria.length - 1] += parseFloat(valor.value)).toFixed(2))
        memoria[memoria.length - 1]= op_pacial
        writeMemory()
    }

    this.memLocateAdd = (index) => {
        let op_pacial= parseFloat(parseFloat(memoria[index] += parseFloat(valor.value)).toFixed(2))
        memoria[index]= op_pacial
        writeMemory()
    }

    //OPERACOES DE SUBTRACAO NA MEMORIA
    this.memSub = () => {
        let op_pacial= parseFloat(parseFloat(memoria[memoria.length - 1] -= parseFloat(valor.value)).toFixed(2))
        memoria[memoria.length - 1]= op_pacial
        writeMemory()
    }

    this.memLocateSub = (index) => {
        let op_pacial= parseFloat(parseFloat(memoria[index] -= parseFloat(valor.value)).toFixed(2))
        memoria[index]= op_pacial
        writeMemory()
    }

    var estado = 'inicial'
    this.addToValor = (val) => {
        switch (estado) {
            case 'reinicio':
                valor.setAttribute("value", val)
                formated_expressao.setAttribute("value", '')
                internal_expressao = []
                break
            case 'inicial':
                valor.setAttribute("value", val)
                break
            case 'setando':
                valor.setAttribute("value", valor.value + val)
                break
        }
        estado = 'setando'
    }

    this.expressionConcat = (val_output, val_intern) => {
        if (formated_expressao.value && estado != 'reinicio') {
            formated_expressao.setAttribute("value", formated_expressao.value + val_output)
        } else {
            formated_expressao.setAttribute("value", val_output)
        }
        internal_expressao.push(val_intern)
        estado = 'inicial'
    }

    this.percentageSet = () => {
        if (formated_expressao.value && estado != 'reinicio') {
            if (internal_expressao.concat().pop().includes("+")) {
                this.expressionConcat(valor.value / 2, valor.value / 2)
            } else {
                this.expressionConcat(valor.value / 100, valor.value / 100)
            }
        }
    }

    this.negation = () => {
        valor.setAttribute("value", -valor.value)
    }

    this.floatingPoint = () => {
        if (!isNaN(valor.value) && valor.value.match(/[.]/) == null) {
            valor.setAttribute("value", `${valor.value}.`)
        }
    }

    this.calculateExpression = () => {
        valor.setAttribute("value", +eval(internal_expressao.join('')).toFixed(2))
        internal_expressao = []
        estado = 'reinicio'
    }

    this.equalConcat = () => {
        if (formated_expressao.value && estado != 'reinicio') {
            formated_expressao.setAttribute("value", formated_expressao.value + valor.value)
        } else {
            formated_expressao.setAttribute("value", valor.value)
        }
        internal_expressao.push(valor.value)
    }

    this.clear = () => {
        valor.setAttribute("value", '0')
        formated_expressao.setAttribute("value", '')
        internal_expressao = []
        estado = 'inicial'
    }

    this.clearEntry = () => {
        valor.setAttribute("value", '0')
        estado = 'inicial'
    }

    this.delete = () => {
        if (valor.value.length > 1) {
            if (isNaN(valor.value)) {
                valor.setAttribute("value", valor.value.split(/[^0-9]/).join(''))
            } else {
                valor.setAttribute("value", valor.value.slice(0, -1))
            }
            estado = 'setando'
        } else {
            this.clearEntry()
        }
    }
    this.getFormatedExpressao = () => {
        return formated_expressao.getAttribute("value")
    }
    this.getValor = () => {
        return valor.getAttribute("value")
    }
    this.getMemory = () => {
        return memoria
    }
}

function btn_values() {
    let btn_val = document.querySelectorAll('[data-btn]')
    for (i = 0; i < btn_val.length; i++) {
        btn_val[i].addEventListener("click", event => {
            calc.addToValor(event.target.dataset.btn)
        })
    }
}

function btn_basic_ops() {
    let btn_op = document.querySelectorAll('[data-op]')
    for (i = 0; i < btn_op.length; i++) {
        btn_op[i].addEventListener("click", event => {
            calc.expressionConcat(calc.getValor() + event.target.dataset.op, calc.getValor() + event.target.dataset.op)
        })
    }
}

function btn_ops(operation) {
    const calc_operations = {
        'c': () => { calc.clear() },
        'ce': () => { calc.clearEntry() },
        'del': () => { calc.delete() },
        'neg': () => { calc.negation() },
        '.': () => { calc.floatingPoint() },
        'ptg': () => {
            calc.percentageSet()
            calc.calculateExpression()
        },
        'sqrt': () => {
            calc.expressionConcat(`√(${calc.getValor()})`, `Math.sqrt(${calc.getValor()})`)
            calc.calculateExpression()
        },
        'sqr': () => {
            calc.expressionConcat(`(${calc.getValor()})²`, `Math.pow(${calc.getValor()},2)`)
            calc.calculateExpression()
        },
        '1/': () => {
            calc.expressionConcat(`1/(${calc.getValor()})`, `1/(${calc.getValor()})`)
            calc.calculateExpression()
        },
        '=': () => {
            calc.equalConcat()
            calc.calculateExpression()
            writeHistorical(calc.getValor(), calc.getFormatedExpressao())
        }
    }
    let operacao = calc_operations[operation]
    operacao()
}

//MANIPULACOES NA MEMORIA
function mem_act(mem_op) {
    const mem_functions = {
        'mc': () => { calc.memClear() },
        'mr': () => { calc.memRecall() },
        'm+': () => { calc.memAdd() },
        'm-': () => { calc.memSub() },
        'ms': () => { calc.memSave() }
    }
    let operacao = mem_functions[mem_op]
    operacao()
}

//HISTORICO DE OPERACOES
function writeHistorical(valor, expressao) {
    let operacao = document.createElement('a')
    operacao.innerHTML = `${expressao} = ${valor}`
    operacao.onclick = () => {
        let subStr = operacao.innerHTML
        document.getElementById("value_display").setAttribute("value", subStr.slice(subStr.indexOf('=') + 1, subStr.length))
        document.getElementById("visor_op").setAttribute("value", subStr.slice(0, subStr.indexOf('=') - 1))
    }
    if (document.getElementById("hist_content").childElementCount > 0) {
        document.getElementById("hist_content").prepend(operacao)
    } else {
        document.getElementById("hist_content").appendChild(operacao)
    }
}

function LimparHistorico() {
    document.getElementById("hist_content").replaceChildren()
}

//CAMPO MEMORIA
function writeMemory() {
    let valores = document.createDocumentFragment()
    let mem = calc.getMemory()

    for (i = mem.length - 1; i >= 0; i--) {
        let element = memoryElement(mem[i], i)
        valores.appendChild(element)
    }
    document.getElementById("mem_content").replaceChildren(valores)
}
function memoryElement(val_m, index) {
    let element = document.createElement('div')
    element.setAttribute("id", index)
    let val_p = document.createElement('p')
    val_p.classList.toggle("val-mem")
    val_p.textContent = val_m
    val_p.onclick = () => {
        calc.clear()
        document.getElementById("value_display").setAttribute("value", val_p.textContent)
    }
    let btn_body = document.createElement('div')
    btn_body.classList.toggle("btn-body")
    btn_body.append(memoryBtns.btnC(index), memoryBtns.btnA(index), memoryBtns.btnS(index))
    element.append(val_p, btn_body)
    return element
}
const memoryBtns = {
    btnC: (index) => {
        let btn = document.createElement('button')
        btn.classList.toggle("btn-mem")
        btn.textContent = 'C'
        btn.title = ("Limpar da memória")
        btn.onclick = () => {
            calc.memRemove(index)
            document.getElementById(`${index}`).replaceChildren()
        }
        return btn
    },
    btnA: (index) => {
        let btn = document.createElement('button')
        btn.classList.toggle("btn-mem")
        btn.textContent = 'M+'
        btn.title = ("Somar da memória")
        btn.onclick = () => {
            calc.memLocateAdd(index)
        }
        return btn
    },
    btnS: (index) => {
        let btn = document.createElement('button')
        btn.classList.toggle("btn-mem")
        btn.textContent = 'M-'
        btn.title = ("Subtrair da memória")
        btn.onclick = () => {
            calc.memLocateSub(index)
        }
        return btn
    }
}

//DROPDOWN MENU
function DropDown() {
    document.getElementById("menuDD").classList.toggle("show")
}
function DropDownAbout() {
    document.getElementById("aboutDD").classList.toggle("showA")
}
//DROPDOWN FOOTER
function DDHistory() {
    document.getElementById("historico").classList.toggle("showF")
}
function DDMemory() {
    document.getElementById("memoria").classList.toggle("showF")
}