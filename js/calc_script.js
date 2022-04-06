function action(type, val) {

    let valor = document.getElementById("value_display")
    let valor_init = valor.getAttribute("value")
    let expressao = document.getElementById("visor_op")
    let expressao_init = expressao.getAttribute("value")

    switch (type) {
        case 'valor':
            setValue(valor, valor_init, expressao, val)
            setState('process', valor)
            break
        case 'acao':
            switch (val) {
                case 'c':
                    valor.setAttribute("value", '0')
                    expressao.setAttribute("value", '')
                    setState('inicio', valor)
                    break
                case 'ce':
                    valor.setAttribute("value", '0')
                    break
                case 'del'://coisas a mexer aqui tambem
                    if (valor_init.length > 1) {
                        if (isNaN(valor.getAttribute("value"))) {
                            valor.setAttribute("value", valor.getAttribute("value").split(/[^0-9]/).join(''))
                        } else {
                            valor.setAttribute("value", valor_init.slice(0, valor_init.length - 1))
                        }
                    } else {
                        valor.setAttribute("value", '0')
                    }
                    setState('inicio', valor)
                    break
                case '=':
                    concatEqual(valor, valor_init, expressao, expressao_init)
                    operationExec(valor, expressao)
                    setState('reiniciar', valor)
                    break
                case '√':
                    expressao.setAttribute("value", `√(${valor_init})`)
                    operationExec(valor, expressao)
                    setState('sqr_ops', valor)
                    break
                case 'sqr':
                    expressao.setAttribute("value", `sqr(${valor_init})`)
                    operationExec(valor, expressao)
                    setState('sqr_ops', valor)
                    break
                case '.':
                    if (!isNaN(valor_init) && valor_init.match(/[.]/)==null) {
                        valor.setAttribute("value", `${parseFloat(valor_init)}.`)
                    }
                    break
                case 'neg':
                    if (valor_init.search("negate") == -1) {
                        valor.setAttribute("value", `negate(${valor_init})`)
                    } else {
                        valor.setAttribute("value", `${valor_init.split(/[^0-9]/).join('')}`)
                    }
                    break
                default://representa todas as demais operações matematicas 
                    concatOperations(val, valor, valor_init, expressao, expressao_init)
                    setState('inicio', valor)
                    break
            }
            break
    }
}

function setState(estado, valor) {
    valor.className = ''
    switch (estado) {
        case 'reiniciar':
            valor.classList.toggle("reiniciar")
            break
        case 'inicio':
            valor.classList.toggle("inicio")
            break
        case 'process':
            valor.classList.toggle("process")
            break
        case 'sqr_ops':
            valor.classList.toggle("sqr_ops")
            break
    }
}

//tres possibilidades: -1(reiniciar), 0(inicio), 1(process)
function setValue(valor, valor_init, expressao, val) {
    switch(valor.className){
        case 'reiniciar':
            valor.setAttribute("value", val)
            expressao.setAttribute("value", '')
            break
        case 'inicio':
            valor.setAttribute("value", val)
            break
        case 'process':
            valor.setAttribute("value", valor_init + val)
            break
    }
}
//refatorar depois
function concatOperations(val, valor, valor_init, expressao, expressao_init) {
    if (expressao_init && !valor.classList.contains('reiniciar')) {
        if(valor.classList.contains('sqr_ops')){
            expressao.setAttribute("value", expressao_init + val)
        }else{
            expressao.setAttribute("value", expressao_init + valor_init + val)
        }
    }else{
        expressao.setAttribute("value", valor_init + val)
    }
}
//refatorar depois
function concatEqual(valor, valor_init, expressao, expressao_init) {
    if (expressao_init) {
        if (!valor.classList.contains('reiniciar')&&!valor.classList.contains('sqr_ops')) {
            expressao.setAttribute("value", expressao_init + valor_init)
        } else {
            equalSequence(expressao, valor)
        }
    } else {
        expressao.setAttribute("value", valor_init)
    }
}

function equalSequence(expressao, valor) {
    let subStr = breakExpression(expressao)
    let replaced = expressao.getAttribute("value").replace(subStr[0], valor.getAttribute("value"))
    expressao.setAttribute("value", replaced)
}

function operationExec(valor, expressao) {
    let subStr = expressao.getAttribute("value")
    if (expressao.getAttribute("value").search("sqr") != -1) {
        subStr = powMask(expressao)
    }
    if (expressao.getAttribute("value").search("√") != -1) {
        subStr = subStr.replace("√", "Math.sqrt")
    }
    if (expressao.getAttribute("value").search("negate") != -1) {
        subStr = subStr.replace("negate", "-")
    }
    valor.setAttribute("value", eval(subStr))
    writeHistorical(valor, expressao)
}

function writeHistorical(valor,expressao){
    let op= document.createElement('a')
    op.innerHTML= `${expressao.getAttribute("value")} = ${valor.getAttribute("value")}`
    op.onclick= ()=>{
        let subStr= op.innerHTML
        valor.setAttribute("value", subStr.slice(subStr.indexOf('=')+1,subStr.length))
        expressao.setAttribute("value", subStr.slice(0,subStr.indexOf('=')-1))
    }
    document.getElementById("historicoContent").appendChild(op)
}

document.getElementById("btn-t").onclick =()=>{
    document.getElementById("historicoContent").replaceChildren()
}
//operacoes de manipulacao na memoria

function powMask(expressao) {
    let elements = breakExpression(expressao)
    let replaced = breakSinalExpression(expressao)
    let e = 0
    for (i in elements) {
        if (elements[i].search("sqr") != -1) {
            elements[i] = elements[i].replace("sqr", "Math.pow")
            if (elements[i].search("negate") != -1) {
                elements[i] = elements[i].slice(0, elements[i].length - 2) + ',2))'
            } else {
                elements[i] = elements[i].slice(0, elements[i].length - 1) + ',2)'
            }
        }
    }
    for (i in replaced) {
        if (replaced[i] == 'number') {
            replaced[i] = elements[e++]
        }
    }
    return replaced.join('')
}

function breakExpression(expressao) {
    let numbers_array = expressao.getAttribute("value").split(/[/*+-]/)
    return numbers_array
}

function breakSinalExpression(expressao) {
    let exp_array = expressao.getAttribute("value").split(/[^/*+-]/)
    let sinal_array = []
    for (i in exp_array) {
        if (exp_array[i]) {
            if (i== 0) {
                sinal_array.push(exp_array[i])
            } else {
                sinal_array.push('number')
                sinal_array.push(exp_array[i])
            }
        }
    }
    sinal_array.push('number')
    return sinal_array
}

//FUNCOES DO DROPDOWN MENU
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
//FUNCOES DROPDOWN HISTORICO DE OPERACOES
function DDHistory(){
    document.getElementById("historico").classList.toggle("showH")
}

//SETANDO DIMENSOES DO DROPDOWN MENU COM BASE NO CONTAINER PRINCIPAL
function initDD() {
    let height = ((92 / 100) * document.getElementById("corpo_calc").clientHeight)
    //let width = (50 / 100) * document.getElementById("corpo_calc").clientWidth
    document.getElementById("menuDD").style.height = height + 'px'
    //document.getElementById("menuDD").style.width = width + 'px'
}
initDD()