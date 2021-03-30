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
              <a href="/registo">Registo</a>
            </div>
        </div>
        <div class="header2">
            <p class="slogan">Your sweet home away from home</p>
        </div>  
          <div class="text">
            @yield('content')
          </div>

          <div class="buttonImg">
                <img src="img/scroll.png" class="img" width="50%"/>
                <h3>Ver mais</h3>
          </div>
          
    </body>
</html>