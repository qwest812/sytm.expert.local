<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class LanguagesController extends Controller
{
    public function index()
    {
        $languages = Language::all()->sortBy("id")->toArray();
        return view('admin.languages.languages', compact('languages'));
    }

    public function save(Request $request)
    {

        $language = $request->get('languages-name');
        $lan = new Language();
        $lan->language_name = $language;
        try {
            $lan->save();
            return Redirect::back()->withErrors(['ok']);
        } catch (\Exception $e) {
            return Redirect::back()->withErrors(['fail']);
        }
    }

    public function delete(Request $request)
    {

        try{
        $language_id =$request->get("language_name");
        if(Language::where("id",$language_id)->delete()){
            return Redirect::back()->withErrors(['dell-ok']);
        }else{
            return Redirect::back()->withErrors(['dell-fail']);
        }
        }catch (\Exception $e){
            return Redirect::back()->withErrors(['delete']);
        }
    }
}
