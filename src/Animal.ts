/**
 * 动物类
 */
class Animal extends Laya.Animation {
    // 动物种类， 从1到40逐渐升级
    public animalKind: number;
    // 移动速度
    public speed: number;
    //跑圈奖励金
    public bonus: number;
    
    constructor() {
        super();
    }

    // TODO 动物图像
}