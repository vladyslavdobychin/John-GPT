<?php

namespace App\Models;

use App\Domain\Documents\DocumentTitle;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @method static find($id)
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

    public static function create(DocumentTitle $title, string $content): Document
    {
        $document = new Document();
        $document->title = $title;
        $document->content = $content;

        return $document;
    }
}
