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


    //NO JSON TEMOS QUE POR O RECETOR DA MENSAGEM E O EMISSOR, N SE METE O CHAT
    public function addMessage(Request $request){
        $from = $request->input('from');
        $to  = $request->input('to');
        //$chat_id =(new ChatController)->chatExsists($from,$to);
        $chat_id = 0;
        $query = DB::table('chat')
                    ->where('landlord_id', $from) 
                    ->where('guest_id', $to)
                    ->get();
        if(count($query) == 0){
            $query2 = DB::table('chat')
                        ->where('landlord_id', $to) 
                        ->where('guest_id', $from)
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




        }
        
        return $chat_id;
        
       
    }

    
}
