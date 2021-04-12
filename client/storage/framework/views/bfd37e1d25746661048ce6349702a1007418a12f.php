<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>SweetUni</title>
        <link rel="stylesheet" href="/css/app.css">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="js/app.js" type="text/javascript"></script>
    </head>
    <body class ="background">
        <?php echo $__env->make('inc.navbar', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        <div >
            <?php echo $__env->yieldContent('content'); ?>
        </div> 
          
    </body>
</html><?php /**PATH C:\Users\ASUS\Documents\GitHub\pti-ptr-lumen\client\resources\views/layouts/app.blade.php ENDPATH**/ ?>