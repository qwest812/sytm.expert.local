<div class="container add_page">

    <div class="add_page_url">
        <div>Язык</div>
        @if(!empty($languages))
            <select name="lang_id" >
            @foreach($languages as $language)
                    <option value="{{$language["id"]}}"
                    @if(isset($currentLang) && $currentLang == $language["language_name"])
                        selected
                        @endif
                    >{{$language["language_name"]}}</option>
            @endforeach
            </select>
            @else
            <a href="{{route('languages')}}" style="color: #007bff">Добавить язык</a>
        @endif

    </div>
    <div class="add_page_url">
        <div>Url</div>
        {!! Form::text('url')  !!}
    </div>
    <div class="add-images">
        @if(empty($page["main_img"]))
            <div>Добавить картинку</div>
            @else
            <div>Изменить Картинку</div>
            <img src="{{$page["main_img"]}}" alt="" height="100px" width="100px">
            <br>
            <br>
            @endif
        
        {!! Form::file('main_img') !!}
    </div>
    <div class="add_page_keyword">
        <div>Тип статьи</div>
        <select name="type" id="">
            <option value="1"
                    @if(!empty($page) && $page['type']=="1")
                                 selected
                                 @endif
                >
                Новость
            </option>
            <option value="2"
                    @if($page['type']=="2")
                    selected
                    @endif
            >
                Иследование
            </option>
        </select>
    </div>
    <div class="add_page_h1">
        <div>H1</div>
        {!! Form::text('h1') !!}
    </div>
    <div class="add_page_title">
        <div>Title</div>
        {!! Form::text('title') !!}
    </div>
    <div class="add_page_description">
        <div>Description</div>
        {!! Form::text('description') !!}
    </div>
    <div class="add_page_keyword">
        <div>Keyword</div>
        {!! Form::text('keyword') !!}
    </div>

    <div class="form-group">
        {!! Form::label('content', 'Content') !!}
        {!! Form::textarea('text', null, ['id'=>'summernote','rows' => 30, 'cols' => 54,]); !!}
    </div>

    @push('js-scripts')
        <script>
            $(document).ready(function () {

                $('#summernote').summernote({
                    callbacks: {
                        onImageUpload: function (files) {
                            // console.log(files);
                            var el = $(this);
                            sendFile(files[0], el);
                        },
                        onMediaDelete: function (file) {
                            deleteFile(file[0].src);
                            return false;
                            // console.log();
                        }
                    }
                });
            });

            function sendFile(file, el) {
                let location = document.location;
                let dataFile = new FormData();
                dataFile.append("file", file);
                let url = location.origin + '/admin/upload-image';
                $.ajax({
                    data: dataFile,
                    type: "POST",
                    headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                    url: url,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (url) {
                        console.log(url);
                        el.summernote('insertImage', '../../' + url);
                    }
                });
            }

            function deleteFile(filePath) {
                console.log(filePath);
                let location = document.location;
                let url = location.origin + '/admin/delete-image';
                $.ajax({
                    data: {path: filePath},
                    type: "POST",
                    headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                    url: url,
                    success: function (result) {
                        console.log(result);
                    }
                });
            }
        </script>
    @endpush
</div>
