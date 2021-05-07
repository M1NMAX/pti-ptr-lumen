<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class Rental extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $table = "rental";
    protected $fillable = [
        'accommodation_id', 'user_id','price','beginDate', 'endDate'
    ];   

    protected $attributes = [
        'paymentState' => false,
     ];
    public $timestamps = false;
    
    public function accommodations(){
        return $this->belongsToMany(Accommodation::class);
    }
}