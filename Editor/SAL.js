$(document).ready(function () {
    var json = createJson();
    console.log(json)
    createstrukture(json);
    addhovertoselects();
    addselectedchanged(json);

});

// Hole dir alle elemente innehalb von #leftcontentn und bau daraus ein strukturjson mit dem später
function createJson(){
    var json = []
    region = {}
    $.each($('#leftcontent > div'), function(index, value)
    {
        var newregion = {};
        var regionid = $(value).attr('id');
        if($(value).hasClass("textregion")) {
            type = "text";
            childs = $(value).children('p');
        }
        else if ($(value).hasClass("tableregion")) {
            type = "table";
            childs = $(value).find('td');
        }
        else if ($(value).hasClass("freelines")){
            type = "free";
            childs = $(value).find('p');
        }
        else if ($(value).hasClass("tableregiontextregion")){
            type="mixed";
            childs = $(value).find('p','td')
        }
        lineids = [];
        i = 0;
        $(childs).each(function(){
            lineids[i++] = this.id;
        });
        newregion.index = index;
        newregion.regionid = regionid;
        newregion.type = type;
        newregion.lines = lineids;
        json.push(newregion)
    });

    return json;
};


function createstrukture(json){

    $.each(json, function(index, value)
    {
        if (json[index].type != 'free') {
            freelinesbefore = [];
            freelinesafter = [];
            if (index > 0){
                if(json[index-1].type == "free") freelinesbefore = json[index-1].lines;
            }
            if (index < Object.keys(json).length-1){
                if(json[index+1].type == "free") freelinesafter = json[index+1].lines;
            }

            var newdiv = $("<div></div>").attr('ref', json[index].regionid);
            $(newdiv).mouseover(
                function (){$("#"+$(this).attr('ref')).addClass("selected");})
                .mouseout(function (){$("#"+$(this).attr('ref')).removeClass("selected");});

            var regionlabel = $("<span>" + json[index].type + " " + json[index].regionid + "</span>");
            $(newdiv).append(regionlabel);
            var lastlineselect = $("<select name='" + json[index].regionid + "_last'></select>")

            $("#rightcontent").append(newdiv);
            createfirstlineselect(newdiv, json[index], freelinesbefore);
            $(newdiv).append("<span> - </span>");
            createlastlineselect(newdiv, json[index], freelinesafter);
        }
    });

};

function createfirstlineselect(actualregion, region, freelines){
    var lineselect = $("<select name='" + region.regionid + "_first'></select>")
    if(freelines.length != 0) appendfreelines(lineselect, freelines);
    $.each(region.lines, function (counter, line){
        if(counter == 0) var newoption = $("<option class='selectedoption' value='"+line+"' selected n='"+counter+"' >"+line+"</option>")
        else newoption = $("<option value='"+line+"' n='"+counter+"'>"+line+"</option>");
        lineselect.append(newoption);
    });
    $(actualregion).append(lineselect)
};




function createlastlineselect(actualregion, region, freelines){
    var lineselect = $("<select name='" + region.regionid + "_last'></select>")
    $.each(region.lines, function (counter, line){
        if(counter == Object.keys(region['lines']).length-1) lineselect.append("<option class='selectedoption' value='"+line+"' selected n='"+counter+"' >"+line+"</option>");
        else lineselect.append("<option value='"+line+"' n='"+counter+"'>"+line+"</option>");
    });
    if(freelines.length != 0) appendfreelines(lineselect, freelines);
    $(actualregion).append(lineselect)
};

function appendfreelines(lineselect, freelines){
    $.each(freelines, function (counter, freeline){
        lineselect.append("<option value='"+freeline+"' class='freeline'>"+freeline+"</option>");
    });
};


function addhovertoselects(){
    $("select").mouseover(function(){
        var n = $("select option").length;
        $(this).attr("size", n);
    });
    $("select").mouseout(function(){
        $(this).attr("size", 1);
    });
    $("select").on('mouseenter','option',function(e) {
        var $target = $(e.target);
        $('#'+$target.text()).addClass('selected2');
    });

    $("select").on('mouseleave','option',function(e) {
        var $target = $(e.target);
        $('#'+$target.text()).removeClass('selected2');
    });
}

function addselectedchanged(json){
    $("select").change(function (){
      var name = $(this).attr('name')
      if(name.includes("_first"))
      {
          textregion = name.replace("_first", "");
          var index = json.findIndex(obj => obj.regionid == textregion)
          prevnumber = getselectedpreviousnumber(this)
          actual = $("option:selected", this);
          $(actual).addClass("selectedoption")
          actualnumber = $(actual).attr('n')
          if($(actual).hasClass("freeline")){
              addlinestoregiontop(json, index, $(actual).val())
          }
      }
      else if (name.includes("_last")){
          textregion = name.replace("_last", "");
          textregion = name.replace("_last", "");
          console.log(json[textregion]);
      }
    })

}

function getselectedpreviousnumber(select){
    previousoption = $(select).find(".selectedoption");
    previousnumber = $(previousoption).attr('n');
    $(previousoption).removeClass("selectedoption")
    return previousnumber
}

function addlinestoregiontop(json, index, selectedfreeline){
    freelinesregionid = json[index-1].regionid;
    freelines = json[index-1].lines;

    actualregionid = json[index].regionid;

    freelineindex = freelines.indexOf(selectedfreeline);
    addlines = freelines.slice(freelineindex);
    addlines.reverse();
    $.each(addlines, function(index, value){
       line = $('#'+value);
       $('#'+actualregionid).prepend(line);
    });
}


function removelinefromregion(){

}


function beforeisfree(json, actualindex){
    if(actualindex == 0)return false;
    else if (json[actualindex-1].type == 'free') return true;
    else return false;
}