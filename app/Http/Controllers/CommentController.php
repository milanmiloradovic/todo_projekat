<?php

namespace App\Http\Controllers;

use App\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function post(Request $request)
    {
        Comment::create([
            'komentar' => $request->komentar,
            'task_id' => $request->task_id
        ]);
        if (Auth::user()->imaUlogu('poslodavac'))
            return redirect('sviZadaci/' . $request->task_id);
        if (Auth::user()->imaUlogu('izvrsilac'))
            return redirect('mojiZadaci/' . $request->task_id);
    }
}
