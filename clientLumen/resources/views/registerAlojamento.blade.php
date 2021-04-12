@extends('layouts.app')

@section('content')
<div class="containerA">
<form action="" method="POST"> 
<h1>Novo Alojamento</h1>
<h4>Características principais</h4>
<div class="row align-items-start">
    <div class="col">
    <input type="file" class="custom-file-input" id="customFile">
    <label class="custom-file-label" for="customFile">Escolha as fotos do Alojamento</label>
    </div>
    <div class="col">
    <input type="text" class="form-control form-control-sm"
    id="birthday" placeholder="Morada" name="morada" value="">
    </div>
    <div class="col">
    <input type="number" class="form-control form-control-sm"
    id="preco" placeholder="Preço (por mês)" name="preco" value="" min="0" max="2000" step="5" value="200">
    </div>
    <div class="col">
    <label>Estado de ocupação</label><br>
    <input type="radio" id="desocupado" name="ocupacao" value="desocupado">
    <label for="desocupado">Desocupado</label><br>
    <input type="radio" id="reservado" name="ocupacao" value="reservado">
    <label for="reservado">Reservado</label><br>
    <input type="radio" id="ocupado" name="ocupacao" value="ocupado">
    <label for="ocupado">Ocupado</label><br>
    </div>
  </div>
<!--Infos alojamento-->
<h4>Informações sobre o Alojamento</h4>
<div class="row align-items-center">
    <div class="col">
    <label>Número de quartos</label>
    <input type="number" class="form-control form-control-sm "
        id="numQuartos" placeholder="Número de quartos" name="numQuartos" min="0" max="9" step="1" value="2">
    </div>
    <div class="col">
    <label>Número de casas de banho</label>
    <input type="number" class="form-control form-control-sm"
        id="numWC" placeholder="Número de casas de banho" name="numWC" min="0" max="7" step="1" value="1">
    </div>
    <div class="col">
    <label>Área</label>
    <input type="number" class="form-control form-control-sm "
        id="area" placeholder="Área" name="area" min="0" max="7" step="1" value="60m^2">
    </div>
  </div>
  <div class="row align-items-center">
    <div class="col">
    <label>Orientação solar</label>
    <select id="orientSolar" name="orientSolar">
        <option value="norte">Norte (N) </option>
        <option value="nordeste">Nordeste (NE) </option>
        <option value="este">Este (E) </option>
        <option value="sudeste">Sudeste (SE) </option>
        <option value="sul">Sul (S) </option>
        <option value="sudoeste">Sudoeste (SO) </option>
        <option value="oeste">Oeste (O) </option>
        <option value="noroeste">Noroeste (NO) </option>
    </select>
    </div>
    <div class="col">
    <label>Acesso à Internet</label><br>
        <input type="radio" id="exist" name="internet" value="exist">
        <label for="exist">Existe</label><br>
        <input type="radio" id="notExist" name="internet" value="notExist">
        <label for="notExist">Não existe</label><br>
    </div>
    <div class="col">
    <label>Limpeza</label><br>
            <input type="radio" id="diy" name="limpeza" value="diy">
            <label for="diy">Cada um faz a sua própria</label><br>
            <input type="radio" id="profissional" name="limpeza" value="profissional">
            <label for="profissional">É feita por profissionais</label><br>
    </div>
  </div>
   <!--Infos inquilinos-->
  <h4>Requisitos dos inquilinos</h4>
  <div class="row align-items-end">
    <div class="col">
    <label>Faixa Etária<label><br>
    <input type="number" class="form-control form-control-sm"
        id="minIdade" placeholder="Min" name="minIdade" min="17" max="26" step="1" value="Min">
    <input type="number" class="form-control form-control-sm "
        id="maxIdade" placeholder="Max" name="maxIdade" min="18" max="27" step="1" value="Max">
    </div>
    <div class="col">
    <label>Género preferecial</label><br>
    <input class="w3-radio" type="radio" name="genero" value="M">Masculino &nbsp;
    <input class="w3-radio" type="radio" name="genero" value="F">Feminino &nbsp;
    <input class="w3-radio" type="radio" name="genero" value="Mix">Misto &nbsp;
    <input class="w3-radio" type="radio" name="genero" value="outro"> Indiferente
    </div>
    <div class="col">
    <label>Permite fumadores?</label><br>
    <input class="w3-radio" type="radio" name="genero" value="S">Sim &nbsp;
    <input class="w3-radio" type="radio" name="genero" value="N">Não &nbsp;
    </div>
    <div class="col">
    <label>Permite animais de estimação?</label><br>
    <input class="w3-radio" type="radio" name="genero" value="S">Sim &nbsp;
    <input class="w3-radio" type="radio" name="genero" value="N">Não &nbsp;
    </div>
  </div>
    <br>
    <div class="input-group-lg mb-3">
        <input type="text" class="form-control form-control-sm"
            id="others" placeholder="Outras informações complementares" name="others" value="">
    </div>


    <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary btn-sm m-3">Submit</button>
        <button type="reset" class="btn btn-primary btn-sm m-3"> Reset</button>
    </div>
    </form>
</div>
</div>
@endsection