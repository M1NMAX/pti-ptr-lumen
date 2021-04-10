@extends('layouts.app')

@section('content')
    <div class="d-flex justify-content-center ">
    <form action="" method="POST">
        <h2> Novo Alojamento </h2> 
        <div class="row"> <!-- 1 -->
            <div class="input-group mb-3 column">
                <label for="name">Nome de apresentação:</label>
                <input type="text" placeholder="ex. Casa das Fontes T3" class="form-control form-control-sm"
                id="name" name="name">
                <label for="morada">Morada: </label>
                <input type="text" class="form-control form-control-sm"
                id="morada" name="morada">
                <label for="coordenadas">Coordenadas: </label>
                <input type="text" class="form-control form-control-sm"
                id="coordenadas" name="coordenadas">
            </div>
            <div class="input-group mb-3 column imgIn"> <!-- MAIS QUE UMA -->
                <label for="img">Imagens:</label>
                <input type="file" id="img" name="img" accept="image/*">
            </div>
        </div>
        <div class="row"> <!-- 2 -->
            <div class="input-group mb-3 column">
                <label for="description">Breve Descrição: </label>
                <input type="text" class="form-control form-control-sm"
                    id="description" name="description">
            </div>
            <div class="input-group mb-3 column">
                <label for="char">Características Principais (max. 3): </label><br>
                <input type="text" class="form-control form-control-sm"
                    id="char" name="char"><br>
                <input type="text" class="form-control form-control-sm"
                    id="char1" name="char1"><br>
                <input type="text" class="form-control form-control-sm"
                    id="char2" name="char2">
            </div>
        </div>
        <div class="row"> <!-- 3 -->
            <div class="input-group mb-3 column">
                <label for="cost">Preço: </label>
                <input type="text" class="form-control form-control-sm"
                    id="cost" name="cost">
            </div>
        </div>
        <div class="d-flex justify-content-center">
                <button type="submit" class="centro2">Submit</button>
                <button type="reset" class="centro2"> Reset</button>
        </div>

    </form>
</div>
@endsection