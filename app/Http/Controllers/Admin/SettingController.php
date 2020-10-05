<?php

namespace App\Http\Controllers\Admin;

use App\Brand;
use App\Color;
use App\Transmission;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;
use PhpParser\Error;

class SettingController extends BaseControler
{
    //
    public function setting()
    {
        $colors = Color::all()->toArray();
        $brands = Brand::all()->toArray();
        $transmissions = Transmission::all()->toArray();

        return view('admin.setting', compact('colors', 'brands', 'transmissions'));
    }

    public function addColor(Request $request)
    {
        if (
        Color::create([
            'color' => $request->get('color'),
            'hash' => $request->get('hash'),
        ])) {
            return redirect(route('admin-settings'));
        }

    }

    public function dellColor(Request $request)
    {
        $colors = $request->get('colors');
        foreach ($colors as $id) {
            try {
                Color::where('id', $id)->delete();

            } catch (\Illuminate\Database\QueryException $e) {
                $color=Color::where('id',$id)->first();
                if($color){
                    Session::flash('error','You have moto with color: '.$color['color']);
                }
            }

        }
        return redirect(route('admin-settings'));
    }

    public function addBrand(Request $request)
    {
        if (
        Brand::create([
            'brand' => $request->get('brand'),
        ])) {
            return redirect(route('admin-settings'));
        }
    }

    public function dellBrand(Request $request)
    {
        $brands = $request->get('brands');
        foreach ($brands as $id) {

                try {
                    Brand::where('id', $id)->delete();

                } catch (\Illuminate\Database\QueryException $e) {
                    $brand=Brand::where('id',$id)->first();
                    if($brand){
                        Session::flash('error','You have moto with brand: '.$brand['brand']);
                    }
                }


        }
        return redirect(route('admin-settings'));
    }

    public function addTransmission(Request $request)
    {
        if (
        Transmission::create([
            'transmission' => $request->get('transmission'),
        ])) {
            return redirect(route('admin-settings'));
        }
    }

    public function dellTransmission(Request $request)
    {
        $transmissions = $request->get('transmissions');
        foreach ($transmissions as $id) {

            try {
                Transmission::where('id', $id)->delete();

            } catch (\Illuminate\Database\QueryException $e) {
                $transmission=Transmission::where('id',$id)->first();
                if($transmission){
                    Session::flash('error','You have moto with transmission: '.$transmission['transmission']);
                }
            }
        }
//        return redirect(route('admin-settings'));
    }

}
