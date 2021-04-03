<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>SweetUni</title>
        <link rel="stylesheet" href="/css/app.css">
        
    </head>
    <body>
        <div class="header">
            <a href="/" class="logo">SweetUni</a>
            <div class="header-right">
              <a href="/login">Login</a>
              <a href="/register">Registo</a>
            </div>
        </div>
        <div class="header2">
            @yield('content')
        </div> 
          
    </body>
</html>