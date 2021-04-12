<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class Alojamento extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $table = "alojamento";
    protected $fillable = [
        'name', 'descricao', 'preco', 'coordenadas',
    ];


    protected $attributes = [
        'rating' => 0.0,
        'nRates' => 0,
     ];

     public function caracteristicas(){
         return $this->belongsToMany(Caracteristica::class);
     }
}
