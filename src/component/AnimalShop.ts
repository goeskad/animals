/**
 * 购买动物组件
 */
class AnimalShop {
    private manager: DataManager = DataManager.getInstance();

    constructor(private ui: ui.AnimalShopUI, private pool: AnimalPool) {
        this.init();
    }

    init(): void {
        // 关闭此窗口的按钮
        this.ui.closeBtn.on(Laya.Event.CLICK, this, this.onClickClose);
        
        let list = this.ui.alist;
        list.itemRender = ui.SellAnimalUI;
        // 使用但隐藏滚动条
        list.vScrollBarSkin = "";
        list.renderHandler = new Laya.Handler(this, this.updateItem);

        let listData: Array<number> = new Array<number>(GameRules.animalCount);
        for (let index = 0; index < GameRules.animalCount; index++) {
            listData[index] = index;
        }
        list.array = listData;
    }
    
   private updateItem(cell: ui.SellAnimalUI, index: number): void {
       let animalIndex: number = cell.dataSource;
       let animal: Animal = this.manager.getAnimalPrototype(index);
       if (animal) {
           if (cell.abox.numChildren > 0) {
               cell.abox.removeChildAt(0);
           }
           cell.abox.addChild(animal);
           cell.aprice.text = animal.price.toString();
           if (animal.state !== AnimalState.Locked) {
               cell.on(Laya.Event.CLICK, this, this.buyAnimal, [animal, cell.aprice]);
               cell.filters = [];
           } 
           else {
               cell.off(Laya.Event.CLICK, this, this.buyAnimal);
               cell.filters = [this.createGrayFilter()];
           }
       }
   }

   /**创建灰色滤镜位图**/
    private  createGrayFilter(): Laya.ColorFilter
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
            return new Laya.ColorFilter(colorMatrix);
    }

    onClickClose() {
        this.ui.close(null, true);
    }

    // 购买动物， 购买后动物进入可选池中
    buyAnimal (propotype: Animal, aprice: Laya.Label): Animal {
        console.log("buy animal", propotype.animalKind);
        if (this.manager.getData().currentGold >= propotype.price && this.pool.canAddAnimal()) {
            let animal: Animal = Animal.createViaPrototype(propotype);

            this.manager.getData().currentGold -= propotype.price;
            UIManager.getInstance().mainView.refreshGold();
            
            propotype.price = propotype.price + Math.round(propotype.price * GameRules.animalPriceIncrement / 100);
            aprice.text = propotype.price.toString();

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