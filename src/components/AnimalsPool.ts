/**
 * 已购买的动物池， 可从池中取出动物放到跑道上
 */
class AnimalsPool extends Laya.Box {
    private animals: Animal[];

    private manager: DataManager;

    constructor() {
        super();

        this.manager = DataManager.getInstance();
    }

    // 增加动物进入池
    public addAnimal(animal: Animal) {
        this.manager.getData().selectedAnimals.push(animal.animalKind);
        this.manager.dataChanged();

        this.animals.push(animal);
    }

    // 从池中移除动物
    public removeAnimal(animal: Animal) {
        let index = this.animals.indexOf(animal);
        if(index > -1) {
            this.animals.splice(index,1);

            this.manager.getData().selectedAnimals.splice(index, 1);
            this.manager.dataChanged();
        } 
    }

    // TODO 绘制池中每个动物格子的小方块
}