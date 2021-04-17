<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Landlord extends Model
{
    protected $guarded = [];
    protected $table = 'landlord';


    public function user()
    {
        return $this->morphOne(User::class, 'userable');
    }
}
