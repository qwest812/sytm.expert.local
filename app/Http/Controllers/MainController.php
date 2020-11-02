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
        $news = Writenew::where("type", 2)->take(3)->orderBy('id', 'desc')->get();
        foreach ($news as $key => $research) {
            $news[$key]->url = Url::where("id", $news[$key]->url_id)->first()->url;
        }
        return view("main", compact("news"));
    }

    public function services()
    {
        return view("services");
    }

    public function contacts()
    {
        return view("contacts");
    }

    public function route($lang, $path = "", Request $request)
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
        $news = Writenew::where("type", NewsController::NEWS)->get()->toArray();
        foreach ($news as $key => $new) {
            $url = Url::where("id", $new["url_id"])->first()->url;
            $news[$key]["url"] = $url;
            $news[$key]["time"] = explode(" ", $new["created_at"])[0];

        }
        return view("news", compact("page", 'news'));
    }

    public function researches()
    {
        $page['title'] = "Дослідження | YOUR TOTAL MARKET";
        $page['description'] = "Тут можна ознайомитися з нашими готовими дослідженнями.";
        $news = Writenew::where("type", NewsController::RESEARCH)->take(3)->get()->toArray();
        foreach ($news as $key => $new) {
            $url = Url::where("id", $new["url_id"])->first()->url;
            $news[$key]["url"] = $url;
            $news[$key]["time"] = explode(" ", $new["created_at"])[0];

        }
        return view("researches", compact('page', "news"));
    }

    public function marketing()
    {
        return view("marketing");
    }

    public function sendMail(Request $request)
    {
        $objDemo = new \stdClass();
        $objDemo->name = $request->name;
        $objDemo->phone = $request->phone;
        $objDemo->email = $request->email;
        $objDemo->text_field = $request->text_field;
        $to = 'info@ytm.expert';
        $subject = 'Clients';

        // Для отправки HTML-письма должен быть установлен заголовок Content-type
        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
        $headers .= "From: $to\n";
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
    }

    public function transferPricing()
    {
        return view("transfer-pricing");
    }

    public function marketResearch()
    {
        $page['title'] = "Дослідження | YOUR TOTAL MARKET";
        $page['description'] = "Тут можна ознайомитися з нашими готовими дослідженнями.";
        $news = Writenew::where("type", NewsController::RESEARCH)->take(3)->get()->toArray();
        foreach ($news as $key => $new) {
            $url = Url::where("id", $new["url_id"])->first()->url;
            $news[$key]["url"] = $url;
            $news[$key]["time"] = explode(" ", $new["created_at"])[0];

        }
        return view("market-research", compact('news'));
    }
}
