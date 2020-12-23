// 햄거버 메뉴
var giMenuDuration = 700;

function ShowMenu() {
  $(".menu_bg").css({
    display: "block",
  });
  $(".menu").css({
    left: "-100%",
  });
  $(".menu").animate({
    left: "0px",
  }, {
    duration: giMenuDuration,
  });
}

function HideMenu() {
  $(".menu").animate({
    left: "-100%",
  }, {
    duration: giMenuDuration,
    complete: function () {
      $(".menu_bg").css({
        display: "none",
      });
    },
  });
}

function ShowSubMenu(num) {
  var lySubMenu = $(`#sub${num}`);

  if (lySubMenu.first().is(":hidden")) {
    $(`#sub${num}`).slideDown(300);
    $(`.show-icon${num}`).attr("src", "./images/close_menu.png");
  } else {
    $(`#sub${num}`).slideUp(300);
    $(`.show-icon${num}`).attr("src", "./images/open_menu.png");
  }
}

function openModal(num) {
  $(".modal-background" + num).fadeIn();
  $(".modal-content" + num).fadeIn();

  $(".close").click(function () {
    $(".modal-background" + num).fadeOut();
    $(".modal-content" + num).fadeOut();
  });
}

function clickMoodBar(num) {
  for (var i = 1; i <= num; i++) {
    $(`.mood-bar${i}`).addClass(`mood-bar-color${i}`);
  }
  for (var j = num + 1; j <= 10; j++) {
    $(`.mood-bar${j}`).removeClass(`mood-bar-color${j}`);
  }

  if (num <= 4) {
    $(".smile").fadeIn();
    $(".soso").css("display", "none");
    $(".tired").css("display", "none");
  } else if (5 <= num && num <= 7) {
    $(".soso").fadeIn();
    $(".smile").css("display", "none");
    $(".tired").css("display", "none");
  } else {
    $(".tired").fadeIn();
    $(".soso").css("display", "none");
    $(".smile").css("display", "none");
    openModal(1);
  }

  $(".show-graph").fadeIn();

  localStorage.setItem("moodScore", num);
}

// 아바타 이름변경
function avatarNameChange(num) {
  var changeName = $("#avatar-name").val();
  if (changeName === "") {
    alert("아바타 이름을 정해주세요");
    $("#avatar-name").focus();
    return;
  }
  localStorage.setItem("avatarName", changeName);
  $(".modal-background" + num).fadeOut();
  $(".avatar-name").text(changeName);
}

// 아바타 이름변경
function trustNameChange(num) {
  var changeName = $("#trust-name").val();
  var changeTel = $("#trust-tel").val();
  if (changeName === "") {
    alert("이름을 적어주세요");
    $("#trust-name").focus();
    return;
  }
  if (changeTel === "") {
    alert("전화번호를 적어주세요");
    $("#trust-tel").focus();
    return;
  }

  localStorage.setItem("trust-name", changeName);
  localStorage.setItem("trust-tel", changeTel);
  $(".modal-background" + num).fadeOut();
}

function hiddenTeatarea(num) {
  $(`.write-container${num}`).css("display", "none");
  $(`#mind-write-${num}`).on(
    "propertychange change keyup paste input",
    function () {
      var currentVal = $(this).val();
      localStorage.setItem(`mind-write-${num}`, currentVal);
    }
  );
}

function getTeatarea(num) {
  var getMindWrite = localStorage.getItem(`mind-write-${num}`);
  $(`#mind-write-${num}`).val(getMindWrite);
}

function changeInput(id) {
  console.log(id);
  $(`#${id}`).on("propertychange change keyup paste input", function () {
    var currentVal = $(this).val();
    localStorage.setItem(id, currentVal);
  });
}

var surveyList = [
  "식욕이 없었다.",
  "울적한 기분을 떨쳐 버릴 수 없었다.",
  "무슨 일을 하든 정신을 집중하기가 힘들었다.",
  "상당히 우울했다.",
  "잠을 설쳤다. (잠을 잘 이루지 못했다.)",
  "마음이 슬펐다.",
  "도무지 뭘 해 나갈 엄두가 나지 않았다.",
  "나를 행복하게 하는 것은 아무것도 없었다.",
  "내가 나쁜 사람처럼 느껴졌다.",
  "일상 활동에 대한 흥미를 잃었다.",
  "평소보다 훨씬 더 많이 잤다.",
  "내 움직임이 너무 둔해진 것처럼 느껴졌다.",
  "안절부절 못했다.",
  "죽었으면 하고 바랬다.",
  "자해하고 싶었다.",
  "항상 피곤했다.",
  "나 자신이 싫었다.",
  "(살을 빼려고) 노력하지 않았는데, 몸무게가 줄었다.",
  "잠들기가 많이 힘들었다.",
  "중요한 일에 집중할 수가 없었다.",
];

var radioTotal = 0;

function loadList(num) {
  if (num > 0) {
    for (var i = 1; i < 6; i++) {
      var radioVal = $(`input[name="radio${i}"]:checked`).val();
      // console.log(radioVal);
      if (radioVal === undefined) {
        alert("모든 항목에 체크해주세요.");
        return;
      }
      radioTotal += Number(radioVal);
    }

    $("#survey_form")[0].reset();
  }

  if (num === 20) {
    localStorage.setItem("surveyResult", radioTotal);
    window.location.href = "./mood-3.html";
  }

  for (var i = num; i < num + 5; i++) {
    // console.log(i);
    $(`.survey${i}`).text(surveyList[i]);
    if (i === 17) {
      $(".survey17").addClass("small");
    }
  }
  $(".btn-container")
    .empty()
    .append(
      num === 15 ?
      `<div class="listen-btn" onclick="loadList(${num + 5})">제출</div>` :
      `<div class="listen-btn" onclick="loadList(${num + 5})">다음</div>`
    );
}

var selectList = [
  "빨간색 볼펜으로 자해하고 싶은 부분에 그려보기",
  "심호흡 크게 해보기",
  "무작정 그 자리를 떠나서 동네주변을 걷거나 뛰기",
  "얼음움켜쥐기",
  "가장 좋아하는 노래 무작정 부르기",
  "빨간색 물감을 자해하고 싶은 부위에 떨어트려보기",
  "노래 들으면서 마음껏 울어버리기",
  "매운음식먹으러 밖에 나가기",
  "평소 Youtube에서 재밌게 본 프로그램 짤보기",
  "그 자리에서 맨손 줄넘기해보기",
  "손 맞잡고 머리 위로 쭉! 기지개 펴듯 스트레칭하기",
  "바로 네*버 켜서 연애 뉴스 보기",
  "인터넷 쇼핑몰 찾아서 최신 신상품 구경하기",
  "애완동물이 있다면, 애완동물 돌보기",
  "소리 한번 크게 질러보기",
  "내 손목 사진 위에 빨간색으로 칠해보기",
];

function loadMindSelectList() {
  var getCheckList = localStorage.getItem("checkList");
  var getCheckListToArray = getCheckList.split(",");
  console.log(getCheckListToArray);
  for (var i = 0; i < selectList.length; i++) {
    $(`#mind-${i < 8 ? 9 : 10} .mind-desc`).append(`
    <label class="wrapper-label">
      <input type="checkbox" id="cb" name="checkbox${i}" value="${i}" />
      <label for="cb"> 
        <div class="cb-checked"></div> 
      </label>${selectList[i]}</label>
    `);
  }

  if ($("body").hasClass("re-select")) {
    for (var i = 0; i < getCheckListToArray.length; i++) {
      $(`input:checkbox[name="checkbox${getCheckListToArray[i]}"]`).attr(
        "checked",
        "checked"
      );
    }
  }

  $(`#mind-10 .mind-desc`).append(`
    <div class="listen-btn" onclick="selectConfirm()">선택완료</div>
    `);
}

function loadSelectList() {
  var getCheckList = localStorage.getItem("checkList");
  var getCheckListToArray;
  if (getCheckList === "") {
    getCheckListToArray = [];
  } else {
    getCheckListToArray = getCheckList.split(",");
  }

  for (var i = 0; i < getCheckListToArray.length; i++) {
    $(`#mind-${i < 8 ? 9 : 10} .mind-desc`).append(`
    <label class="wrapper-label">
      <input type="checkbox" id="cb" name="checkbox${
        getCheckListToArray[i]
      }" value="${getCheckListToArray[i]}" checked disabled />
      <label for="cb"> 
        <div class="cb-checked"></div> 
      </label>${selectList[getCheckListToArray[i]]}</label>
    `);
  }

  $(`#mind-${i < 8 ? 9 : 10} .mind-desc`).append(`
    <div class="taym-btn-container">
      <div class="blue-btn back">
        <a href="./taym-1.html"> 뒤로가기 </a>
      </div>
      <div class="blue-btn">
      ${
        getCheckListToArray.length == 0
          ? `<a href="./mind-2.html">선택하기</a>`
          : `<a href="./taym-6.html">수정하기</a>`
      }
      </div>
    </div>
    `);
}

function selectConfirm() {
  var checkArr = [];
  for (var i = 0; i < 17; i++) {
    var checkVal = $(`input[name="checkbox${i}"]:checked`).val();
    if (checkVal !== undefined) {
      checkArr.push(checkVal);
    }
  }
  if ($("body").hasClass("mind-2-select")) {
    openModal(1);
  }
  if ($("body").hasClass("re-select")) {
    $(location).attr("href", "taym-5.html");
  }
  localStorage.setItem("checkList", checkArr);
}

navigator.vibrate =
  navigator.vibrate ||
  navigator.webkitVibrate ||
  navigator.mozVibrate ||
  navigator.msVibrate;

function vibrate() {
  if (navigator.vibrate) {
    navigator.vibrate(1000); // 진동을 울리게 한다. 1000ms = 1초
  }
}

function selectView() {
  var selectBtn = document.querySelector(".check-view");
  var CLICKED_CLASS = "clicked";

  selectBtn.classList.toggle(CLICKED_CLASS);

  console.log(selectBtn.classList.contains(CLICKED_CLASS));
  if (selectBtn.classList.contains(CLICKED_CLASS)) {
    localStorage.setItem("selectView", false);
  } else {
    localStorage.setItem("selectView", true);
  }
}

function loadModal() {
  var getSelectView = localStorage.getItem("selectView");
  console.log(getSelectView);
  if (getSelectView === "true") {
    openModal(1);
  }
}

$(document).ready(function () {
  $(".emergency-btn")
    .parent()
    .click(function (e) {
      console.log("부모");
    });

  $(".finger-icon").on("touchstart", function () {
    $(".finger-icon").attr("src", "./images/finger_end.png");
    vibrate();
  });

  $(".finger-icon").on("touchend", function () {
    openModal(1);
  });

  $(".menu_2").hide();

  // 모달 텍스트 변경
  var mindInnerText = [
    '"물론 가끔 자해 생각이 나기도 했지만, 스트레스를 다른 방법으로 풀었어요... 운동을 하면서 살을 빼고, 그렇게 자기 관리를 하면서 스트레스를 운동으로 풀게 되는 거예요...”',
    '"만약에 제가 욕심이 없었다면 그 (자해를 하던) 모습을 계속 유지했을 거 같아요. 살아야겠다는.. 물론 매일 죽고 싶다는 생각을 하기는 했지만 한편에는 살고자 하는 마음이 더 있었던 거죠. 그러다보니깐 그걸 극복하려던 마음으로 살고자 하는 욕심이 있었어요"',
    '"저 같은 경우에는 이야기를 하고 싶었거든요. 제 이야기를 누가 들어주니깐 엄청 도움이 되었어요. 주변에 이렇게 깊은 이야기를 친구나 선생님한테 할 수 없으니깐 상담이 도움이 많이 되었어요"',
  ];
  var i = 0;
  $(".mind-modal-desc").text(mindInnerText[i]);
  $(".modal-next").click(function () {
    i++;
    $(".mind-modal-desc").text(mindInnerText[i]);
    if (i === mindInnerText.length - 1) {
      $(".modal-next").text("닫기");
      $(".modal-next").addClass("close");
    } else if (i === mindInnerText.length) {
      $(".modal-background").fadeOut();
    }
  });

  // footer menu 페이지에 따른 아이콘 변경
  var id_by_body = $("body").attr("id");
  var class_by_body = $("body").attr("class");

  if ($("body").hasClass("blue-nav")) {
    // console.log(id_by_body);
    $("footer").css("background-color", "#73d1e6");
    $(".home-icon").attr("src", "./images/footer_icon_1_white.png");
    $(".modify-icon").attr("src", "./images/footer_icon_2_blue.png");
    $(".graph-icon").attr("src", "./images/footer_icon_3_blue.png");
    $(".call-icon").attr("src", "./images/footer_icon_4_blue.png");
    if (id_by_body === "taym") {
      $(".home-icon").attr("src", "./images/footer_icon_1_blue.png");
      $(".modify-icon").attr("src", "./images/footer_icon_2_white.png");
    }
  }

  if ($("body").hasClass("taym-call")) {
    var getTrustTel = localStorage.getItem("trust-tel");
    var getTrustName = localStorage.getItem("trust-name");
    $(".taym-call-connect").attr("href", `tel:${getTrustTel}`);
    $("#trust-name").val(getTrustName);
    $("#trust-tel").val(getTrustTel);
  }

  switch (id_by_body) {
    case "intro":
      localStorage.setItem("avatarName", "TAYM");
      localStorage.setItem("selectView", true);
      localStorage.setItem("checkList", "");
      break;

    case "home":
      $(".logo").attr("src", "./images/logo_home.png");
      $(".menu-icon div").css("background-color", "#ffffff");
      break;

    case "taym-detail":
      console.log("taym-detail");
      $(".home-icon").attr("src", "./images/footer_icon_1_gray.png");
      $(".modify-icon").attr("src", "./images/footer_icon_2_blue_select.png");
      break;
  }

  var getMoodScore = localStorage.getItem("moodScore");
  if ($("body").hasClass("junior-1")) {
    console.log(getMoodScore);
    if (getMoodScore === null) {
      $(".meet-btn").click(function () {
        $(location).attr("href", "junior-2.html");
      });
    } else {
      $(".meet-btn").click(function () {
        $(location).attr("href", "junior-3.html");
      });
    }
  }

  if ($("body").hasClass("junior-4")) {
    if (getMoodScore <= 4) {
      $(".junior-content").css(
        "background-image",
        "url('../images/junior_smile_bg.png')"
      );
      $(".junior-bubble-text").text("오늘 기분 좋아!");
      $(".avatar").attr("src", "./images/smail_avatar.png");
    } else if (5 <= getMoodScore && getMoodScore <= 7) {
      $(".junior-content").css(
        "background-image",
        "url('../images/junior_bg.png')"
      );
      $(".junior-bubble-text").text("안녕 잘지내?!");
      $(".avatar").attr("src", "./images/hello_avatar.png");
    } else if (getMoodScore >= 7) {
      $(".junior-content").css(
        "background-image",
        "url('../images/junior_sad_bg.png')"
      );
      $(".junior-bubble-text").html("난 조금 힘들어,<br> 너는 어때?");
      $(".avatar").attr("src", "./images/sad_avatar.png");
      $(".main-cheer-btn").css("display", "flex");
    }

    var getAvatarName = localStorage.getItem("avatarName");
    $(".avatar-name").text(getAvatarName);
    $("#avatar-name").val(getAvatarName);
  }

  if (class_by_body === "mood-result-page") {
    var getSurveyResult = localStorage.getItem("surveyResult");
    console.log(getSurveyResult);
    $(".survey-result").text(getSurveyResult);
    if (getSurveyResult <= 13) {
      openModal(1);
    }
  }
});

// input type이 number일 때 입력 글자 수 제한하기

function maxLengthCheck(e) {
  if (e.value.length > e.maxLength) {
    e.value = e.value.slice(0, e.maxLength);
  }
}

// 연도가 1920년 이전 날짜가 입력되지 않도록 제한하기

function yearValidation(year) {
  var current_year = new Date().getFullYear();
  if (year < 1920 || year > current_year) {
    $("#year").val(""); // 빈값으로 처리하기
    $("#year").focus(); // 빈공간(연도)에 다시 포커스 시키기
  } else {}
}

// 월은 1월 부터 12월 까지만 입력 되도록 처리

function monthValidation(month) {
  if (month < 1 || month > 12) {
    $("#month").val("");
    $("#month").focus();
  } else {}
}

// 일은 1일 부터 31일 까지만 입력 되도록 처리

function dayValidation(day) {
  if (day < 1 || day > 31) {
    $("#day").val("");
    $("#day").focus();
  } else {}
}

// 가져온 현재날짜와 입력날짜 차이를 구하기

function printDiff() {
  var today = new Date();

  // 현재 달이 입력된 달보다 값이 클 때
  if (today.getMonth() + 1 > document.getElementById("month").value) {
    var year = today.getFullYear() - document.getElementById("year").value;
    var month = today.getMonth() + 1 - document.getElementById("month").value;

    // 현재 달이 입력된 달보다 값이 작을 때
  } else {
    var year = today.getFullYear() - document.getElementById("year").value - 1;
    var month = today.getMonth() + 13 - document.getElementById("month").value;
  }

  // 계산된 연도 값이 들어가도록 하기
  console.log(year);
  $("#result-year").text(year);

  console.log(month);
  $("#result-month").text(month);
}

// 파일 업로드

// 자바스크립트 사용 할 때
function uploadImgPreview() {
  let fileInfo = document.getElementById("upImgFile").files[0];
  let reader = new FileReader();

  reader.onload = function () {
    document.getElementById(
      "drawCanvas"
    ).style.backgroundImage = `url(${reader.result})`;

    // 사진외에 화면은 다 지웁니다.
    $("#import-photo").hide();
    $("#take-photo").hide();
  };

  if (fileInfo) {
    reader.readAsDataURL(fileInfo);
  }
}

// 그림 그리기

function drawing() {
  var drawCanvas = document.getElementById("drawCanvas");

  if (typeof drawCanvas.getContext == "function") {
    var ctx = drawCanvas.getContext("2d");
    var width = 10;
    var color = "red";
    var pDraw = $("#drawCanvas").offset();
    var currP = null;

    $("#drawCanvas").bind("touchstart", function (e) {
      e.preventDefault();
      ctx.beginPath();
    });

    $("#drawCanvas").bind("touchmove", function (e) {
      var event = e.originalEvent;
      e.preventDefault();
      currP = {
        X: event.touches[0].pageX - pDraw.left,
        Y: event.touches[0].pageY - pDraw.top,
      };
      draw_line(currP);
    });

    $("#drawCanvas").bind("touchend", function (e) {
      e.preventDefault();
    });

    function draw_line(p) {
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.lineTo(p.X, p.Y);
      ctx.moveTo(p.X, p.Y);
      ctx.strokeStyle = color;
      ctx.stroke();
    }
  }
}

// 사진 찍기

$(function () {
  $("#camera").change(function (e) {
    $("#pic").attr("src", URL.createObjectURL(e.target.files[0]));
  });
});

// 리셋 버튼 누르면 사진찍기와 사진불러오기 화면으로 가기

function clearCanvas() {
  var canvas = document.getElementById("drawCanvas");
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("drawCanvas").style.backgroundImage = "";
  $("#import-photo").show();
  $("#take-photo").show();
}