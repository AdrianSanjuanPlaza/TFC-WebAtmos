exports.getFecha = function(){
    let fecha = new Date()
    let stringFecha = `${fecha.getDate().toString()}-${(fecha.getMonth()+1).toString()}-${fecha.getFullYear().toString()}`
    return stringFecha;
}