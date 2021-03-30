@extends('layouts.home')

@section('content')
    <h1>Home</h1>
    <div class="catg">
		<div class="botao">
		    <img src="img\basicRoom.png" alt="Imagem ilustrativa de um quarto" class="imagem">
		    <button name="cat" value="Quarto" type="submit" class="centro">Quarto</button>
		</div>
		<div class="botao">
		    <img src="img\basicRoom.png" alt="Imagem ilustrativa de um quarto" class="imagem">
		    <button name="cat" value="Quarto" type="submit" class="centro">Quarto</button>
		</div>
		<div class="botao">
		    <img src="img\basicRoom.png" alt="Imagem ilustrativa de um quarto" class="imagem">
		    <button name="cat" value="Quarto" type="submit" class="centro">Quarto</button>
		</div>
		<div class="botao">
		    <img src="img\basicRoom.png" alt="Imagem ilustrativa de um quarto" class="imagem">
		    <button name="cat" value="Quarto" type="submit" class="centro">Quarto</button>
		</div>
        <div class="botao">
		    <img src="img\basicRoom.png" alt="Imagem ilustrativa de um quarto" class="imagem">
		    <button name="cat" value="Quarto" type="submit" class="centro">Quarto</button>
		</div>
		<div class="botao">
		    <img src="img\basicRoom.png" alt="Imagem ilustrativa de um quarto" class="imagem">
		    <button name="cat" value="Quarto" type="submit" class="centro">Quarto</button>
		</div>
		<div class="botao">
		    <img src="img\basicRoom.png" alt="Imagem ilustrativa de um quarto" class="imagem">
		    <button name="cat" value="Quarto" type="submit" class="centro">Quarto</button>
		</div>
		<div class="botao">
		    <img src="img\basicRoom.png" alt="Imagem ilustrativa de um quarto" class="imagem">
		    <button name="cat" value="Quarto" type="submit" class="centro">Quarto</button>
		</div>
    </div>
    @endsection

@section('sidebar')
    @parent
    <p>This is appended to the sidebar</p>
@endsection
