/**
 * Created by debashish.g on 9/1/15.
 */

$(function () {
  if ($.browser.msie && $.browser.version <= 9) {
    $("input[placeholder]")
      .focus(function () {
        if ($(this).val() == $(this).attr("placeholder")) $(this).val("");
      })
      .blur(function () {
        if ($(this).val() == "") $(this).val($(this).attr("placeholder"));
      })
      .blur();

    $("input[placeholder]")
      .parents("form")
      .find(button[(type = "submit")])
      .click(function () {
        $(this)
          .siblings("input[placeholder]")
          .each(function () {
            if ($(this).val() == $(this).attr("placeholder")) {
              $(this).val("");
            }
          });

        return check_domain_name();
      });
  }
});

$(document).ready(function () {
  $("#explore-themepluginlogos").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $(".themepluginlogos-modal").show();
    return false;
  });
  $(".themepluginlogos-modal .modal_close").click(function () {
    $(".themepluginlogos-modal").hide();
    return false;
  });

  if (typeof highlight_preferred_bundle_plan == "undefined") {
    $(
      "div.new-homepage-wrapper, .new-homepage-wrapper-dark-banner"
    ).removeClass("add-top-space");
  } else if (
    highlight_preferred_bundle_plan == "" ||
    highlight_preferred_bundle_plan == "false"
  ) {
    $(
      "div.new-homepage-wrapper, .new-homepage-wrapper-dark-banner"
    ).removeClass("add-top-space");
  } else {
    $("div.new-homepage-wrapper, .new-homepage-wrapper-dark-banner").addClass(
      "add-top-space"
    );
  }

  if ($("input#field_domains-input").length) {
    $("input#field_domains-input").keydown(function () {
      remove_error_msg();
    });

    $("#field_domains-input").textboxValueToggle(
      $("#default_domain_search").val()
    );
    $(".home-blurb-wrp .home-blurb:first-child").addClass("first");
    $(".home-blurb-wrp .home-blurb:nth-child(2)").addClass("second");
    $(".home-blurb-wrp .home-blurb:nth-child(3)").addClass("third");
    $(".home-blurb-wrp .home-blurb:nth-child(4)").addClass("fourth");
  }

  if ($('form[name="form_domain_avail"]').length) {
    $('form[name="form_domain_avail"]').submit(function (e) {
      butt = $("#go_btn");
      var domain_name = $("#field_domains-input").val() + "." + $(this).val();
      $("#go_btn").attr("disabled", "disabled");
      animButton();
    });
  }

  if ($("#page-container").length)
    $("#page-container").addClass("full-width-banner");

  if ($("#tldlist").length) {
    $("#tldlist").change(function (event) {
      $("#tldDisplay").html("." + $("#tldlist").val());
    });
  }
});

function remove_error_msg() {
  $('form[name="form_domain_avail"]').removeClass("validation-error");
  $("#error_msg").hide();
}

$.fn.textboxValueToggle = function (defaultText) {
  $(this)
    .focus(function () {
      if ($(this).val() === defaultText) {
        $(this).val("").removeClass("optionalField");
      }
    })
    .blur(function () {
      if ($(this).val() === "") {
        $(this).addClass("optionalField").val(defaultText);
      }
    });
};

var step = 1;
function animButton() {
  step++;
  if (step == 7) step = 1;
  if (step == 1) {
    window.status = "<t>Processing</t>. ";
    butt.html(". ");
  }
  if (step == 2) {
    window.status = "<t>Processing</t>. ";
    butt.html(". ");
  }
  if (step == 3) {
    window.status = "<t>Processing</t>.. ";
    butt.html(".. ");
  }
  if (step == 4) {
    window.status = "<t>Processing</t>.. ";
    butt.html(".. ");
  }
  if (step == 5) {
    window.status = "<t>Processing</t>... ";
    butt.html("... ");
  }
  if (step == 6) {
    window.status = "<t>Processing</t>... ";
    butt.html("... ");
  }
  timeout_id = setTimeout("animButton()", 200);
}

function check_domain_name() {
  // error msg for domian defult value
  var domain_name = $("#field_domains-input").val();
  domain_name = trim(domain_name);
  if (
    domain_name.length == 0 ||
    domain_name.match(/[^a-zA-Z0-9-.\s]+/) ||
    domain_name == $("#default_domain_search").val()
  ) {
    $('form[name="form_domain_avail"]').addClass("validation-error");
    $("#error_msg").show();
    return false;
  }

  return true;
}
