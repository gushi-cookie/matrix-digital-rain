const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

const charArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ':', '.', '"', '=', '*', '+', '-', '¦', '|', 'ﾍ', 'ｳ', 'ｵ', 'ｹ', '日', 'ｦ', 'ｱ', 'ｳ', 'ｴ', 'ｵ', 'ｶ', 'ｷ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ', 'ﾀ', 'ﾂ', 'ﾃ', 'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾊ', 'ﾋ', 'ﾎ', 'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ', 'ﾔ', 'ﾕ', 'ﾗ', 'ﾘ', 'ﾜ'];

class MatrixLine {
    constructor(posX, fontSize, lengthLimit, tailLength) {
        this.tailLength = tailLength;
        this.lengthLimit = lengthLimit;
        this.fontSize = fontSize;
        this.posX = posX;
        this.characters = new Array();
        this.specialCharacters = new Array();
    };

    pushLine() {
        this.characters.push(charArr[Math.floor(Math.random() * charArr.length)]);

        if(Math.random() * 100 <= 10) {
            this.specialCharacters.push(this.characters.length - 1);
        }
    };

    draw(ctx) {
        for(let i = 0; i < this.characters.length; i++) {
            let fadeAmount = this.characters.length - this.lengthLimit;

            if(this.characters.length - 1 === i) {
                ctx.fillStyle = '#98FF98';
                ctx.shadowBlur = '5';
            } else if(fadeAmount > 0 && i <= fadeAmount - 1) {
                let alpha = 0;

                if(fadeAmount - 1 >= i && fadeAmount - this.tailLength <= i) {
                    alpha = 1 / (fadeAmount - i);
                }

                ctx.fillStyle = 'rgba(0, 162, 0,' + alpha + ')';
                ctx.shadowBlur = '14';
            } else {
                ctx.fillStyle = '#00A200';
                
                ctx.shadowBlur = '18';
            }
            
            ctx.shadowColor = '#00A200';
            ctx.font = this.fontSize + 'px Luminari';

            if(this.specialCharacters.includes(i) && this.characters.length - 1 != i) {
                ctx.fillText(charArr[Math.floor(Math.random() * charArr.length)], this.posX, this.fontSize * i);
            } else {
                ctx.fillText(this.characters[i], this.posX, this.fontSize * i);
            }
        }
    };
};


var lines = new Array();


function deleteFadedLines(fontSize) {
    let toDelete = new Array();

    let line;
    let fadeAmount;
    for(let i = 0; i < lines.length; i++) {
        line = lines[i];
        fadeAmount = line.characters.length - line.lengthLimit;

        if((line.characters.length - (line.characters.length - fadeAmount + line.tailLength)) * line.fontSize > canvas.height) {
            toDelete.push(i);
        }
    }

    toDelete.reverse().forEach((index) => {
        lines.splice(index, 1);
    });

    console.log(lines.length);
};

function drawLines() {
    ctx.fillStyle = '#000800';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    lines.forEach((line) => {
        line.draw(ctx);
    });
};

function pushLines() {
    lines.forEach((line) => {
        line.pushLine();
    });
};



function update() {
    lines.push(new MatrixLine(Math.random() * canvas.width, 18, 15, 8));
    lines.push(new MatrixLine(Math.random() * canvas.width, 18, 10, 12));

    deleteFadedLines(18);
    drawLines();
    pushLines();
}


setInterval(update, 80);