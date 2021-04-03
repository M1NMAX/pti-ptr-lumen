@extends('layouts.home')

@section('content')
    <div class="search-bar">
        <input class="pesquisa" type="text" placeholder="Search..">
    </div>
    <div class="catg">
    <?php
    
        for ($x = 0; $x <= 8; $x++) {
            echo  '<div class="botao" >
                        <div class="principal" >
                            <img src="img\basicRoom.png" alt="Imagem ilustrativa de um quarto" class="imagem">
                            <button name="cat" value="Quarto" type="submit" class="centro">Quarto</button>
                        </div>
                        <p class="w3-center"><i class="fa fa-venus w3-pale-red w3-padding"></i> <i class="fa fa-mars w3-light-blue w3-padding"></i> 
                            <button  class="plusPhoto" type="submit"> <i class="fa fa-plus"></i><i class="fa fa-camera"></i></button></p>
		            </div>';
        }
    ?>
    </div>
    @endsection
