<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Users;

class UsersController extends Controller
{
    private $users;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Users $users){
        $this->users = $users;
    }

    public function index(){
        return $this->users->paginate(10);
    }

    public function show($users){
        return $this->users->find($users);
    }

    public function store(Request $request){
        $this->users->create($request->all());
        return response()->json(['data' => [
                                        'message' => 'Utilizador criado com sucesso!!']
                                    ]);
    }

    public function update($users, Request $request){
        $users = $this->users->find($users);

        $users->update($request->all());

        return response()->json(['data' => [
            'message' => 'Utilizador foi atualizado com sucesso!!']
        ]);
    }

    public function destroy($users){
        $users = $this->users->find($users);

        $users->delete();

        return response()->json(['data' => [
            'message' => 'Utilizador foi removido com sucesso!!']
        ]);

    }
}
