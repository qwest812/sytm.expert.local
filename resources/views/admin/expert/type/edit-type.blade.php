@extends('admin.layout')
@section('content')
<h1>Edit Type</h1>
<div class="error">
    @if(!empty(Session::has('success')))
        {{ Session::get('success') }}
    @endif
</div>
<div class="date-info">
    <div>Created: {{$type['created_at']}}</div>
    <div>Last Update: {{$type['updated_at']}}</div>
</div>
    {!! Form::model($type,array('route' => 'save-type', 'method' => 'put')) !!}
    <div class="container">
        {!! Form::text('id',$type['id'],["hidden"]) !!}
        @include('admin.moto.components.component-add-page')
        <div class="add_page_keyword">
            <div>Type Name</div>
            {!! Form::text('type') !!}
        </div>
        {!! Form::submit('Save') !!}
        {!! Form::close() !!}
    </div>
@endsection