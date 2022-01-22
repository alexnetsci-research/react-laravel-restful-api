<?php

namespace App\Http\Controllers\API;

use App\Models\Customer;
use App\Http\Controllers\Controller;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::orderBy('created_at', 'desc')->get(); 

        return response()->json([
            'status' => 200, 
            'customers' => $customers
        ]);
    }

    public function store()
    {
        $validated = request()->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:customers,email',
        ]); 

        Customer::create($validated); 

        return response()->json([
            'status' => 200, 
            'message' => 'Customer Added Successfully!'
        ]);
    } 

    public function edit($id)
    {
        $customer = Customer::findOrFail($id);

        return response()->json([
            'status' => 200, 
            'customer' => $customer
        ]);
    } 

    public function update($id)
    {
        $validated = request()->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:customers,email,'.$id,
        ]); 

        $customer = Customer::findOrFail($id);
        $customer->update($validated);

        return response()->json([
            'status' => 200, 
            'message' => 'Customer Updated Successfully!'
        ]);
    }
}
