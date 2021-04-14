<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Mensagem;

class MensagemController extends Controller
{
    private $mensagem;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Mensagem $mensagem){
        $this->mensagem = $mensagem;
    }

    public function index(){
        return $this->mensagem->paginate(10);
    }

    public function show($id){
        return $this->mensagem->find($id);
    }

    public function store(Request $request){
        $this->mensagem->create($request->all());
        return response()->json(['data' => [
                                        'message' => 'Mensagem enviada com sucesso!!']
                                    ]);
    }

}
