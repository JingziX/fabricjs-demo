(function () {
    var canvas = this.__canvas = new fabric.Canvas('canvas');
    fabric.Object.prototype.transparentCorners = false;
    var pathData3 = "m0,59l30,-60l30,60-59,0z";
    var pathData5 = "m0,19l22,0l7,-20l7,20l23,0l-18,13l7,22l-18,-13l-18,13l7,-22l-18,-13z";
    var pathData55 = "m2,21l30,-21l28,21l-11,35l-36,0l-11,-35l1,-0.5z";
    var pathDatalove = "m30,18c11.544266,-33.118795 56.775077,0 0,42.581308c-56.775077,-42.581308 -11.544266,-75.700103 0,-42.581308z";
    var imgpath = '../images/img1.jpg';
    canvas.lockScalingX = canvas.lockScalingY = true;
    fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

    fabric.Image.fromURL('https://cc-west-usa.oss-us-west-1.aliyuncs.com/20190717/258498805467.png', function (img) {
        img.set({
            left: 100,
            top: 100
        }).scaleToWidth(100);

        canvas.add(img);
    });
    
    canvas.on('mouse:down', function(options) {
        canvas.set({
            left: 200,
            top: 100
        })
    });
    // canvas.add(
    //     new fabric.Rect({ top: 100, left: 100, width: 50, height: 50, fill: '#f55' }),
    //     new fabric.Circle({ top: 140, left: 230, radius: 75, fill: 'green' }),
    //     new fabric.Triangle({ top: 300, left: 210, width: 100, height: 100, fill: 'blue' })
    //   );
    /* var  obj = {
        left: 100,
        top: 200,
        angle: 0,
        fill: "",
        strokeWidth: 2,
        stroke: "#880E4F",
        // selectable: false
    }
    
    var clipPath = new fabric.Path(pathData3,obj);
    // canvas.clipPath = clipPath;
    var path = new fabric.Path(pathData3,obj);  */

    var rectObj = {
        width: 100,
        height: 100,
        left: 200,
        top: 200,
        angle: 30,
        stroke: '#F9AE08',
        strokeWidth: 2,
        hasControls: true,
        fill: "#ff0",
        // selectable: false
    }
    var rectObj1 = {}
    for (let key in rectObj) {
        rectObj1[key] = rectObj[key]
    }
    rectObj1.angle = 0;
    rectObj1.stroke = "#000";
    rectObj1.fill = "#f00";
    var addArea = new fabric.Rect(rectObj);
    // canvas.clipPath = addArea;
    canvas.add(addArea)

    //参照矩形
    canvas.add(new fabric.Rect(rectObj1))

    var angleL = rectObj.width / 2 - Math.sin((rectObj.angle + 90) * Math.PI / 180) * rectObj.width / 2;
    var angleT = Math.cos(rectObj.angle * Math.PI / 180) * rectObj.height / 4;
    var oleft = rectObj.left + rectObj.width / 2;
    var otop = rectObj.top + rectObj.height / 2;
    var circleObj = {
        radius: 25,
        fill: '#000',
        scaleY: 0.5,
        scaleX: 0.5,
        stroke: '#F9AE08',
        originX: 'center',
        strokeWidth: 2,
        left: oleft,
        top: otop,
        originY: 'center'
    }

    var circleObj1 = {};
    for (let key in circleObj) {
        circleObj1[key] = circleObj[key]
    }
    circleObj1.left = oleft - angleL;
    circleObj1.top = otop + angleT;
    circleObj1.fill = "red";
    var circle = new fabric.Path(pathData3, circleObj);

    var angleControl = document.getElementById('angle-control');
    angleControl.oninput = function () {
        canvas.getActiveObject().set('angle', parseInt(this.value, 10)).setCoords();
        canvas.requestRenderAll();
    };
    canvas.add(new fabric.Circle({
        radius: 75,
        fill: '',
        stroke: '#f00',
        originX: 'center',
        strokeWidth: 2,
        left: 250,
        top: 400
    }))
    canvas.setActiveObject(canvas.item(0));
    canvas.add(new fabric.Path(pathData55, {
        scaleX: 1,
        scaleY: 1,
        fill: "",
        strokeWidth: 2,
        stroke: "#880E4F"
    }))




    var otext = new fabric.IText('dadsa',{
        fill: '#D81B60',
        strokeWidth: 0,
        stroke: "#880E4F",
        scaleX:1,
        scaleY:1,
        originX: 'center',
        originY: 'center',
        fontFamily:"",
        fontSize:30,
        angle:0,
        charSpacing:20+200,
        top:400,
        left:250,
        editable:true,
        isEditing:true
    });
    canvas.add(otext).setActiveObject(otext);

    //重置
    function reset(){
        if(canvas.getActiveObject()){
        canvas.getActiveObject().set({
                left: 90,
                top: 200,
                // selectable:true
            })
            canvas.requestRenderAll();
        }
        
    }
    document.getElementById("reset").addEventListener("click", reset);
    //复制
    function paste() {
        var _clipboard;
        // clone again, so you can do multiple copies.
        canvas.getActiveObject().clone(function(cloned) {
            _clipboard = cloned;
        })
        _clipboard.set({
            left: _clipboard.left + 10,
            top: _clipboard.top + 10,
            evented: true,
        });
        canvas.add(_clipboard).setActiveObject(_clipboard);
        canvas.requestRenderAll();
        
    }
    document.getElementById("paste").addEventListener("click", function(){
        canvas.add(new fabric.IText('dadsa',{
            // fill: '#D81B60',
            strokeWidth: 1,
            stroke: "#880E4F",
            scaleX:1,
            scaleY:1,
            // originX: 'center',
            // originY: 'center',
            // fontFamily:"",
            // fontSize:30,
            // angle:0,
            // charSpacing:20+200,
            top:300,
            left:200,
            // isEditing: true,
            // editable:true,
            editingBorderColor: 'rgba(0,0,0,1)',
            cursorColor: '#0ff'
        }))
    });
    function moveup(){//上移
        var selected=canvas.getActiveObject();
        selected.bringToFront();
    }
    document.getElementById("moveup").addEventListener("click",moveup);

    //下移
    function movedown(){
        var selected = canvas.getActiveObject();
        selected.sendBackwards(true);
    }
    document.getElementById("movedown").addEventListener("click",movedown);
    
    //选中图层
    document.getElementById("select1").addEventListener("click",function(){
        canvas.setActiveObject(canvas.item(1));
        canvas.requestRenderAll();
    });
    document.getElementById("select2").addEventListener("click",function(){
        canvas.setActiveObject(canvas.item(2));
        canvas.requestRenderAll();
    });
})()