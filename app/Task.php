<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{

    public function assignedBy()
    {
        return $this->belongsTo("App\User", "user_id", "id");
    }
    public function assignments()
    {
        return $this->belongsTo("App\Assignment", "task_id", "id");
    }
}
