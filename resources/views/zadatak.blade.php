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
        <table class="table table-hover table-info table-striped  ">
            <thead>
                <tr>

                    <th style="width: 30%">Datum kreiranja komentara</th>
                    <th style="width: 70%">Komentar</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($zadatak[0]->komentari as $komentar)
                    <tr>
                        <td>{{ $komentar->created_at }}</td>
                        <td style="word-break: break-all">{{ $komentar->komentar }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        @auth

            <h6>Dodaj komentar:</h6>
            <form method="post" action="{{ route('komentar.post') }}" accept-charset="UTF-8">
                @csrf
                <input placeholder="Vas komentar za zadatak {{ $zadatak[0]->naziv }}" type="text" name="komentar"
                    class="form-control">
                <input hidden type="text" value="{{ $zadatak[0]->id }}" name="task_id" class="form-control">
                <input type="submit" value="Dodaj komentar" class="form-control btn btn-secondary">

            </form>
        @endauth

        </body>

        </html>


    </div>


@endsection
