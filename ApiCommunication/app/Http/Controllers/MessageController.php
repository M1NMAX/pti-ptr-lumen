<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\Chat;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ChatController;

class MessageController extends Controller
{
    private $message;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Message $message){
        $this->message = $message;
    }

    public function index(){
        return $this->message->paginate(10);
    }

    public function show($id){
        return $this->message->find($id);
    }


    //NO JSON TEMOS QUE POR O RECETOR DA MENSAGEM E O EMISSOR, MAIS O CHATID E O CONTENT
    public function addMessage(Request $request){
        
        $m = new Message; 
        $m->chat_id = $request->input('chat_id');
        $m->user_id = $request->input('user_id');
        $m->content =  $request->input('content');
        $m->created_at = date('Y-m-d H:i:s');
        $m->save();
        return response()->json(['data' => ['message' => 'Mensagem enviada com sucesso.'], 'status'=>true]);
        /*$userToNotify;
        $query = DB::table('chat')
                    ->where([
                        ['user_id1', '=', $request->input('user_id')],
                        ['id', '=', $request->input('chat_id')]
                        ])
                    ->get();
        $query2 = DB::table('chat')
                ->where([
                    ['user_id2', '=', $request->input('user_id')],
                    ['id', '=', $request->input('chat_id')]
                    ])
                ->get();
        
        if(count($query)){
            $userToNotify = $query[0]->user_id2;
        }elseif(count($query2)){
            $userToNotify =  $query2[0]->user_id1;
        }

        $queryNotifyCheck = DB::table('chat_notification')
                            ->where([
                                ['user_id', '=', $userToNotify],
                                ['chat_id', '=', $request->input('chat_id')]
                                ])
                            ->get();
        if(count($queryNotifyCheck) == 0){
            $queryNotification = DB::insert('insert into chat_notification (user_id, chat_id) values (?, ?)', [$userToNotify, $request->input('chat_id')]);
        }
        
        return response()->json(['data' => ['message' => 'Mensagem enviada com sucesso.'], 'status'=>true]);
        */
        
        
    }

    public function chatExists($from, $to){
        $query = DB::table('chat')
                    ->where('user_id1', $from) 
                    ->where('user_id2', $to)
                    ->get();
        if(count($query) == 0){
            $query2 = DB::table('chat')
                        ->where('user_id1', $to) 
                        ->where('user_id2', $from)
                        ->get();
            if(count($query2) == 0){
                $chat_id = 0;
            }else{
                $chat_id = $query2[0]->id;
            }
        }else{
            $chat_id = $query[0]->id;
        }
        
        
        if($chat_id == 0){
            $chat = new Chat;
            $chat->user_id1 = $to;
            $chat->user_id2 = $from;
            $chat->save();
            $chat_id = $chat->id;
        }

        return $chat_id;
    }
}
