var view = 1;
  var map_selected = "1";
  var date_of_map = "mo";
  var addons = [];

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

$(".switch-toggle label input").change((e)=>{
    if(e.target.checked){
        $(".mon").css("color","hsl(231, 11%, 63%)");
        $(".year").css("color","hsl(213, 96%, 18%)");
        $("#arcade .text p").text("$90/yr");
        $("#advanced .text p").text("$120/yr");
        $("#pro .text p").text("$150/yr");
        $(".choices label .text span").css("display","block");
        $("#lar .salary").text("+20/yr");
        $("#cus .salary").text("+20/yr");
        $("#onl .salary").text("+10/yr");
        date_of_map = "yr"
    }else{
        $(".year").css("color","hsl(231, 11%, 63%)");
        $(".mon").css("color","hsl(213, 96%, 18%)")
        $("#arcade .text p").text("$9/mo");
        $("#advanced .text p").text("$12/mo");
        $("#pro .text p").text("$15/mo");
        $(".choices label .text span").css("display","none");
        $("#lar .salary").text("+2/mo");
        $("#cus .salary").text("+2/mo");
        $("#onl .salary").text("+1/mo");
        date_of_map = "mo"
    }
});
$(".test").change((e)=>{
if(e.target.checked){
    $(`#${e.target.value}`).css("border-color","hsl(243, 100%, 62%)");
    addons.push(e.target.value);
    console.log(addons);
}else{
    $(`#${e.target.value}`).css("border-color","hsl(231, 11%, 63%)");
    addons.remove(e.target.value)
    console.log(addons);
}
});


$("button").click(()=>{
    var success = true;
    if(view === 1){
        // $(".buttons").css("justify-content","space-between");
        // $("a").css("display")   
        $(".text-input input").each((index,el)=>{
        if(!el.value.length){
            $(`#${el.id.slice(1)}`).addClass("err");
            success = false;
        }
        })
        if(success){
            next();
            $(".buttons a").css("display","block");
            $(".buttons").css("justify-content","space-between");
        }
        return;
    }
    if(view === 3){
        genrateSummary();
        $("button").text("confirm")
    }
    if(view === 4){
        $(".buttons").css("display","none");
        $(`.form-${view+1}`).css("display","inline-flex");
        $(`.form-${view}`).css("display","none");
        view++;
        return;
    }
    next();
})
function next(){
    $(`.form-${view+1}`).css("display","inline-flex");
    $(`.form-${view}`).css("display","none");
    $(`.s${view}`).removeClass("active-slider");
    $(`.s${view+1}`).addClass("active-slider");
    view++;
}
function genrateSummary(){
    var total = 0;
    //select price and title of map \
    $(".selected-map").remove();
    $(".addons-selected").remove();
    $(".total").remove();
    if(map_selected === "1"){
        if(date_of_map === "mo"){
            total = 9;
            $(".cheek").append(`
                <div class="selected-map">
                    <p class="title"><span>Arcade(Monthly)</span><a href="#">Change</a></p>
                    <p class="price">$9/mo</p>
                </div>
            `)
        }else{
            total = 90
            $(".cheek").append(`
                <div class="selected-map">
                    <p class="title"><span>Arcade(Yearly)</span><a href="#">Change</a></p>
                    <p class="price">$90/yr</p>
                </div>
            `)
        }
    }else if(map_selected === "2"){
        if(date_of_map === "mo"){
            total = 12;
            $(".cheek").append(`
            <div class="selected-map">
                <p class="title"><span>Advanced(Monthly)</span><a href="#">Change</a></p>
                <p class="price">$12/mo</p>
            </div>
        `)
        }else{
            total =120;
            $(".cheek").append(`
            <div class="selected-map">
                <p class="title"><span>Advanced(Yearly)</span><a href="#">Change</a></p>
                <p class="price">$120/yr</p>
            </div>
        `)
        }
    }else if(map_selected === "3"){
        if(date_of_map === "mo"){
            total = 15;
            $(".cheek").append(`
            <div class="selected-map">
                <p class="title"><span>Pro(Monthly)</span><a href="#">Change</a></p>
                <p class="price">$15/mo</p>
            </div>
        `)
        }else{
            total = 150;
            $(".cheek").append(`
            <div class="selected-map">
                <p class="title"><span>Pro(Yearly)</span><a href="#">Change</a></p>
                <p class="price">$150/yr</p>
            </div>
        `)
        }
    }
    $(".cheek").append("<div class='addons-selected'></div>")
    //finshed of selecting
    if(addons.includes("onl")){
        total +=(date_of_map==="mo"?1:10);
        $(".addons-selected").append(`
            <div id="online" class="item">
                <p class="title">Online service</p>
                <p class="price">${date_of_map==="mo"?"+$1/mo":"+10/yr"}</p>
            </div>
        `)
    }
    if(addons.includes("lar")){
        total +=(date_of_map==="mo"?2:20);
        $(".addons-selected").append(`
            <div id="larger" class="item">
                <p  class="title">Larger storage</p>
                <p class="price">${date_of_map==="mo"?"+$2/mo":"+20/yr"}</p>
            </div>
        `)
    }
    if(addons.includes("cus")){
        total +=(date_of_map==="mo"?2:20);
        $(".addons-selected").append(`
        <div id="customize" class="item">
            <p class="title">Customizable Profile</p>
            <p class="price">${date_of_map==="mo"?"+$2/mo":"+20/yr"}</p>
        </div>
    `)
    }
    $(".form-4").append(`
        <div class="total">
            <p class="title">Total(${date_of_map === "mo"?"per month":"per year"})</p>
            <p class="price">${date_of_map === "mo"? "$" + total + "/mo":"$" + total + "/yr"}</p>
        </div>
    `)
    
}
$(".text-input input").on("input",((e)=>{
    $(`#${e.target.id.slice(1)}`).removeClass("err");
}));
$(".form-2 .choices label input").change((e)=>{
    map_selected = e.target.id.slice(1);
});
$(".buttons a").click(()=>{
    $(`.form-${view-1}`).css("display","inline-flex");
    $(`.form-${view}`).css("display","none");
    $(`.s${view}`).removeClass("active-slider");
    $(`.s${view-1}`).addClass("active-slider");
    if(view === 2){
        $(".buttons").css("justify-content","flex-end");
        $(".buttons a").css("display","none")
    }
    view--;
    
})
