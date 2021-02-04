<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['poruka', 'task_id'];
    public function zadatak()
    {
        return $this->belongsTo("App\Task", "task_id", "id");
    }
}
