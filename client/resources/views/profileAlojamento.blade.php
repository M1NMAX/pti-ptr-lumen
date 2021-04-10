@extends('layouts.app')

@section('content')
    <div class="profile">
        <div class="w3-third w3-padding-large">
            <div class="profile-img"> 
                <img style="width:100%" src="../img/basicRoom.png" alt="Standart profile picture of the room"/>
                <div class="btn btn-lg">
                    <form  action="/actions/newImage" method="POST" enctype="multipart/form-data">
                        <input class="w3-input" type="file" name="fileInput" id="submeterImagem" >
                        <p class="w3-text-grey w3-padding">Clique na imagem para alterá-la</p>
                        <input class="confImg" style="" class="w3-input" type="submit" name="perfilImg" value="Confirmar">
                    </form>
                    <button>Estou interessado </button>
                </div>
            </div>
        </div>
        <div class="w3-twothird profile w3-padding-large">
            <div class="tab-content profile" id="myTabContent">
                <div>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Morada: </label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>Rua do sol</p>
                        </div>
                    </div>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Preço: </label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>100€</p>
                        </div>
                    </div>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Estado de ocupação:</label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>Reservado</p>
                        </div>
                    </div>
                    <h3>Informações sobre o Alojamento</h3>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Número de quartos:  </label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>3</p>
                        </div>
                    </div>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Número de casas de banho:  </label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>2</p>
                        </div>
                    </div>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Área: </label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>100m<sup>2</sup> </p>
                        </div>
                    </div>
                    <div class="row w3-margin-left w3-margin-top w3-margin-left">
                        <div class="col-md-4 profile">
                            <label>Orientação solar:</label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>Norte (N)</p>
                        </div>
                    </div>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Acesso à Internet: </label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>Existe</p>
                        </div>
                    </div>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Limpeza: </label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>Cada um faz a sua própria</p>
                        </div>
                    </div>
                    <h3>Requisitos dos inquilinos</h3>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Faixa Etária: </label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>18-23</p>
                        </div>
                    </div>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Género preferecial: </label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>Masculino</p>
                        </div>
                    </div>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Permite fumadores? </label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>Não</p>
                        </div>
                    </div>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Permite animais de estimação?</label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>Não</p>
                        </div>
                    </div>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Outras informações complementares</label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>Não pode ter visitas </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
