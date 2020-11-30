const fs = require("fs");

/*
使用方法：node fuck_srt.js [需要处理的字幕文件位置] [处理完后输出的文件位置]
example：node fuck_srt.js 测试输入文件.srt out.txt
*/

const target_srt = process.argv[2];
const output_txt = process.argv[3];

fs.readFile(target_srt, "utf8", (err, data) => {
    if (err) {
        console.error("你的输入有点问题!", err);
        return;
    }
    const 每一段话 = data.split("\n\n");
    let result = "";
    for (let i = 0; i < 每一段话.length; i++) {
        const 一段话里的每一行 = 每一段话[i].split("\n");
        一段话里的每一行.splice(0, 1); // 去掉序号行
        for (let j = 0; j < 一段话里的每一行.length; j++) { // 去掉时间戳行
            if (一段话里的每一行[j].indexOf("-->") != -1) { // 如果找得到 "-->" 则代表当前行为时间戳行
                一段话里的每一行.splice(0, 1); // 删掉当前行
                j--; // 删掉当前行之后检查位置不变
            }
        }
        for (let j = 0; j < 一段话里的每一行.length; j++) {
            result += 一段话里的每一行[j];
            result += "\n";
        }
        result += "\n";
    }
    fs.writeFile(output_txt, result.trim(), "utf8", err1 => {
        if (err1) {
            console.error("输出文件发生错误！", err1);
        }
    });
});