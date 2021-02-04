<?php

namespace App\Http\Controllers\Poslodavac;

use App\Assignment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Task;
use Illuminate\Support\Facades\Auth;

class SviZadaciController extends Controller
{
    public function index()
    {
        $sviZadaci = Auth::user()->kreiraniZadaci()->with('assignments', 'assignments.assignedTo')->get();
        return view('Poslodavac/sviZadaci')->with('zadaci', $sviZadaci);
    }


    public function update($id, Request $request)
    {
        if ($request->naziv == null) {
            Task::where('id', $id)->update([
                'finished' => true
            ]);
        } else {
            $task = Task::find($id);
            $task->naziv = $request->input('naziv');
            $task->deadline = $request->input('deadline');
            $task->save();
            $nizIdeva = $request->input('users');

            $task->assignments()->delete();
            foreach ((array) $nizIdeva as $user_id) {
                Assignment::create([
                    'task_id' => $task->id,
                    'assigned_to' => $user_id
                ]);
            }
            return response()->json([
                'test' => "test"
            ]);
        }
    }
    public function destroy($id)
    {

        if (Task::find($id)->delete())
            return response()->json([
                'code' => true,
            ]);
    }

    public function edit($id)
    {

        echo $id;
        Task::where('id', $id)->update([
            'finished' => true
        ]);
    }
    public function store(Request $request)
    {
        $naziv = $request->input('naziv');
        $deadline = $request->input('deadline');
        $user_id = Auth::user()->id;

        $task = Task::create([
            'naziv' =>   $naziv,
            'deadline' => $deadline,
            'user_id' => $user_id,
        ]);

        $nizIdeva = $request->input('users');

        foreach ((array) $nizIdeva as $user_id) {
            Assignment::create([
                'task_id' => $task->id,
                'assigned_to' => $user_id
            ]);
        }
    }
    public function show($id)
    {
        $zadatak = Task::first()->where('id', $id)->with('komentari')->get();
        return view('zadatak', [
            'zadatak' => $zadatak
        ]);
    }
}
