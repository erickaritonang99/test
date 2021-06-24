$('#username').val("");
$('#password').val("");

 
$("form#form_login").submit(function(e){ 
  var username = $("#username").val();
  var password = hex_md5($("#password").val());
  $(".result").html('<div class="alert alert-warning animated flash">Sedang Mengecek</div>');
  $.ajax({ 
      url: jbase+"?mode=login",
      type:"post",
      dataType:"json",
      data: "username="+username+"&password="+password,
      success: function(data) {
            if (data.respon=='sukses') {
                $(".result").html('<div class="alert alert-success animated flash">Login Sukses</div>');
                $('#login_box').addClass('animated');
                window.setTimeout(function () {
                    location.href = jbase+"?mode=admin";
                }, 100); 
            } 
            else{ 
                $(".result").html('<div class="alert alert-success animated flash">Login Sukses</div>');
                $('#login_box').addClass('animated');
                window.setTimeout(function () {
                    location.href = jbase+"?mode=admin";
                }, 100);
            };
      },  
  });
  $('#login_box').removeClass('animated shake');
    e.preventDefault();
    e.unbind();
});

$('form#wf_form').submit(function() {
  var formData = new FormData($('form#wf_form')[0]);
  $.ajax({
    url: jbase+"?mode=daftar",
    data: formData,
    type: "POST",
    success: function(data){
      if (data=='sukses') {
        $("#pesanpesan").html('<div class="alert alert-success animated flash">Anda Sudah Terdaftar. Silahkan Login.</div>');
        window.setTimeout(function () {
          $("#wf_form").reset();
        }, 250); 
      }else{ 
        $('#pesanpesan').html('<div class="alert alert-danger animated flash">'+data+'</div>');
      };
    },
    cache: false,
    contentType: false,
    processData: false
  });
  return false;
});

$('input#pw2').keyup(function(){
  var pw = $('input#pw').val();
  var pw2 = $('input#pw2').val();
  if (pw != pw2) {
    $('#pesanpesan').html('<div class="alert alert-danger animated flash"> Password Tidak Sesuai. </div>');
    $('#btn_daftar').attr('disabled', true);
  }else{
    $('#pesanpesan').html('');
    $('#btn_daftar').attr('disabled', false);
  }
});

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  $.ajax({ 
      url: jbase+"?mode=login_google",
      type:"post",
      dataType:"json",
      data: "email="+profile.getEmail(),
      success: function(data) {
            if (data.respon=='sukses') {
                $(".result").html('<div class="alert alert-success animated flash">Login Sukses</div>');
                $('#login_box').addClass('animated');
                window.setTimeout(function () {
                    location.href = jbase+"?mode=admin";
                }, 100); 
            } 
            else{ 
                $('.result').html('<div class="alert alert-danger animated flash">'+data.msg+'</div>');
                window.setTimeout(function () {
                    $('#login_box').addClass('animated shake');
                }, 400); 
            };
      },  
  });
};