<div class="form" style="width: 420px;     top: 40px;
    left: 500px;
    width: 428px;
    position: absolute;">
    <form action="/send-mail" method="post">
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
                <button type="submit" class="t-submit"
                        style="color:#fff;border:1px solid #e3cb9f;background-color: transparent;font-family:Montserrat;font-weight:300;font-size:16px;box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.3);width:140px;height:40px;padding:0 15px;display:block;">
                    НАДІСЛАТИ
                </button>
            </div>
        </div>
    </form>
</div>