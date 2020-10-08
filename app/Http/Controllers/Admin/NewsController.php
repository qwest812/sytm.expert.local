<?php

namespace App\Http\Controllers\Admin;

use App\Language;
use App\Url;
use App\Writenew;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;

class NewsController extends Controller
{
    const NEWS = 1;
    const RESEARCH = 2;

    function showNews()
    {
        $news = Writenew::all()->toArray();
        foreach ($news as $key => $new) {
            $lang = Language::where("id", $new["lang_id"])->first("language_name")->toArray();
            $url = Url::where("id", $new["url_id"])->first("url")->toArray();
            $news[$key]["language"] = $lang["language_name"];
            $news[$key]["url"] = $url["url"];
        }
        return view('admin.expert.news.news', compact('news'));
    }

    public function addNews()
    {
        $languages = Language::all()->toArray();
        return view('admin.expert.news.add-news', compact("languages"));
    }

    public function saveNews(Request $request)
    {
        $request = $request->all();

        if (!empty($request["main_img"])) {
            $image = $request["main_img"];
            unset($request["main_img"]);
            $originalName = $image->getClientOriginalName();
            $pathImg = $image->storeAS('images', $originalName);
            $request['main_img'] = '/storage/' . $pathImg;
        }


        if (!isset($request['lang_id'])) {
            return Redirect::back()->withErrors(['language']);
        }
        $langID = $request['lang_id'];
        $lang = Language::where('id', $langID)->first("language_name");
        $urp = $request['url'];
        if (empty($urp)) {
            return Redirect::back()->withErrors(['url']);
        }
        $urlPath = $lang->language_name . "/" . $urp;

        unset($request["url"]);
        if (array_key_exists("files", $request)) {
            unset($request["files"]);
        }

        try {
            $url = Url::where("url", $urlPath)->first();
            if ($url === null) {
                $url = Url::create(["url" => $urlPath]);
            } else {
                $url->url = $urlPath;
                $url->save();
            }
        } catch (QueryException  $er) {
            return Redirect::back()->withErrors(['url']);
        }
        try {
        if (empty($request["id"])) {
            $request["url_id"] = $url->id;
            Writenew::create($request);
        } else {
            $article = Writenew::find($request["id"])->first();
            $article->lang_id = $request["lang_id"];
            $article->type = $request["type"];
            $article->h1 = $request["h1"];
            $article->title = $request["title"];
            $article->description = $request["description"];
            $article->keyword = $request["keyword"];
            $article->text = $request["text"];
            $article->url_id = $url->id;
            if (isset($request['main_img'])) {
                $article->main_img = $request['main_img'];
            } else {
                $article->main_img = $article->main_img;
            }
            $article->update();
        }

        } catch (QueryException $er) {
            return Redirect::back()->withErrors(['article']);
        }
        return redirect()->route('news');

    }

    public function dellNews(Request $request)
    {
        $result = $request->all();
        $page = Writenew::where("id", $result["id"])->first();
        $url = Url::find($page["url_id"]);
        $page->delete();
        $url->delete();
        return redirect()->route('news');
    }

    public function editNews(Request $request)
    {
        $res = $request->all();
        $page = Writenew::find($res["id"])->toArray();
        $urlName = Url::find($page["url_id"])->toArray()["url"];
        $arrUrl = explode("/", $urlName);
        $page["url"] = $arrUrl[1];
        $currentLang = $arrUrl[0];
        $languages = Language::all()->toArray();
        return view('admin.expert.news.edit-news', compact('page', 'languages', 'currentLang'));
    }
}
