<html>
    <head>

    </head>
    <body>


        {{-- @isset($resp['token'])
        <p>{{$resp['user']['name']}}</p>
        <p>// $records is defined and is not null...<p>
        @endisset--}}
        @isset($resp->token)
        <p>{{$resp->user->name}}</p>
        <p>// $records is defined and is not null...<p>
        @endisset
        <p>ola</p>
    </body>


</html>
