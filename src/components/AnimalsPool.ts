/**
 * 已购买的动物池， 可从池中取出动物放到跑道上
 */
class AnimalsPool extends Laya.Box {
    private manager: DataManager = DataManager.getInstance();


    constructor(private trail: AnimalsTrail) {
        super();

        this.pos(150, 250);
    }

    // 增加动物进入池
    public addAnimal(animal: Animal) {
        animal.changeState(AnimalState.Bought);

        this.addChild(animal);

        // 设置动物放置的行与列
        let row = Math.ceil(this.numChildren / 3);
        let colunm = this.numChildren % 3;
        colunm = (colunm === 0 ? 3 : colunm);
        animal.pos((colunm-1) * 70, (row-1) * 70);
        animal.on(Laya.Event.CLICK, this, this.toggleForTrail, [animal]);
    }

    // 从池中移除动物
    public removeAnimal(animal: Animal) {
        let index = this.getChildIndex(animal);
        if(index > -1) {
            this.removeChildAt(index);
        }
    }

    // 点击池中动物时把此动物加入跑道或者从跑道中移除
    public toggleForTrail(animal: Animal): void {
        console.log("toggle for trail", animal.runningCopy);
        if (animal.runningCopy !== null) {
            this.trail.removeAnimal(animal.runningCopy);
            animal.clearRunningCopy();
        } else {
            let runningAnimal = Animal.createViaPrototype(animal);
            runningAnimal.changeState(AnimalState.Running);
            this.trail.addAnimal(runningAnimal);
        
            animal.setRunningCopy(runningAnimal);
        }
    }

    // TODO 绘制池中每个动物格子的小方块
}