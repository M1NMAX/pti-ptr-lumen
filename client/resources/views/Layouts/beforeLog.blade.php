<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>SweetUni</title>
        <link rel="stylesheet" href="/css/app.css">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
    </head>
    <body class="log">    
        @include('inc.navbar')
        <div class="container">
            @yield('content')
        </div> 
          
    </body>
</html>
