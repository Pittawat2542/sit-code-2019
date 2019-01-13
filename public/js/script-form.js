$(document).ready(function() {
  $(".dropdown").dropdown();
  $(".checkbox").checkbox();

  $("form").on("submit", function(ev) {
    ev.preventDefault();
  });

  $(".ui.form").form({
    fields: fieldsValidators,
    onSuccess: function(event, fields) {
      $(".ui.teal.button").addClass("loading");
      $(".field").addClass("disabled");
      $.ajax({
        url: "/register",
        method: "POST",
        data: fields,
        timeout: 3000,
        success: function(result) {
          let word = $("<span></span>");
          word.append("<p>การลงทะเบียนเสร็จสิ้น</p>");
          word.append(
            '<p>ติดต่อสอบถาม/แจ้งปัญหา: <a href="mailto:sitcode@sit.kmutt.ac.th">sitcode@sit.kmutt.ac.th</a></p>'
          );
          $(".ui.teal.button").removeClass("loading");
          swal({
            type: "success",
            title: "สำเร็จ!",
            html: word,
            confirmButtonText: "ปิด"
          }).then(() => (window.location.href = "/"));
        },
        error: function(jqXHR, status, err) {
          $(".ui.teal.button").removeClass("loading");
          $(".field").removeClass("disabled");
          if (jqXHR.responseText === "ER_DUP_ENTRY") {
            swal(
              "พบข้อผิดพลาด!",
              "ชื่อทีมซ้ำ! กรุณาเปลี่ยนชื่อทีม แล้วลองใหม่อีกครั้ง",
              "error"
            );
          } else {
            swal("พบข้อผิดพลาด!", "กรุณาลองใหม่อีกครั้งในภายหลัง", "error");
          }
        }
      });
    },
    onFailure: function(formErrors, fields) {
      $(".ui.teal.button").removeClass("loading");
    }
  });
});
