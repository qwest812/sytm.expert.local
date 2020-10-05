<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class MainController extends Controller
{
    public function index()
    {
        return view('admin.moto.main');
    }

    public function test()
    {
        return view('test');
    }

    public function uploadImage(Request $request)
    {
        if (!empty($request->file())) {
            $file = $request->file()['file'];
            $originalName = $file->getClientOriginalName();
            $path = $file->storeAS('images/text', $originalName);
            if ($path) {
                return 'storage/' . $path;
            }
            return false;
        }
    }

    public function deleteImage(Request $request)
    {
        $path = $request->get('path');
        if (!empty($path)) {
            $arrayPath = explode('/', $path);
            $count = count($arrayPath);
            $filename = $arrayPath[$count - 1];

            if (Storage::delete('images' . DIRECTORY_SEPARATOR . 'text' . DIRECTORY_SEPARATOR . $filename)) {
                Log::info(json_encode('file deleted' . $arrayPath[$count - 1]));
                return $arrayPath[$count - 1];
            } else {
                Log::info(json_encode(false));
            }
        }
        return false;
    }

    public function deleteImageMoto(Request $request)
    {
        $path = $request->get('path');
        if (!empty($path)) {
            if(File::delete($path)){
        Image::where('path',$path)->delete();
                return json_encode($path);

            }
            return json_encode('true');
        }
        return json_encode('false');
    }
}
