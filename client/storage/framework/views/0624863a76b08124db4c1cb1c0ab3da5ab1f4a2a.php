

<?php $__env->startSection('content'); ?>
    <div class="d-flex justify-content-center ">
    <form action="" method="POST">
        <h2> Registo </h2> 
        <div class="row"> <!-- ROW 1 -->
            <div class="input-group mb-3 column">
                <label for="name">Nome Completo: </label>
                <input type="text" class="form-control form-control-sm"
                id="name" name="name">
                <label for="date">Data de Nascimento: </label>
                <input type="date" class="form-control form-control-sm"
                id="date" name="date">
            </div>
            <div class="input-group mb-3 column imgIn">
                <label for="img">Imagem de Perfil:</label>
                <input type="file" id="img" name="img" accept="image/*">
            </div>
        </div>
        <div class="row"> <!-- ROW 2 -->
            <div class="input-group mb-3 column">
                <label for="email">Email: </label>
                <input type="email" class="form-control form-control-sm"
                    id="email" placeholder="exemplo@gmail.com" name="email">
            </div>
            <div class="input-group mb-3 column">
                <label for="password">Password: </label>
                <input type="password" class="form-control form-control-sm"
                    id="password" name="password">
                <label for="password_confirmation">Confirmar Password: </label>
                <input type="password" class="form-control form-control-sm "
                    id="password_confirmation" name="password_confirmation">
            </div>
        </div>
        <div class="row"> <!-- ROW 3 -->
            <div class="input-group mb-3 column">
                <label for="username">Username: </label>
                <input type="text" class="form-control form-control-sm"
                    id="username" name="username" >
            </div>
            <div class="input-group column">
                <h4>Sou... </h4>
                <input type="radio" id="estudante" name="tipo" value="estudante">
                <label for="estudante">Estudante</label><br>
                <input type="radio" id="senhorio" name="tipo" value="senhorio">
                <label for="senhorio">Senhorio</label><br>
            </div>
        </div>

        <div id="estudante">
            <div class="input-group mb-3">
                <label for="uni">Instituição: </label>
                <input type="text" class="form-control form-control-sm"
                id="uni" placeholder="Universidade - Faculdade" name="uni">
            </div>
        </div>
        <div class="d-flex justify-content-center">
                <button type="submit" class="centro2">Submit</button>
                <button type="reset" class="centro2"> Reset</button>
        </div>

    </form>
</div>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.beforeLog', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\Users\ASUS\Documents\GitHub\pti-ptr-lumen\client\resources\views/register.blade.php ENDPATH**/ ?>