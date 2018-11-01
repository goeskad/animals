/**
 * 购买动物组件
 */
class AnimalsShop extends Laya.Box {
    private manager: DataManager = DataManager.getInstance();

    // 可购买的动物
    private animals: Animal[];

    private closeButton: Laya.Image;

    constructor(private pool: AnimalsPool) {
        super();

        this.init();
    }

    init(): void {
        this.pos(150,250);

        // 关闭此窗口的按钮
        this.closeButton = new Laya.Image();
        this.closeButton.skin = "res/btn_close.png";
        this.addChild(this.closeButton);
        this.closeButton.pos(50, 0);
        this.closeButton.on(Laya.Event.CLICK, this, this.onClickClose);

        // 初始化所有动物
        this.animals = new Array<Animal>(GameRules.animalCount);
        let y: number;
        for (let index = 0; index < 7; index++) {
            let animal: Animal = Animal.createAnimal(index);
            
            this.addChild(animal);
            y = (index + 1) * 70;
            animal.pos(10, y);
            animal.on(Laya.Event.CLICK, this, this.buyAnimal, [animal]);
        }
    }
     
    onClickClose() {
        this.removeSelf();
    }

    // 购买动物， 购买后动物进入可选池中
    buyAnimal (propotype: Animal): Animal {
        if (propotype.state !== AnimalState.Locked) {
            let animal: Animal = Animal.createViaPrototype(propotype);

            propotype.price = propotype.price + propotype.price * GameRules.animalPriceIncrement / 100;

            this.pool.addAnimal(animal);

            return animal;
        } else {
           return null;
        }
    }

    sellAnimal(animal: Animal): void {
        this.manager.getData().currentGold = this.manager.getData().currentGold + animal.price / 2;
        animal.recover();
    }
    // TODO 可购买的动物列表
}