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
        Schema::create('disaster_profiles', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('type');
            $table->date('occurence_date');
            $table->time('occurence_time');
            $table->foreignId('request_details_id','id')->constrained('request_details','id')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disaster_profiles');
    }
};
