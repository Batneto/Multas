
//* VARIABLES

const error=document.querySelector("#error")
const formulario=document.querySelector("#formulario")
const campoMatricula=document.querySelector("#matricula")
const parrafo=document.querySelector("#error")
const matricula=campoMatricula.value


    //todo Objetos
const arrayMatriculas=[
    {
        matricula:"1234ght"
        
    },
    {
        matricula:"5678tuy"
    },
    {
        matricula:"9101pou"
    },
    {
        matricula:"9876jup"
    },
    {
        matricula:"2365gty"
    }
]
const arrayPropietarios=[
    {
        matricula:"1234ght",
        nombre:"pepe",
    },
    {
        matricula:"5678tuy",
        nombre:"juan"
    },
    {
        matricula:"9101pou",
        nombre:"manolo"
    },
    {
        matricula:"9876jup",
        nombre:"antonio"
    }
]

const arrayMultas=[
    {
        nombre:"pepe",
        multa:2
    },
    {
        nombre:"juan",
        multa:4
    },
    {
        nombre:"manolo",
        multa:3
    },
]

const objPintar=[{
    matricula:null,
    modelo:null,
    propietario:null,
    multas:null,
}]






//todo expRegular

let regExp = /^[0-9]{1,4}[a-z]{1,3}/i;



//* EVENTOS

formulario.addEventListener('submit', (ev) => {
    ev.preventDefault()
    validarMatricula(matricula)
        .then((respuesta)=>{
		return buscarMatricula(respuesta)})//* Matricula validada
        .then((respuesta)=>{
            return buscarPropietario(respuesta)})//* Matricula Encontrada
        .then((respuesta)=>{
            return buscarMultas(respuesta)})//* Numero de Multas
        .then((respuesta)=>{
            console.log(respuesta);
            return pintarTabla(objPintar)})


});





//*FUNCIONES

function validarMatricula(matriculaAvalidar) {
    const matricula=campoMatricula.value
    return new Promise((resolve,reject)=>{
        if(regExp.test(matricula)) resolve(matricula,);
          else reject(pintarError("introduzca una matricula valida"))
   
 })
}

function buscarMatricula(matriculabuscar) {
    const matriculaEncontrada=arrayMatriculas.find((item)=>item.matricula===matriculabuscar)?.matricula
  return new Promise((resolve,reject)=>{
      if(matriculaEncontrada) resolve(matriculaEncontrada,objPintar.matricula=matricula) ;
		else reject(pintarError("El coche esta dado de baja "))
  })
}
 




function buscarPropietario(matriculaEncontrada) {
    const propietario=arrayPropietarios.find((item)=>item.matricula===matriculaEncontrada)?.nombre
    return new Promise((resolve,reject)=>{
        if(propietario) resolve(propietario,objPintar.propietario=propietario) ;
          else reject(pintarError(" no dispongo el nombre de ese cliente "))
    })
}


function buscarMultas(nombre) {
    const multas=arrayMultas.find((item)=>item.nombre===nombre)?.multa
    return new Promise((resolve,reject)=>{
        if(multas) resolve(`el señor ${nombre} tiene ${multas} multas`,objPintar.multas=multas) ;
          else reject(pintarError(` el señor ${nombre} no tiene multas `))
    })
}




function pintarTabla(array) {
    const tabla=document.querySelector("#tabla")
    let tr=document.createElement("tr")
             tabla.append(tr)

        array.forEach(({matricula,propietario,multas}) => {

             tr.innerHTML= ` <td>${matricula}</td>
                             <td>${propietario}</td>
                             <td>${multas}</td>`
            
          
        });
       
}


function pintarError(error) {
    parrafo.textContent=error
}