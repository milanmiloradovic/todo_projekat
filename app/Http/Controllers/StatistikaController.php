<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class StatistikaController extends Controller
{
    public function index()
    {
        $zadatak = Task::all();
        return view('statistika')->withZadatak($zadatak);
    }
}
