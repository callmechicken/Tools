const fs = require("fs");

const 需要处理的字幕文件位置 = process.argv[2];
const 处理完后输出的文件位置 = process.argv[3];

fs.readFile(需要处理的字幕文件位置, "utf8", (err, data) => {
    if (err) {
        console.error("你的输入有点问题!", err);
        return;
    }
    const 每一段话 = data.split("\n\n");
    let 处理后的文本 = "";
    for (let i = 0; i < 每一段话.length; i++) {
        const 每一段话中的每一行 = 每一段话[i].split("\n");
        每一段话中的每一行.splice(0, 2); // 去掉序号和时间戳行
        for (let j = 0; j < 每一段话中的每一行.length; j++) {
            处理后的文本 += 每一段话中的每一行[j];
            处理后的文本 += "\n";
        }
        处理后的文本 += "\n";
    }
    fs.writeFile(处理完后输出的文件位置, 处理后的文本.trim(), "utf8", err1 => {
        if (err1) {
            console.error("输出文件发生错误！", err1);
        }
    });
});