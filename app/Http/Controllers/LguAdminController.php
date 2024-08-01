<?php

namespace App\Http\Controllers;

use App\Models\Municipality;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LguAdminController extends Controller
{
    //
    public function dashboard()
    {
        return Inertia::render('LguAdmin/Dashboard');
    }

    public function showLogin()
    {
        return Inertia::render('LguAdmin/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::guard('lgu')->attempt($request->only('email', 'password'))) {
            // Mail::to(auth('barangayAdmin')->user())
            return redirect(route('lguAdmin.dashboard'));
        }else{
            return redirect()->back()->with(['error'=>'Invalid credentials please try again!']);
        }
    }

    public function create(Request $request, Municipality $municipality){
        $data['municipality'] = $municipality;

        return Inertia::render('LguAdmin/Create',$data);
    }
    public function store(Request $request, Municipality $municipality){
        $municipality->admin()->create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => $request->password,
            'image' => $request->image,
        ]);

        return redirect(route('municipalities.index'))->with('success','You successfully added a new LGU Admin!');
    }
}
