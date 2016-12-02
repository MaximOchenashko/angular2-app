/**
 * @author iRevThis
 */

export interface Enum {
    name: string,
    code: number
}

export class EnumHolder {
    public values: Enum[];
    constructor(values:Enum[]) {
        this.values = values;
    }

    public byCode(code:number): Enum {
        for (var e of this.values) {
            if (e.code == code) {
                return e;
            }
        }
        return null;
    }
}

export const deviceType: EnumHolder = new EnumHolder([
    {name: 'Fitbit', code: 0},
    {name: 'Jawbone', code: 1}
]);

export const userRole: EnumHolder = new EnumHolder([
    {name: 'Patient', code: 0},
    {name: 'Doctor', code: 1}
]);