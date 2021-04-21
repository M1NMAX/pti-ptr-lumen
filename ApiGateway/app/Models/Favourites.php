<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favourites extends Model
{
    protected $guarded = [];

    protected $table = 'favourites';

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

}

