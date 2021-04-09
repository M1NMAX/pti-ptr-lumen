@extends('layouts.afterLog')

@section('content')
    <div class="profile">
        <div class="w3-third w3-padding-large">
            <div class="profile-img">
                <img style="width:100%" src="../img/standartUser2.png" alt="Standart profile picture of the user"/>
                <div class="btn btn-lg">
                    <form  action="/actions/newImage" method="POST" enctype="multipart/form-data">
                        <input class="w3-input" type="file" name="fileInput" id="submeterImagem" >
                        <p class="w3-text-grey w3-padding">Clique na imagem para alterá-la</p>
                        <input class="confImg" style="" class="w3-input" type="submit" name="perfilImg" value="Confirmar">
                    </form>
                </div>
            </div>
        </div>
        <div class="w3-twothird profile w3-padding-large">
            <div class="tab-content profile" id="myTabContent">
                <div>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Username: </label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>0DragonFire0</p>
                        </div>
                    </div>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Nome Completo:</label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>João</p>
                        </div>
                    </div>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Email:</label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>checheche@gmail.com</p>
                        </div>
                    </div>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Data de Nascimento: </label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>22/01/2000</p>
                        </div>
                    </div>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Nº de contribuinte: </label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>123457789</p>
                        </div>
                    </div>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Características Pessoais: </label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>Organizado, vou para a cama cedo, gosto de limpar casas de banho</p>
                        </div>
                    </div>
                    <div class="row w3-margin-left w3-margin-top w3-margin-left">
                        <div class="col-md-4 profile">
                            <label>Preferências:</label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>Gostava de viver só com rapazes, de preferência da faculdade onde ando.</p>
                        </div>
                    </div>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Sou: </label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>Estudante</p>
                        </div>
                    </div>
                    <div class="row w3-margin-left w3-margin-top">
                        <div class="col-md-4 profile">
                            <label>Instituição</label>
                        </div>
                        <div class="col-md-7 profile">
                            <p>UL-FCUL</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
@endsection
