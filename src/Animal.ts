/**
 * 动物类
 */
class Animal extends Laya.Sprite {
    public static Animal_Pool_Sign = "animal";

    public static WinBonus_Pool_Sign = "WinBonus";

    // 动物种类， 从0到40逐渐升级
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

    // UI相关的附加属性
    public uiAttributes: AnimalUIAttributes;

    constructor() {
        super();

        this.image = new Laya.Image;

        this.addChild(this.image);

        this.autoSize = true;

        this.image.width = 60;
        this.image.height = 60;
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
        animal.bonus = GameRules.animalInitBonus  * Math.pow(2, animalKind);
        animal.rotation = 0;
        animal.alpha = 1;
        
        animal.image.skin = "icons/a" + animalKind + ".png";
        return animal;
    }

    // 根据原型创建动物实例
    public static createViaPrototype(prototype: Animal): Animal {
        let animal: Animal = Animal.createAnimal(prototype.animalKind);
        
        animal.state = prototype.state;
        animal.price = prototype.price;
        
        return animal;
    }

    // 回归对象池
    public recover(): void {
        if (this.uiAttributes) {
            this.uiAttributes.reset();
        }
        Laya.Pool.recover(Animal.Animal_Pool_Sign, this);
    }

    // 改变动物状态
    public changeState(state: AnimalState): void {
        this.state = state;
    }

    public getUIAttributes(): AnimalUIAttributes {
        if (!this.uiAttributes) {
            this.uiAttributes = new AnimalUIAttributes();
        }
        return this.uiAttributes;
    }
}

class AnimalUIAttributes {
    // 在跑圈的动物复本
    public runningCopy: Animal;

    public winBonusBox: ui.WinBonusUI;

    constructor() {
    }

    public reset(): void {
        this.runningCopy = null;

        this.resetWinBonusBox();
    }

    public resetWinBonusBox() {
        if (this.winBonusBox) {
            this.winBonusBox.close(null, false);
            Laya.Pool.recover(Animal.WinBonus_Pool_Sign, this.winBonusBox);
        }
        this.winBonusBox = null;
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