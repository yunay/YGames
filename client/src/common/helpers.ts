namespace helpers{
    export function wrapText(text: string, textMaxLength:number){
        var textParts = text.split(/\s+/);
        var output = [];

        for (var textPart of textParts) {
            if(textPart.length > textMaxLength){
                output.push(textPart.substring(0,textMaxLength) + ' ' + textPart.substring(textMaxLength,textPart.length))
            }else{
                output.push(textPart)
            }
        }

        return output.join(' ')
    }
}

export {
    helpers
}