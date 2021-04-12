

<?php $__env->startSection('content'); ?>
<div class = "container">
<!-- class="w3-container w3-blue w3-center w3-display-middle w3-padding-32"-->

    <form method="POST" action="<?php echo e(route('login')); ?>" >
        <h2> Login </h2> <br><br>
        <?php if(isset($status)): ?>
        <h1>um</h1>
    <?php $__currentLoopData = $errors; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <h1><?php echo e($error); ?> </h1>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
<?php endif; ?>
        <label for="user">Username:</label>
        <input type="text" name="email"><br><br>
        <label for="pass">Password:</label>
        <input type="password" name="password"><br><br>
        <input type="submit" class="centro2" value="Entrar!"><br><br>
        <p>Ainda não tem conta? <a href="/register">Registar</a></p>
    </form>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\Users\ASUS\Documents\GitHub\pti-ptr-lumen\client\resources\views/auth/login.blade.php ENDPATH**/ ?>