<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    protected $guarded = [];
    protected $table = 'guest';


    public function user()
    {
        return $this->morphOne(User::class, 'userable');
    }
}

