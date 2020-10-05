<?php

namespace App\Http\Controllers\Admin;

use App\Type;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;

class TypeController extends Controller
{
    //

    public function motoTypes()
    {
        $types = Type::all()->toArray();
        return view('admin.moto.type.types',compact('types'));
    }

    public function addType()
    {
        return view('admin.moto.type.add-type');
    
    }

    public function saveType(Request $request)
    {
        $input=$request->all();
        if(isset($input['files'])){
            unset($input['files']);
        }
        if(!empty($input['_method'])){

            array_shift($input);//dell method
            array_shift($input);//dell token
            $id =array_shift($input);
            Type::where('id',$id)->update($input);
            \Session::flash('success', 'Row Updated!');
            return back();
        }else{
            try {
                Type::create($input);

            } catch (QueryException $e) {
                if ($e->getCode() == 23000) {
                    \Session::flash('error', 'You have aleady this type !');
                } else {
                    \Session::flash('error', 'You have some error!');
                    Log::info($e);
                }
            }
            return redirect(route('types'));
        }
    }

    public function editType(Request $request){
        $id = $request->get('id');
        if ($id) {
            $type = Type::where('id', $id)->first()->toArray();
            return view('admin.moto.type.edit-type', compact('type'));
        }
    }

}
