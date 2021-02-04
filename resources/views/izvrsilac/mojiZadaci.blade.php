@extends('layouts.app')

@section('content')
    <div class="container">

        <h4 align="center">Ovde ce biti prikazani svi vasi zadaci:</h4>
        @if (session('status'))
            <div class="alert alert-success" role="alert">
                {{ session('status') }}
            </div>
        @endif

        <div id="mojizadaci" data-zadaci="{{ $zadaci }}"></div>
    </div>

@endsection
