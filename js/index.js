(function () {
    var canvas = this.__canvas = new fabric.Canvas('canvas');
    fabric.Object.prototype.transparentCorners = false;
    var pathData3 = "m0,59l30,-60l30,60-59,0z";
    var pathData5 = "m0,19l22,0l7,-20l7,20l23,0l-18,13l7,22l-18,-13l-18,13l7,-22l-18,-13z";
    var pathData55 = "m2,21l30,-21l28,21l-11,35l-36,0l-11,-35l1,-0.5z";
    var pathDatalove = "m30,18c11.544266,-33.118795 56.775077,0 0,42.581308c-56.775077,-42.581308 -11.544266,-75.700103 0,-42.581308z";
    var imgpath = '../images/img1.jpg';
    canvas.lockScalingX = canvas.lockScalingY = true;
    // fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
    var fabricObj = {
        width: 100,//宽度，number
        height: 100,//高度，number
        left: 200,//左定位距离，number
        top: 200,//上定位距离，number
        angle: 30,//旋转角度，number
        stroke: '#F9AE08',//描边颜色，string
        strokeWidth: 2,//描边像素，number
        hasControls: true,//是否显示，booleans
       fill: "#ff0",//填充颜色，字体与图形相同,默认#000，string
       selectable: true,//是否可选中，默认true，booleans
       scaleX:1,//x轴放大倍数，根据中心点放大，number
       scaleY:1,//y轴放大倍数，根据中心点放大，number
       originX: 'left',//x轴居中点，默认left，string
       originY: 'top',//y轴居中点，默认top，string
       fontFamily:'Arial',//字体类型，string
       fontSize:16,//字体大小，，number
       charSpacing:0,//字符间距，number
       radius: 25,//圆直径，number
       editable:false,//当前文字是否可编辑，booleans
   }
   let canvasItem = new fabric.Rect(fabricObj)
//    canvas.add(canvasItem)

        let oImage = new Image();
        oImage.src = 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/15138144/1762249866000.jpg?timeStamp='+new Date().getTime();
        // oImage.src = 'https://bs-album.oss-ap-southeast-5.aliyuncs.com/sample.jpg?timeStamp='+new Date().getTime();
        // oImage.src = 'https://glodimg.chinabrands.com/pdm-product-pic/Distribution/2019/07/11/source-img/20190711151531_73856.jpg?timeStamp='+new Date().getTime();

        oImage.setAttribute('crossOrigin', 'anonymous');
        oImage.onload = function(){
            let oimg = new fabric.Image(oImage,{
                scaleX: 0.5,
                scaleY: 0.5,
                selectable: false,
                left: oImage.width/2, 
                top: oImage.height/2,
                originX: 'center',
                originY: 'center',
            });
            canvas.add(oimg);
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
            // evented: true,
        });
        canvas.add(_clipboard).setActiveObject(_clipboard);
        canvas.requestRenderAll();
    }
    document.getElementById("paste").addEventListener("click", function(){
        // paste()
        console.log(canvas.toDataURL())
        document.getElementById("img").src=(canvas.toDataURL())
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
    document.getElementById("angle-control").addEventListener("input",function(e){
        canvas.item(0).set({
            angle:e.target.value
        })
        canvas.requestRenderAll();
    });
})()