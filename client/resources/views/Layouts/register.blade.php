@extends('layouts.app')

@section('content')
<div class="d-flex justify-content-center ">
    <form action="" method="POST">
        @csrf
        <div class="input-group input-group-lg mb-3">
            <input type="text" class="form-control form-control-sm @error('username') border border-Danger @enderror"
                id="username" placeholder="Username" name="username" value="{{old('username')}}">
            @error('username')
                <span class="form-text text-danger fs-6"> {{ $message}} </span>
            @enderror
        </div>
        <div class="input-group mb-3">
            <input type="text" class="form-control form-control-sm @error('name') border border-Danger @enderror"
            id="name" placeholder="Name" name="name" value="{{ old('name')}}">
                @error('name')
                <span class="form-text text-danger fs-6"> {{ $message}} </span>
            @enderror
            </div>
        <div class="mb-3">
            <input type="email" class="form-control form-control-sm @error('email') border border-Danger @enderror"
                id="email" placeholder="Email" name="email" value="{{old('email')}}">
                @error('email')
                <span class="form-text text-danger fs-6"> {{ $message}} </span>
            @enderror
            </div>
            <div class="input-group mb-3">
            <input type="password" class="form-control form-control-sm @error('password') border border-Danger @enderror"
                id="password" placeholder="Password" name="password">
                @error('password')
                <span class="form-text text-danger fs-6"> {{ $message}} </span>
            @enderror
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
@endsection
