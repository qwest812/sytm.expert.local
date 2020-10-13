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
        $researches = Writenew::where("type", 2)->take(3)->orderBy('id', 'desc')->get();
        foreach ($researches as $key => $research) {

            $researches[$key]->url_id = Url::where("id", $researches[$key]->url_id)->first();
        }
        return view("main", compact("researches"));
    }

    public function services()
    {
        return view("services");
    }

    public function contacts()
    {
        return view("contacts");
    }

    public function route($lang, $path="", Request $request)
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

    public function news()
    {
        $page["title"] = "Новини | YOUR TOTAL MARKET";
        $page["description"] = "Тут можна ознайомитися з останніми новинами ринку, підготованними нашими аналітиками.";
        return view("news", compact("page"));
    }

    public function researches()
    {
        $page['title'] = "Дослідження | YOUR TOTAL MARKET";
        $page['description'] = "Тут можна ознайомитися з нашими готовими дослідженнями.";

        return view("researches", compact('page'));
    }

    public function test()
    {
        return view("test");
    }

    public function sendMail(Request $request)
    {
        $objDemo = new \stdClass();
        $objDemo->name = $request->name;
        $objDemo->phone = $request->phone;
        $objDemo->email = $request->email;
        $objDemo->text_field = $request->text_field;
        $to = 'clients@ytm.expert';
        $subject = 'Clients';

        // Для отправки HTML-письма должен быть установлен заголовок Content-type
        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $message = '
<html>
<head>
  <title>Birthday Reminders for August</title>
</head>
<body>
 <p>User:  ' . $request->name . '</p>
 <p>Phone:  ' . $request->phone . '</p>
 <p>Email:  ' . $request->email . '</p>
 <p>Text:  ' . $request->text_field . '</p>
</body>
</html>
';
        if (mail($to, $subject, $message, $headers)) {
            return json_encode(true);
        } else {
            return json_encode(false);
        }
//        Mail::to("clients@ytm.expert")->send(new Order($objDemo));
//        if (Mail::failures()) {
//            // return failed mails
//            return new \Exception(Mail::failures());
//        }
    }
}
