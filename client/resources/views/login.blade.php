@extends('layouts.beforeLog')

@section('content')

<!-- class="w3-container w3-blue w3-center w3-display-middle w3-padding-32"-->
            <form >
                <h2> Login </h2> <br><br>
                <label for="user">Username:</label>
                <input type="text" name="user"><br><br>
                <label for="pass">Password:</label>
                <input type="password" name="pass"><br><br>
                <input type="submit" class="centro2" value="Entrar!"><br><br>
                <p>Ainda não tem conta? <a href="/register">Registar</a></p>
            </form>
@endsection
