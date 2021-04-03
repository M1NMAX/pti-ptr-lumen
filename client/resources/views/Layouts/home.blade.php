<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>SweetUni</title>
        <link rel="stylesheet" href="/css/app.css">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        
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
            <p class="slogan">Your sweet home away from home</p>
            <div class="buttonImg">
                <a href='#down'> 
                  <img src="img/scroll.png" class="img"  width="10%"/> 
                  <a class="buttonImgLink" href='#down'>Ver mais</a>
                </a>
          </div>
        </div>  
          <div class="text" id = "down">
            @yield('content')
          </div>          
    </body>
</html>