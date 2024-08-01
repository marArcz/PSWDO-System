<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use App\Models\BarangayAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class BarangayAdminController extends Controller
{
    //

    public function dashboard()
    {
        return Inertia::render('BarangayAdmin/Dashboard');
    }

    public function showLogin()
    {
        return Inertia::render('Barangay/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::guard('barangay')->attempt($request->only('email', 'password'))) {
            // Mail::to(auth('barangayAdmin')->user())
            return redirect(route('barangayAdmin.dashboard'));
        }else{
            return redirect()->back()->with(['error'=>'Invalid credentials please try again!']);
        }
    }


    /* Resource routes below */
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Barangay $barangay)
    {
        $data['barangay'] = $barangay;

        return Inertia::render('BarangayAdmin/Create', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Barangay $barangay)
    {
        $request->validate([
            'firstname' => ['required'],
            'lastname' => ['required'],
            'email' => ['required', 'email', 'unique:barangay_admins,email'],
        ]);

        $barangay->admin()->create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        return redirect()->intended(route('barangay.index'))->with('success', 'Successfully create a barangay admin!');
    }
    public function requests(){
        return Inertia::render('BarangayAdmin/Requests');
    }
    public function createRequest(){
        return Inertia::render('BarangayAdmin/CreateRequest');
    }

    /**
     * Display the specified resource.
     */
    public function show(BarangayAdmin $barangay)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BarangayAdmin $barangayAdmin)
    {
        //
        return Inertia::render('BarangayAdmin/Edit',['barangayAdmin'=>$barangayAdmin]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BarangayAdmin $barangay)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BarangayAdmin $barangay)
    {
        //
    }
}
