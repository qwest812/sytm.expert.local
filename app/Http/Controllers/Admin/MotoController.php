<?php

namespace App\Http\Controllers\Admin;

use App\Brand;
use App\Color;
use App\Image;
use App\Motobyke;
use App\Transmission;
use App\Type;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class MotoController extends Controller
{
    public function motobykes()
    {
        $motobykes = Motobyke::all()->toArray();
        return view('admin.moto.byke.motobykes', compact('motobykes'));
    }

    public function addMotobyke()
    {
        $colors = Color::all()->toArray();
        $brands = Brand::all()->toArray();
        $types = Type::all()->toArray();
        $transmissions = Transmission::all()->toArray();
        $years = range(1980, Carbon::now()->year);
        return view('admin.moto.byke.add-motobyke', compact('colors', 'brands', 'transmissions', 'years', 'types'));
    }

    public function saveMotobyke(Request $request)
    {
        $input = $request->all();
        if (isset($input['files'])) {
            unset($input['files']);
        }
        if (!empty($input['_method'])) {
           dump($input);
        } else {
            $images = array_pop($input);
            try {
                $moto = Motobyke::create($input);
                $moto_id = $moto->id;

                foreach ($images as $image) {
                    $originalName = $image->getClientOriginalName();
                    $path = $image->storeAS('images', $originalName);
                    Image::create([
                        'alt' => $originalName,
                        'moto_id' => $moto_id,
                        'path' => 'storage/' . $path
                    ]);

                }
                \Session::flash('error', 'Moto added');
                redirect(route('motobykes'));
            } catch (QueryException $e) {
                if ($e->getCode() == 23000) {
                    $request->session()->flash('error', 'You have aleady this color or Hash: ');
                    \Session::flash('error', 'You have aleady this moto name!');
                } else {
                    \Session::flash('error', 'You have some error!');
                    Log::info($e);
                }
            }
            return redirect(route('add-motobyke'));
        }


//        $images = $request->file()['images'];
    }

    public function dellMotobyke(Request $request)
    {
        $id = $request->get('id');
        try {
            Motobyke::where('id', $id)->delete();
            Session::flash('error', 'You deleted moto with id' . $id);
        } catch (QueryException $e) {
            Session::flash('error', 'You have some error');

        }
        return redirect(route('motobykes'));
    }

    public function editMotobyke(Request $request)
    {
        $id = $request->get('id');
        $images = Image::where('moto_id', $id)->get();
        $brands = Brand::all()->toArray();
        $colors = Color::all()->toArray();
        $types = Type::all()->toArray();
        $years = range(1980, Carbon::now()->year);
        $transmissions = Transmission::all()->toArray();
        if ($id) {
            $moto = Motobyke::where('id', $id)->first()->toArray();
            return view('admin.moto.byke.edit-moto', compact('moto', 'images', 'colors', 'brands', 'types', 'transmissions', 'years'));
        }
        abort(404);
    }

    public function updateMotobyke(Request $request)
    {

    }
}
