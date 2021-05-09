

<?php $__env->startSection('content'); ?>
    <div class="search-bar">
        <input class="pesquisa" type="text" placeholder="Search..">
    </div>
    <div class="catg">
    <?php
        for ($x = 0; $x <= 8; $x++) {
            echo  '<div class="botao">
                        <img src="img\basicRoom.png" alt="Imagem ilustrativa de um quarto" class="imagem">
                        <button name="cat" value="Quarto" type="submit" class="centro">Quarto</button>
		            </div>';
        }
    ?>
    </div>
    <?php $__env->stopSection(); ?>

<?php $__env->startSection('sidebar'); ?>
    ##parent-placeholder-19bd1503d9bad449304cc6b4e977b74bac6cc771##
    <p>This is appended to the sidebar</p>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.home', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\Projects\pti-ptr-lumen\ApiGateway\resources\views/home.blade.php ENDPATH**/ ?>