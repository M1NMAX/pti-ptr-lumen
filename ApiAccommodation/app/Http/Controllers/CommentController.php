<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\DB;


class CommentController extends Controller
{

    private $comment;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Comment $comment)
    {
        $this->comment = $comment ;
    }

    public function index()
    {
        // return $this->comment->paginate(10);
        return $this->comment->take(5)->get();
    }

    public function showId($id)
    {
        return Comment::find($id);
    }



    public function update($comment, Request $request)
    {
        $comment = $this->comment->find($comment);
        $comment->update($request->all());
        return response()->json(['data' => ['message' => 'Comentário foi atualizado com sucesso']]);
    }


    public function addComment(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'accommodation_id'=>'required|max:30',
            'rate' => 'required',
        ]);

        if($validator->fails()){
            return response(['errors' =>  $validator->errors()->all()], 422);
        }


        $query = DB::table('comment')
        ->where('user_id', $request->user_id) 
        ->where('accommodation_id', $request->accommodation_id)
        ->get();
        if(count($query) == 0){
            $comment = $this->comment->create($request->all());
        }else{
            $queryDelete = DB::table('comment')
            ->where('user_id', $request->user_id) 
            ->where('accommodation_id', $request->accommodation_id)
            ->delete();
            $comment = $this->comment->create($request->all());
        }
        return response()->json(['data' => ['message' => 'Comentario foi adicionado com sucesso.'], 'comment'=>$comment ,'status'=>true]);
        return $query;

    
    }

    public function destroy($comment)
    {
        $comment = $this->comment->find($comment);
        $comment->delete();
        return response()->json(['data' => ['message' => 'Comentario foi eliminad com sucesso']]);
    }
}
