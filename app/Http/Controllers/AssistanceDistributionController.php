<?php

namespace App\Http\Controllers;

use App\Models\Distribution;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssistanceDistributionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $distributions = Distribution::with(['report'])->where('archived',false)->get();
        return Inertia::render("Distribution/Distributions",[
            "distributions"=> $distributions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Distribution $distribution)
    {
        //
        return Inertia::render("Distribution/Details",[
            "distribution"=> Distribution::with(["report","rdsForm"])->find($distribution->id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Distribution $distribution)
    {
        //

        $distribution->delete();

        return redirect()->back()->with("success","Successfully deleted distribution record!");
    }
}
