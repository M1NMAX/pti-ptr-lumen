@extends('layouts.app')

@section('content')
<h1>Novo Alojamento</h1>
<div class="d-flex justify-content-center ">
    <form action="" method="POST"> 
        <h3>Características principais</h3>
        <div class="custom-file">
            <input type="file" class="custom-file-input" id="customFile">
            <label class="custom-file-label" for="customFile">Escolha as fotos do Alojamento</label>
          </div>
        <div class="mb-3">
            <input type="text" class="form-control form-control-sm"
                id="birthday" placeholder="Morada" name="morada" value="">
               
        </div>
        <!-- Preço-->
        <div class="mb-3">
            <input type="number" class="form-control form-control-sm"
                id="preco" placeholder="Preço (por mês)" name="preco" value="" min="0" max="2000" step="5" value="200">
               
        </div>
        <div class="mb-3">
            <label>Estado de ocupação</label><br>
            <input type="radio" id="desocupado" name="ocupacao" value="desocupado">
            <label for="desocupado">Desocupado</label><br>
            <input type="radio" id="reservado" name="ocupacao" value="reservado">
            <label for="reservado">Reservado</label><br>
            <input type="radio" id="ocupado" name="ocupacao" value="ocupado">
            <label for="ocupado">Não existe</label><br>
        </div>


        <!--O que ha perto-->
        <h3 style="color:red;">Quanto à sua localização?????? (ginásios, perto da uni, etc)</h3>
        

        <!--Infos alojamento-->
        <h3>Informações sobre o Alojamento</h3>
        <div class="mb-3">
            <label>Número de quartos</label>
            <input type="number" class="form-control form-control-sm "
                id="numQuartos" placeholder="Número de quartos" name="numQuartos" min="0" max="9" step="1" value="2">
                       </div>
        <div class="mb-3">
            <label>Número de casas de banho</label>
            <input type="number" class="form-control form-control-sm"
                id="numWC" placeholder="Número de casas de banho" name="numWC" min="0" max="7" step="1" value="1">
               
        </div>
        <div class="mb-3">
            <label>Área</label>
            <input type="number" class="form-control form-control-sm "
                id="area" placeholder="Área" name="area" min="0" max="7" step="1" value="60m^2">
              
        </div>
        <div class="mb-3">
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
        <div class="mb-3">
            <label>Acesso à Internet</label><br>
            <input type="radio" id="exist" name="internet" value="exist">
            <label for="exist">Existe</label><br>
            <input type="radio" id="notExist" name="internet" value="notExist">
            <label for="notExist">Não existe</label><br>
        </div>
        <div class="mb-3">
            <label>Limpeza</label><br>
            <input type="radio" id="diy" name="limpeza" value="diy">
            <label for="diy">Cada um faz a sua própria</label><br>
            <input type="radio" id="profissional" name="limpeza" value="profissional">
            <label for="profissional">É feita por profissionais</label><br>
        </div>
       
        <!--Infos inquilinos-->
        <h3>Requisitos dos inquilinos</h3>
        <div class="mb-3">
            <label>Faixa Etária<label><br>
            <input type="number" class="form-control form-control-sm"
                id="minIdade" placeholder="Min" name="minIdade" min="17" max="26" step="1" value="Min">
             <input type="number" class="form-control form-control-sm "
                id="maxIdade" placeholder="Max" name="maxIdade" min="18" max="27" step="1" value="Max">
        </div>
        <div class="mb-3">
        <label>Género preferecial</label><br>
            <input class="w3-radio" type="radio" name="genero" value="M">Masculino &nbsp;
            <input class="w3-radio" type="radio" name="genero" value="F">Feminino &nbsp;
            <input class="w3-radio" type="radio" name="genero" value="Mix">Misto &nbsp;
            <input class="w3-radio" type="radio" name="genero" value="outro"> Indiferente
        </div>
        <div class="mb-3">
        <label>Permite fumadores?</label><br>
            <input class="w3-radio" type="radio" name="genero" value="S">Sim &nbsp;
            <input class="w3-radio" type="radio" name="genero" value="N">Não &nbsp;
        </div>
        <label>Permite animais de estimação?</label><br>
            <input class="w3-radio" type="radio" name="genero" value="S">Sim &nbsp;
            <input class="w3-radio" type="radio" name="genero" value="N">Não &nbsp;
        </div>

        <div class="input-group-lg mb-3">
            <input type="text" class="form-control form-control-sm"
                id="others" placeholder="Outros requisitos complementares" name="others" value="">
        </div>


        <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary btn-sm m-3">Submit</button>
            <button type="reset" class="btn btn-primary btn-sm m-3"> Reset</button>
        </div>
    </form>
</div>
@endsection