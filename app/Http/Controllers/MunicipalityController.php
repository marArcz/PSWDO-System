<?php

namespace App\Http\Controllers;

use App\Models\Municipality;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MunicipalityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data['municipalities'] = Municipality::all();
        return Inertia::render("Dswd/Municipalities",$data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Municipality/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $municipality = new Municipality([
            'name' => $request->name,
        ]);
        $municipality->save();

        return redirect(route('pswdo.municipalities.index'))->with("success","Successfully added new municipality!");
    }

    /**
     * Display the specified resource.
     */
    public function show(Municipality $municipality)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Municipality $municipality)
    {
        $data['municipality'] = $municipality;
        return Inertia::render("Municipality/Edit",$data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Municipality $municipality)
    {
        $municipality->update($request->all());
        $municipality->save();
        return redirect(route('pswdo.municipalities.index'))->with('success','Successfully updated municipality!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Municipality $municipality)
    {
        $municipality->delete();

        return redirect(route('pswdo.municipalities.index'))->with('success','Successfully deleted municipality!');
    }
}
