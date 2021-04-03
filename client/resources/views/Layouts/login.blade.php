@extends('layouts.login')


@section('content')
    <div class="box">
        <h1>Login</h1>
        {!! Form::open(['url' => 'contact/submit']) !!}
            {{Form::text('username', '',['class' => 'username', 'placeholder' => 'Username'])}}

            {{Form::password('password',['class' => 'password', 'placeholder' => 'Password'])}}

            {{Form::submit('Login', ['class' => 'submit', 'placeholder' => 'Login'])}}
        {!! Form::close() !!}
        <a href="/register">Registe-se</a>
    </div>
@endsection
