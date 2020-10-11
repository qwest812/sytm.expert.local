<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Admin\NewsController;
use App\Mail\Order;
use App\Url;
use App\Writenew;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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
    public function test(){
        return view("test");
    }
    public function sendMail(Request $request){
        $objDemo = new \stdClass();
//        $result=$request->all();
//        dump($result);
        $objDemo->name = $request->name;
        $objDemo->phone = $request->phone;
        $objDemo->email = $request->email;
        $objDemo->text_field = $request->text_field;
//        dump($objDemo);
//        exit();

        Mail::to("dauzer58@gmail.com")->send(new Order($objDemo));
        if (Mail::failures()) {
            // return failed mails
            return new \Error(Mail::failures());
        }
    }
}
