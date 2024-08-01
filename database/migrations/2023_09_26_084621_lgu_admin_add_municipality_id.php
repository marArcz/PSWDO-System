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
        Schema::table('lgu_admins', function (Blueprint $table) {
            //
            $table->foreignId('municipality_id')->constrained('municipalities')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lgu_admin', function (Blueprint $table) {
            //
            $table->dropConstrainedForeignId('municipality_id');
        });
    }
};
