@extends('layouts.app')

@section('content')
<div class = "containerA">
<!-- class="w3-container w3-blue w3-center w3-display-middle w3-padding-32"-->

    <form method="POST" action="{{ route('login')}}" >
        <h2> Login </h2> <br><br>
        @isset($status)
        <h1>um</h1>
    @foreach ($errors as $error )
        <h1>{{$error }} </h1>
    @endforeach
@endisset
        <label for="user">Username:</label>
        <input type="text" name="email"><br><br>
        <label for="pass">Password:</label>
        <input type="password" name="password"><br><br>
        <input type="submit" class="centro2" value="Entrar!"><br><br>
        <p>Ainda não tem conta? <a href="/register">Registar</a></p>
    </form>
</div>
@endsection
