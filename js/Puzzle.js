$(function () {
    //將位置轉成座標的換算表
    var posConv = {};
    //填入16張圖
    for (var i = 0; i < 16; i++) {
        $("#dvPuzzle").append("<div class='PicCell' id='Pic" + i + "'><img src='image/dog2.png' /></div>");
        var row = parseInt(i / 4);
        var col = i % 4;
        $("#Pic" + i + " img").css("margin-left", col * -120 + 1).css("margin-top", row * -120 + 1);
        //第i個換成第row列第col行
        posConv[i] = { row: row, col: col };
    }
    //將左上角圖塊移除
    $("#Pic3 img").remove();
    //取得四周相鄰的位置
    function getNearPos(i) {
        var pool = [];
        var row = posConv[i].row, col = posConv[i].col;
        //toCheck用來放入待比對的對象
        if (row > 0) //上
            pool.push((row - 1) * 4 + col);
        if (row < 4) //下
            pool.push((row + 1) * 4 + col);
        if (col > 0) //左
            pool.push(i - 1);
        if (col < 4) //右
            pool.push(i + 1);
        return pool;
    }
    //點選動作
    $(".PicCell").click(function () {
        //找尋上下左右有沒有Pic0，有則可以與它交換位置
        //先找出元素是16個中第幾個?
        var cells = $("#dvPuzzle div");
        var i = cells.index(this);
        var toCheck = getNearPos(i);
       // console.log(toCheck);
        while (toCheck.length > 0) {
            var j = toCheck.pop();
            console.log(j);
            if (cells.eq(j).attr("id") == "Pic3") //為空白格，交換位子
            {
                //排序，必要時對調，讓i < j
                if (i > j) { var k = j; j = i; i = k; }
                var ahead = cells.eq(i); //前面
                var behind = cells.eq(j); //後面
                var behindPrev = behind.prev();
                //左右對調
                if (Math.abs(i - j) == 1)
                    behind.after(ahead);
                else //上下對調
                {
                    ahead.after(behind);
                    behindPrev.after(ahead);
                }
                break;
            }
        }
    });
    $("input:button").click(function () {
        for (var i = 0; i < 500; i++) {
            var cells = $("#dvPuzzle div");
            //找出空格所在位置，並取得其相鄰圖塊
            var toMove = getNearPos(cells.index($("#Pic3")[0]));
            cells.eq(toMove[ //由空格的相鄰圖塊擇一挪動
                parseInt(Math.random() * toMove.length)
            ]).click();
        }
    });
});