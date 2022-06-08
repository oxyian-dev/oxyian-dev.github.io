var Cookies = {
    init: function () {
        var allCookies = document.cookie.split('; ');
        for (var i=0;i<allCookies.length;i++) {
            var cookiePair = allCookies[i].split('=');
            this[cookiePair[0]] = cookiePair[1];
        }
    },
    create: function (name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else {
            var expires = "";
        }
        document.cookie = name+"="+value+expires+"; path=/";
        this[name] = value;
    },
    erase: function (name) {
        this.create(name,'',-1);
        this[name] = undefined;
    }
};
Cookies.init();

function change_site_location(selectbox)
{
    var loc = location.href;
    var start = loc.indexOf("location=");
    if(start != -1) {
        var end = loc.indexOf("&", start);
        loc = loc.substr(0, start) + (end == -1?"":loc.substr(end));
    }
    loc += (loc.indexOf("?")==-1)?"?":"";
    loc += (loc.indexOf("?")!=loc.length-1)?"&":"";
    loc += 'location='+selectbox.value;
    location.href = loc;
}

function hideLiveChatDiv(){
    $('#popup_live_chat').hide();
    Cookies.create('hide_livechat', 'yes', '');
}

function in_array(paths,pathname) {
    for(var i = 0, l = paths.length; i < l; i++) {
        if(paths[i] == pathname) {
            return true;
        }
    }
    return false;
}

function build_dashboard_custname(custname, userloggedin) {

    if(custname.length > 15) {
        custname = custname.split(' ')[0].substr(0, 15);
    }

    $("#dashboard-username").html(custname);

    if(userloggedin) {
        $("#signout_link").attr('href','login.php?action=signout').text('(' + get_translated_message('common_logout') + ')').attr('onclick',"return log_out();").show();
    } else if(custname != get_translated_message('common_hello')) {
        $("#signout_link").attr('href','login.php?action=delete_cookie').text('(' + get_translated_message('common_notyou') + '?)').attr('onclick',"");
    } else if(custname == get_translated_message('common_hello')){
        $("#signout_link").hide();
    }
}

function build_dashboard_items(cart_items, hide_cart_strip) {
    var pathname = location.pathname;
    $("#cart-item-default").remove();
    $(".cart-items-wrapper").show();

    if(cart_items != 0) {
        // Increase the item count
        $("#dashboard-cartItemCount").text(cart_items);
        // Enable the checkout Link and change the tool-tip
        $("#headerCheckoutBtn").attr('title', get_translated_message('common_checkoutaftershopping')).attr('href','/checkout.php');
        // Enable the Cart link and change the tool-tip
        $("#headerCartLink").attr('title', get_translated_message('common_checkoutaftershopping')).attr('href','/checkout.php');
    } else if (cart_items == 0) {
        // Set the Item Count to zero
        $("#dashboard-cartItemCount").html(0);
        // Disable the checkout Link and change the tool-tip
        $("#headerCheckoutBtn").attr('title',get_translated_message('common_shoppingcartempty')).removeAttr('href');
        // Disable the Cart link and change the tool-tip
        $("#headerCartLink").attr('title',get_translated_message('common_shoppingcartempty')).removeAttr('href').addClass('cart-empty');
    }
}

function hide_cart_strip(){
    $('#cart_link').css('display','none');
    $("#checkout_arrow").hide();
    Cookies.create('hide_cart_strip', 'yes', '');
}

function hide_coupon_mess_blurb() {
    $('#coupon-mess-blurb').hide();
    Cookies.create('hide_coupon_mess_blurb', 'yes', '');
}

function hide_answerable_notification(){
    $('#notice').hide();
    Cookies.create('hide_answerable_notification', 'yes', '');
}

$(document).ready(function(){
    if($('#country_dropdown')[0])
        $('#country_dropdown').val(country_code);

    var cart_items = 0;
    var custname = get_translated_message('common_hello');
    var hide_cart_strip = (Cookies['hide_cart_strip'] != undefined);
    var hide_answerable_notification =  (Cookies['hide_answerable_notification'] != undefined);
    var userloggedin = (Cookies['userloggedin'] != undefined && Cookies['userloggedin'] == "yes");

    if(Cookies['cart_items'] != undefined) {
        cart_items = Cookies['cart_items'];
    }

    if(Cookies['custname'] != undefined) {
        custname = Cookies['custname'];
        custname = decodeURI(custname.replace(/\+/g, "%20"));
    }

    if(!hide_answerable_notification){
        $('#notice').show();
    }

    build_dashboard_items(cart_items, hide_cart_strip);
    
    /*$.ajax({
        dataType: "json",
        data: "action=get_coupon_offer_description",
        url: "/content.php",
        success: function(result) {
            if(result.status == 'success'){
                $("#offer_desc").html(result.offer_desc);
                $('#coupon-mess-blurb').show();
            }
        }
    });*/

});
if(window != window.top){
    if(window.frameElement.id != 'deskiframe') {
        $.get("/set_responsive_cookie.php", {set_c: "true"});
    }
    else {
        $.get( "/set_responsive_cookie.php", { set_c: "false"} );
    }
}
else if(typeof Cookies['responsive'] != 'undefined'){
    $.get( "/set_responsive_cookie.php", { set_c: "false"} );
}
