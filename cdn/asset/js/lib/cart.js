var actualheight;
var current_div;
function init(divid) {
  //alert("trying to set Initial props for " +divid);
  try {
    if (document.getElementById(divid).offsetHeight) {
      actualheight = document.getElementById(divid).offsetHeight;
      //alert(actualheight);
    } else {
      actualheight = 219;

      //alert("i am unable to find the height of "+ divid);
    }
    if (divid == "login-div") {
      actualheight = 219;
    }
    //alert ("trying to set height of div to 0");
    document.getElementById(divid).style.height = 0 + "px";
    document.getElementById(divid).style.display = "none";
  } catch (e) {
    //actualheight=300;
    //alert(e);
  }
  //alert(actualheight);
}
var i = 0;

function show(divid, top) {
  if (divid) {
    current_div = divid;
  }

  var divid = current_div;
  document.getElementById(divid).style.display = "block";
  document.getElementById(divid).style.height = i + "px";
  i = i + 15;
  if (i < actualheight) {
    setTimeout("show()", 1);
  } else {
    document.getElementById(divid).style.height = actualheight + "px";
  }
}

var j = 0;
function hide(divid) {
  try {
    if (divid) {
      current_div = divid;
    }
    divid = current_div;
    //alert('Trying to hide '+ divid);
    if (document.getElementById(divid).offsetHeight) {
      j = document.getElementById(divid).offsetHeight;
      if (j > 0) {
        j = j - 15;
      }
      if (j <= 0) {
        j = 0;
        i = 0;
        //alert("setting height to 0");
        document.getElementById(divid).style.height = 0 + "px";
        document.getElementById(divid).style.display = "none";

        //document.getElementById(divid).style.top=-85+'px';
        //alert("successfully set height to 0");
      } else {
        document.getElementById(divid).style.height = j + "px";
        setTimeout("hide()", 0);
      }
    }
  } catch (e) {
    //alert(e);
  }
}

function show_hide_privacy_protection_tab(hide_privacy_protection) {
  if (typeof hide_privacy_protection == "undefined") {
    hide_privacy_protection = false;
  }
  if (
    !privacy_protection_allowed ||
    jQuery.inArray(product_key, noprivacytlds) !== -1 ||
    hide_privacy_protection
  ) {
    $("#tab3").hide();
  } else {
    $("#tab3").show();
  }
}

function show_hide_nameservers_tab(hide_nameservers) {
  if (hide_nameservers) {
    $("#tab2").hide();
  } else {
    $("#tab2").show();
  }
}

function check_cn_agreement_acceptance() {
  if (!$("input[name='cnhostingclause']:visible").prop("checked")) {
    var errObj = new Object();
    errObj["status"] = "fail";
    errObj["data"] = "<ul><li>Please accept the hosting clause.</li></ul>";
    //var errResponse = JSON.stringify(errObj);

    show_newcheckout_form_errors(errObj);
    return false;
  }

  return true;
}

function time_out() {
  var countDownDate = new Date().getTime() + 1000 * 60 * 10;
  var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
      clearInterval(x);
      $("#time").html("0");
      // Get desired elements
      var element = $(".downloadnow");
      // Iterate through the retrieved elements and add the necessary class names.
      $(".downloadnow").each(function () {
        $(this).addClass("disableddownload");
      });
      $("#note_download").css("display", "none");
      $("#note_expired").css("display", "block");
    } else {
      $("#time").html(minutes + ":" + seconds);
    }
  }, 1000);
}

function getRandomID(n) {
  return (
    Math.floor(Math.random() * (9 * Math.pow(10, n - 1))) + Math.pow(10, n - 1)
  );
}

$(document).ready(function () {
  if (typeof ECOMMERCE_GTM_KEY != "undefined" && ECOMMERCE_GTM_KEY != "") {
    $.ajax({
      url: "/ui/supersite/en/js/gtm.js",
      cache: true,
    }).done(function () {
      console.log("gtm script loaded");
    });
  }

  window.dataLayer = window.dataLayer || [];
  $.ajax({
    url: "/ui/supersite/en/js/gtmDataLayer.js",
    cache: true,
  }).done(function () {
    console.log("gtmDataLayer script loaded");
  });

  $("#themepluginlogos_download").on("click", ".downloadnow", function () {
    if ($(this).find("span").hasClass("downarrow")) {
      $(this).find(".arrow").removeClass("downarrow").addClass("uparrow");
      $(this).parent().find(".download-dropdown").fadeIn("slow");
    } else {
      $(this).find(".arrow").removeClass("uparrow").addClass("downarrow");
      $(this).parent().find(".download-dropdown").fadeOut("slow");
    }
  });

  if ($(".themepluginlogos-purchase-details").length > 0) {
    $.ajax({
      type: "POST",
      url: $.url("/checkout.php"),
      data: "action=get_themepluginlogo_link",
      dataType: "html",
      success: function (data) {
        $("#themepluginlogos_download").html(data);
      },
    });
  }
});

//Fetch previous dataLayer contents from localstorage and push them into dataLayer
$(window).load(function () {
  //Push loggedin customer's details into dataLayer
  try {
    var customerID = $("#customer_id").val();
    if (customerID != undefined && customerID != "") {
      dataLayerCustomerLogin();
    }
  } catch (e) {
    console.log(e);
  }

  //Land on checkout page
  if ($(".CartSection").length) {
    if (sessionStorage.originaluserId == undefined) {
      var originaluserId = getRandomID(10); //Identify user
      sessionStorage.setItem("originaluserId", originaluserId); //Store user identity in localstorage
    }
    try {
      dataLayerAddToCart();
    } catch (e) {
      console.log(e);
    }
  }

  if (sessionStorage.originaluserId != undefined) {
    //Order placed
    $("#pay_debit_button, #pay_gateway_button, #pay_offline_button").click(
      function () {
        if ($(this).attr("id") == "pay_debit_button") {
          sessionStorage.setItem("payment_method", "Paid by account balance");
        } else if ($(this).attr("id") == "pay_gateway_button") {
          sessionStorage.setItem("payment_method", "Online payment");
        } else {
          sessionStorage.setItem("payment_method", "Offline payment");
        }

        dataLayerMeasuringCheckout();
      }
    );

    if (
      $(".autorenew-success-msg").length > 0 ||
      $(".CartSection .note2.green-bar").length > 0
    ) {
      $.ajax({
        type: "GET",
        url: $.url("/api/gtm/data"),
        dataType: "json",
        success: function (result) {
          dataLayerOrderPlaced(result);
          dataLayerPurchase(result);
        },
        complete: function () {
          // your completing steps
          $.ajax({
            type: "DELETE",
            url: $.url("/api/gtm/unsetdata"),
            dataType: "json",
            success: function (result) {
              console.log("Purchase complete, reset cart data");
            },
          });
        },
      });
    }

    var arflag;
    //Add Cart items in dataLayer when user toggles auto renew
    $(".add-auto-renewal-cart input:checkbox").change(function () {
      $.ajax({
        type: "GET",
        url: $.url("/api/gtm/data"),
        dataType: "json",
        success: function (result) {
          $.each(result.data.cart_items, function (index, element) {
            if ($("#" + $.escapeSelector(index) + "_label").is(":checked"))
              arflag = true;
            else arflag = false;
            Object.assign(result.data.cart_items[index], {
              autorenewal_status: arflag,
            });
          });
          dataLayerAutoRenewCartItemUpdate(result);
        },
      });
    });

    //Add Cart items in dataLayer when user changes duration

    if ($(".dropdown-value").length) {
      var $cartprice = $(".dropdown-value");
      if ("MutationObserver" in window) {
        var observer = new MutationObserver(highlight);
        observer.observe($cartprice[0], {
          childList: true,
        });
      } else {
        //for browsers which does not support MutationObserver
        $cartprice.on("DOMSubtreeModified", highlight);
      }
    }

    function highlight() {
      $.ajax({
        type: "GET",
        url: $.url("/api/gtm/data"),
        dataType: "json",
        success: function (result) {
          dataLayerDurationUpdated(result);
        },
      });
    }
  }
});
