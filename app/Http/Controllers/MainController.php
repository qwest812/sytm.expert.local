<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Admin\NewsController;
use App\Url;
use App\Writenew;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MainController extends Controller
{
    public function index()
    {

        $news = Writenew::where("type", NewsController::RESEARCH)->take(3)->orderBy('id', 'desc')->get();
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
                return view('page', compact("page"));
                break;
        }
        abort(404);
    }

    public function news()
    {
        $page["title"] = "Новини | YOUR TOTAL MARKET";
        $page["description"] = "Тут можна ознайомитися з останніми новинами ринку, підготованними нашими аналітиками.";
        $news = Writenew::where("type", NewsController::NEWS)->where("deleted", false)->orderBy('id', 'desc')->paginate(3);
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
//        $news = Writenew::where("type", NewsController::RESEARCH)->where("deleted", false)->where("id","<",18)->orWhere("id",">",30)->paginate(6);
//        $news = DB::select("select * from `writenews` where `type` = 2 and `deleted` = 0 and (`id` < 18 or `id` > 30) limit 6 offset 0")->get()->paginate(6);
        $news = Writenew::where("type", NewsController::RESEARCH)->where("deleted", false)->where(function($query) {
            $query->where("id","<",18)->orWhere("id",">",30);
        })->paginate(6);
        foreach ($news as $key => $new) {
            $url = Url::where("id", $new["url_id"])->first()->url;
            $news[$key]["url"] = $url;
            $news[$key]["time"] = explode(" ", $new["created_at"])[0];
        }
        return view("researches", compact('page', "news", "news"));
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
        $news = Writenew::where("type", NewsController::RESEARCH)->where("deleted", false)->orWhere("id", "<=", 18)->orWhere("id", ">=", 30)->orderBy('id', 'desc')->take(3)->get()->toArray();
        foreach ($news as $key => $new) {
            if ($new["id"] >= 18 && $new["id"] <= 30) {
                unset($news[$key]);
                continue;
            }
            $url = Url::where("id", $new["url_id"])->first()->url;
            $news[$key]["url"] = $url;
            $news[$key]["time"] = explode(" ", $new["created_at"])[0];

        }
        return view("market-research", compact('news'));
    }

    public function searchr()
    {
        $page['title'] = "Пошук | YOUR TOTAL MARKET";
        $page['description'] = "Пошук данних";
        $page['h1'] = "Пошук данних";
        $searchRequest = "";
        $err = "";
        if (!empty($_GET["search"]) && strlen($_GET["search"]) > 3) {
            $searchRequest = $_GET["search"];
//            $res = DB::select('SELECT `id`, `h1`,`text`, `main_img`,`url_id` FROM writenews WHERE MATCH (text) AGAINST ("' . $searchRequest . '") ORDER by `id` DESC LIMIT 6');
            $res = DB::select('SELECT * FROM `writenews` WHERE `text` LIKE "%' . $searchRequest . '%" ORDER by `id` DESC LIMIT 6');
            $shortText = [];

            if (!empty($res)) {
                foreach ($res as $key => $elem) {
                    $url = Url::where("id", $elem->url_id)->first()->url;
                    $shortText[$key]["id"] = $elem->id;
                    $shortText[$key]["main_img"] = $elem->main_img;
                    $shortText[$key]["url"] = $url;
                    $shortText[$key]["text"] = mb_substr(
                            preg_replace('/\s+/', ' ', str_replace('&nbsp;', ' ', strip_tags($elem->text)))
                            , 0, 200) . "...";
                }
            } else {
                $err = "По запиту \"". $searchRequest."\" нічого не знайдено";
            }
        }

        return view("search", compact("page", "shortText", "err"));
    }
}
