function editclicked(button){
    parentdiv = $(button).parent('div');
    createeditmenue(parentdiv);
};

function annotateregionclicked(button){

};


function createeditmenue(parentdiv){
    var menuediv = $("<div class='editmenue'></div>");

    var edittextbutton = $("<button class='cellbutton' id='edittextbutton' name='edittext'>text</button>").click(function (){edittext(parentdiv);})
    $(menuediv).append(edittextbutton);
    var edittablebutton = $("<button class='cellbutton' id='edittablebutton' name='edittable'>edittable</button>").click(function (){edittable(parentdiv);})
    var tolinebutton = $("<button class='cellbutton' id='tolinebutton' name='toline'>⚌</button>").click(function(){regiontolines(parentdiv);})
    var totablebutton = $("<button class='cellbutton' id='totablebutton' name='totable'>▦</button>").click(function(){regiontotable(parentdiv);})
    if ($(parentdiv).hasClass('tableregion')){
        $(menuediv).append(tolinebutton);
        $(menuediv).append(edittablebutton);
    }
    else if($(parentdiv).hasClass('textregion'))$(menuediv).append(totablebutton);
    else{
        $(menuediv).append(tolinebutton);
        $(menuediv).append(totablebutton);
    }
    $(parentdiv).append(menuediv);

};

function createannotationmenu(parentdiv, selection){
    var menuediv = $("<div class='editmenue'></div>");
    var tagnameinput =$("<input name='tagnameinput' type='text'/>");
    var addattributebutton =$('<button class="addattributebutton" name="addattributebutton">+</button>').click(function (){
        addattributemenu(menuediv)
    });

    menuediv.append(tagnameinput)
    menuediv.append(addattributebutton)
    $(parentdiv).append(menuediv);
}

function addattributemenu(parentdiv){
    var inputdiv =$("<div class='addattributediv'></div>");
    var inputname = $("<input name='attributename'/>");
    var inputvalue =$("<input name='attributevalue'/>");
    $(inputdiv).append(inputname);
    $(inputdiv).append(inputvalue);
    $(parentdiv).append(inputdiv);
}

function getSelectedText(){
    if(window.getSelection){
        return window.getSelection().toString();
    }
    else if(document.getSelection){
        return document.getSelection();
    }
    else if(document.selection){
        return document.selection.createRange().text;
    }
}

function createtexteditmenu(parentdiv){
    var textmenudiv = $("<div class='texteditmenue'></div>");
    var savebutton = $("<button class='cellbutton' id='savebutton' name='save'>save</button>").click(function (){savetexteditchanges(parentdiv);});
    $(textmenudiv).append(savebutton);
    $(parentdiv).append(textmenudiv);
}

function edittable(){
    removeeditmenu(parentdiv);
    createtableeditmenu(parentdiv);
    addrowoptionstotable(parentdiv);
    changetoinput(parentdiv);

}

function createtableeditmenu(parentdiv){
    var textmenudiv = $("<div class='tableeditmenue'></div>");
    var savebutton = $("<button class='cellbutton' id='savebutton' name='save'>save</button>").click(function (){savetexteditchanges(parentdiv);});
    $(textmenudiv).append(savebutton);
    $(parentdiv).append(textmenudiv);
}

function  removeeditmenu(parentdiv){ $(parentdiv).find('.editmenue').remove();};
function  removetexteditmenu(parentdiv){$(parentdiv).find('.texteditmenue').remove();};



// convert regions
function regiontolines(parentdiv){
    var lines = $(parentdiv).find("p");
    $.each(lines, function (index, line){
        $(parentdiv).find('.moveupbutton').before(line);
    });
    table = $(parentdiv).find('.texttable');
    $(table).remove();
    $(parentdiv).removeClass('tableregion').removeClass('tableregiontextregion').addClass('textregion');
    removeeditmenu(parentdiv)
};

function regiontotable(parentdiv){
    var lines = $(parentdiv).find("p");
    var table = $("<table></table>").addClass('texttable');
    var tbody = $("<tbody></tbody>");
    var tablerow;
    lasteven = false;
    $.each(lines, function (index, line)
    {
        if(index % 2 === 1){
            tablecell = $("<td></td>")
            $(tablecell).append(line);
            $(tbody).append(tablerow);
            lasteven = true;
        }
        else{
            tablerow = $("<tr></tr>");
            tablecell = $("<td></td>");
            $(tablecell).append(line);
            lasteven = false;
        }
        $(tablerow).append(tablecell);
    });
    if(lasteven === false) $(tbody).append(tablerow);
    $(table).append(tbody);
    $(parentdiv).find('.moveupbutton').before(table);
    $(parentdiv).removeClass('textregion').removeClass('tableregiontextregion').addClass('tableregion');
    removeeditmenu(parentdiv)
};


// edit content section
function edittext(parentdiv){
    removeeditmenu(parentdiv);
    createtexteditmenu(parentdiv);
    changetoinput(parentdiv);
};

function savetexteditchanges(parentdiv){
    removetexteditmenu(parentdiv);
    changetop(parentdiv);
    removetableoptions(parentdiv);
};

function changetoinput(parentdiv) {
   $.each($(parentdiv).find('span'), function (index, elem)
   {
       $(elem).replaceWith(function (){
           var newelem = $('<input type="text"></input');
           newelem.attr('value', $(elem).text());
           return newelem;
       })
   })
};

function changetop(parentdiv){
    $.each($(parentdiv).find('input:text'), function (index, elem){
       $(elem).replaceWith(function (){
           var newelem = $('<span>'+$(elem).val()+'</span>');
           return newelem;
       }) ;
    });
};


// TABLEEDIT SECTION

function addrowoptionstotable(parentdiv){
    $.each($(parentdiv).find('td'), function (index, cell){
        addcelloptions(cell)
    });
    $.each($(parentdiv).find('tr'), function (index, row){
        addrowoptions(row)
    });


}

function addrowoptions(row){
    newtd = $('<td class="rowoptionstd"></td>');
    appendtablerowbeforebutton = $("<button class='rowbutton' id='appendrowbeforebutton' name='appendrowbefore'>+↑</button>").click(function (){ appendtablerow(this, 'before')});
    appendtablerowafterbutton = $("<button class='rowbutton' id='appendrowafterbutton' name='appendrowbefore'>+↓</button>").click(function (){ appendtablerow(this, 'after')});

    movetablerowupbutton = $("<button class='rowbutton' id='moverowupbutton' name='mocwrowup'>↑</button>").click(function (){ movetrup(this)});
    movetablerowdownbutton = $("<button class='rowbutton' id='moverowdownbutton' name='mocwrowdown'>↓</button>").click(function (){ movetrdown(this)});

    removetablerowbutton = $("<button class='rowbutton' id='removetablerow' name='removerow'>X</button>").click(function (){ removetablerow(this)});

    $(newtd).append(appendtablerowafterbutton);
    $(newtd).append(movetablerowdownbutton);
    $(newtd).append(movetablerowupbutton);
    $(newtd).append(appendtablerowbeforebutton);
    $(newtd).append(removetablerowbutton);
    $(row).append(newtd);
}

function addcelloptions(cell){
    appendcellbeforebutton =$("<button class='cellbutton' id='appendcellbeforebutton' name='appendcellbefore'>←+</button>").click(function(){addtd(this, 'before')});
    appendcellafterbutton =$("<button class='cellbutton' id='appendcellafterbutton' name='appendcellafter'>→+</button>").click(function(){addtd(this, 'after')});
    movedcellleftbutton =$("<button class='cellbutton' id='movecellleftbutton' name='appendcellbefore'>←</button class='cellbutton'>").click(function(){movetdleft(this)});
    movecellrightbutton =$("<button class='cellbutton' id='movecellrightbutton' name='appendcellafter'>→</button>").click(function(){movetdright(this)});
    movedcellupbutton =$("<button class='cellbutton' id='movecellupbutton' name='appendcellbefore'>↑</button>").click(function(){movetd(this, 'up')});
    movecelldownbutton =$("<button class='cellbutton' id='movecelldownbutton' name='appendcellafter'>↓</button>").click(function(){movetd(this, 'down')});
    removecellbutton =$("<button class='cellbutton' id='removecellbutton' name='removecell'>X</button>").click(function(){removetd(this)});

    $(cell).append(appendcellbeforebutton);
    $(cell).append(movedcellleftbutton);
    $(cell).append(movecelldownbutton);
    $(cell).append(movedcellupbutton);
    $(cell).append(movecellrightbutton);
    $(cell).append(appendcellafterbutton);
    $(cell).append(removecellbutton);


};

function removetableoptions(parentDiv){
    $(parentDiv).find('.cellbutton').remove();
    $(parentDiv).find('.rowoptionstd').remove();
}

function appendtablerow(button, mode){
    parenttr = $(button).parent('td').parent('tr');
    newrow = $("<tr></tr>");
    childcount = $(parenttr).children('td').length;
    for(i=0; i<childcount-1; i++){
        newtd =$("<td></td>").attr('data-cell-nr', i);
        addinputtocell(newtd)

        $(newrow).append(newtd);
    }
    addrowoptions(newrow);

    if(mode ==='before') $(parenttr).before(newrow);
    else if(mode === 'after') $(parenttr).after(newrow);

};

function addinputtocell(cell){
    newid = create_UUID();
    newp = $("<p class='textline'></p>").attr('id', newid);
    newtextinput =$("<input type='text'/>")
    newcheckbox = $("<input type='checkbox' class='linecheckbox' data-ref='"+newid+"'>");
    $(newp).append(newtextinput);
    $(newp).append(newcheckbox);
    $(cell).append(newp);

}

function removetablerow(button){
    tablerow = $(button).parent('td').parent('tr');
    $(tablerow).remove();
}

function movetrup(button){
    parenttr = $(button).parent('td').parent('tr');
    $(parenttr).prev('tr').before(parenttr);
}

function movetrdown(button){
    parenttr = $(button).parent('td').parent('tr');
    $(parenttr).next('tr').after(parenttr);
}

function addtd(button, mode) {
    actualtd = $(button).parent('td');
    actualtdnr = parseInt($(actualtd).attr('data-cell-nr'));
    newtdnr = actualtdnr + 1;
    newtd = $("<td></td>");
    addinputtocell(newtd);
    if (mode === "before"){
        $(newtd).attr('data-cell-nr', actualtdnr)
        $(actualtd).attr('data-cell-nr', newtdnr);
        $(actualtd).before(newtd);
    }
    else if(mode ==="after"){
        $(newtd).attr('data-cell-nr', newtdnr);
        $(actualtd).after(newtd);
    }
    addcelloptions(newtd);
};

function movetdleft(button){
    actualtd = $(button).parent('td');
    actualtdnr = $(actualtd).attr('data-cell-nr');
    prevtd = $(actualtd).prev('td');
    prevtdnr = $(prevtd).attr('data-cell-nr');
    if(prevtd != undefined){
        $(actualtd).attr('data-cell-nr', prevtdnr);
        $(prevtd).attr('data-cell-nr', actualtdnr);
        $(prevtd).before(actualtd)
    }
};

function movetdright(button){
    actualtd = $(button).parent('td');
    actualtdnr = $(actualtd).attr('data-cell-nr');

    nexttd = $(actualtd).next('td:not(.rowoptionstd)');
    nexttdnr = $(nexttd).attr('data-cell-nr');
    if(nexttd != undefined){
        $(actualtd).attr('data-cell-nr', nexttdnr);
        $(nexttd).attr('data-cell-nr', actualtdnr);
        $(nexttd).after(actualtd)
    }
};

function movetd(button, mode){
   actualtd =  $(button).parent('td');
   actualtdnumber = parseInt($(actualtd).attr('data-cell-nr'));
   childnumber = actualtdnumber-1;
   actualtr = $(actualtd).parent('tr');
   if(mode === 'up') targettr = $(actualtr).prev('tr');
   else if (mode === 'down') targettr = $(actualtr).next('tr');
   targettd = $(targettr).children('td').eq(childnumber);
   newnextcellnr(actualtd, 'remove');
   $(targettd).before(actualtd);
   newnextcellnr(actualtd, 'add');
};

function newnextcellnr(starttd, mode){
    actualtdnr = parseInt($(starttd).attr('data-cell-nr'));
    nexttds = $(starttd).nextAll('td:not(.rowoptionstd)');
    $.each($(nexttds), function (index, nexttd){
        if (mode ==='add')  actualtdnr += 1;
        $(nexttd).attr('data-cell-nr', actualtdnr);
        if(mode === 'remove') actualtdnr -=1;

    })
}

function removetd(button){
    actualtd = $(button).parent('td');
    newnextcellnr(actualtd, 'remove');
    $(actualtd).remove();
}

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
};
