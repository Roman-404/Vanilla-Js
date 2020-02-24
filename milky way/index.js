    const canvas = document.getElementById("primary canvas");
    const ctx = canvas.getContext("2d");
    const colors = ['blue', 'black', 'green', 'red', 'yellow'];
    
    function drawStar(color, cx, cy, spikes=5, R=80, r=R/2) {
        rot = Math.PI / 2 * 3;
        step = Math.PI / spikes;
    
        ctx.beginPath();
        ctx.moveTo(cx, cy - R)
        for (i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * R;
            y = cy + Math.sin(rot) * R;
            ctx.lineTo(x, y)
            rot += step
    
            x = cx + Math.cos(rot) * r;
            y = cy + Math.sin(rot) * r;
            ctx.lineTo(x, y)
            rot += step
        }
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    
    };

    colors.map((color, key) => {
        drawStar(color, ++key*100, key % 2 ? 200 : 400)
    });

    canvas.onmousedown = event => {
        x = event.offsetX;
        y = event.offsetY;
        const canvas = document.getElementById("secondary canvas");
        const color = ctx.getImageData(x, y, 1, 1).data
        canvas.style.backgroundColor = `rgba(${color.join(',')})`
    };