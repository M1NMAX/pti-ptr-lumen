<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Chat;

class ChatController extends Controller
{
    private $chat;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Chat $chat){
        $this->chat = $chat;
    }

    public function index(){
        return $this->chat->paginate(10);
    }

    public function show($id){
        return $this->chat->find($id);
    }

    public function showMsn($id){
        $this->chat->find($id);
        return $this->chat->mensagens;

    }

    public function store(Request $request){
        $this->chat->create($request->all());
        return response()->json(['data' => [
            'message' => 'Chat criado com sucesso!!']
        ]);
    }

}
