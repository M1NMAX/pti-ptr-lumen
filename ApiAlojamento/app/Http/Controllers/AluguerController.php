<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Aluguer;

class AluguerController extends Controller
{

    private $aluguer;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Aluguer $aluguer)
    {
        $this->aluguer = $aluguer ;
    }

    public function index()
    {
        return $this->aluguer->paginate(10);
    }

    public function showId($id)
    {
        return Aluguer::findOrFail($id); 
    }

    public function store(Request $request)
    {
        //$this->alojamento_caracteristica->AC::create($request->all());
        $aluguer = Aluguer::create($request->all());
        return response()->json(['data' => ['message' => 'Aluguer foi criado com sucesso']]);
    }

    public function update($aluguer, Request $request)
    {
        $aluguer = $this->aluguer->find($aluguer);
        $aluguer->update($request->all());
        return response()->json(['data' => ['message' => 'Aluguer foi atualizado com sucesso']]);
    }

    public function destroy($aluguer)
    {
        $aluguer = $this->aluguer->find($aluguer);
        $aluguer->delete();
        return response()->json(['data' => ['message' => 'Aluguer foi eliminado com sucesso']]);
    }
}
