var RectX = 0;
var RectY = 0;  
// DrawRectangle.js
function main(){
      // Retrieve <canvas> element                                  <- (1)
    var canvas = document.getElementById('example');
    if(!canvas){
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
       // Get the rendering context for 2DCG                          <- (2)
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0,1.0)';// Set a blue color
    ctx.fillRect(RectX,RectY,canvas.width,canvas.height);// Fill a rectangle with the color
    var v1 = [2.25, 2.25];
    drawVector(v1, "red");
    drawButton.onclick = handleDrawEvent;

}

//used help from Chatgpt
function drawVector(v, color){
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    //Use Chat For help on this
    var scale = 20;

    var x = v[0] * scale;
    var y = v[1] * scale;
    var centerX = (RectX+canvas.width / 2);
    var centerY = (RectY+canvas.height / 2);


    var endX = centerX + x;
    var endY = centerY - y;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(endX,endY);


    //ctx.strokeStyle(color);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

// used ChatGPT for help
function angleBetween(v1,v2){
    let dotVal = Vector3.dot(v1,v2);
    let v1mag = v1.magnitude();
    let v2mag = v2.magnitude();

    let theta = dotVal / (v1mag/v2mag);

    if(theta > 1){
        theta = 1;
    }
    else if(theta < -1){
        theta = -1;
    }
    let radians = Math.acos(theta);
    let degrees = (radians*180)/Math.PI;
    return degrees;
}

// used ChatGPT for help
function handleDrawEvent(){
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(RectX,RectY,canvas.width,canvas.height);

    let x1Str = document.getElementById("v1x").value; // e.g. "2.25"
    let y1Str = document.getElementById("v1y").value; // e.g. "2.25"
    let x2Str = document.getElementById("v2x").value; // e.g. "2.25"
    let y2Str = document.getElementById("v2y").value;

    // Convert strings to numbers
    let x1 = parseFloat(x1Str);
    let y1 = parseFloat(y1Str);
    let x2 = parseFloat(x2Str);
    let y2 = parseFloat(y2Str);
  
    // Vectors get to list
    let v1 = [x1, y1];
    let v2 = [x2, y2];
    drawVector(v1, "red");
    drawVector(v2, "blue");
    let operation = document.getElementById("operations").value;
    let scalar = parseFloat(document.getElementById("scalar").value);
    
    if(operation == "add"){
        let sum = new Vector3([x1, y1, 0]).add(new Vector3([x2,y2,0]));
        
        drawVector([sum.elements[0],sum.elements[1]], "green");
    }
    else if(operation == "subtract"){
            let diff = new Vector3([x1, y1, 0]).sub(new Vector3([x2,y2,0]));
            drawVector([diff.elements[0],diff.elements[1]], "green");

    }
    else if(operation == "multiply"){
            let prod1 = new Vector3([x1, y1, 0]).mul(scalar);
            let prod2 = new Vector3([x2, y2, 0]).mul(scalar);
            drawVector([prod1.elements[0], prod1.elements[1]], "green");
            drawVector([prod2.elements[0],prod2.elements[1]], "green");
    }
    else if(operation == "divide"){
            let quo1 = new Vector3([x1, y1, 0]).div(scalar);
            let quo2 = new Vector3([x2, y2, 0]).div(scalar);
            drawVector([quo1.elements[0],quo1.elements[1]], "green");
            drawVector([quo2.elements[0], quo2.elements[1]], "green");
    }
    else if(operation == "magnitude"){
        let ve1 = new Vector3([x1,y1,0]);
        let ve2 = new Vector3([x2,y2,0]);
        ve1 = ve1.magnitude();
        ve2 = ve2.magnitude();
        console.log("The magnitude of v1:", ve1);
        console.log("The magnitude of v2:", ve2);

    }
    else if(operation == "normalize"){
        let ve1 = new Vector3([x1,y1,0]);
        let ve2 = new Vector3([x2,y2,0]);
        ve1.normalize();
        ve2.normalize();
        drawVector([ve1.elements[0],ve1.elements[1]],"green");
        drawVector([ve2.elements[0],ve2.elements[1]],"green");
    }
    else if(operation == "angleBetween"){
        let ve1 = new Vector3([x1,y1,0]);
        let ve2 = new Vector3([x2,y2,0]);

        let angDeg = angleBetween(ve1, ve2);
        console.log("The angle between v1 and v2 is: ", angDeg, "degrees");
    }
    else if(operation == "area"){
        let ve1 = new Vector3([x1,y1,0]);
        let ve2 = new Vector3([x2,y2,0]);
        let crossVe = Vector3.cross(ve1,ve2);
        let crossMagn = crossVe.magnitude();
        let area = crossMagn/2;
        console.log("The area of the triangle is: ", area);
    }

}