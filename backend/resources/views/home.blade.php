@extends('layouts.app')

@section('content')
    {{/*<div id="mainApp"></div>*/}}
    <div id="dashboard"></div>
    <script>
        var api_token = "{{ Session()->get('api_token') }}";
        localStorage.setItem('api_token', api_token)
        var user_name = "{{ Auth::user()->name }}"
        var user_role = "{{ Auth::user()->role }}"
        localStorage.setItem('user_name', user_name)
        localStorage.setItem('user_role', user_role)
    </script>
@endsection
