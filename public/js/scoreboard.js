function scoreChecker(data) {
  if (data === "✓") {
    return " positive";
  } else if (data === "✖") {
    return " negative";
  } else {
    return "";
  }
}

function updateData() {
  $.ajax({
    url: "/mockscoreboard",
    method: "GET",
    timeout: 3000,
    success: function(result) {
      let elements = "";

      for (var i = 0; i < result.length; i++) {
        var str =
          '<tr><td data-label="ลำดับ" class="center aligned">' +
          (i + 1) +
          '</td><td data-label="ชื่อทีม" class="center aligned">' +
          result[i].team_name +
          '</td><td data-label="ข้อที่ 1" class="center aligned' +
          scoreChecker(result[i].question1) +
          '">' +
          result[i].question1 +
          '</td><td data-label="ข้อที่ 2" class="center aligned' +
          scoreChecker(result[i].question2) +
          '">' +
          result[i].question2 +
          '</td><td data-label="ข้อที่ 3" class="center aligned' +
          scoreChecker(result[i].question3) +
          '">' +
          result[i].question3 +
          '</td><td data-label="ข้อที่ 4" class="center aligned' +
          scoreChecker(result[i].question4) +
          '">' +
          result[i].question4 +
          '</td><td data-label="ข้อที่ 5" class="center aligned' +
          scoreChecker(result[i].question5) +
          '">' +
          result[i].question5 +
          '</td><td data-label="ข้อที่ 6" class="center aligned' +
          scoreChecker(result[i].question6) +
          '">' +
          result[i].question6 +
          '</td><td data-label="ข้อที่ 7" class="center aligned' +
          scoreChecker(result[i].question7) +
          '">' +
          result[i].question7 +
          '</td><td data-label="ข้อที่ 8" class="center aligned' +
          scoreChecker(result[i].question8) +
          '">' +
          result[i].question8 +
          '</td><td data-label="ข้อที่ 9" class="center aligned' +
          scoreChecker(result[i].question9) +
          '">' +
          result[i].question9 +
          '</td><td data-label="ข้อที่ 10" class="center aligned' +
          scoreChecker(result[i].question10) +
          '">' +
          result[i].question10 +
          "</td></tr>";

        elements += str;
      }

      $("tbody").html(elements);
      $("p").text("Last updated: " + new Date());
    }
  });
}

$("document").ready(function() {
  updateData();
  setInterval(updateData, 1000);
});
