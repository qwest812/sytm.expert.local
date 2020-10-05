<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class BaseControler extends Controller
{
    protected $error = '';


    public function review($viewPath, array $parameters=[])
    {
        $parameters['error'] = $this->error;
        return view($viewPath, $parameters);
    }

    protected function setMessageError($message)
    {


        $this->error = $message;
    }
}
