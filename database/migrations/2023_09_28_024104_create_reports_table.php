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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('calamity')->nullable();
            $table->string('municipality')->nullable();
            // $table->foreignId('calamity_id')->nullable()->constrained('calamities')->nullOnDelete();
            $table->foreignId('municipality_id')->nullable()->constrained('municipalities')->nullOnDelete();
            $table->string('typhoon_level');
            $table->string('lce_present');
            $table->integer('no_of_barangay_covered')->default(0);
            $table->integer('no_of_punong_barangay_present')->default(0);
            $table->text('remarks');
            $table->integer('no_families')->default(0);
            $table->integer('no_of_barangay')->default(0);
            $table->integer('no_of_evacuation')->default(0);
            $table->integer('no_of_families_served')->default(0);
            $table->integer('total_served')->default(0);
            $table->integer('total_barangay_served')->default(0);
            $table->integer('no_of_barangay_conducted_evacuation')->default(0);
            $table->text('power_supply_status')->default('');
            $table->text('water_supply_status')->default('');
            $table->text('roads_and_bridges_status')->default('');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
