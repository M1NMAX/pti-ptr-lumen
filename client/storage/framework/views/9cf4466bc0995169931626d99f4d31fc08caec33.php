<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>SweetUni</title>
        <link rel="stylesheet" href="/css/app.css">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="js/app.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="header">  <!--MUDAR BARRA DEPOIS DE FAZER SESSOES-->
            <a href="/" class="logo">SweetUni</a>
            <div class="header-right">
              <a href="/login">Login</a>
              <a href="/register">Registo</a>
            </div>
        </div>
        <div >
            <?php echo $__env->yieldContent('content'); ?>
        </div> 
          
    </body>
</html><?php /**PATH C:\Users\ASUS\Documents\GitHub\pti-ptr-lumen\client\resources\views/layouts/afterLog.blade.php ENDPATH**/ ?>