var fs = require('fs');

export class PropertyReader {
    filename: string;
    fileContent: string;
    jsonObj;
    constructor(filename: string) {
        this.filename = filename;
        this.fileContent = fs.readFileSync(this.filename, 'utf8');
        this.jsonObj = JSON.parse(this.fileContent);
    }

    public readParameter(key): string {
        let value: string = this.jsonObj[key];
        return value;
    }
}
