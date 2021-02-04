@extends('layouts.app')

@section('content')
    <div class="container">



        <h3>Pregled zadatka</h3>


        <table class="table table-info ">
            <thead>
                <tr>

                    <th>Datum kreiranja zadatka</th>
                    <th>Deadline zadatka</th>
                </tr>
            </thead>
            <tbody>
                <td> {{ $zadatak[0]->created_at }}</td>

                <td> {{ $zadatak[0]->deadline }}</td>
            </tbody>
        </table>
        <table class="table table-warning table-responsive ">
            <thead>
                <tr>

                    <th scope="col-4">Datum kreiranja komentara</th>
                    <th>Komentar</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($zadatak[0]->komentari as $komentar)
                    <tr>
                        <td>{{ $komentar->created_at }}</td>
                        <td>{{ $komentar->komentar }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        </body>

        </html>


    </div>


@endsection
