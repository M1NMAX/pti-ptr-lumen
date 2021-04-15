<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Aluguer;
use App\Models\AluguerPending;

class AluguerPendingController extends Controller
{

    private $aluguer_pending;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(AluguerPending $aluguer_pending)
    {
        $this->aluguer_pending = $aluguer_pending ;
    }

    public function index()
    {
        return $this->aluguer_pending->paginate(10);
    }

    public function showId($id)
    {
        return AluguerPending::find($id); 
    }

    public function senhorioIdSearch($idSenhorio)
    {
        return AluguerPending::where('senhorio_id', $idSenhorio)->get(); 
    }

    public function store(Request $request)
    {
        //$this->alojamento_caracteristica->AC::create($request->all());
        $aluguer_pending = AluguerPending::create($request->all());
        return response()->json(['data' => ['message' => 'Aluguer pending']]);
    }

    public function update($aluguer_pending, Request $request)
    {
        $aluguer_pending = $this->aluguer_pending->find($aluguer_pending);
        $aluguer_pending->update($request->all());
        return response()->json(['data' => ['message' => 'Associação AC foi atualizada com sucesso']]);
    }

    public function destroy($aluguer_pending)
    {
        $aluguer_pending = $this->aluguer_pending->find($aluguer_pending);
        $aluguer_pending->delete();
        return response()->json(['data' => ['message' => 'Associação AC foi eliminada com sucesso']]);
    }

    public function accept($id)
    {
        $aluguerAccepted = AluguerPending::find($id); 
        //Aluguer::create($aluguerAccepted);

        DB::table('aluguer')->insert([
            'alojamento_id' => $aluguerAccepted->alojamento_id, 
            'user_id' => $aluguerAccepted->user_id,
            'preco' => $aluguerAccepted->preco,
            'dataInicio' => $aluguerAccepted->dataInicio, 
            'dataFim' => $aluguerAccepted->dataFim
        ]);
        $aluguerAccepted->delete();
 
        //return $aluguerAccepted->alojamento_id;


        return response()->json(['data' => ['message' => 'Aluguer foi aceite com sucesso']]);
    }


}
