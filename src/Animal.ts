/**
 * 动物类
 */
class Animal extends Laya.Sprite {
    public static Animal_Pool_Sign = "animal";

    // 动物种类， 从1到40逐渐升级
    public animalKind: number;

    // 当前状态
    public state: AnimalState;

    // 移动速度
    public speed: number;

    // 动物价格
    public price: number;

    // 跑圈奖励金
    public bonus: number;
    
    // 动物图像
    public image: Laya.Image;

    // 在跑圈的动物复本
    public runningCopy: Animal = null;

    constructor() {
        super();

        this.image = new Laya.Image;

        this.addChild(this.image);

        this.autoSize = true;
    }

    // 根据动物种类创建动物实例
    public static createAnimal(animalKind: number): Animal {
        let animal: Animal = Laya.Pool.getItemByClass(Animal.Animal_Pool_Sign, Animal);
        
        let manager = DataManager.getInstance();
        animal.animalKind = animalKind;
        animal.price = manager.getData().animalPrices[animalKind];
        if (animalKind < manager.getData().unlockedLevel) {
            animal.changeState(AnimalState.OnSell);
        } else {
            animal.changeState(AnimalState.Locked);
        }
        animal.speed = GameRules.animalInitSpeed + GameRules.animalSpeedIncrement * animalKind;
        return animal;
    }

    // 根据原型创建动物实例
    public static createViaPrototype(prototype: Animal): Animal {
        let animal: Animal = Animal.createAnimal(prototype.animalKind);
        
        animal.animalKind = prototype.animalKind;
        animal.speed = prototype.speed;
        animal.state = prototype.state;
        animal.price = prototype.price;
        animal.bonus = prototype.bonus;
        
        return animal;
    }

    // 回归对象池
    public recover(): void {
        Laya.Pool.recover(Animal.Animal_Pool_Sign, this);
    }

    // 改变动物状态
    public changeState(state: AnimalState): void {
        this.state = state;

        this.image.skin = "res/a" + this.animalKind + ".png";
        this.image.width = 60;
        this.image.height = 60;

        // 被锁住的动物是灰色状态
        if (this.state === AnimalState.Locked) {
            this.createGrayFilter();
        } else {
            this.image.filters = [];
        }
    }

    // 设置跑圈状态
    public setRunningCopy(runningCopy: Animal): void {
        this.runningCopy = runningCopy;
        this.createGrayFilter();
    }

    // 清除跑圈状态
    public clearRunningCopy(): void {
        this.runningCopy = null;
        this.image.filters = [];
    }

    /**创建灰色滤镜位图**/
    private  createGrayFilter(): void
    {
            //颜色滤镜矩阵,灰色
            var colorMatrix:Array<number> = 
                [
                    0.3086, 0.6094, 0.0820, 0, 0,  //R
                    0.3086, 0.6094, 0.0820, 0, 0, //G
                    0.3086, 0.6094, 0.0820, 0, 0,  //B
                    0, 0, 0, 1, 0, //A
                ];
            //创建灰色颜色滤镜
            let GrayFilter: Laya.ColorFilter = new Laya.ColorFilter(colorMatrix);
            //添加灰色颜色滤镜效果
            this.image.filters = [GrayFilter];
    }
}

enum AnimalState {
     // 在跑圈
     Running,
     // 已购买
     Bought,
     // 在售
     OnSell,
     // 锁住
     Locked
}