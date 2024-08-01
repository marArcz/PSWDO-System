<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use App\Models\Calamity;
use App\Models\Municipality;
use App\Models\Report;
use Illuminate\Http\Request;

class MapDataController extends Controller
{
    //

    public function municipality($name){
        $municipality = Municipality::where("name",$name)->first();
        $municipality['total_families'] = $municipality->barangays()->selectRaw('sum(families) as total_families')->first()->total_families;
        $municipality['total_households'] = $municipality->barangays()->selectRaw('sum(households) as total_households')->first()->total_households;
        return response()->json($municipality);
    }

    public function distributions(string $name){
        $typhoon = Calamity::where('name', $name)->first();
        $distributions = Report::with(['municipality','distribution'])->where('calamity_name',$typhoon->name)->get();
        return response()->json($distributions);
    }

    public function report(string $name, string $typhoon){
        $typhoonModel = Calamity::where("name",$typhoon)->first();
        $municipality = Municipality::where("name",$name)->first();
        $report = Report::with(['distribution'])->where('calamity_name', $typhoonModel->name)->where('municipality_name',$municipality->name)->first();

        return response()->json($report);
    }

}
