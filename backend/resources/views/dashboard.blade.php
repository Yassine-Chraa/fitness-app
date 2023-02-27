@extends('layouts.app')

@section('content')
<div id="dashboard"></div>
<script>
    var api_token = "{{ Session()->get('api_token') }}";
    var user_name = "{{ Auth::user()->name }}"
    var user_role = "{{ Auth::user()->role }}"
    var user_profile = "{{ Auth::user()->profile }}"
    localStorage.setItem('api_token', api_token)
    localStorage.setItem('user_name', user_name)
    localStorage.setItem('user_role', user_role)
    localStorage.setItem('user_profile', user_profile)
</script>
@endsection
