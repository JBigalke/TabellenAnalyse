$(document).ready(function () {
    showhideeditbuttons();


    $.each($('table'), function (index, table){
        $.each($(table).find('tr'), function(i, row){
           $.each($(row).children('td'), function(c, cell){
               if(c === 0) $(cell).addClass('leftcolumncell');
               else if(c === $(row).children().length -1) $(cell).addClass('rightcolumncell');
               else $(cell).addClass('middlecolumncell');
               nr = c+1
               $(cell).attr('data-cell-nr', nr)
           })
        });
    })


    $(".linecheckbox").change(function(){$(this).parent('p').toggleClass('selected')});
    $(".moveupbutton").click(function(){ clickedmoveup(this); });
    $(".movedownbutton").click(function (){ clickedmovedown(this); });
    $(".newregionbutton").click(function (){clickednewregion(this); });
    $(".editbutton").click(function (){editclicked(this)});
    $(".edittablebutton").click(function(){edittableclicked(this)});
    $(".removeregionbutton").click(function (){removeregionclicked(this)})

    $(".nextimagebutton").click(function() {nextimage(this)});
    $(".previmagebutton").click(function(){previmage(this)});
    $(".toggleimagebutton").click(function (){$(".idpdf").toggle()})
});



function nextimage(button){
 var maximagenr = parseInt($('.pageheadline').last().attr('data-page-nr'));
 var actualimagenr = parseInt($('.imagediv').attr('data-actual-page-nr'));
 var imagename = "SAL5066_";
 var newiamgenumber = actualimagenr +1;
 if(newiamgenumber <= maximagenr) {
     if (newiamgenumber >= 10 && newiamgenumber <= 100) var imagenamenr = imagename + "00" + newiamgenumber.toString();
     else if (newiamgenumber >= 100) var imagenamenr = imagename + "0" + newiamgenumber.toString();
     else var imagenamenr = imagename + "000" + newiamgenumber.toString();
 }
 else{
     newiamgenumber = 1;
     var imagename =imagename + "000" + newiamgenumber.toString();
 }
 newsrc = "../../Images/Originals/"+imagenamenr+".jpg";
 $('.imagediv').attr('data-actual-page-nr', newiamgenumber.toString());
 $('.pageimages').attr('src', newsrc);
};

function previmage(button){
    var maximagenr = parseInt($('.pageheadline').last().attr('data-page-nr'));
    var actualimagenr = parseInt($('.imagediv').attr('data-actual-page-nr'));
    var imagename = "SAL5066_";
    var newiamgenumber = actualimagenr -1;
    if(newiamgenumber >= 1) {
        if (newiamgenumber >= 10 && newiamgenumber <= 100) var imagenamenr = imagename + "00" + newiamgenumber.toString();
        else if (newiamgenumber >= 100) var imagenamenr = imagename + "0" + newiamgenumber.toString();
        else var imagenamenr = imagename + "000" + newiamgenumber.toString();
    }
    else{
        console.log(maximagenr);
        newiamgenumber = maximagenr;
        var imagenamenr =imagename + "0" + newiamgenumber.toString();
    }
    newsrc = "../../Images/Originals/"+imagenamenr+".jpg";
    $('.imagediv').attr('data-actual-page-nr', newiamgenumber.toString());
    $('.pageimages').attr('src', newsrc);
}


function removeregionclicked(button) {
    parentdiv = $(button).parent('div')
    $(parentdiv).remove();
}

function clickedmoveup(button){
    parentdiv = $(button).parent('div');
    selectedlines = $(parentdiv).find('.textline.selected');
    nextdiv = $(parentdiv).prevAll('div')[0];
    lineids = getmovelineids(parentdiv, selectedlines, "up");
    move(parentdiv, nextdiv, lineids.reverse(), "up");
}

function clickedmovedown(button){
    parentdiv = $(button).parent('div');
    selectedlines = $(parentdiv).find('.textline.selected');
    nextdiv = $(parentdiv).nextAll('div')[0];
    lineids = getmovelineids(parentdiv, selectedlines, "down");
    move(parentdiv, nextdiv, lineids.reverse(), "down");
}

function clickednewregion(button) {
    parentdiv = $(button).parent('div');
    if ($(parentdiv).hasClass('tableregion')) regiontype = 'tableregion'
    else if ($(parentdiv).hasClass('textregion')) regiontype = 'textregion'
    selectedlines = $(parentdiv).find('.textline.selected');
    linesbetween = getlinesbetweenselect(selectedlines);
    linesbefore = getlinesbeforeselected(selectedlines);
    linesafter = getlinesafterselected(selectedlines);
    if (regiontype === 'textregion') {
        newregion = createnewregion(parentdiv, linesbetween, regiontype)
        newregion2 = createnewregion(newregion, linesafter, regiontype)
    }
    else
        {
        newregion = createnewregion(parentdiv, selectedlines, regiontype)
    }
}

function getlinesbeforeselected(lines){
    line = lines[0];
    return $(line).prevAll('p');
};

function getlinesafterselected(lines){
    line = lines.last();
    return $(line).nextAll('p, tr');
};

function getlinesbetweenselect(lines){
    if (lines.length > 1){
        firstline = lines[0];
        lastline = lines.last();
        betweenlines = $(firstline).nextUntil(lastline);
        ids = [$(firstline).attr('id')]
        $.each(betweenlines, function (index, line){
            ids.push($(line).attr('id'));
        });
        ids.push($(lastline).attr('id'));
        joined = ids.join(", #");
        selector = "#"+joined
        newlines = $(""+selector)
        return newlines
    }
    else return lines;
};

function createnewregion(regionbefore, lines, mode){
    newregion = createnewregiondiv(regionbefore, mode);
    if (mode === 'textregion') createnewlinesregion(newregion, lines)
    else if(mode === 'tableregion') createnewtableregions(regionbefore, newregion, lines)
    changeregiontype(newregion);
    return newregion;
};

function createnewregiondiv(regionbefore, cl){
    beforedivid = $(regionbefore).attr('id')
    newid = beforedivid + "I";
    newregion = $("<div></div>").attr('id', newid).addClass(cl);
    $('#'+beforedivid).after(newregion);
    createnewregionsbuttons(newregion);
    return newregion
}

function createnewregionsbuttons(newregion){
    upbutton = $("<button>↑</button>").addClass("moveupbutton").attr('name', 'moveup').click(function (){clickedmoveup(this)});
    newregionbutton = $("<button>new</button>").addClass("newregionbutton").attr('name', 'newregion').click(function (){clickednewregion(this)});
    downbutton =$("<button>↓</button>").addClass("movedownbutton").attr('name', 'movedown').click(function (){clickedmovedown(this)});
    editbutton=$("<button>edit</button>").addClass("editbutton").attr('name','edit').click(function (){editclicked(this)})
    $(newregion).append(upbutton);
    $(newregion).append(newregionbutton);
    $(newregion).append(downbutton);
    $(newregion).append(editbutton);
}


function createnewtableregions(parentdiv, newregion,lines){
    selectedtablecells = $(lines).parent('td');
    firstselectedcell = selectedtablecells[0]
    lastselectedcell = selectedtablecells.last();
    lastselectedcellnr = $(lastselectedcell).attr('data-cell-nr');


    cellsbefore = $(selectedtablecells).prevAll('td');
    cellsafter = $(lastselectedcell).nextAll('td');

    selectedtablerows = $(lines).closest('tr');
    firstselectedrow = selectedtablerows[0];
    lastselectedrow = selectedtablerows.last();

    selectedtable = $(firstselectedrow).closest('table');


    tablerowsbefore = $(firstselectedrow).prevAll('tr');
    tablerowsafter = $(lastselectedrow).nextAll('tr');

    createnewtable(parentdiv, tablerowsbefore, cellsbefore);
    newaftertableregion = createnewregiondiv(newregion, 'tableregion');
    createnewtable(newaftertableregion, tablerowsafter, cellsafter);

    $(newregion).prepend(selectedtable);


}

function  createnewtable(parentdiv, rows, cells){
    var newtable = $('<table></table>').addClass("texttable")
    var newtbody = $('<tbody></tbody>')
    $(newtbody).append(rows);
    $(newtable).append(newtbody);
    if(cells.length > 0){
        var newrow = $("<tr></tr>")
        $.each(cells, function (index, cell){
           nummer =  $(cell).attr('data-cell-nr');
           if (nummer === 0) {
            if($(newrow).is(':parent')){
                $(newtable).append(newrow)
                newrow = $("<tr></tr>")
                newrow.append(cell);
            }
            else $(newrow).append(cell)
           }
           else $(newrow).append(cell)
        });

        if($(newrow).is(':parent')) $(newtable).append(newrow);
    }
    $(parentdiv).prepend(newtable);
}



function createnewlinesregion(newparentdiv, lines){
    var button = $(parentdiv).children('.moveupbutton')
    $.each(lines, function(index, line){
        $(button).before(line);
    });

};

function getmovelineids(parentdiv, lines, mode ){
    if(mode === "up"){
        line = $(lines).last();
        lineids = [$(line).attr('id')];
        movelines = $(line).prevAll('p');
    }
    else if(mode === "down"){
        line = lines[0]
        lineids = [$(line).attr('id')];
        movelines = $(line).nextAll('p');
    }
    $.each($(movelines), function (index, value){
        lineids.push($(value).attr('id'));
    });
    return lineids;
};

function move(fromdiv, todiv, lineids,mode){
    if(mode === "up"){
        $.each($(lineids), function(index, lineid){
            console.log($(todiv));
            lastline = $(todiv).children("p,table").last();
            $(lastline).after($('#'+lineid));
        });
    }
    else if(mode === "down"){
        $.each($(lineids), function(index, lineid){
            $(todiv).prepend($('#'+lineid));
        });
    }
    changeregiontype(fromdiv);
    changeregiontype(todiv);
    deselectall();
};


function deselectall(){
    $(".selected").removeClass("selected");
    $("input:checked").prop("checked", false);
}


function changeregiontype(region){
    textlines = $(region).children('p');
    table = $(region).children('table');

    if(textlines.length > 0 && table.length >0) $(region).removeClass().addClass("tableregiontextregion");
    else if(textlines.length > 0) $(region).removeClass().addClass("textregion");
    else if(table.length > 0) $(region).removeClass().addClass("tableregion");
    showhideeditbuttons();
}

function showhideeditbuttons(){
    $('.tableregion >.edittablebutton').addClass('active');
    $('.textregion >.edittablebutton.active').removeClass('active');

}