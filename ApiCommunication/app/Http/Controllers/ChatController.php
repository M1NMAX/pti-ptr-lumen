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
        $chat = Chat::find($id);
        return $chat->messages;

    }

    public function store(Request $request){
        $this->chat->create($request->all());
        return response()->json(['data' => [
            'message' => 'Chat criado com sucesso!!']
        ]);
    }


    public function chatExists($id1, $id2){
        $res = Chat::where('user_id1', $id1) 
                    ->where('user_id2', $id2)
                    ->get();
        if(count($res) == 0){
            $res2 = Chat::where('user_id1', $id2) 
                    ->where('user_id2', $id1)
                    ->get();
            if(!(count($res2) == 0)){
                return $res2[0]->id;
            }
            
        }
        if(count($res) == 0){
            $c = new Chat;
            $c->user_id1 = $id1;
            $c->user_id2 = $id2;
            $c->save();
            return $c->id;
        }else{
            return $res[0]->id;
        }
    }

}
