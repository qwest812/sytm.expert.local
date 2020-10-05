<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Url extends Model
{
    protected $guarded=[];

    public function pages(){
        return $this->hasOne('App\Models\Writenew');
    }
}
