<?php

namespace App\Http\Controllers\Admin;

use App\Color;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class ColorController extends Controller
{
    //

    public function motoColors(){
        $colors =Color::all()->toArray();
        return view('admin.moto.color.colors',compact('colors'));
    }

    public function saveColor(Request $request)
    {
        try{
            Color::create([
                'color' => $request->get('color'),
                'hash' => $request->get('hash'),
            ]);

        }catch (QueryException $e){
            if($e->getCode() == 23000){
//                $request->session()->flash('error', 'You have aleady this color or Hash: ');
                \Session::flash('error', 'You have aleady this color or Hash!');
            }else{
                \Session::flash('error', 'You have some error!');
                Log::info($e);
            }
        }
        return redirect(route('moto-colors'));

    }
    public function dellColor(Request $request)
    {
        $colors = $request->get('colors');
        foreach ($colors as $id) {
            try {
                Color::where('id', $id)->delete();
                return redirect(route('moto-colors'));

            } catch (\Illuminate\Database\QueryException $e) {
                $color = Color::where('id', $id)->first();
                if ($color) {
                    Session::flash('error', 'You have moto with color: ' . $color['color']);
                }
            }
        }
    }
}
