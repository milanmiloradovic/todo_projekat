<?php

namespace App\Http\Controllers\Izvrsilac;

use App\Http\Controllers\Controller;
use App\Task;
use Illuminate\Support\Facades\Auth;

class MojiZadaciController extends Controller
{
    public function index()
    {
        $mojiZadaci = Auth::user()->assignedTasks()->with('zadatak', 'zadatak.assignedBy')->get();
        return view('Izvrsilac/mojiZadaci', [
            'zadaci' => $mojiZadaci
        ]);
    }
    public function show($id)
    {
        $zadatak = Task::first()->where('id', $id)->with('komentari')->get();
        return view('zadatak', [
            'zadatak' => $zadatak
        ]);
    }

    public function update($id)
    {

        echo $id;
        Task::where('id', $id)->update([
            'finished' => true
        ]);
    }
}
