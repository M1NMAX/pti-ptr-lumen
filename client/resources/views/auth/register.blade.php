@extends('layouts.register')

@section('content')
<div class="header2">
    <div class="d-flex justify-content-center ">

        <form action="" method="POST">
             {{--@csrf--}}
            <div class="input-group input-group-lg mb-3">
                <input type="text" class="form-control form-control-sm "
                    id="username" placeholder="Username" name="username" >
            </div>

            <div class="input-group mb-3">
                <input type="text" class="form-control form-control-sm"
                id="name" placeholder="Name" name="name" >
            </div>

            <div class="mb-3">
                <input type="email" class="form-control form-control-sm "
                    id="email" placeholder="Email" name="email">
            </div>

            <div class="input-group mb-3">
                <input type="password" class="form-control form-control-sm"
                    id="password" placeholder="Password" name="password">
            </div>

            <div class="input-group mb-3">
                <input type="password" class="form-control form-control-sm "
                id="password_confirmation" placeholder="Repeat Password" name="password_confirmation">
            </div>

            <div class="form-check text-light">
                <input class="form-check-input" type="radio" name="flexRadio" id="flexRadio1" value="lodger" checked>
                <label class="form-check-label" for="flexRadio1">
                  Pocuro alojamento
                </label>
              </div>
              <div class="form-check text-light">
                <input class="form-check-input" type="radio" name="flexRadio" id="flexRadio2" value="landlord" >
                <label class="form-check-label" for="flexRadio2">
                  Tenho alojamento disponível
                </label>
              </div>

                <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary btn-sm m-3">Submeter</button>
                    <button type="reset" class="btn btn-primary btn-sm m-3">Limpar</button>
                </div>
        </form>
    </div>
</div>
@endsection
