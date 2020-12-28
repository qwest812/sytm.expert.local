<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
////    return view('welcome');
//    return view('welcome');
//});
Route::get('/',"MainController@index")->name("main");
Route::get('services',"MainController@services")->name("services");
Route::get('/contacts',"MainController@contacts")->name("contacts");
Route::get('/news',"MainController@news")->name("all-news");
Route::get('/researches',"MainController@researches")->name("researches");
Route::get('/search',"MainController@searchr")->name("searchr");
Route::get('/test',"MainController@test")->name("test");
Route::get('/marketing',"MainController@marketing")->name("marketing");
Route::get('/transfer-pricing',"MainController@transferPricing")->name("transfer-pricing");
Route::get('/market-research',"MainController@marketResearch")->name("market-research");
Route::post('/send-mail',"MainController@sendMail")->name("send-mail");

Auth::routes();
//Auth::routes(['register' => false]);

//Route::get('/home', 'HomeController@index')->name('home');




Route::group(['prefix' => 'admin',], function () {
    Route::get('main', 'Admin\MainController@index')->name('admin-index');
    Route::post('upload-image', 'Admin\MainController@uploadImage')->name('upload-image');
    Route::post('delete-image', 'Admin\MainController@deleteImage')->name('delete-image');
    Route::post('delete-image-moto', 'Admin\MainController@deleteImageMoto')->name('delete-image-moto');


    Route::group(['prefix' => 'settings'], function () {
        Route::get('main', 'Admin\SettingController@setting')->name('admin-settings');
    });
    Route::group(['prefix' => 'site','namespace'=>'Admin'], function () {

        Route::get('languages', 'LanguagesController@index')->name('languages');
        Route::post('save-languages', 'LanguagesController@save')->name('save-languages');
        Route::post('delete-languages', 'LanguagesController@delete')->name('delete-languages');

        Route::get('news', 'NewsController@showNews')->name('news');
        Route::get('deleted-news', 'NewsController@showDeletedNews')->name('deletedNews');
        Route::post('return-news', 'NewsController@returnNews')->name('return-news');
        Route::match(['post','put'],'save-news', 'NewsController@saveNews')->name('save-news');
        Route::get('add-news', 'NewsController@addNews')->name('add-news');
        Route::post('dell-news', 'NewsController@dellNews')->name('dell-news');
        Route::get('edit-news', 'NewsController@editNews')->name('edit-news');







//        Route::get('motobykes', 'MotoController@motobykes')->name('motobykes');
//        Route::match(['post','put'],'save-motobyke', 'MotoController@saveMotobyke')->name('save-motobyke');
//        Route::get('add-motobyke', 'MotoController@addMotobyke')->name('add-motobyke');
//        Route::post('dell-motobyke', 'MotoController@dellMotobyke')->name('dell-motobyke');
//        Route::get('edit-motobyke', 'MotoController@editMotobyke')->name('edit-motobyke');
//
//        Route::get('brands', 'BrandController@brands')->name('brands');
//        Route::match(['post','put'],'save-brand', 'BrandController@saveBrand')->name('save-brand');
//        Route::get('add-brand', 'BrandController@addBrand')->name('add-brand');
//        Route::post('dell-brand', 'BrandController@dellBrand')->name('dell-brand');
//        Route::get('edit-brand', 'BrandController@editBrand')->name('edit-brand');
//
//
//        Route::get('types', 'TypeController@motoTypes')->name('types');
//        Route::get('dell-type', 'TypeController@addType')->name('dell-type');
//        Route::match(['post','put'],'save-type', 'TypeController@saveType')->name('save-type');
//        Route::get('add-type', 'TypeController@addType')->name('add-type');
//        Route::get('edit-type', 'TypeController@editType')->name('edit-type');
//
//        Route::get('transmissions', 'TransmissionController@transmissions')->name('transmissions');
//        Route::post('save-transmissions', 'TransmissionController@saveTransmission')->name('save-transmission');
//        Route::post('dell-transmission', 'TransmissionController@dellTransmission')->name('dell-transmission');
//
//
//        Route::get('moto-colors', 'ColorController@motoColors')->name('moto-colors');
//        Route::post('add-moto-colors', 'ColorController@saveColor')->name('add-color');
//        Route::post('dell-color', 'ColorController@dellColor')->name('dell-color');

    });

});

//Route::get('motobykes', 'Admin\MainController@motobykes')->name('motobykes');
Route::get('/{lang}/{path}', 'MainController@route');
