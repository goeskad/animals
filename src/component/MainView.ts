class MainView extends ui.MainViewUI{
    //跑道
    public trail: AnimalTrail;

    //已添加的动物池
    public pool: AnimalPool;

    //动物商店
    public shop: AnimalShop;

	constructor(){
		super();

        this.trail = new AnimalTrail(this.trailUI, this.goldLb);
        this.pool = new AnimalPool(this.poolUI, this.trail);
        this.shop = new AnimalShop(this.shopUI, this.pool);
        
        this.refreshGold();
        this.shopUI.close(null, false);
        this.buyBtn.on(Laya.Event.CLICK, this, this.onClickBuy);
	}

    public refreshGold() {
        this.goldLb.text = DataManager.getInstance().getData().currentGold.toString();
    }

    onClickBuy() {
        this.shopUI.show(false, true);
    }
}