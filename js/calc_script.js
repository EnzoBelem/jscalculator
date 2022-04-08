/*possiveis alteracoes*/
let Calculadora = function () {
    var valor = document.getElementById("value_display")
    var formated_expressao = document.getElementById("visor_op")
    var internal_expressao = []
    var memoria = []
    var estado = 'inicial'

    //manipulacoes na memoria
    this.memClear= ()=>{
        memoria= []
    }
    this.memRecall= ()=>{
        this.clear()
        valor.setAttribute("value", memoria.concat().pop())
    }
    this.memSave= ()=>{
        memoria.push(this.getValor())
    }
    this.memAdd= ()=>{
        memoria[memoria.length-1]+= +this.getValor().toFixed(2)
    }
    this.memSub= ()=>{
        memoria[memoria.length-1]-= +this.getValor().toFixed(2)
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

    this.expressionConcat= (val_output, val_intern)=>{
        if(this.getFormatedExpressao() && estado!='reinicio'){
            formated_expressao.setAttribute("value", this.getFormatedExpressao() + val_output)
        }else{
            formated_expressao.setAttribute("value", val_output)
        }
        internal_expressao.push(val_intern)
        estado= 'inicial'
    }

    this.percentageSet= ()=>{
        if(this.getFormatedExpressao() && estado!='reinicio'){
            if(internal_expressao.concat().pop().includes("+")){
                this.expressionConcat(this.getValor()/2, this.getValor()/2)
            }else{
                this.expressionConcat(this.getValor()/100, this.getValor()/100)
            }
        }
    }

    this.negation= ()=>{
        valor.setAttribute("value",-this.getValor())
    }

    this.floatingPoint= ()=>{
        if(!isNaN(this.getValor()) && this.getValor().match(/[.]/)==null){
            valor.setAttribute("value",`${this.getValor()}.`)
        }
    }

    this.calculateExpression= ()=>{
        valor.setAttribute("value", +eval(internal_expressao.join('')).toFixed(2))
        internal_expressao= []
        estado= 'reinicio'
    }

    this.equalConcat= ()=>{
        if(this.getFormatedExpressao() && estado!='reinicio'){
            formated_expressao.setAttribute("value", this.getFormatedExpressao() + this.getValor())
        }else{
            formated_expressao.setAttribute("value", this.getValor())
        }
        internal_expressao.push(this.getValor())
    }

    this.clear= ()=>{
        valor.setAttribute("value", '0')
        formated_expressao.setAttribute("value", '')
        internal_expressao = []
        estado = 'inicial'
    }

    this.clearEntry= ()=>{
        valor.setAttribute("value", '0')
        estado = 'inicial'
    }

    this.delete= ()=>{
        if (this.getValor().length > 1) {
            if (isNaN(this.getValor())) {
                valor.setAttribute("value", this.getValor().split(/[^0-9]/).join(''))
            } else {
                valor.setAttribute("value", this.getValor().slice(0,-1))
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
}

var calc = new Calculadora()

function calc_btn(type, val) {
    switch (type) {
        case 'valor':
            calc.addToValor(val)
            break
        case 'acao':
            switch (val) {
                case 'c':
                    calc.clear()
                    break
                case 'ce':
                    calc.clearEntry()
                    break
                case 'del':
                    calc.delete()
                    break
                case '=':
                    calc.equalConcat()
                    calc.calculateExpression()
                    writeHistorical(calc.getValor(), calc.getFormatedExpressao())
                    break
                case 'sqrt':
                    calc.expressionConcat(`√(${calc.getValor()})`,`Math.sqrt(${calc.getValor()})`)
                    calc.calculateExpression()
                    break
                case 'sqr':
                    calc.expressionConcat(`(${calc.getValor()})²`,`Math.pow(${calc.getValor()},2)`)
                    calc.calculateExpression()
                    break
                case 'ptg':
                    calc.percentageSet()
                    calc.calculateExpression()
                    break
                case '1/':
                    calc.expressionConcat(`1/(${calc.getValor()})`,`1/(${calc.getValor()})`)
                    calc.calculateExpression()
                    break
                case '.':
                    calc.floatingPoint()
                    break
                case 'neg':
                    calc.negation()
                    break
                default:
                    calc.expressionConcat(calc.getValor()+val, calc.getValor()+val)
                    break
            }
            break
    }
}
//MANIPULACOES NA MEMORIA
function mem_act(memory_op){
    switch(memory_op){
        case 'mc':
            calc.memClear()
            break
        case 'mr':
            calc.memRecall()
            break
        case 'm+':
            calc.memAdd()
            break
        case 'm-':
            calc.memSub()
            break
        case 'ms':
            calc.memSave()
            break
    }
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
    if (document.getElementById("historicoContent").childElementCount > 0) {
        document.getElementById("historicoContent").prepend(operacao)
    } else {
        document.getElementById("historicoContent").appendChild(operacao)
    }
}

document.getElementById("btn-t").onclick = () => {
    document.getElementById("historicoContent").replaceChildren()
}

//DROPDOWN MENU
function DropDown() {
    document.getElementById("menuDD").classList.toggle("show")
}
window.onclick = function (event) {
    if (!event.target.matches('.btnDD')) {
        var dropdowns = document.getElementsByClassName("contentDD");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
//DROPDOWN HISTORICO
function DDHistory() {
    document.getElementById("historico").classList.toggle("showH")
}
//SETANDO DIMENSOES DO DROPDOWN MENU COM BASE NO CONTAINER PRINCIPAL - TESTE
function initDD() {
    let height = ((92 / 100) * document.getElementById("corpo_calc").clientHeight)
    document.getElementById("menuDD").style.height = height + 'px'
}
initDD()