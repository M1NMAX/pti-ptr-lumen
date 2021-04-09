$( document ).ready(function() {
    //esse codigo aqui dentro
  
    $('.confImg').on('click', function(){
        const novaImagem = document.getElementById("submeterImagem");
        document.getElementsByClassName("imagemPerfil").src = novaImagem.value.slice(12);
    });

    $('#submeterImagem').on('change', function(imagem) {
        if (imagem.files[0]){
            var le = new FileReader();
            le.onload = function(imagem){
                document.getElementsByClassName("imagemPerfil").setAttribute("src", imagem.target.result);
            }
            le.readAsDataURL(imagem.files[0]);
        }
        document.getElementsByClassName("confImg").style.display = "block";
    });

});