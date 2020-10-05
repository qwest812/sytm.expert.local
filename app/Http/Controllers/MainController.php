<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Admin\NewsController;
use App\Url;
use App\Writenew;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function index()
    {
        return view("main");
    }

    public function services()
    {
        return view("services");
    }

    public function contacts()
    {
        return view("contacts");
    }

    public function route($lang, $path, Request $request)
    {
        $path = $lang . '/' . $path;
        $url_id = Url::where("url", $path)->first("id")->toArray();
        if (empty($url_id)) {
            abort(404);
        }
        $page = Writenew::where("url_id", $url_id)->first()->toArray();
        switch ($page["type"]) {
            case NewsController::NEWS:
                return view('page', compact("page"));
                break;
            case NewsController::RESEARCH :
                return view('research', compact("page"));
                break;
        }
        abort(404);
    }
    public function news(){
        return view("news");
    }
    public function researches(){
        return view("researches");
    }
}
