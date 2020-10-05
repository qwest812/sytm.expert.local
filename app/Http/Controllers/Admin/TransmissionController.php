<?php

namespace App\Http\Controllers\Admin;

use App\Transmission;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class TransmissionController extends Controller
{
    public function transmissions()
    {
        $transmissions = Transmission::all()->toArray();
        return view('admin.moto.transmission.transmissions', compact('transmissions'));

    }

    public function saveTransmission(Request $request)
    {
        try{
            Transmission::create([
                'transmission' => $request->get('transmission'),
            ]);

        }catch (QueryException $e){
            if($e->getCode() == 23000){
                \Session::flash('error', 'You have aleady this transmission!');
            }else{
                \Session::flash('error', 'You have some error!');
                Log::info($e);
            }
        }
        return redirect(route('transmissions'));
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
        return redirect(route('transmissions'));
    }
}
