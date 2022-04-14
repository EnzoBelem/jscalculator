/*possiveis alteracoes*/
function CalculadoraF() {
    var valor = document.getElementById("value_display")
    var formated_expressao = document.getElementById("visor_op")
    var internal_expressao = []
    var memoria = []
    var estado = 'inicial'

    //manipulacoes na memoria
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
        memoria.push(+this.getValor())
        writeMemory()
    }
    this.memAdd = () => {
        memoria[memoria.length - 1] += +this.getValor()
        writeMemory()
    }
    this.memLocateAdd = (index) => {
        memoria[index] += +this.getValor()
        writeMemory()
    }
    this.memSub = () => {
        memoria[memoria.length - 1] -= +this.getValor()
        writeMemory()
    }
    this.memLocateSub = (index) => {
        memoria[index] -= +this.getValor()
        writeMemory()
    }
    //execucao de operacoes
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
                valor.setAttribute("value", this.getValor() + val)
                break
        }
        estado = 'setando'
    }

    this.expressionConcat = (val_output, val_intern) => {
        if (this.getFormatedExpressao() && estado != 'reinicio') {
            formated_expressao.setAttribute("value", this.getFormatedExpressao() + val_output)
        } else {
            formated_expressao.setAttribute("value", val_output)
        }
        internal_expressao.push(val_intern)
        estado = 'inicial'
    }

    this.percentageSet = () => {
        if (this.getFormatedExpressao() && estado != 'reinicio') {
            if (internal_expressao.concat().pop().includes("+")) {
                this.expressionConcat(this.getValor() / 2, this.getValor() / 2)
            } else {
                this.expressionConcat(this.getValor() / 100, this.getValor() / 100)
            }
        }
    }

    this.negation = () => {
        valor.setAttribute("value", -this.getValor())
    }

    this.floatingPoint = () => {
        if (!isNaN(this.getValor()) && this.getValor().match(/[.]/) == null) {
            valor.setAttribute("value", `${this.getValor()}.`)
        }
    }

    this.calculateExpression = () => {
        valor.setAttribute("value", +eval(internal_expressao.join('')).toFixed(2))
        internal_expressao = []
        estado = 'reinicio'
    }

    this.equalConcat = () => {
        if (this.getFormatedExpressao() && estado != 'reinicio') {
            formated_expressao.setAttribute("value", this.getFormatedExpressao() + this.getValor())
        } else {
            formated_expressao.setAttribute("value", this.getValor())
        }
        internal_expressao.push(this.getValor())
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
        if (this.getValor().length > 1) {
            if (isNaN(this.getValor())) {
                valor.setAttribute("value", this.getValor().split(/[^0-9]/).join(''))
            } else {
                valor.setAttribute("value", this.getValor().slice(0, -1))
            }
            estado = 'setando'
        } else {
            this.clearEntry()
        }
    }

    //getters
    this.getValor = () => {
        return valor.getAttribute("value")
    }

    this.getFormatedExpressao = () => {
        return formated_expressao.getAttribute("value")
    }

    this.getMemory = () => {
        return memoria
    }
}

var calc = new CalculadoraF()

function btn_valeus() {
    let btn_val = document.querySelectorAll('[data-btn]')
    for (i = 0; i < btn_val.length; i++) {
        btn_val[i].addEventListener("click", event => {
            calc.addToValor(event.target.dataset.btn)
        })
    }
}
btn_valeus()

function btn_ops(operation) {
    const calc_operations = {
        'del': () => { calc.delete() },
        'ce': () => { calc.clearEntry() },
        '.': () => { calc.floatingPoint() },
        '=': () => {
            calc.equalConcat()
            calc.calculateExpression()
        }
    }
    let operacao = calc_operations[operation]
    operacao()
}

//DROPDOWN MENU
function DropDown() {
    document.getElementById("menuDD").classList.toggle("show")
}
function DropDownAbout() {
    document.getElementById("aboutDD").classList.toggle("showA")
}