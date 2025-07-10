<?php

namespace App\Models;

use App\Domain\Documents\DocumentTitle;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @method static find($id)
 * @method static create($data)
 * @method static findOrFail($id)
 */

class Document extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['title', 'content'];

    protected $guarded = ['id'];

    private DocumentTitle $title;
    private string $content;


    public function __construct(DocumentTitle $title, string $content)
    {
        parent::__construct([$title, $content]);

        $this->title = $title;
        $this->content = $content;
    }
}
