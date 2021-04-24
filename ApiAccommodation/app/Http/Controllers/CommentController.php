<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

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
        $this->comment->create($request->all());
        return response()->json(['data' => ['message' => 'Comentario foi adicionado com sucesso.'], 'status'=>true]);
    }

    public function destroy($comment)
    {
        $comment = $this->comment->find($comment);
        $comment->delete();
        return response()->json(['data' => ['message' => 'Comentario foi eliminad com sucesso']]);
    }
}
