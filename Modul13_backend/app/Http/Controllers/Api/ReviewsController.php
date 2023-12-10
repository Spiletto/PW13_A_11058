<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contents;
use App\Models\Reviews;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class ReviewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Reviews::inRandomOrder()->get();

        return response([
            'message' => 'All Reviews Retrieved',
            'data' => $data
        ], 200);
    }

    /**
     * Display reviews by user.
     */
    public function showReviewByUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response([
                'message' => 'User Not Found',
                'data' => null
            ], 404);
        }

        $data = Reviews::with('content', 'user')->where('id_user', $user->id)->get();

        return response([
            'message' => 'Contents of ' . $user->name . ' Retrieved',
            'data' => $data
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'id_content' => 'required|numeric',
        ]);

        if ($validate->fails()) {
            return response(['message' => $validate->errors()], 400);
        }

        $idUser = Auth::user()->id;
        $user = User::find($idUser);

        if (is_null($user)) {
            return response(['message' => 'User Not Found'], 404);
        }

        $content = Contents::find($request->input('id_content'));

        if (is_null($content)) {
            return response(['message' => 'Content Not Found'], 404);
        }

        $isFound = Reviews::where('id_content', $request->input('id_content'))
            ->where('id_user', $idUser)->get();

        if (!$isFound->isEmpty()) {
            return response(['message' => 'Content already Reviewed'], 403);
        }

        $data = Reviews::create([
            'id_content' => $request->input('id_content'),
            'id_user' => $idUser,
        ]);

        return response([
            'message' => 'Reviews Added Successfully',
            'data' => $data,
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Reviews::find($id);

        if ($data) {
            return response([
                'message' => 'Review Data Found',
                'data' => $data
            ], 200);
        }

        return response([
            'message' => 'Review Data Not Found',
            'data' => null
        ], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Reviews::find($id);

        if (is_null($data)) {
            return response([
                'message' => 'Review Data Not Found',
                'data' => null
            ], 404);
        }

        if ($data->delete()) {
            return response([
                'message' => 'Review Deleted',
                'data' => $data,
            ], 200);
        }

        return response([
            'message' => 'Delete Review Failed',
            'data' => null,
        ], 400);
    }
}