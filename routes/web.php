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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');




Route::resource('/mojiZadaci', 'Izvrsilac\MojiZadaciController', ['except' => ['create', 'store', 'destroy', 'edit']])->middleware('auth.izvrsilac');
Route::resource('/sviZadaci', 'Poslodavac\SviZadaciController', ['except' => ['create']])->middleware('auth.poslodavac');
Route::get('/users/get', 'UserController@index')->middleware('auth.poslodavac');
Route::get('/statistika', 'StatistikaController@index')->name('statistika')->middleware('auth.poslodavac');
