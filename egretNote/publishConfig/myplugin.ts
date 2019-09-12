/**
 * 示例自定义插件，您可以查阅 http://developer.egret.com/cn/github/egret-docs/Engine2D/projectConfig/cmdExtensionPlugin/index.html
 * 了解如何开发一个自定义插件
 */
export class CustomPlugin implements plugins.Command {

    private buffer;
    constructor() {
    }

    async onFile(file: plugins.File) {
        // 保存manifest.js文件的内容
        if(file.basename.indexOf('manifest.js') > -1) {
            this.buffer = file.contents;
        }
        return file;
    }

    public getResultJson(jsonString){
        /*[ '{',
            '\t"initial": [],',
            '\t"game": [',
            '\t\t"js/default.thm_224ded79.js",',
            '\t\t"js/lib.min_29cb17c4.js",',
            '\t\t"js/plugin.min_c23b9522.js",',
            '\t\t"js/main.min_46c79368.js"',
            '\t]',
            '}' ]*/
        jsonString = jsonString.join('');
        jsonString = jsonString.replace('\t','');
        let json = JSON.parse(jsonString);
        let gameOption = json['game'];
        var initialNewOption =[];
         var gameNewOption =[];
        for(var i=0;i<gameOption.length;i++){
               if(/js\/lib\.min/.test(gameOption[i])){
                   initialNewOption.push(gameOption[i]);
                   continue;
               }
                if(/js\/plugin\.min/.test(gameOption[i])){
                    initialNewOption.push(gameOption[i]);
                    continue;
                }
            gameNewOption.push(gameOption[i]);
        }

        json['initial'] =initialNewOption;
        json['game'] =gameNewOption;
        return JSON.stringify(json);
    }

    async onFinish(commandContext: plugins.CommandContext) {
        if (this.buffer) {
            let contents: string = this.buffer.toString();
            let arr = contents.split('\n');
            let lib;
            let newStr =this.getResultJson(arr);
          //  return;
            /*arr.forEach((item, index) => {
                if (item.indexOf('lib.min.js') > -1) {
                    lib = item;
                    arr.splice(index, 1)
                }
            });
            if (lib != null) {
                arr.unshift(lib)
            }
             let newCont = arr.join('\n');
             */

            commandContext.createFile('manifest.json', new Buffer(newStr));
        }
    }

}