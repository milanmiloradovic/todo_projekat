<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    public function zadatak()
    {
        return $this->belongsTo("App\Task", "task_id", "id");
    }

    public function assignedTo()
    {
        return $this->belongsTo("App\User", "assigned_to", "id");
    }
}
