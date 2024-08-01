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
        Schema::create('rds_forms', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('pdf')->nullable();
            $table->foreignId("distribution_id")->constrained('distributions')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rds_forms');
    }
};
