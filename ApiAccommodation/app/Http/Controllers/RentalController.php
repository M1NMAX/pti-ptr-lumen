<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rental;

class RentalController extends Controller
{

    private $rental;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Rental $rental)
    {
        $this->rental = $rental ;
    }

    public function index()
    {
        return $this->rental->paginate(10);
    }

    public function showId($id)
    {
        return Rental::findOrFail($id); 
    }

    public function store(Request $request)
    {
        //$this->alojamento_caracteristica->AC::create($request->all());
        $rental = Rental::create($request->all());
        return response()->json(['data' => ['message' => 'Aluguer foi criado com sucesso']]);
    }

    public function update($rental, Request $request)
    {
        $rental = $this->rental->find($rental);
        $rental->update($request->all());
        return response()->json(['data' => ['message' => 'Aluguer foi atualizado com sucesso']]);
    }

    public function destroy($rental)
    {
        $rental = $this->rental->find($rental);
        $rental->delete();
        return response()->json(['data' => ['message' => 'Aluguer foi eliminado com sucesso']]);
    }
}
