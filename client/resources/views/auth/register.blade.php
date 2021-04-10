@extends('layouts.app')

@section('content')
<div class="containerA d-flex justify-content-center">
    <form action="" method="POST">
        <h2> Registo </h2> 

    <div class="row align-items-start">
    <div class="col">
        <label for="name">Nome Completo: </label>
        <input type="text" class="form-control form-control-sm"
            id="name" name="name">
    </div>
    <div class="col">
    <label for="email">Email: </label>
        <input type="email" class="form-control form-control-sm"
            id="email" placeholder="exemplo@gmail.com" name="email">
        <!-- <label for="date">Data de Nascimento: </label>
        <input type="date" class="form-control form-control-sm"
            id="date" name="date"> -->
    </div>
    <div class="col">
    <label for="username">Username: </label>
    <input type="text" class="form-control form-control-sm"
        id="username" name="username" >
    </div>
  </div>
  <div class="row align-items-center">
    <div class="col">
        <label for="password">Password: </label>
        <input type="password" class="form-control form-control-sm"
            id="password" name="password">
    </div>
    <div class="col">
        <label for="password_confirmation">Confirmar Password: </label>
        <input type="password" class="form-control form-control-sm "
            id="password_confirmation" name="password_confirmation">
    </div>
  </div>
    <br>
  <input type="radio" id="inquilino" name="tipo" value="inquilino">
    <label for="inquilino">Estou interessado em alugar um alojamento</label><br>
    <input type="radio" id="senhorio" name="tipo" value="senhorio">
    <label for="senhorio">Tenho alojamentos para alugar</label><br>

    <label for="uni">Instituição: </label>
    <input type="text" class="form-control form-control-sm"
        id="uni" placeholder="Universidade - Faculdade" name="uni">
    <br>

    <div class="d-flex justify-content-center">
        <button type="submit" class="centro2">Submit</button>
        <button type="reset" class="centro2"> Reset</button>
    </div>

    </form>
</div>
@endsection