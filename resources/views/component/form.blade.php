<div class="form form_field">
    <form action="/send-mail" method="post" class="form-mail">
        @csrf
        <div class="t-form__inputsbox">
            <div class="t-input-group t-input-group_nm" data-input-lid="1531306243545" style="margin-bottom:20px;">
                <div class="t-input-block"><input type="text" name="name" class="t-input js-tilda-rule " value=""
                                                  placeholder="Ім’я" data-tilda-rule="name"
                                                  style="color:#000000; border:3px solid #e3cb9f; background-color:#e8e7e5; font-size:15px;font-weight:300;height:50px;">
                    <div class="t-input-error"></div>
                </div>
            </div>
            <div class="t-input-group t-input-group_ph" data-input-lid="1531306540094" style="margin-bottom:20px;">
                <div class="t-input-block"><input type="text" name="phone" class="t-input js-tilda-rule  " value=""
                                                  placeholder="Тел" data-tilda-rule="phone"
                                                  style="color:#000000; border:3px solid #e3cb9f; background-color:#e8e7e5; font-size:15px;font-weight:300;height:50px;">
                    <div class="t-input-error"></div>
                </div>
            </div>
            <div class="t-input-group t-input-group_em" data-input-lid="1589273793411" style="margin-bottom:20px;">
                <div class="t-input-block"><input type="text" name="email" class="t-input js-tilda-rule " value=""
                                                  placeholder="E-mail" data-tilda-rule="email"
                                                  style="color:#000000; border:3px solid #e3cb9f; background-color:#e8e7e5; font-size:15px;font-weight:300;height:50px;">
                    <div class="t-input-error"></div>
                </div>
            </div>
            <div class="t-input-group t-input-group_ta" data-input-lid="1589273807851" style="margin-bottom:20px;">
                <div class="t-input-block"><textarea name="text_field" class="t-input js-tilda-rule " value=""
                                                     placeholder="Повідомлення"
                                                     style="color:#000000; border:3px solid #e3cb9f; background-color:#e8e7e5; font-size:15px;font-weight:300;height:50px; height:85px; padding-top:10px;"
                                                     rows="3"></textarea>
                    <div class="t-input-error"></div>
                </div>
            </div>
            <div class="t-form__errorbox-middle">
                <div class="js-errorbox-all t-form__errorbox-wrapper" style="display:none;">
                    <div class="t-form__errorbox-text t-text t-text_xs"><p
                                class="t-form__errorbox-item js-rule-error js-rule-error-all"></p>
                        <p class="t-form__errorbox-item js-rule-error js-rule-error-req"></p>
                        <p class="t-form__errorbox-item js-rule-error js-rule-error-email"></p>
                        <p class="t-form__errorbox-item js-rule-error js-rule-error-name"></p>
                        <p class="t-form__errorbox-item js-rule-error js-rule-error-phone"></p>
                        <p class="t-form__errorbox-item js-rule-error js-rule-error-string"></p></div>
                    <div class="tn-form__errorbox-close js-errorbox-close">
                        <div class="tn-form__errorbox-close-line tn-form__errorbox-close-line-left"></div>
                        <div class="tn-form__errorbox-close-line tn-form__errorbox-close-line-right"></div>
                    </div>
                </div>
                <style>.tn-atom .t-input-error {
                        position: absolute;
                        color: red;
                        background-color: #fff;
                        padding: 8px 10px;
                        border-radius: 2px;
                        z-index: 1;
                        margin-top: 5px;
                        left: 0px;
                        box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.2);
                    }

                    .tn-atom .t-input-error:after {
                        content: '';
                        position: absolute;
                        width: 0;
                        height: 0;
                        border: solid transparent;
                        border-width: 6px;
                        top: -12px;
                        left: 15%;
                        border-bottom-color: #fff;
                    }

                    .tn-form__errorbox-close {
                        height: 14px;
                        position: absolute;
                        right: 8px;
                        top: 8px;
                        width: 14px;
                        cursor: pointer;
                    }

                    .tn-form__errorbox-close-line {
                        background: #fff none repeat scroll 0 0;
                        height: 1px;
                        left: 0;
                        margin-top: -1px;
                        position: absolute;
                        top: 50%;
                        width: 100%;
                    }

                    .tn-form__errorbox-close-line-left {
                        transform: rotate(45deg);
                    }

                    .tn-form__errorbox-close-line-right {
                        transform: rotate(-45deg);
                    }

                    .tn-atom .t-form__errorbox-wrapper, .tn-form__errorbox-popup {
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        z-index: 10000;
                        max-width: 400px;
                        min-width: 260px;
                        width: auto;
                        box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
                        border-radius: 3px;
                        text-align: left;
                        font-family: Arial, sans-serf;
                        background: #F95D51;
                        padding: 10px;
                    }

                    .tn-atom .js-error-control-box .t-radio__wrapper, .tn-atom .js-error-control-box .t-checkbox__control {
                        padding: 3px;
                        margin-top: -3px;
                    }

                    @media screen and (max-width: 480px) {
                        .tn-atom .t-form__errorbox-wrapper, .tn-form__errorbox-popup {
                            max-width: 280px;
                        }
                    }</style>
                <script>$(".tn-atom .js-errorbox-close").click(function () {
                        $(this).parent().css("display", "none");
                    });</script>
            </div>
            <div class="tn-form__submit" style="">
                <button type="submit" class="t-submit send-mail"
                        style="color:#fff;border:1px solid #e3cb9f;background-color: transparent;font-family:Montserrat;font-weight:300;font-size:16px;box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.3);width:140px;height:40px;padding:0 15px;display:block;">
                    НАДІСЛАТИ
                </button>
            </div>
        </div>
    </form>
</div>
<script>
    $(".form-mail").on("submit",function (e) {
        e.preventDefault();
        let form =$(this);
        console.log(form.serialize());
        $.ajax({
            url: "send-mail",
            'method': 'post',
            data:form.serialize(),
            success: function(result){
                if (result =="true"){
                    $('.t-form-success-popup').show();
                    $('.t-form-success-popup__close-icon').on("click",function () {
                        console.log(123);
                        $('.t-form-success-popup').hide();
                    });
                    return
                }
                $('.tilda-popup-for-error').show();
            },
        error:function () {
            $('.tilda-popup-for-error').show();
        }});

    })
</script>
<style>
    .form_field{
        width: 420px;
        top: 40px;
        left: 500px;
        position: absolute;
    }
    @media screen and (max-width: 600px) {
        .form_field{
            width: 420px;
            top: 250px;
            left: 256px;
            position: absolute;
        }
    }

</style>
<style media="screen"> .t-form-success-popup { display: none; position: fixed; background-color: rgba(0,0,0,.8); top: 0px; left: 0px; width: 100%; height: 100%; z-index: 10000; overflow-y: auto; cursor: pointer; } .t-body_success-popup-showed { height: 100vh; min-height: 100vh; overflow: hidden; } .t-form-success-popup__window { width: 100%; max-width: 400px; position: absolute; top: 50%; -webkit-transform: translateY(-50%); transform: translateY(-50%); left: 0px; right: 0px; margin: 0 auto; padding: 20px; box-sizing: border-box; } .t-form-success-popup__wrapper { background-color: #fff; padding: 40px 40px 50px; box-sizing: border-box; border-radius: 5px; text-align: center; position: relative; cursor: default; } .t-form-success-popup__text { padding-top: 20px; } .t-form-success-popup__close-icon { position: absolute; top: 14px; right: 14px; cursor: pointer; } @media screen and (max-width: 480px) { .t-form-success-popup__text { padding-top: 10px; } .t-form-success-popup__wrapper { padding-left: 20px; padding-right: 20px; } } </style>
<div class="t-form-success-popup" style="display: none;" id="tildaformsuccesspopup"> <div class="t-form-success-popup__window"> <div class="t-form-success-popup__wrapper"> <svg class="t-form-success-popup__close-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 23 23"> <g fill-rule="evenodd"> <path d="M0 1.41L1.4 0l21.22 21.21-1.41 1.42z"></path> <path d="M21.21 0l1.42 1.4L1.4 22.63 0 21.21z"></path> </g> </svg> <svg width="50" height="50" fill="#62C584"> <path d="M25.1 49.28A24.64 24.64 0 0 1 .5 24.68 24.64 24.64 0 0 1 25.1.07a24.64 24.64 0 0 1 24.6 24.6 24.64 24.64 0 0 1-24.6 24.61zm0-47.45A22.87 22.87 0 0 0 2.26 24.68 22.87 22.87 0 0 0 25.1 47.52a22.87 22.87 0 0 0 22.84-22.84A22.87 22.87 0 0 0 25.1 1.83z"></path> <path d="M22.84 30.53l-4.44-4.45a.88.88 0 1 1 1.24-1.24l3.2 3.2 8.89-8.9a.88.88 0 1 1 1.25 1.26L22.84 30.53z"></path> </svg> <div class="t-form-success-popup__text t-descr t-descr_sm" id="tildaformsuccesspopuptext">Thank you! Your data has been submitted.</div> </div> </div> </div>



<div id="tilda-popup-for-error" class="js-form-popup-errorbox tn-form__errorbox-popup" style=" display: none;" > <div class="t-form__errorbox-text t-text t-text_xs"><p class="t-form__errorbox-item" style="display: none;">Error, try later</p></div> <div class="tn-form__errorbox-close js-errorbox-close"> <div class="tn-form__errorbox-close-line tn-form__errorbox-close-line-left"></div> <div class="tn-form__errorbox-close-line tn-form__errorbox-close-line-right"></div> </div> </div>