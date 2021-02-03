<?php

namespace App\Http\Controllers\Izvrsilac;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class MojiZadaciController extends Controller
{
    public function index()
    {
        $mojiZadaci = Auth::user()->assignedTasks()->with('zadatak')->get();
        return view('Izvrsilac/mojiZadaci', [
            'zadaci' => $mojiZadaci
        ]);
    }

    public function update()
    {
        return view('Izvrsilac/mojiZadaci');
    }
}
