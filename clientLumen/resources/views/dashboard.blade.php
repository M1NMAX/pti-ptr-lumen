

@extends('layouts.home')

@section('content')

        @isset($resp->token)
        <p>{{$resp->user->name}}</p>
        <p>// $records is defined and is not null...<p>
        @endisset
        <p>ola</p>
        @isset($test)
            <h1>{{$test}}</h1>
        @endisset

@endsection



