<?php

namespace App\Http\Controllers\Admin;

use App\Brand;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class BrandController extends Controller
{

    public function brands()
    {
        $brands = Brand::all()->toArray();
        return view('admin.moto.brand.brands', compact('brands'));
    }

    public function saveBrand(Request $request)
    {

        $input = $request->all();
        if(isset($input['files'])){
            unset($input['files']);
        }
        if(!empty($input['_method'])){

            array_shift($input);//dell method
            array_shift($input);//dell token
            $id =array_shift($input);
            Brand::where('id',$id)->update($input);
            \Session::flash('success', 'Row Updated!');
            return back();
        }else{
            try {
                Brand::create($input);

            } catch (QueryException $e) {
                if ($e->getCode() == 23000) {
                    \Session::flash('error', 'You have aleady this brand !');
                } else {
                    \Session::flash('error', 'You have some error!');
                    Log::info($e);
                }
            }
            return redirect(route('brands'));
        }
    }

    public function addBrand()
    {
        return view('admin.moto.brand.add-brand');
    }

    public function dellBrand(Request $request)
    {
        try {
            Brand::where('id', $request->get('id'))->delete();
        } catch (QueryException $e) {
            \Session::flash('error', 'You have some error!');
            Log::info($e);
        }
        return redirect(route('brands'));
    }

    public function editBrand(Request $request)
    {
        $id = $request->get('id');
        if ($id) {
            $brand = Brand::where('id', $id)->first()->toArray();
            return view('admin.moto.brand.edit-brand', compact('brand'));
        }
    }

}
