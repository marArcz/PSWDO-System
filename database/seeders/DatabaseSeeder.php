<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Unit;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(LaratrustSeeder::class);
        $this->call(MunicipalityAndBarangaySeeder::class);

        // create inventory units
        $units = [
            ['name' => 'Sack','sub_unit' => 'kg'],
            ['name' => 'Box','sub_unit' => 'pcs'],
        ];

        foreach ($units as $key => $unit) {
            Unit::create([
                'name' => $unit['name'],
                'sub_unit'=> $unit['sub_unit'],
            ]);
        }
    }
}
