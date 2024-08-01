<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function dashboard(Request $request){
        if($request->user()->hasRole('dswd_admin')){
            return redirect(route('dswd.dashboard'));
        }
        return redirect(route('barangayAdmin.dashboard'));
    }
}
