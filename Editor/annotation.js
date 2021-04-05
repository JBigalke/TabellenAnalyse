$(function (){

function saveannotation(parentspan){
    var originaltext =$(parentspan).text()
    var annotierstring =$('#annotierstring').text()
    var elementname = $('.tagnameinput').val();
    if(elementname.length >0) {
        var attributes = ""
        $.each($('.attributep'), function (index, p) {
            var attributenameinput = $(p).find('.attributenameinput');
            var attributename = $(attributenameinput).val();
            if (attributename.length > 0)
                var attributevalueinput = $(p).find('.attributevalueinput');
            ;
            var attributevalue = $(attributevalueinput).val();
            attributes += " data-" + attributename + "='" + attributevalue + "'";
        });
        var replacestring = "<span data-tei-tagname='" + elementname + "' " + attributes + ">" + annotierstring + "</span>"
        var newstring = originaltext.replace(annotierstring, replacestring)
        $(parentspan).html(newstring);
    }


}

function cleanupdialog(){
    $(".tagnameinput").val("");
    $(".attributesp").empty();
}

dialog = $('.annotate-dialog').dialog({
    dialogClass: "annotatedialog",
    autoOpen : false,
    width: 350,
    height: 400,
    modal: true,
    buttons:
        {
            "save": function (){
                var parentspan = $(this).data('parentspan');
                saveannotation(parentspan);
                cleanupdialog();
                dialog.dialog('close');
            },
            Cancel: function (){
                cleanupdialog();
                dialog.dialog("close");
            }
            }

    });

$(".annotateregionbutton").click(function (){

    var selection = getSelectedText();
    if(selection.length >0){
        var parentspan = window.getSelection().anchorNode.parentElement;
        console.log($(parentspan))
        $('.annotate-dialog').find('#annotierstring').text(selection);
        dialog.data('parentspan', $(parentspan)).dialog("open");
    }

});
$(".addattributebutton").click(function(){

    var attributenameinput =$('<input class="attributenameinput" type="text"/>')
    var attributevalueinput = $('<input class="attributevalueinput" type="text"/>');
    var attrnamelabel =$('<label class="attrnamelabel">Name: </label>')
    var attrvaluelabel = $('<label class="attrvallabel">Value: </label>')
    var attributep = $('<p class="attributep"></p>')
    $(attributep).append(attrnamelabel);
    $(attributep).append(attributenameinput);
    $(attributep).append(attrvaluelabel);
    $(attributep).append(attributevalueinput);
    $(".attributesp").append(attributep);
});
});