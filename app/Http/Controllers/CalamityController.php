<?php

namespace App\Http\Controllers;

use App\Models\Calamity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalamityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['calamities'] = Calamity::all();
        return Inertia::render('Calamities/Calamities', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Calamities/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $calamity = new Calamity($request->all());
        $calamity->save();
        if ($request->expectsJson()) {
            $data['typhoons'] = Calamity::all();
            $data['newItem'] = $calamity;
            return response()->json($data);
        } else {
            return redirect(route('pswdo.calamities.index'))->with('success', 'Successfully created!');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Calamity $calamity)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Calamity $calamity)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Calamity $calamity)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Calamity $calamity)
    {
        $calamity->delete();
        return redirect(route('pswdo.calamities.index'))->with('success','Successfully deleted!');
    }
}
