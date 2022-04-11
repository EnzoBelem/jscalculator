/*possiveis alteracoes*/
function CalculadoraF() {
    var valor = document.getElementById("value_display")
    var formated_expressao = document.getElementById("visor_op")
    var internal_expressao = []
    var memoria = []
    var estado = 'inicial'

    //manipulacoes na memoria
    this.memClear= ()=>{
        console.log('entrou')
        memoria= []
    }
    this.memRemove= (index)=>{
        memoria.splice(index, 1)
    }
    this.memRecall= ()=>{
        this.clear()
        if(memoria.length>0){
            valor.setAttribute("value", memoria.concat().pop())
        }
    }
    this.memSave= ()=>{
        memoria.push(+this.getValor())
    }
    this.memAdd= ()=>{
        memoria[memoria.length-1]+= +this.getValor()
    }
    this.memLocateAdd= (index)=>{
        memoria[index]+= +this.getValor()
    }
    this.memSub= ()=>{
        memoria[memoria.length-1]-= +this.getValor()
    }
    this.memLocateSub= (index)=>{
        memoria[index]-= +this.getValor()
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

    this.getMemory= ()=>{
        return memoria
    }
}

var calc = new CalculadoraF()

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
    writeMemory()
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

function LimparHistorico(){
    document.getElementById("hist_content").replaceChildren()
}

//CAMPO MEMORIA
function writeMemory(){
    let valores= document.createDocumentFragment()
    let mem= calc.getMemory()

    for(i=mem.length-1;i>=0;i--){
        let element= memoryElement(mem[i],i)
        valores.appendChild(element)
    }
    document.getElementById("mem_content").replaceChildren(valores)
}
function memoryElement(val_m, index){
    let element= document.createElement('div')
    element.setAttribute("id", index)
    let val_p= document.createElement('p')
    val_p.classList.toggle("val-mem")
    val_p.textContent= val_m
    val_p.onclick=()=>{
        calc.clear()
        document.getElementById("value_display").setAttribute("value", val_p.textContent)
    }
    let btn_body= document.createElement('div')
    btn_body.classList.toggle("btn-body")
    btn_body.append(memoryBtns.btnC(index),memoryBtns.btnA(index),memoryBtns.btnS(index))
    element.append(val_p,btn_body)
    return element
}
const memoryBtns= {
    btnC: (index)=>{
        let btn= document.createElement('button')
        btn.classList.toggle("btn-mem")
        btn.textContent= 'C'
        btn.title= ("Limpar da memória")
        btn.onclick= ()=>{
            calc.memRemove(index)
            document.getElementById(`${index}`).replaceChildren()
        }
        return btn
    },
    btnA: (index)=>{
        let btn= document.createElement('button')
        btn.classList.toggle("btn-mem")
        btn.textContent= 'M+'
        btn.title= ("Somar da memória")
        btn.onclick=()=>{
            calc.memLocateAdd(index)
            writeMemory()
        }
        return btn
    },
    btnS: (index)=>{
        let btn= document.createElement('button')
        btn.classList.toggle("btn-mem")
        btn.textContent= 'M-'
        btn.title= ("Subtrair da memória")
        btn.onclick=()=>{
            calc.memLocateSub(index)
            writeMemory()
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