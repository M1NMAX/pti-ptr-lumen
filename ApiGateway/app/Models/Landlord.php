<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Landlord extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $table = 'landlord';


    public function user()
    {
        return $this->morphOne(User::class, 'userable');
    }
}
