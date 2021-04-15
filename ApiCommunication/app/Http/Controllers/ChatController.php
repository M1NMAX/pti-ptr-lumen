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


    public function chatExists($id1, $id2){
        $res = Chat::where('landlord_id', $id1) 
                    ->where('guest_id', $id2)
                    ->get();
        if(count($res) == 0){
            $res2 = Chat::where('landlord_id', $id2) 
                    ->where('guest_id', $id1)
                    ->get();
            if(count($res2) == 0){
                return 0;
            }else{
                return $res2[0]->id;
            }
            
        }
        if(count($res) == 0){
            return 0;
        }else{
            return $res[0]->id;
        }
    }

}
