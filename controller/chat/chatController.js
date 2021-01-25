

module.exports = function(io){
    io.on('deneme_server',(message)=>{
        // console.log(message, '======',message.id)
         io.emit('deneme_client',message)
         
     })

}
