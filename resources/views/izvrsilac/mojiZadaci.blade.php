@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">

                    <h4 align="center">Ovde ce biti prikazani svi vasi zadaci:</h4>
                    <div class="card-body">
                        @if (session('status'))
                            <div class="alert alert-success" role="alert">
                                {{ session('status') }}
                            </div>
                        @endif

                        <div id="mojizadaci" data-zadaci="{{ $zadaci }}"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection
