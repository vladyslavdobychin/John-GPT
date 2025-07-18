<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->dropUnique('documents_title_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // no need to run it back
    }
};
