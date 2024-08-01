<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use App\Models\Municipality;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BarangayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Municipality $municipality)
    {
        $data['barangays'] = $municipality->barangays()->get();
        $data['municipality'] = $municipality;
        return Inertia::render('Dswd/Barangays', $data);
    }
    public function all(){
        $data['barangays'] = Barangay::with(['municipality'])->get();
        return Inertia::render('Dswd/Barangays', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Municipality $municipality)
    {
        $data['municipality'] = $municipality;
        return Inertia::render('Barangay/Create',$data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,Municipality $municipality)
    {
        $barangay = $municipality->barangays()->create($request->all());

        return redirect(route('pswdo.municipalities.barangays.index',['municipality'=>$municipality->id]))->with('success','You successfully added a barangay!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Barangay $barangay)
    {
        //

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Barangay $barangay)
    {
        $data['barangay'] = $barangay;
        return Inertia::render('Barangay/Edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Barangay $barangay)
    {
        $barangay->update($request->all());
        $barangay->save();

        return redirect(route('pswdo.municipalities.barangays.index',['municipality'=>$barangay->municipality_id]))->with('success','You successfully updated a barangay!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Barangay $barangay)
    {
        $barangay->delete();
        return redirect()->back()->with('success','Successfully deleted barangay!');
    }
}
