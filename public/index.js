// Hacky enum thing
var MouseLoc = {
    NONE: 0,
    LEFT: 1,
    RIGHT: 2
};

var letterWidth;
var mouseLoc = MouseLoc.NONE;

var letterHovered = -1;

function GetLeftTextElementFromIndex(index)
{
    return $("#textLeft").children().eq(index).find(".textLeftContainer");
}
function GetRightTextElementFromIndex(index)
{
    return $("#textRight").children().eq(index).find(".textRightContainer");
}

function GoToIndexURL(index)
{
    var url = "/portfolio";
    if (index == 6) {
        url = "articles";
    }
    if (index == 10 || index == 12) {
        url = "https://www.kapricornmedia.com";
    }

    window.location = url;
}

function UpdateMouseLocIfChanged(newMouseLoc)
{
    if (newMouseLoc == mouseLoc) {
        return;
    }

    mouseLoc = newMouseLoc;
    if (newMouseLoc == MouseLoc.NONE) {
        MouseOnNone();
    }
    else if (newMouseLoc == MouseLoc.LEFT) {
        MouseOnLeft();
    }
    else if (newMouseLoc == MouseLoc.RIGHT) {
        MouseOnRight();
    }
}

function MouseOnNone()
{
    var $left = $("#left");
    var $right = $("#right");
    $left.css("background-color", "#000");
    $right.css("background-color", "#FFF");
    $(".letter").css("color", "#000");
    $(".letter").removeClass("black");
    $(".textLeftContainer").css("color", "#000");
    $(".textLeftContainer").css("cursor", "default");
    $(".textRightContainer").css("color", "#FFF");
    $(".textLeftContainer").css("cursor", "default");

    if (letterHovered != -1) {
        var $hoveredTextLeft = GetLeftTextElementFromIndex(letterHovered);
        var $hoveredTextRight = GetRightTextElementFromIndex(letterHovered);

        $hoveredTextLeft.css("color", "#FFF");
        $hoveredTextLeft.css("cursor", "pointer");
        $hoveredTextRight.css("color", "#000");
        $hoveredTextRight.css("cursor", "pointer");
    }
}

function MouseOnLeft()
{
    var $left = $("#left");
    var $right = $("#right");
    $left.css("background-color", "#FFF");
    $right.css("background-color", "#FFF");
    $(".letter").css("color", "#000");
    $(".letter").addClass("black");
    $(".textLeftContainer").css("color", "#FFF");
    $(".textLeftContainer").css("cursor", "default");
    $(".textRightContainer").css("color", "#FFF");
    $(".textLeftContainer").css("cursor", "default");
    
    if (letterHovered != -1) {
        var $hoveredTextLeft = GetLeftTextElementFromIndex(letterHovered);
        var $hoveredTextRight = GetRightTextElementFromIndex(letterHovered);

        $hoveredTextLeft.css("color", "#000");
        $hoveredTextLeft.css("cursor", "pointer");
        $hoveredTextRight.css("color", "#000");
        $hoveredTextRight.css("cursor", "pointer");
    }
}

function MouseOnRight()
{
    var $left = $("#left");
    var $right = $("#right");
    $left.css("background-color", "#000");
    $right.css("background-color", "#000");
    $(".letter").css("color", "#FFF");
    $(".letter").removeClass("black");
    $(".textLeftContainer").css("color", "#000");
    $(".textLeftContainer").css("cursor", "default");
    $(".textRightContainer").css("color", "#000");
    $(".textLeftContainer").css("cursor", "default");
    
    if (letterHovered != -1) {
        var $hoveredTextLeft = GetLeftTextElementFromIndex(letterHovered);
        var $hoveredTextRight = GetRightTextElementFromIndex(letterHovered);

        $hoveredTextLeft.css("color", "#FFF");
        $hoveredTextLeft.css("cursor", "pointer");
        $hoveredTextRight.css("color", "#FFF");
        $hoveredTextRight.css("cursor", "pointer");
    }
}

function IsEmpty(jqEl)
{
    return !$.trim(jqEl.html());
}

$(function() {
    console.log("Initialized");

    letterWidth = $(".letterContainer").width();

    $(window).mousemove(function(event) {
        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;
        var newMouseLoc = MouseLoc.NONE;

        if (event.pageX <= width / 2 - letterWidth / 2) {
            newMouseLoc = MouseLoc.LEFT;
        }
        else if (event.pageX >= width / 2 + letterWidth / 2) {
            newMouseLoc = MouseLoc.RIGHT;
        }

        UpdateMouseLocIfChanged(newMouseLoc);
    });

    $(window).mouseleave(function() {
        UpdateMouseLocIfChanged(MouseLoc.NONE);
    });

    $(".letterContainer").mouseenter(function(event) {
        var index = $(this).index();
        var $textLeft = GetLeftTextElementFromIndex(index);
        var $textRight = GetRightTextElementFromIndex(index);

        // If empty & not midpoint (M)
        if (index != 8 && IsEmpty($textLeft) && IsEmpty($textRight)) {
            return;
        }

        $(".textLeftContainer").css("color", "#000");
        $(".textRightContainer").css("color", "#FFF");
        $textLeft.css("color", "#FFF");
        $textRight.css("color", "#000");
        letterHovered = index;
        
        if (index == 10 || index == 12) {
            var otherInd = 10;
            if (index == 10) {
                otherInd = 12;
            }

            $textLeft = GetLeftTextElementFromIndex(otherInd);
            $textRight = GetRightTextElementFromIndex(otherInd);
            $textLeft.css("color", "#FFF");
            $textRight.css("color", "#000");
        }
    });
    $(".textLeftContainer").mouseleave(function(event) {
        var index = $(this).parent().index();
        var $target = $(event.target);
        
        if (!IsEmpty($target) && index == letterHovered) {
            console.log("reset");
            letterHovered = -1;
        }
    });
    $(".textRightContainer").mouseleave(function(event) {
        var index = $(this).parent().index();
        var $target = $(event.target);

        if (!IsEmpty($target) && index == letterHovered) {
            console.log("reset");
            letterHovered = -1;
        }
    });
    
    $(".letterContainer").click(function() {
        var index = $(this).index();
        GoToIndexURL(index);
    });
    $(".textLeftContainer").click(function() {
        var index = $(this).parent().index();
        if (index == letterHovered) {
            GoToIndexURL(index);
        }
    });
    $(".textRightContainer").click(function() {
        var index = $(this).parent().index();
        if (index == letterHovered) {
            GoToIndexURL(index);
        }
    });
});