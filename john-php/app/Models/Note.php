<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static find($id)
 * @method static create($data)
 * @method static findOrFail($id)
 */

class Note extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'content'];

    protected $guarded = ['id'];
}
