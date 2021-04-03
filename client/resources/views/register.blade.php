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
                <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary btn-sm m-3">Submit</button>
                    <button type="reset" class="btn btn-primary btn-sm m-3"> Reset</button>
                </div>
        </form>
    </div>
</div>
@endsection
