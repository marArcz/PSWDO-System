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
        Schema::create('initial_effects', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('affected_population');
            $table->integer('affected_families');
            $table->integer('affected_infants');
            $table->integer('affected_children');
            $table->integer('affected_adults');
            $table->integer('displaced_population');
            $table->integer('displaced_families');
            $table->integer('displaced_infants');
            $table->integer('displaced_children');
            $table->integer('displaced_adults');
            // $table->foreignId('request_details_id')->constrained('report_details','id')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('initial_effects');
    }
};
