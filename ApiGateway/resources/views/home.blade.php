@extends('layouts.home')

@section('content')
    <div class="search-bar">
        <input class="pesquisa" type="text" placeholder="Search..">
    </div>
    <div class="catg">
    <?php
        for ($x = 0; $x <= 8; $x++) {
            echo  '<div class="botao">
                        <img src="img\basicRoom.png" alt="Imagem ilustrativa de um quarto" class="imagem">
                        <button name="cat" value="Quarto" type="submit" class="centro">Quarto</button>
		            </div>';
        }
    ?>
    </div>
    @endsection

@section('sidebar')
    @parent
    <p>This is appended to the sidebar</p>
@endsection
